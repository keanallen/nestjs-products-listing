import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

const typeORM = TypeOrmModule.forRoot({
  type: 'mariadb',
  host: 'localhost',
  port: 1111,
  username: 'root',
  password: 'root123', // env
  database: 'nestjs_products',
  autoLoadEntities: true,
  synchronize: true,
});

@Module({
  imports: [ProductsModule, AuthModule, typeORM],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
