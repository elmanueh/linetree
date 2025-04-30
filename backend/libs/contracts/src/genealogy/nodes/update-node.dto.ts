import { IsOptional } from 'class-validator';

export class UpdateNodeDto {
  @IsOptional()
  name?: string;
}
