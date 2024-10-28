import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @IsOptional()
  clientId?: number;

  @IsOptional()
  firstAccess?: boolean;
}
