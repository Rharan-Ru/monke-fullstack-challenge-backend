import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthLoginDTO } from '../swagger/auth.dto.swagger';
import { IsPublic } from '../../shared/decorators/is-public.decorator';
import { CustomError } from '../../shared/utils/error.custom';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDTO) {
    try {
      const user = await this.authService.validateUser(authLoginDto);
      if (!user) {
        throw new CustomError('Invalid credentials', 401);
      }
      return this.authService.login(user);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
