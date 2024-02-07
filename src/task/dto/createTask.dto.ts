import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  // @IsNumber()
  // id: number;

  @IsNumber()
  idUser: number;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsBoolean()
  complete: boolean;

  // @IsDate()
  // creationDate: Date;

  @IsOptional()
  @IsDate()
  completionDate: Date;
}
