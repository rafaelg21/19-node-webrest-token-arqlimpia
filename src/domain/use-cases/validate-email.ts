import {  ValidateEmailDto } from "../dtos";
import { UserRepository } from "../repositories/user.repository";



export interface ValidateEmailUseCase {
    execute(dto: ValidateEmailDto): Promise<any>;
}

export class ValidateEmail implements ValidateEmailUseCase {

    constructor(      
        private readonly repository: UserRepository,       
    ) {}
    execute(dto: ValidateEmailDto): Promise<any>{
        return this.repository.validateEmail(dto);
    }

}