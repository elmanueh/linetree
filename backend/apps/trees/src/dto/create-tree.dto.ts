import { IsString } from 'class-validator';

export class CreateTreeDto {
  @IsString()
  name: string;
}
