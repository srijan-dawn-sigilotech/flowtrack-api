/* eslint-disable */
import { Controller, Post, Param, Get, UseGuards, Request } from '@nestjs/common';
import { FocusService } from './focus.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('focus')
export class FocusController {
  constructor(private focus: FocusService) {}

  @UseGuards(JwtAuthGuard)
  @Post('start')
  start(@Request() req) {
    const userId = req.user.sub; // from JWT
    return this.focus.start(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('stop/:id')
  stop(@Param('id') id: number) {
    return this.focus.stop(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-sessions')
  getMySessions(@Request() req) {
    const userId = req.user.sub;
    return this.focus.getAllByUser(userId);
  }
}
