import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserActiveInterface } from 'src/common/interface/user-active.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // buscamos el usuario y lo guardamos en la variable user
    const user = await this.userService.findByEmailWithPassword(
      registerDto.email,
    );

    //si se encuentra el user lanzamos BadRequestException
    if (user) throw new BadRequestException('User already exists');

    const passwordHash = await bcrypt.hash(registerDto.password, 10);

    //mandamos los datos del dto y crear un nuevo user con la password Hasheada
    return await this.userService.create({
      ...registerDto,
      password: passwordHash,
    });
  }

  async login({ email, password }: LoginDto) {
    // se busca el user por el email
    const user = await this.userService.findByEmailWithPassword(email);

    // si el user no existe se regresa un error de autorizacion
    if (!user) throw new UnauthorizedException('email is wrong');

    //comparamos la password que recibimos con la hasheada para comprobar que sea la correcta
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // si la password es incorrecta se regresa un error de autorizacion
    if (!isPasswordValid) throw new UnauthorizedException('password is wrong');

    const payload: UserActiveInterface = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      email,
    };
  }

  async profile({ email }: { email: string }) {
    return await this.userService.findByEmailWithPassword(email);
  }
}
