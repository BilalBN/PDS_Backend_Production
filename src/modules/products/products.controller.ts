import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { GetProductsService } from './services/get.products.service';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly getProductsService: GetProductsService) {}

  @Get()
  async get(@Request() req) {
    return await this.getProductsService.get(req.user.id);
  }
}
