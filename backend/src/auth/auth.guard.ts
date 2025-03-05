import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    try {
      const accessToken = request.headers.authorization.split(' ')[1];

      if (!accessToken) {
        return false;
      }

      const tokenPayload = await this.jwtService.verifyAsync(accessToken);
      request.user = {
        email: tokenPayload.email
      };
      return true;
    }
    catch (e) {
      throw new UnauthorizedException();
    }
  }
}
