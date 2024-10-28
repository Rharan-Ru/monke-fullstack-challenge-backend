import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AuthLoginDTO {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'User email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'User password',
  })
  @IsString()
  password: string;
}
