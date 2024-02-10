import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { PublicUserDto } from './dto/publicUser.dto';

@Injectable()
export class UsersService {
  constructor(private db: DatabaseService) {}

  private readonly hidenPassword = {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    role: true,
    password: false, // aqui ocultamos la password
  };

  async findAll(): Promise<PublicUserDto[]> {
    // le pasamos el select de las columnas que mostrara
    return this.db.user.findMany({
      select: this.hidenPassword,
    });
  }

  async findOneById(id: number): Promise<User> {
    return this.db.user.findUnique({
      where: {
        id: id,
      },
      select: this.hidenPassword,
    });
  }

  async findByEmailWithPassword(email: string): Promise<User> {
    return this.db.user.findFirst({
      where: {
        email: email,
      },
    });
  }
  async findByEmail(email: string): Promise<User> {
    return this.db.user.findFirst({
      where: {
        email: email,
      },
      select: this.hidenPassword,
    });
  }

  async create(data: User): Promise<User> {
    return this.db.user.create({
      data,
      select: this.hidenPassword,
    });
  }

  update(id: number, data: User): Promise<User> {
    return this.db.user.update({
      where: {
        id: id,
      },
      data,
      select: this.hidenPassword,
    });
  }

  delete(id: number): Promise<User> {
    return this.db.user.delete({
      where: {
        id: id,
      },
      select: this.hidenPassword,
    });
  }
}
