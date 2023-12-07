import { IsOptional, IsString } from 'class-validator';

export class UpdatePublisherDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  thumbnail?: string;
}
