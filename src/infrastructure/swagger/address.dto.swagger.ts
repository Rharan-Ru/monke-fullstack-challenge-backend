import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class AddressCreateDTO {
  @ApiProperty({
    example: 1,
    default: 1,
    description: 'Address id',
    required: false,
  })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'O id deve ser um número.' },
  )
  @IsOptional()
  id?: number;

  @ApiProperty({
    example: 123,
    default: 123,
    description: 'Weight of the package',
    required: false,
  })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'O peso deve ser um número.' },
  )
  weight: number;

  @ApiProperty({
    example: 'Street name',
    default: 'Street1',
    description: 'Street name',
    maxLength: 255,
    minLength: 1,
  })
  @IsString({ message: 'O nome da rua deve ser uma string.' })
  @Length(1, 255, {
    message: 'O nome da rua deve ter entre 1 e 255 caracteres.',
  })
  street: string;

  @ApiProperty({
    example: '123',
    default: '123',
    description: 'Street number',
    maxLength: 255,
    minLength: 1,
  })
  @IsString({ message: 'O número da rua deve ser uma string.' })
  @Length(1, 255, {
    message: 'O número da rua deve ter entre 1 e 255 caracteres.',
  })
  number: string;

  @ApiProperty({
    example: 'Neighborhood name',
    default: 'Neighborhood1',
    description: 'Neighborhood name',
    maxLength: 255,
    minLength: 1,
  })
  @IsString({ message: 'O nome do bairro deve ser uma string.' })
  @Length(1, 255, {
    message: 'O nome do bairro deve ter entre 1 e 255 caracteres.',
  })
  neighborhood: string;

  @ApiProperty({
    example: 'Complement',
    default: 'Complement1',
    description: 'Address complement',
    maxLength: 255,
    minLength: 1,
  })
  @IsString({ message: 'O complemento do endereço deve ser uma string.' })
  @Length(1, 255, {
    message: 'O complemento do endereço deve ter entre 1 e 255 caracteres.',
  })
  complement: string;

  @ApiProperty({
    example: 'City name',
    default: 'City1',
    description: 'City name',
    maxLength: 255,
    minLength: 1,
  })
  @IsString({ message: 'O nome da cidade deve ser uma string.' })
  @Length(1, 255, {
    message: 'O nome da cidade deve ter entre 1 e 255 caracteres.',
  })
  city: string;

  @ApiProperty({
    example: 'State name',
    default: 'State1',
    description: 'State name',
    maxLength: 255,
    minLength: 1,
  })
  @IsString({ message: 'O nome do estado deve ser uma string.' })
  @Length(1, 255, {
    message: 'O nome do estado deve ter entre 1 e 255 caracteres.',
  })
  state: string;

  @ApiProperty({
    example: 'Country name',
    default: 'Country1',
    description: 'Country name',
    maxLength: 255,
    minLength: 1,
  })
  @IsString({ message: 'O nome do país deve ser uma string.' })
  @Length(1, 255, {
    message: 'O nome do país deve ter entre 1 e 255 caracteres.',
  })
  country: string;

  @ApiProperty({
    example: 'Latitude',
    default: 'Latitude1',
    description: 'Latitude',
    maxLength: 255,
    minLength: 1,
  })
  @IsString({ message: 'A latitude deve ser uma string.' })
  @Length(1, 255, {
    message: 'A latitude deve ter entre 1 e 255 caracteres.',
  })
  latitude: string;

  @ApiProperty({
    example: 'Longitude',
    default: 'Longitude1',
    description: 'Longitude',
    maxLength: 255,
    minLength: 1,
  })
  @IsString({ message: 'A longitude deve ser uma string.' })
  @Length(1, 255, {
    message: 'A longitude deve ter entre 1 e 255 caracteres.',
  })
  longitude: string;
}

export class AddressUpdateDTO {
  @IsOptional()
  @ApiProperty({
    example: 'Street name',
    default: 'Street1',
    description: 'Street name',
    maxLength: 255,
    minLength: 1,
    required: false,
  })
  @IsString({ message: 'O nome da rua deve ser uma string.' })
  @Length(1, 255, {
    message: 'O nome da rua deve ter entre 1 e 255 caracteres.',
  })
  street?: string;

  @IsOptional()
  @ApiProperty({
    example: '123',
    default: '123',
    description: 'Street number',
    maxLength: 255,
    minLength: 1,
    required: false,
  })
  @IsString({ message: 'O número da rua deve ser uma string.' })
  @Length(1, 255, {
    message: 'O número da rua deve ter entre 1 e 255 caracteres.',
  })
  number: string;

  @IsOptional()
  @ApiProperty({
    example: 'Neighborhood name',
    default: 'Neighborhood1',
    description: 'Neighborhood name',
    maxLength: 255,
    minLength: 1,
    required: false,
  })
  @IsString({ message: 'O nome do bairro deve ser uma string.' })
  @Length(1, 255, {
    message: 'O nome do bairro deve ter entre 1 e 255 caracteres.',
  })
  neighborhood: string;

  @IsOptional()
  @ApiProperty({
    example: 'Complement',
    default: 'Complement1',
    description: 'Address complement',
    maxLength: 255,
    minLength: 1,
    required: false,
  })
  @IsString({ message: 'O complemento do endereço deve ser uma string.' })
  @Length(1, 255, {
    message: 'O complemento do endereço deve ter entre 1 e 255 caracteres.',
  })
  complement: string;

  @IsOptional()
  @ApiProperty({
    example: 'City name',
    default: 'City1',
    description: 'City name',
    maxLength: 255,
    minLength: 1,
    required: false,
  })
  @IsString({ message: 'O nome da cidade deve ser uma string.' })
  @Length(1, 255, {
    message: 'O nome da cidade deve ter entre 1 e 255 caracteres.',
  })
  city: string;

  @IsOptional()
  @ApiProperty({
    example: 'State name',
    default: 'State1',
    description: 'State name',
    maxLength: 255,
    minLength: 1,
    required: false,
  })
  @IsString({ message: 'O nome do estado deve ser uma string.' })
  @Length(1, 255, {
    message: 'O nome do estado deve ter entre 1 e 255 caracteres.',
  })
  state: string;

  @IsOptional()
  @ApiProperty({
    example: 'Country name',
    default: 'Country1',
    description: 'Country name',
    maxLength: 255,
    minLength: 1,
    required: false,
  })
  @IsString({ message: 'O nome do país deve ser uma string.' })
  @Length(1, 255, {
    message: 'O nome do país deve ter entre 1 e 255 caracteres.',
  })
  country: string;

  @IsOptional()
  @ApiProperty({
    example: 'Latitude',
    default: 'Latitude1',
    description: 'Latitude',
    maxLength: 255,
    minLength: 1,
    required: false,
  })
  @IsString({ message: 'A latitude deve ser uma string.' })
  @Length(1, 255, {
    message: 'A latitude deve ter entre 1 e 255 caracteres.',
  })
  latitude: string;

  @IsOptional()
  @ApiProperty({
    example: 'Longitude',
    default: 'Longitude1',
    description: 'Longitude',
    maxLength: 255,
    minLength: 1,
    required: false,
  })
  @IsString({ message: 'A longitude deve ser uma string.' })
  @Length(1, 255, {
    message: 'A longitude deve ter entre 1 e 255 caracteres.',
  })
  longitude: string;
}
