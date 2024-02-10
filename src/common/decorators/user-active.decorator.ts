import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const UserActive = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request;
  },
);
