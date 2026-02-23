import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FocusSession } from './focus.entity';

@Injectable()
export class FocusService {
  constructor(
    @InjectRepository(FocusSession)
    private repo: Repository<FocusSession>,
  ) {}

  async start(userId: number) {
    const session = this.repo.create({ userId, startedAt: new Date() });
    return this.repo.save(session);
  }

  async stop(id: number) {
    const session = await this.repo.findOne({ where: { id } });
    if (!session) throw new Error('Session not found');

    session.endedAt = new Date();
    session.durationMinutes =
      (session.endedAt.getTime() - session.startedAt.getTime()) / 60000;

    return this.repo.save(session);
  }

  async getAllByUser(userId: number) {
    return this.repo.find({ where: { userId }, order: { startedAt: 'DESC' } });
  }
}
