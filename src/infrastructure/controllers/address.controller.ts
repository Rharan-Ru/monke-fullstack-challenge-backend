import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AddressService } from '../../application/address/address.service';
import { IAuthRequestUser } from '../auth/auth.interfaces';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  HttpException,
  Query,
} from '@nestjs/common';
import {
  AddressCreateDTO,
  AddressUpdateDTO,
} from '../swagger/address.dto.swagger';

@ApiTags('address')
@ApiBearerAuth()
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post(':clientId')
  @ApiConsumes('application/x-www-form-urlencoded')
  async create(
    @Body() createAddressDto: AddressCreateDTO,
    @Request() req: { user: IAuthRequestUser },
    @Param('clientId') clientId: string,
  ) {
    try {
      const userId = req.user.userId;
      const address = await this.addressService.create(
        createAddressDto,
        +clientId,
        +userId,
      );
      return address;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('map-markers')
  async findAllForMapMarkers() {
    try {
      return await this.addressService.findAllForMapMarkers();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get()
  async findAll(
    @Request() req: { user: IAuthRequestUser },
    @Query('pageNumber') pageNumber: number,
  ) {
    try {
      pageNumber = Number(pageNumber) || 1;
      const userId = req.user.userId;
      return await this.addressService.findAll(+userId, pageNumber);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Request() req: { user: IAuthRequestUser },
  ) {
    try {
      const userId = req.user.userId;
      const address = await this.addressService.findOne(+id, +userId);
      return address;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Patch(':id')
  @ApiConsumes('application/x-www-form-urlencoded')
  async update(
    @Param('id') id: string,
    @Body() updateAddressDto: AddressUpdateDTO,
    @Request() req: { user: IAuthRequestUser },
  ) {
    try {
      const userId = req.user.userId;
      return await this.addressService.update(+id, updateAddressDto, +userId);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Request() req: { user: IAuthRequestUser },
  ) {
    try {
      const userId = req.user.userId;
      return await this.addressService.remove(+id, +userId);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
