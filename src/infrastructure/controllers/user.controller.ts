import { UserService } from '../../application/user/user.service';
import { UserCreateDTO, UserUpdateDTO } from '../swagger/user.dto.swagger';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { IsPublic } from '../../shared/decorators/is-public.decorator';

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
} from '@nestjs/common';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @IsPublic()
  @Post()
  @ApiConsumes('application/x-www-form-urlencoded')
  async create(@Body() createUserDto: UserCreateDTO) {
    try {
      const user = await this.userService.create(createUserDto);
      const token = await this.authService.generateToken(user.email, user.id);
      return { user, token };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.userService.findOne(+id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Patch(':id')
  @ApiConsumes('application/x-www-form-urlencoded')
  async update(@Param('id') id: string, @Body() updateUserDto: UserUpdateDTO) {
    try {
      return await this.userService.update(+id, updateUserDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.userService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
