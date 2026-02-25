import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwt: JwtService,
  ) {}

  async register(email: string, password: string) {
    const hash = await bcrypt.hash(password, 10);
    const user = await this.usersService.create(email, hash);
    return this.signToken(user.id);
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedException();
    }
    return this.signToken(user.id);
  }
  
  async users() {
    const user = { select: ['id', 'email'], order: { id: 'DESC' }};
    return this.usersService.findAll(user);
  }

  signToken(userId: number) {
    return {
      accessToken: this.jwt.sign({ sub: userId }),
    };
  }
}
