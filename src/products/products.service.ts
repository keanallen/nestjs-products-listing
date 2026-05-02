import { HttpException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetProductDto } from './dto/get-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async findOne(productDto: GetProductDto): Promise<Product | null> {
    const product = await this.productRepo.findOneBy({
      id: parseInt(productDto.id),
    });
    if (!product) throw new HttpException('Product Not Found', 404);
    return product;
  }

  create(productDto: CreateProductDto): Promise<Product> {
    const product = this.productRepo.create(productDto);
    return this.productRepo.save(product);
  }
}
