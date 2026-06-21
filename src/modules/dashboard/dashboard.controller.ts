import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { GetDashboardCountsService } from './services/get.dashboard.counts.service';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly getDashboardCountsService: GetDashboardCountsService,
  ) {}

  @Get('counts')
  async getCounts(@Request() req) {
    return await this.getDashboardCountsService.get(req.user.id);
  }
}
