import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '⚠️ Come on fill the name' })
  name: string;
  @IsEmail()
  email: string;
}
