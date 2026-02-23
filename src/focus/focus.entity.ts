import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class FocusSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  startedAt: Date;

  @Column({ nullable: true })
  endedAt: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  durationMinutes: number;
}
