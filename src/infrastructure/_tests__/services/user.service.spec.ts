import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../../../application/user/user.service';
import { CreateUserDto } from '../../../application/user/dto/create-user.dto';
import { User } from '../../database/entities/user.entity';
import { CustomError } from '../../../shared/utils/error.custom';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  const mockUser = {
    id: 1,
    email: 'example@gmail.com',
    password: 'password123',
  };

  const mockUserCreateDTO: CreateUserDto = {
    email: 'example@gmail.com',
    password: 'password123',
  };

  const mockRepository = {
    create: jest.fn().mockReturnValue(mockUser),
    save: jest.fn().mockResolvedValue(mockUser),
    find: jest.fn().mockResolvedValue([mockUser]),
    findOne: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn().mockResolvedValue({ affected: 1 }),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      (repository.findOne as jest.Mock).mockResolvedValueOnce(null);
      const result = await service.create(mockUserCreateDTO);
      expect(repository.create).toHaveBeenCalledWith(mockUserCreateDTO);
      expect(repository.save).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await service.findAll();
      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual([mockUser]);
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const result = await service.findOne(1);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockUser);
    });

    it('should throw an error if user is not found', async () => {
      (repository.findOne as jest.Mock).mockResolvedValueOnce(null);
      await expect(service.findOne(1)).rejects.toThrow(CustomError);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const result = await service.update(1, mockUserCreateDTO);
      expect(repository.update).toHaveBeenCalledWith(1, mockUserCreateDTO);
      expect(result).toEqual({ affected: 1 });
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const result = await service.remove(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ affected: 1 });
    });

    it('should throw an error if user is not found during removal', async () => {
      (repository.findOne as jest.Mock).mockResolvedValueOnce(null);
      await expect(service.remove(1)).rejects.toThrow(CustomError);
    });
  });
});
