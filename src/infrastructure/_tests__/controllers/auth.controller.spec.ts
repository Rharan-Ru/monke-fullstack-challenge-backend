import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../database/entities/user.entity';
import { HttpExceptionFilter } from '../../../shared/filters/http-exception.filter';
import { AuthLoginDTO } from '../../swagger/auth.dto.swagger';
import { AuthModule } from '../../auth/auth.module';
import { DatabaseModule } from '../../database/database.module';
import { UserModule } from '../../../application/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from '../../database/data-source';

describe('Auth (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        ConfigModule.forRoot({
          isGlobal: true,
          load: [typeorm],
        }),
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) =>
            configService.get('typeorm'),
        }),
        UserModule,
        AuthModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());

    await app.init();

    userRepository = moduleFixture.get<Repository<User>>('UserRepository');

    await userRepository.delete({ email: 'testuser@example.com' });

    const createdUser = userRepository.create({
      email: 'testuser@example.com',
      password: 'hashedpassword',
    });

    await userRepository.save(createdUser);
  });

  afterAll(async () => {
    await userRepository.query('DELETE FROM user;');
    await app.close();
  });

  describe('/POST auth/login', () => {
    it('should login with valid credentials', async () => {
      const validLoginDto: AuthLoginDTO = {
        email: 'testuser@example.com',
        password: 'hashedpassword',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(validLoginDto)
        .expect(201);

      expect(response.body).toHaveProperty('access_token');
      token = response.body.access_token;

      expect(token).toBeDefined();
    });

    it('should return 401 with invalid credentials', async () => {
      const invalidLoginDto: AuthLoginDTO = {
        email: 'testuser@example.com',
        password: 'invalidpassword',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(invalidLoginDto)
        .expect(401);

      expect(response.body.message).toBe('Credencial inválida');
    });
  });
});
