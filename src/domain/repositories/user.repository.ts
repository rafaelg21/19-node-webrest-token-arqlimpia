//import { LoginUserDto, RegisterUserDto } from '../dtos/auth';
import { LoginUserDto, RegisterUserDto, ValidateEmailDto } from '../dtos';


export abstract class UserRepository {
    abstract loginUser( loginUserDto: LoginUserDto ): Promise<any>;
    abstract registerUser( registerUserDto: RegisterUserDto ): Promise<any>;
    abstract validateEmail(validateEmailDto: ValidateEmailDto): Promise<any>;
       
}