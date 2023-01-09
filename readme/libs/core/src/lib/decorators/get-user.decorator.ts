import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUserFromToken = createParamDecorator<string, ExecutionContext>(
  (data, context) => {
    const req = context.switchToHttp().getRequest();
    if (!data) {
      return req.user;
    }

    return req.user[data];
  }
);
