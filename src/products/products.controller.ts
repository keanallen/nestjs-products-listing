import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  findAll() {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }
}
