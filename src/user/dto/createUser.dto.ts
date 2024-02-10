import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  id: number;

  @IsString()
  fistName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  role?: string;

  //   @IsDate()
  //   creationDate: Date;
}
