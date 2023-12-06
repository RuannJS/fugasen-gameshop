import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class UserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request?.headers?.authorization?.split(' ')[1];

    try {
      const verifyToken = jwt.verify(token, process.env.USER_KEY);

      if (verifyToken) {
        return true;
      }
    } catch (err) {
      return false;
    }

    return true;
  }
}
