import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
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
    if (!product) throw new NotFoundException('Product not found.');
    return product;
  }

  async deleteOne(productDto: GetProductDto): Promise<DeleteResult> {
    const result = await this.productRepo.delete(productDto.id);
    return result;
  }

  create(productDto: CreateProductDto): Promise<Product> {
    const product = this.productRepo.create(productDto);
    return this.productRepo.save(product);
  }
}
