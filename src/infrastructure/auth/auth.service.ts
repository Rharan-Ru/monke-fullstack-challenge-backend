import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../database/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthLoginDTO } from '../swagger/auth.dto.swagger';
import { ConfigService } from '@nestjs/config';
import { CustomError } from '../../shared/utils/error.custom';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async generateToken(email: string, id: number): Promise<string> {
    const payload = { email, userId: id };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('SECRET_KEY', 'challenge'),
      expiresIn: '1h',
    });

    return token;
  }

  async validateUser(authLoginDto: AuthLoginDTO): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email: authLoginDto.email },
    });

    if (!user) {
      throw new CustomError('Invalid credentials', 401);
    }

    const isPasswordValid = await bcrypt.compare(
      authLoginDto.password,
      user.password,
    );

    if (user && isPasswordValid) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, userId: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('SECRET_KEY', 'challenge'),
        expiresIn: '1h',
      }),
    };
  }
}
