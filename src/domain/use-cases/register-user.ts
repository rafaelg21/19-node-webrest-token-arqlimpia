import { RegisterUserDto } from "../dtos";
import { UserEntity } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";



export interface RegisterUserUseCase {
    execute(dto: RegisterUserDto): Promise<any>;
}

export class RegisterUser implements RegisterUserUseCase {

    constructor(
        private readonly repository: UserRepository,       
    ) {}
    execute(dto: RegisterUserDto): Promise<any>{
        return this.repository.registerUser(dto);
    }

}