import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LaptopsController } from './laptops.controller';
import { LaptopsService } from './laptops.service';
import { EventsModule } from '../events/events.module';
import { LaptopEntity } from '../../database/entities/laptop.entity';

@Module({
  imports: [EventsModule, TypeOrmModule.forFeature([LaptopEntity])],
  controllers: [LaptopsController],
  providers: [LaptopsService],
})
export class LaptopsModule {}
