import { Type } from 'class-transformer';
import { IsString, Length, ValidateNested } from 'class-validator';
import { CreateAddressDto } from 'src/application/address/dto/create-address.dto';

export class CreateClientDto {
  @IsString()
  @Length(1, 255)
  name: string;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address?: CreateAddressDto;
}
