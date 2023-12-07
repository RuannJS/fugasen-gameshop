import { IsNotEmpty, IsString } from 'class-validator';

export class SigninPublisherDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  publisherKey: string;
}
