import { LoginUserDto, RegisterUserDto, ValidateEmailDto } from '../dtos';


export abstract class UserDatasource {
      abstract registerUser( registerUserDto: RegisterUserDto ): Promise<any>;
     
      abstract loginUser( loginUserDto: LoginUserDto ): Promise<any>;
      
      abstract validateEmail(validateEmailDto: ValidateEmailDto): Promise<any>;
       
}