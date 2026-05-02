import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  private products = <Product[]>[];

  findAll() {
    return this.products;
  }

  create(productDto: CreateProductDto): Promise<Product> {
    const product = this.productRepo.create(productDto);
    return this.productRepo.save(product);
  }
}
