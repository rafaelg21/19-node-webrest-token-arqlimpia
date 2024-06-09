import { JwtAdapter, bcryptAdapter, envs } from "../../config";
import { prisma } from "../../data/postgres";
import { CustomError, LoginUserDto, RegisterUserDto, UserDatasource, UserEntity } from "../../domain";
import { ValidateEmailDto } from "../../domain/dtos";
import { EmailService } from "../../presentation/services";


export class PostgresUserDatasourceImpl implements UserDatasource { 

             // DI
            constructor(
                private readonly emailService: EmailService,
            ) {}


            public async registerUser( registerUserDto: RegisterUserDto ) {

                const existUser = await prisma.user.findFirst({
                where: {
                    email: registerUserDto.email
                }
                });

                if ( existUser ) throw CustomError.badRequest('Email already exist');

                try {      
                
                let user = await  prisma.user.create({
                    data: {
                    name: registerUserDto.name,
                    email: registerUserDto.email,
                    emailValidated: false,
                    password:  bcryptAdapter.hash( registerUserDto.password ) ,
                    img:'',                
                    }
                });      

                const { password, ...userEntity } = UserEntity.fromObject(user);  
                this.sendEmailValidationLink(userEntity.email);
                
                const token = await JwtAdapter.generateToken({ email: userEntity.email});
                if ( !token ) throw CustomError.internalServer('Error while creating JWT');
                
                return { 
                    user: userEntity, 
                    token: token 
                };

                } catch (error) {
                throw CustomError.internalServer(`${ error }`);
                }

            }


            public async loginUser( loginUserDto: LoginUserDto ) {

                const user = await prisma.user.findFirst({
                where: {
                    email: loginUserDto.email
                }
                });   
                if (!user) throw CustomError.badRequest('Email not exist');

                const isMatching = bcryptAdapter.compare( loginUserDto.password, user.password );
                if ( !isMatching ) throw CustomError.badRequest('Password is not valid');


                const { password, ...userEntity} = UserEntity.fromObject( user );
                
                const token = await JwtAdapter.generateToken({ id: user.id});
                if ( !token ) throw CustomError.internalServer('Error while creating JWT');

                return {
                user: userEntity,
                token: token,
                }
            }

            private sendEmailValidationLink = async (email:string) =>{

                const token = await JwtAdapter.generateToken({ email });
                if( !token ) throw CustomError.internalServer('Error getting token');

                const link = `${ envs.WEBSERVICE_RUL }/auth/validate-email/${token}`;
                const html = `
                <h1>Validate your email</h1>
                <p>Click on the following link to validate your email</p>
                <a href="${link}">Validate your email: ${email}</a>
                `;

                const options = {
                to: email,
                subject:'Validate your email',
                htmlBody: html,
                }

                const isSet = await this.emailService.sendEmail(options);
                if(!isSet) throw CustomError.internalServer('Error sending email');

                return true;
            }


            public validateEmail = async(validateEmailDto: ValidateEmailDto): Promise<any> => {
   
                const payload = await JwtAdapter.validateToken(validateEmailDto.token!);
                if(!payload) throw CustomError.unauthorized('Invalid token');
               
                const {email }= payload as {email: string};
                if(!email) throw CustomError.internalServer('Email not in token');
            
                const user = await prisma.user.findFirst({
                    where: {
                      email: email
                    }
                  }); 
                if(!user) throw CustomError.internalServer('Email not exists');
            
                await prisma.user.update({
                    where: { id:user.id },
                    data:  { emailValidated: true }
                });
            
                return true;
                
              }


}