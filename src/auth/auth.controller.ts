import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: LoginDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.validateUser(body.email, body.password);
    const tokens = await this.authService.login(user, res);
  // res.cookie('Refresh', tokens.refresh_token, {
  //   httpOnly: true,
  //   secure: false, // true if using https
  //   sameSite: 'strict',
  //   path: '/',
  //   maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  // });

  return tokens
    // return this.authService.login(user);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = req.user;
    const refreshToken = req.cookies?.Refresh;
    const decoded = await this.jwtService.verifyAsync(refreshToken, {
      secret: 'refresh-secret-key',
    });
    // const email = req.user?.email;
    // return this.authService.veryifyUserRefreshToken(refreshToken, decoded.email);
    return this.authService.login(user, res);
  }
}
