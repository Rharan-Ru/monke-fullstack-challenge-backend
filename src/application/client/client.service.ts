// nestJs module
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// DTOs
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
// Entities
import { Client } from '../../infrastructure/database/entities/client.entity';
import { CustomError } from '../../shared/utils/error.custom';
// Services
import { AddressService } from '../address/address.service';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    @Inject(AddressService)
    private addressService: AddressService,
  ) {}

  async create(createClientDto: CreateClientDto, userId: number) {
    const client = this.clientRepository.create({
      ...createClientDto,
      user: { id: userId },
    });

    const savedClient = await this.clientRepository.save(client);

    if (!createClientDto.address) {
      return savedClient;
    }

    await this.addressService.create(
      createClientDto.address,
      savedClient.id,
      userId,
    );

    return savedClient;
  }

  async findAll(userId: number) {
    return await this.clientRepository.find({
      where: { user: { id: userId } },
    });
  }

  async findOne(id: number, userId: number) {
    const client = await this.clientRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!client) {
      throw new CustomError('Client not found', 404);
    }
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto, userId: number) {
    const client = await this.findOne(id, userId);
    if (!client) {
      throw new CustomError('Client not found', 404);
    }

    if (!updateClientDto.address) {
      await this.addressService.update(
        updateClientDto.address.id,
        updateClientDto.address,
        userId,
      );
    }

    return await this.clientRepository.update(id, {
      ...updateClientDto,
      user: { id: userId },
    });
  }

  async remove(id: number, userId: number) {
    const client = await this.findOne(id, userId);
    if (!client) {
      throw new CustomError('User not found', 404);
    }
    return await this.clientRepository.delete(id);
  }

  async removeAll(userId: number) {
    await this.addressService.removeAll(userId);
    return await this.clientRepository.delete({ user: { id: userId } });
  }
}
