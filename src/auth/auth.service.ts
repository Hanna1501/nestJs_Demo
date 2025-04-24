import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/schemas/Users.schema';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt'; // make sure it's imported
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<Users>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user.toObject();
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any, response: Response) {
    const payload = { email: user.email, sub: user._id };

    const expiresAccessToken = new Date();
    // expiresAccessToken.setMilliseconds(
    //   expiresAccessToken.getTime() +
    //     parseInt(
    //         '20s',
    //     ),
    // );
    expiresAccessToken.setTime(expiresAccessToken.getTime() + 20 * 1000)  //20s

    const expiresRefreshToken = new Date();
    // expiresRefreshToken.setMilliseconds(
    //   expiresRefreshToken.getTime() +
    //     parseInt(
    //         '7d',
    //     ),
    // );
    expiresRefreshToken.setTime(expiresRefreshToken.getTime() + 7 * 24 * 60 * 60 * 1000); // 7d

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '5m',
      secret: 'secret-key',
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: 'refresh-secret-key'
    });

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    // await this.usersModel.findByIdAndUpdate(user._id, {
    //   refreshToken: hashedRefreshToken,
    // });
    await this.usersModel.findByIdAndUpdate(
      { _id: user._id },
      { $set: { refreshToken: hashedRefreshToken } },
    );

    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      secure: false,
      expires: expiresAccessToken,
    });
    response.cookie('Refresh', refreshToken, {
      httpOnly: true,
      secure: false,
      expires: expiresRefreshToken,
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // const accessToken = this.jwtService.sign(payload, {
    //   expiresIn: '20s',
    //   secret: 'secret-key',
    // });

    // const refreshToken = this.jwtService.sign(payload, {
    //   expiresIn: '7d',
    //   secret: 'refresh-secret-key', // better to use a different secret
    // });

    // const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    // await this.usersModel.findByIdAndUpdate(user._id, {
    //   refreshToken: hashedRefreshToken,
    // });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  // async refreshToken(token: string) {
  //   try {
  //     const payload = await this.jwtService.verifyAsync(token, {
  //       secret: 'refresh-secret-key',
  //     });

  //     const newAccessToken = this.jwtService.sign(
  //       { email: payload.email, sub: payload.sub },
  //       { secret: 'secret-key', expiresIn: '1d' }
  //     );

  //     return { access_token: newAccessToken };
  //   } catch (e) {
  //     throw new UnauthorizedException('Invalid refresh token');
  //   }
  // }

  async veryifyUserRefreshToken(refreshToken: string, email: string) {
    try {
      const user = await this.usersService.findByEmail(email);
      if (!user || !user.refreshToken) throw new UnauthorizedException();

      const authenticated = await compare(refreshToken, user.refreshToken);
      if (!authenticated) {
        throw new UnauthorizedException();
      }
      // return user;
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: 'refresh-secret-key',
      });

      const newAccessToken = this.jwtService.sign(
        { email: payload.email, sub: payload.sub },
        { secret: 'secret-key', expiresIn: '20s' }
      );
      console.log("newAccessToken", newAccessToken)
      // return { access_token: newAccessToken };
      return { _id: user._id, email: user.email };
    } catch (err) {
      throw new UnauthorizedException('Refresh token is not valid.');
    }
  }

}
