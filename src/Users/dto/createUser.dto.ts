import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDtoo {

    @IsString()
    @IsNotEmpty({ message: 'Name is required' })
    name: string;
  
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;
  
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;

  }
