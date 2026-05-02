import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private products = <Product[]>[];

  findAll() {
    return this.products;
  }

  create(productDto: CreateProductDto): CreateProductDto {
    const newProduct: Product = {
      id: Date.now(),
      ...productDto,
    };

    this.products.push(newProduct);
    return newProduct;
  }
}
