import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { GetDashboardCountsService } from './services/get.dashboard.counts.service';

@Module({
  controllers: [DashboardController],
  providers: [GetDashboardCountsService],
})
export class DashboardModule {}
