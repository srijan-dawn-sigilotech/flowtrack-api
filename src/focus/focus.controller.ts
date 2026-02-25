import { Controller, Post, Param, Get, UseGuards, Request } from '@nestjs/common';
import { FocusService } from './focus.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Focus')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('focus')
export class FocusController {
  constructor(private focus: FocusService) {}

  @Post('start')
  start(@Request() req) {
    const userId = req.user.sub; // from JWT
    return this.focus.start(userId);
  }

  @Post('stop/:id')
  stop(@Param('id') id: number) {
    return this.focus.stop(id);
  }

  @Get('my-sessions')
  getMySessions(@Request() req) {
    const userId = req.user.sub;
    return this.focus.getAllByUser(userId);
  }
}
