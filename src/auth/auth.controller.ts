import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  register(@Body() dto: AuthDto) {
    return this.auth.register(dto.email, dto.password);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login an existing user' })
  login(@Body() dto: AuthDto) {
    return this.auth.login(dto.email, dto.password);
  }

  @Get('users')
  @ApiOperation({ summary: 'Get all users (for testing)' })
  users() {
    return this.auth.users();
  }
}
