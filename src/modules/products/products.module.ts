import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { GetProductsService } from './services/get.products.service';

@Module({
  controllers: [ProductsController],
  providers: [GetProductsService],
})
export class ProductsModule {}
