import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(dto: RegisterUserDto) {
    if (!dto.password) throw new HttpException('Password is required', 400);
    dto.password = await this._encryptPassword(dto.password);
    const newUser = this.userRepo.create(dto);
    return this.userRepo.save(newUser);
  }

  async loginUser(dto: LoginUserDto) {
    const user = await this.userRepo.findOneBy({ email: dto.email });
    if (!user) throw new NotFoundException('User not Found');
    // verify password
    if (!(await bcrypt.compare(dto.password, user.password)))
      throw new UnauthorizedException('Invalid credentials');
    const payload = {
      sub: user.id,
      email: user.email,
    };
    return { accessToken: await this.jwtService.signAsync(payload) };
  }

  async _encryptPassword(password: string): Promise<string> {
    const rounds = 10;
    return await bcrypt.hash(password, rounds);
  }
}
