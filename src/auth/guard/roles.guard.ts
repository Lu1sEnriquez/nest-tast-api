import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../common/enums/rol.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // si la ruta no necesita o no tiene declarado el decorador @Roles regresamos true
    // para que obtengan el resultado de el endpoint
    if (!role) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    // si es admin automaticamente le damos acceso a cualquier ruta
    if (user.role == Role.ADMIN) return true;

    // si no es admin checamos el role de la ruta con el que agregaron al decorador
    if (role === user.role) return true;
  }
}
