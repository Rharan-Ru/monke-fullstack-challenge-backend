import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length, ValidateNested } from 'class-validator';
import { AddressCreateDTO } from './address.dto.swagger';
import { Type } from 'class-transformer';

export class ClientCreateDTO {
  @ApiProperty({
    example: 'Client name',
    default: 'Client1',
    description: 'Client name',
    maxLength: 255,
    minLength: 1,
  })
  @IsString({ message: 'O nome do cliente deve ser uma string.' })
  @Length(1, 255, {
    message: 'O nome do cliente deve ter entre 1 e 255 caracteres.',
  })
  name: string;

  @ApiProperty({
    type: AddressCreateDTO,
    description: 'Endereço do cliente',
    required: false,
  })
  @ValidateNested()
  @Type(() => AddressCreateDTO)
  address?: AddressCreateDTO;
}

export class ClientUpdateDTO {
  @IsOptional()
  @ApiProperty({
    example: 'Client name',
    default: 'Client1',
    description: 'Client name',
    maxLength: 255,
    minLength: 1,
    required: false,
  })
  @IsString({ message: 'O nome do cliente deve ser uma string.' })
  @Length(1, 255, {
    message: 'O nome do cliente deve ter entre 1 e 255 caracteres.',
  })
  name: string;

  @ApiProperty({
    type: AddressCreateDTO,
    description: 'Endereço do cliente',
    required: false,
  })
  @ValidateNested()
  @Type(() => AddressCreateDTO)
  address?: AddressCreateDTO;
}
