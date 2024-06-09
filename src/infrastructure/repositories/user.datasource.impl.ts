import { LoginUserDto, RegisterUserDto, UserDatasource, UserEntity } from "../../domain";
import { ValidateEmailDto } from "../../domain/dtos";
import { UserRepository } from "../../domain/repositories/user.repository";




export class UserRepositoryImpl implements UserRepository{
    

    constructor(
        private readonly datasource: UserDatasource,        
    ){}

    registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.datasource.registerUser(registerUserDto);
    }

   
    loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.datasource.loginUser(loginUserDto);
    }

    validateEmail(validateEmailDto: ValidateEmailDto): Promise<any> {
        return this.datasource.validateEmail(validateEmailDto);
    }


}