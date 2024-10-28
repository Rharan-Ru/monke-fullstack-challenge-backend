import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from '../../infrastructure/controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from '../../infrastructure/database/entities/client.entity';
import { User } from '../../infrastructure/database/entities/user.entity';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Client, User])],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtService],
})
export class UserModule {}
