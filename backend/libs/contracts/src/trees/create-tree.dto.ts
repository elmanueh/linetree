import { IsString } from 'class-validator';

export class CreateTreeDto {
  @IsString({ message: 'Name must be a string' })
  name: string;
}
