

export class ValidateEmailDto {

  private constructor(
    public token: string,   
  ) {}

  static create( object: { [key:string]:any } ): [string?, ValidateEmailDto?] {
    
    const { token } = object;
   
    if ( !token ) return ['Missing token'];
   

    return [undefined, new ValidateEmailDto(token)];

  }

}
