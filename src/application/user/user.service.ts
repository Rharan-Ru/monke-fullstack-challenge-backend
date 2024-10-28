// nestJs module
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// DTOs
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// Entities
import { User } from '../../infrastructure/database/entities/user.entity';
import { CustomError } from '../../shared/utils/error.custom';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new CustomError('User with this email already exists', 400);
    }
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, {
      ...updateUserDto,
    });
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    return this.userRepository.delete(id);
  }
}
