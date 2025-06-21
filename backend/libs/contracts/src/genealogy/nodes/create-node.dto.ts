import { GenderType } from '@genealogy-ms/core/domain/gender.enum';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateNodeDto {
  @IsOptional()
  @IsString({ message: 'Address must be a string' })
  address?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Birth date must be a valid date' })
  birthDate?: Date;

  @IsOptional()
  @IsString({ message: 'Birth place must be a string' })
  birthPlace?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Death date must be a valid date' })
  deathDate?: Date;

  @IsOptional()
  @IsString({ message: 'Death place must be a string' })
  deathPlace?: string;

  @IsOptional()
  @IsString({ message: 'Email must be a string' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'Family name must be a string' })
  familyName?: string;

  @IsNotEmpty({ message: 'Gender is required' })
  @IsEnum(GenderType, {
    message: 'Gender must be one of the following: male, female, other',
  })
  gender: GenderType;

  @IsNotEmpty({ message: 'Given name is required' })
  @IsString({ message: 'Given name must be a string' })
  givenName: string;

  @IsOptional()
  @IsString({ message: 'Nationality must be a string' })
  nationality?: string;

  @IsOptional()
  @IsString({ message: 'Telephone must be a string' })
  telephone?: string;
}
