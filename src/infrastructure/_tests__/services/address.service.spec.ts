import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AddressService } from '../../../application/address/address.service';
import { CreateAddressDto } from '../../../application/address/dto/create-address.dto';
import { Address } from '../../database/entities/address.entity';
import { CustomError } from '../../../shared/utils/error.custom';
import { Repository } from 'typeorm';

describe('AddressService', () => {
  let service: AddressService;
  let repository: Repository<Address>;

  const mockAddress = {
    id: 1,
    street: '1234 Main St',
    number: '123',
    neighborhood: 'Downtown',
    complement: 'Apt 123',
    city: 'Taubate',
    state: 'SP',
    country: 'Brasil',
    latitude: '123456',
    longitude: '654321',
  };

  const mockAddressCreateDTO: CreateAddressDto = {
    street: '1234 Main St',
    weight: 123,
    number: '123',
    neighborhood: 'Downtown',
    complement: 'Apt 123',
    city: 'Taubate',
    state: 'SP',
    country: 'Brasil',
    latitude: '123456',
    longitude: '654321',
  };

  const mockRepository = {
    create: jest.fn().mockReturnValue(mockAddress),
    save: jest.fn().mockResolvedValue(mockAddress),
    find: jest.fn().mockResolvedValue([mockAddress]),
    findAndCount: jest.fn().mockResolvedValue([[mockAddress], 1]),
    findOne: jest.fn().mockResolvedValue(mockAddress),
    update: jest.fn().mockResolvedValue({ affected: 1 }),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
    preload: jest.fn().mockResolvedValue(mockAddress),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: getRepositoryToken(Address),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    repository = module.get<Repository<Address>>(getRepositoryToken(Address));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new address', async () => {
      const result = await service.create(mockAddressCreateDTO, 1, 1);
      expect(repository.create).toHaveBeenCalledWith({
        ...mockAddressCreateDTO,
        client: { id: 1, user: { id: 1 } },
      });
      expect(repository.save).toHaveBeenCalledWith(mockAddress);
      expect(result).toEqual(mockAddress);
    });
  });

  describe('findAll', () => {
    it('should return an array of addresss', async () => {
      const result = await service.findAll(1, 1);
      expect(repository.findAndCount).toHaveBeenCalledWith({
        where: { client: { user: { id: 1 } } },
        order: {
          id: 'DESC',
        },
        relations: ['client'],
        skip: 0,
        take: 10,
      });
      expect(result.address).toEqual([mockAddress]);
    });
  });

  describe('findOne', () => {
    it('should return a single address', async () => {
      const result = await service.findOne(1, 1);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1, client: { user: { id: 1 } } },
      });
      expect(result).toEqual(mockAddress);
    });

    it('should throw an error if address is not found', async () => {
      (repository.findOne as jest.Mock).mockResolvedValueOnce(null);
      await expect(service.findOne(1, 1)).rejects.toThrow(CustomError);
    });
  });

  describe('update', () => {
    it('should update a address', async () => {
      const result = await service.update(1, mockAddressCreateDTO, 1);
      expect(repository.update).toHaveBeenCalledWith(1, mockAddressCreateDTO);
      expect(result).toEqual({ affected: 1 });
    });
  });

  describe('remove', () => {
    it('should delete a address', async () => {
      const result = await service.remove(1, 1);
      expect(repository.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ affected: 1 });
    });

    it('should throw an error if address is not found during removal', async () => {
      (repository.findOne as jest.Mock).mockResolvedValueOnce(null);
      await expect(service.remove(1, 1)).rejects.toThrow(CustomError);
    });
  });
});
