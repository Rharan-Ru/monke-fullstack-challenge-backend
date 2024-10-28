import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClientService } from '../../application/client/client.service';
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
} from '@nestjs/common';
import {
  ClientCreateDTO,
  ClientUpdateDTO,
} from '../swagger/client.dto.swagger';

@ApiTags('clients')
@ApiBearerAuth()
@Controller('clients')
export class ClientController {
  constructor(private readonly clientsService: ClientService) {}

  @Post()
  async create(
    @Body() createClientDto: ClientCreateDTO,
    @Request() req: { user: IAuthRequestUser },
  ) {
    try {
      const userId = req.user.userId;
      const client = await this.clientsService.create(createClientDto, +userId);

      return client;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get()
  async findAll(@Request() req: { user: IAuthRequestUser }) {
    try {
      const userId = req.user.userId;
      return await this.clientsService.findAll(+userId);
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
      const client = await this.clientsService.findOne(+id, +userId);
      return client;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: ClientUpdateDTO,
    @Request() req: { user: IAuthRequestUser },
  ) {
    try {
      const userId = req.user.userId;
      return await this.clientsService.update(+id, updateClientDto, +userId);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete('delete-all')
  async removeAll(@Request() req: { user: IAuthRequestUser }) {
    try {
      const userId = req.user.userId;
      return await this.clientsService.removeAll(+userId);
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
      return await this.clientsService.remove(+id, +userId);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
