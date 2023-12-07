import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { DecodedJWT } from 'src/tokens/jwt/decodedJWT.class';

export const UserDecorator = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const token = request.token;

    return jwt.decode(token) as DecodedJWT;
  },
);
