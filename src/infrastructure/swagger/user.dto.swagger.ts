import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UserCreateDTO {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'User email',
  })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'User password',
  })
  @IsString()
  @Length(6, 20, { message: 'A senha deve ter entre 6 e 20 caracteres' })
  password: string;
}

export class UserUpdateDTO {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'User email',
    required: false,
  })
  @IsEmail({}, { message: 'Email inválido' })
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: 'password',
    description: 'User password',
    required: false,
  })
  @IsString()
  @Length(6, 20, { message: 'A senha deve ter entre 6 e 20 caracteres' })
  @IsOptional()
  password?: string;

  @ApiProperty({
    example: true,
    description: 'First access',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  firstAccess?: boolean;
}
