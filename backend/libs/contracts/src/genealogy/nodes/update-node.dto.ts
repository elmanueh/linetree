import { Gender } from '@app/genealogy/core/domain/gender.enum';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateNodeDto {
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Birth date must be a valid date' })
  birthDate?: Date;

  @IsOptional()
  @IsString({ message: 'FamilyName must be a string' })
  familyName?: string;

  @IsOptional()
  @IsEnum(Gender, {
    message: 'Gender must be one of the following: male, female, other',
  })
  gender?: Gender;

  @IsOptional()
  @IsString({ message: 'GivenName must be a string' })
  givenName?: string;
}
