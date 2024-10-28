// nestJs module
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// DTOs
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
// Entities
import { Address } from '../../infrastructure/database/entities/address.entity';
import { CustomError } from '../../shared/utils/error.custom';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async getTotalWeight(userId: number) {
    const address = await this.addressRepository.find({
      where: { client: { user: { id: userId } } },
    });

    return address.reduce((acc, cur) => acc + Number(cur.weight), 0);
  }

  async create(
    createAddressDto: CreateAddressDto,
    clientId: number,
    userId: number,
  ) {
    const address = this.addressRepository.create({
      ...createAddressDto,
      client: { id: clientId, user: { id: userId } },
    });
    return await this.addressRepository.save(address);
  }

  async findAllForMapMarkers() {
    return await this.addressRepository.find({
      select: ['id', 'latitude', 'longitude'],
      relations: ['client'],
    });
  }

  async findAll(userId: number, pageNumber: number) {
    const pageSize = 10;
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;

    const [address, totalCount] = await this.addressRepository.findAndCount({
      where: { client: { user: { id: userId } } },
      relations: ['client'],
      skip,
      take,
      order: { id: 'DESC' },
    });

    const totalWeight = await this.getTotalWeight(userId);

    return {
      address: address,
      hasMore: address.length === pageSize,
      totalCount: totalCount,
      totalWeight: totalWeight || 0,
    };
  }

  async findOne(id: number, userId: number) {
    const address = await this.addressRepository.findOne({
      where: { id, client: { user: { id: userId } } },
    });
    if (!address) {
      throw new CustomError('Endereço não encontrado', 404);
    }
    return address;
  }

  async update(id: number, updateAddressDto: UpdateAddressDto, userId: number) {
    const address = await this.findOne(id, userId);
    if (!address) {
      throw new CustomError('Endereço não encontrado', 404);
    }
    return await this.addressRepository.update(id, updateAddressDto);
  }

  async remove(id: number, userId: number) {
    const address = await this.findOne(id, userId);
    if (!address) {
      throw new CustomError('Endereço não encontrado', 404);
    }
    return await this.addressRepository.delete(id);
  }

  async removeAll(userId: number) {
    const address = await this.addressRepository.find({
      where: { client: { user: { id: userId } } },
    });
    return await this.addressRepository.remove(address);
  }
}
