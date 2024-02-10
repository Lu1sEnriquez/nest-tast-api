import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PublicUserDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  fistName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsString()
  @IsOptional()
  role?: string;
}
