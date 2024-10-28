import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateAddressDto {
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'O id deve ser um número.' },
  )
  @IsOptional()
  id?: number;

  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'O peso deve ser um número.' },
  )
  weight: number;

  @IsString({ message: 'O nome da rua deve ser uma string.' })
  @Length(1, 255, {
    message: 'O nome da rua deve ter entre 1 e 255 caracteres.',
  })
  street: string;

  @IsString({ message: 'O número da rua deve ser uma string.' })
  @Length(1, 255, {
    message: 'O número da rua deve ter entre 1 e 255 caracteres.',
  })
  number: string;

  @IsString({ message: 'O nome do bairro deve ser uma string.' })
  @Length(1, 255, {
    message: 'O nome do bairro deve ter entre 1 e 255 caracteres.',
  })
  neighborhood: string;

  @IsString({ message: 'O complemento do endereço deve ser uma string.' })
  @Length(1, 255, {
    message: 'O complemento do endereço deve ter entre 1 e 255 caracteres.',
  })
  complement: string;

  @IsString({ message: 'O nome da cidade deve ser uma string.' })
  @Length(1, 255, {
    message: 'O nome da cidade deve ter entre 1 e 255 caracteres.',
  })
  city: string;

  @IsString({ message: 'O nome do estado deve ser uma string.' })
  @Length(1, 255, {
    message: 'O nome do estado deve ter entre 1 e 255 caracteres.',
  })
  state: string;

  @IsString({ message: 'O nome do país deve ser uma string.' })
  @Length(1, 255, {
    message: 'O nome do país deve ter entre 1 e 255 caracteres.',
  })
  country: string;

  @IsString({ message: 'A latitude deve ser uma string.' })
  @Length(1, 255, {
    message: 'A latitude deve ter entre 1 e 255 caracteres.',
  })
  latitude: string;

  @IsString({ message: 'A longitude deve ser uma string.' })
  @Length(1, 255, {
    message: 'A longitude deve ter entre 1 e 255 caracteres.',
  })
  longitude: string;
}
