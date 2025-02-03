import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminsService } from 'src/admins/admins.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private adminsService: AdminsService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const admin = await this.adminsService.findOne(username);
    if (!admin || !(await bcrypt.compare(pass, admin.password))) {
      throw new UnauthorizedException();
    }
    const payload = { sub: admin.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
