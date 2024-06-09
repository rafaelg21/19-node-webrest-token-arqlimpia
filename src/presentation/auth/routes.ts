import { Router } from 'express';
import { AuthController } from './controller';
import { envs } from '../../config';
import { EmailService } from '../services';
import { MongoUserDatasourceImpl } from '../../infrastructure/datasource/mongo-user.datasource.impl';
import { UserRepositoryImpl } from '../../infrastructure/repositories/user.datasource.impl';
import { PostgresUserDatasourceImpl } from '../../infrastructure/datasource/postgres-user.datasource.impl';



export class Authroutes {


  static get routes(): Router {

    const router = Router();

    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
    );  

    // MONGO 
    // const datasource = new MongoUserDatasourceImpl(emailService); 
    // const userRepository = new UserRepositoryImpl(datasource);
    // const controller = new AuthController(userRepository);
    

    const datasource = new PostgresUserDatasourceImpl(emailService);
    const userRepository = new UserRepositoryImpl( datasource );
    const controller = new AuthController(userRepository);


    /*
    const authService = new AuthService(
      emailService
    );

    const controller = new AuthController(authService);*/
    
    // Definir las rutas
    router.post('/login', controller.loginUser );
    router.post('/register', controller.registerUser );
    
    router.get('/validate-email/:token', controller.validateEmail );



    return router;
  }


}

