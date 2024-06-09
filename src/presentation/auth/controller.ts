import { Request, Response } from 'express';
import { CustomError, LoginUser, LoginUserDto, RegisterUser, RegisterUserDto, ValidateEmail } from '../../domain';
import { UserRepository } from '../../domain/repositories/user.repository';
import { ValidateEmailDto } from '../../domain/dtos';

export class AuthController {

  //* DI
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  private handleError = (error: unknown, res: Response ) => {
    if ( error instanceof CustomError ) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${ error }`);
    return res.status(500).json({ error: 'Internal server error' })
  } 


  registerUser = (req: Request, res: Response) => {
    const [error, registerDto] = RegisterUserDto.create(req.body);
    if ( error ) return res.status(400).json({error})

    new RegisterUser(this.userRepository)
        .execute(registerDto!)
         .then( (user) => res.json(user) )
         .catch( error => this.handleError(error, res) );
    }



  loginUser = (req: Request, res: Response) => {

    const [error, loginUserDto] = LoginUserDto.create(req.body);
    if ( error ) return res.status(400).json({error})

    new LoginUser(this.userRepository)
        .execute(loginUserDto!)
        .then( (user) => res.json(user) )
        .catch( error => this.handleError(error, res) );

  }



  validateEmail = (req: Request, res: Response) => {
    const [error, validateEmailDto] = ValidateEmailDto.create(req.params);
    if ( error ) return res.status(400).json({error})
   
    new ValidateEmail(this.userRepository)
        .execute(validateEmailDto!)
        .then( () => res.json('Email was validated properly') )
        .catch( error => this.handleError(error, res) );
      
  }



}