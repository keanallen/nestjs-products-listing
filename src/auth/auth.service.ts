import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async createUser(dto: RegisterUserDto) {
    if (!dto.password) throw new HttpException('Password is required', 400);
    dto.password = await this._encryptPassword(dto.password);
    const newUser = this.userRepo.create(dto);
    return this.userRepo.save(newUser);
  }

  async _encryptPassword(password: string): Promise<string> {
    const rounds = 10;
    return await bcrypt.hash(password, rounds);
  }
}
