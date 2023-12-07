import { IsNotEmpty, IsString } from 'class-validator';

export class SignupPublisherDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  thumbnail: string;
}
