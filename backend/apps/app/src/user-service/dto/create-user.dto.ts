import { GenderType } from '@app/genealogy/core/domain/gender.enum';
import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @Type(() => Date)
  @IsDate({ message: 'Birth date must be a valid date' })
  birthDate: Date;

  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'FirstName must not be empty' })
  @IsString({ message: 'FirstName must be a string' })
  firstName: string;

  @IsNotEmpty({ message: 'Gender is required' })
  @IsEnum(GenderType, {
    message: 'Gender must be one of the following: male, female, other',
  })
  gender: GenderType;

  @IsNotEmpty({ message: 'LastName must not be empty' })
  @IsString({ message: 'LastName must be a string' })
  lastName: string;

  @IsNotEmpty({ message: 'Password must not be empty' })
  @IsString({ message: 'Password must be a string' })
  password: string;
}
