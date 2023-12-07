import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { DecodedPublisher } from 'src/tokens/jwt/decodedPublisher.class';

export const TokenDecorator = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const token = request.token;

    return jwt.decode(token) as DecodedPublisher;
  },
);
