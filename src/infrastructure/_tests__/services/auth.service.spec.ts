import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../database/entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { CustomError } from '../../../shared/utils/error.custom';
import { AuthService } from '../../auth/auth.service';
import { AuthLoginDTO } from '../../swagger/auth.dto.swagger';

describe('AuthService', () => {
  let service: AuthService;
  let repository: Repository<User>;
  let jwtService: JwtService;

  const mockUser = {
    id: 1,
    email: 'example@gmail.com',
    password: 'hashedpassword',
  };

  const mockLoginDTO: AuthLoginDTO = {
    email: 'example@gmail.com',
    password: 'password123',
  };

  const mockRepository = {
    findOne: jest.fn().mockResolvedValue(mockUser),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('valid_token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('test_secret'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return the user if credentials are valid', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

      const result = await service.validateUser(mockLoginDTO);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { email: mockLoginDTO.email },
      });
      expect(result).toEqual(mockUser);
    });

    it('should throw an error if user is not found', async () => {
      (repository.findOne as jest.Mock).mockResolvedValueOnce(null);

      await expect(service.validateUser(mockLoginDTO)).rejects.toThrow(
        new CustomError('Credencial inválida', 401),
      );
    });

    it('should return null if password is invalid', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

      const result = await service.validateUser(mockLoginDTO);
      expect(result).toBeNull();
    });
  });

  describe('generateToken', () => {
    it('should generate a JWT token', async () => {
      const result = await service.generateToken(mockUser.email, mockUser.id);
      expect(jwtService.sign).toHaveBeenCalledWith(
        {
          email: mockUser.email,
          userId: mockUser.id,
        },
        { expiresIn: '1h', secret: 'test_secret' },
      );
      expect(result).toBe('valid_token');
    });
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const result = await service.login(mockUser);
      expect(jwtService.sign).toHaveBeenCalledWith(
        {
          email: mockUser.email,
          userId: mockUser.id,
        },
        { expiresIn: '1h', secret: 'test_secret' },
      );
      expect(result).toEqual({ access_token: 'valid_token' });
    });
  });
});
