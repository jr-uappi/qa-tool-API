import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActivityLogsModule } from './activity-logs/activity-logs.module';

@Module({
  imports: [ActivityLogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
