import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ClientService } from '../../../application/client/client.service';
import { CreateClientDto } from '../../../application/client/dto/create-client.dto';
import { Client } from '../../database/entities/client.entity';
import { CustomError } from '../../../shared/utils/error.custom';
import { Repository } from 'typeorm';

describe('ClientService', () => {
  let service: ClientService;
  let repository: Repository<Client>;

  const mockClient = {
    id: 1,
    name: 'John Doe',
    user: { id: 1 },
  };

  const mockClientCreateDTO: CreateClientDto = {
    name: 'John Doe',
  };

  const mockRepository = {
    create: jest.fn().mockReturnValue(mockClient),
    save: jest.fn().mockResolvedValue(mockClient),
    find: jest.fn().mockResolvedValue([mockClient]),
    findOne: jest.fn().mockResolvedValue(mockClient),
    update: jest.fn().mockResolvedValue({ affected: 1 }),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
    preload: jest.fn().mockResolvedValue(mockClient),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: getRepositoryToken(Client),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
    repository = module.get<Repository<Client>>(getRepositoryToken(Client));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new client', async () => {
      (repository.findOne as jest.Mock).mockResolvedValueOnce(null);
      const result = await service.create(mockClientCreateDTO, 1);
      expect(repository.create).toHaveBeenCalledWith({
        ...mockClientCreateDTO,
        user: { id: 1 },
      });
      expect(repository.save).toHaveBeenCalledWith(mockClient);
      expect(result).toEqual(mockClient);
    });
  });

  describe('findAll', () => {
    it('should return an array of clients', async () => {
      const result = await service.findAll(1);
      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual([mockClient]);
    });
  });

  describe('findOne', () => {
    it('should return a single client', async () => {
      const result = await service.findOne(1, 1);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1, user: { id: 1 } },
      });
      expect(result).toEqual(mockClient);
    });

    it('should throw an error if client is not found', async () => {
      (repository.findOne as jest.Mock).mockResolvedValueOnce(null);
      await expect(service.findOne(1, 1)).rejects.toThrow(CustomError);
    });
  });

  describe('update', () => {
    it('should update a client', async () => {
      const result = await service.update(1, mockClientCreateDTO, 1);
      expect(repository.update).toHaveBeenCalledWith(1, {
        ...mockClientCreateDTO,
        user: { id: 1 },
      });
      expect(result).toEqual({ affected: 1 });
    });
  });

  describe('remove', () => {
    it('should delete a client', async () => {
      const result = await service.remove(1, 1);
      expect(repository.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ affected: 1 });
    });

    it('should throw an error if client is not found during removal', async () => {
      (repository.findOne as jest.Mock).mockResolvedValueOnce(null);
      await expect(service.remove(1, 1)).rejects.toThrow(CustomError);
    });
  });
});
