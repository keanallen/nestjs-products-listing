import { Body, Controller, Get, Delete, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductDto } from './dto/get-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  findAll() {}

  @Get(':id')
  findOne(@Param() dto: GetProductDto) {
    return this.productService.findOne(dto);
  }

  @Delete(':id')
  deleteOne(@Param() dto: GetProductDto) {
    return this.productService.deleteOne(dto);
  }

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }
}
