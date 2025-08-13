import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies?.Refresh,
      ]),
      secretOrKey: 'refresh-secret-key',
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: { email: string, sub: string }) {
    return await this.authService.veryifyUserRefreshToken(
      request.cookies?.Refresh,
      payload.email,
    );
  }
}