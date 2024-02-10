import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  @IsString()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6) // 6 caracteres minimos
  password: string;

  @IsOptional()
  @IsString()
  role: string;
}
