import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  readonly email: string;

  @IsString({ message: 'Password must be a string' })
  readonly password: string;
}
