import { Controller, Post, Param, Get, UseGuards, Request } from '@nestjs/common';
import { FocusService } from './focus.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Focus')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('focus')
export class FocusController {
  constructor(private focus: FocusService) {}

  @Post('start')
  @ApiOperation({ summary: 'Start a new focus session' })
  start(@Request() req) {
    const userId = req.user.sub; // from JWT
    return this.focus.start(userId);
  }

  @Post('stop/:id')
  @ApiOperation({ summary: 'Stop an active focus session' })
  stop(@Param('id') id: number) {
    return this.focus.stop(id);
  }

  @Get('my-sessions')
  @ApiOperation({ summary: 'Get all focus sessions for the logged-in user' })
  getMySessions(@Request() req) {
    const userId = req.user.sub;
    return this.focus.getAllByUser(userId);
  }
}
