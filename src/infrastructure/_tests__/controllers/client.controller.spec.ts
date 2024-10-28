import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Client } from '../../database/entities/client.entity';
import { CreateClientDto } from '../../../application/client/dto/create-client.dto';
import { AppModule } from '../../../app.module';
import { HttpExceptionFilter } from '../../../shared/filters/http-exception.filter';
import { User } from '../../database/entities/user.entity';

describe('Client (e2e)', () => {
  let app: INestApplication;
  let clientRepository: Repository<Client>;
  let userRepository: Repository<User>;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
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

    clientRepository =
      moduleFixture.get<Repository<Client>>('ClientRepository');

    userRepository = moduleFixture.get<Repository<User>>('UserRepository');
  });

  afterAll(async () => {
    await clientRepository.query('DELETE FROM client;');
    await userRepository.query('DELETE FROM user;');
    await app.close();
  });

  describe('/POST user', () => {
    it('should create a new user', async () => {
      const newUser = {
        email: 'test_client@gmail.com',
        password: 'challenger',
      };

      const response = await request(app.getHttpServer())
        .post('/user')
        .send(newUser)
        .expect(201);

      expect(response.body).toHaveProperty('token');

      token = response.body.token;

      const createdUser = await userRepository.findOne({
        where: { email: newUser.email },
      });

      expect(createdUser).toBeDefined();
      expect(createdUser.email).toEqual(newUser.email);
    });
  });

  describe('/POST client', () => {
    it('should create a new client', async () => {
      const client: CreateClientDto = {
        name: 'Test Client1',
      };

      const response = await request(app.getHttpServer())
        .post(`/clients`)
        .set('Authorization', `Bearer ${token}`)
        .send(client)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toEqual(client.name);

      const createdClient = await clientRepository.findOne({
        where: { id: response.body.id },
      });
      expect(createdClient).toBeDefined();
      expect(createdClient.name).toEqual(client.name);
    });
  });

  describe('/GET client', () => {
    it('should list all client', async () => {
      const response = await request(app.getHttpServer())
        .get('/clients')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBeTruthy();
    });

    it('should return a specific client by ID', async () => {
      const client: CreateClientDto = {
        name: 'Test Client2',
      };

      const createdClientResponse = await request(app.getHttpServer())
        .post(`/clients`)
        .set('Authorization', `Bearer ${token}`)
        .send(client)
        .expect(201);

      const clientData = createdClientResponse.body;

      const response = await request(app.getHttpServer())
        .get(`/clients/${clientData.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.id).toEqual(clientData.id);
      expect(response.body.name).toEqual(clientData.name);
    });
  });

  describe('/PATCH client/:id', () => {
    it('should update the data of a client', async () => {
      const client: CreateClientDto = {
        name: 'Test Client3',
      };

      const createdClientResponse = await request(app.getHttpServer())
        .post(`/clients`)
        .set('Authorization', `Bearer ${token}`)
        .send(client)
        .expect(201);

      const clientData = createdClientResponse.body;
      const updatedClient = {
        name: 'New Name',
      };

      await request(app.getHttpServer())
        .patch(`/clients/${clientData.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedClient)
        .expect(200);

      const updatedInDb = await clientRepository.findOne({
        where: { id: clientData.id },
      });
      expect(updatedInDb.name).toEqual(updatedClient.name);
    });
  });

  describe('/DELETE client/:id', () => {
    it('should delete an existing client', async () => {
      const client: CreateClientDto = {
        name: 'Test Client4',
      };

      const createdClientResponse = await request(app.getHttpServer())
        .post(`/clients`)
        .set('Authorization', `Bearer ${token}`)
        .send(client)
        .expect(201);

      const clientData = createdClientResponse.body;

      await request(app.getHttpServer())
        .delete(`/clients/${clientData.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const deletedClient = await clientRepository.findOne({
        where: { id: clientData.id },
      });

      expect(deletedClient).toBeNull();
    });
  });
});
