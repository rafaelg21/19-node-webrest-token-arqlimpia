import { LoginUserDto } from "../dtos";
import { UserEntity } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";



export interface LoginUserUseCase {
    execute(dto: LoginUserDto): Promise<any>;
}

export class LoginUser implements LoginUserUseCase {

    constructor(
        private readonly repository: UserRepository,       
    ) {}
    execute(dto: LoginUserDto): Promise<any>{
        return this.repository.loginUser(dto);
    }

}