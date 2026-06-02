import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { EventsModule } from './modules/events/events.module';
import { HealthModule } from './modules/health/health.module';
import { StatsModule } from './modules/stats/stats.module';
import { LaptopsModule } from './modules/laptops/laptops.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [DatabaseModule, EventsModule, HealthModule, StatsModule, LaptopsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
