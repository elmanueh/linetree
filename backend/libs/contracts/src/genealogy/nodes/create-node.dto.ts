import { Gender } from '@app/genealogy/core/domain/gender.enum';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateNodeDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;

  @IsString({ message: 'Last name must be a string' })
  @IsOptional()
  lastName?: string;

  @IsDate({ message: 'Birth date must be a valid date' })
  @IsNotEmpty({ message: 'Birth date is required' })
  @Type(() => Date)
  birthDate: Date;

  @IsDate({ message: 'Death date must be a valid date' })
  @IsOptional()
  @Type(() => Date)
  deathDate?: Date;

  @IsEnum(Gender, {
    message: 'Gender must be one of the following: male, female, or other',
  })
  @IsNotEmpty({ message: 'Gender is required' })
  gender: Gender;
}
