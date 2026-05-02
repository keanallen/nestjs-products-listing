import { IsString, Min, Max, MinLength, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(2)
  name: string;

  @Min(1)
  @Max(1000)
  price: number;

  @IsOptional()
  qty?: number;
}
