import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FocusModule } from './focus/focus.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'FlowTrackDB',
      username: 'root',
      password: 'password',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    AuthModule,
    UsersModule,
    FocusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
