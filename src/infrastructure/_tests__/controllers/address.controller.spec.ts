import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Address } from '../../database/entities/address.entity';
import { Client } from '../../database/entities/client.entity';
import { CreateAddressDto } from '../../../application/address/dto/create-address.dto';
import { AppModule } from '../../../app.module';
import { HttpExceptionFilter } from '../../../shared/filters/http-exception.filter';
import { User } from '../../database/entities/user.entity';

describe('Address (e2e)', () => {
  let app: INestApplication;
  let addressRepository: Repository<Address>;
  let clientRepository: Repository<Client>;
  let userRepository: Repository<User>;
  let token: string;
  let client: Client;

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

    addressRepository =
      moduleFixture.get<Repository<Address>>('AddressRepository');

    userRepository = moduleFixture.get<Repository<User>>('UserRepository');

    clientRepository =
      moduleFixture.get<Repository<Client>>('ClientRepository');
  });

  afterAll(async () => {
    await addressRepository.query('DELETE FROM address;');
    await clientRepository.query('DELETE FROM client;');
    await userRepository.query('DELETE FROM user;');
    await app.close();
  });

  describe('/POST user', () => {
    it('should create a new user', async () => {
      const newUser = {
        email: 'test_address@gmail.com',
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

      client = await clientRepository.save({
        name: 'Test Client1',
        user: { id: createdUser.id },
      });

      expect(createdUser).toBeDefined();
      expect(createdUser.email).toEqual(newUser.email);
    });
  });

  describe('/POST address', () => {
    it('should create a new address', async () => {
      const address: CreateAddressDto = {
        city: 'City',
        complement: 'Complement',
        country: 'Country',
        latitude: '1234',
        longitude: '5679',
        neighborhood: 'Neighborhood',
        number: '123',
        state: 'State',
        street: 'Street',
      };

      const response = await request(app.getHttpServer())
        .post(`/address/${client.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(address)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.city).toEqual(address.city);

      const createdAddress = await addressRepository.findOne({
        where: { id: response.body.id },
      });
      expect(createdAddress).toBeDefined();
      expect(createdAddress.city).toEqual(address.city);
    });
  });

  describe('/GET address', () => {
    it('should list all address', async () => {
      const response = await request(app.getHttpServer())
        .get('/address')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBeTruthy();
    });

    it('should return a specific address by ID', async () => {
      const address: CreateAddressDto = {
        city: 'City',
        complement: 'Complement',
        country: 'Country',
        latitude: '1234',
        longitude: '5679',
        neighborhood: 'Neighborhood',
        number: '123',
        state: 'State',
        street: 'Street',
      };

      const createdAddressResponse = await request(app.getHttpServer())
        .post(`/address/${client.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(address)
        .expect(201);

      const addressData = createdAddressResponse.body;

      const response = await request(app.getHttpServer())
        .get(`/address/${addressData.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.id).toEqual(addressData.id);
      expect(response.body.city).toEqual(addressData.city);
    });
  });

  describe('/PATCH address/:id', () => {
    it('should update the data of a address', async () => {
      const address: CreateAddressDto = {
        city: 'City',
        complement: 'Complement',
        country: 'Country',
        latitude: '1234',
        longitude: '5679',
        neighborhood: 'Neighborhood',
        number: '123',
        state: 'State',
        street: 'Street',
      };

      const createdAddressResponse = await request(app.getHttpServer())
        .post(`/address/${client.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(address)
        .expect(201);

      const addressData = createdAddressResponse.body;
      const updatedAddress = {
        city: 'New City',
      };

      await request(app.getHttpServer())
        .patch(`/address/${addressData.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedAddress)
        .expect(200);

      const updatedInDb = await addressRepository.findOne({
        where: { id: addressData.id },
      });
      expect(updatedInDb.city).toEqual(updatedAddress.city);
    });
  });

  describe('/DELETE address/:id', () => {
    it('should delete an existing address', async () => {
      const address: CreateAddressDto = {
        city: 'City',
        complement: 'Complement',
        country: 'Country',
        latitude: '1234',
        longitude: '5679',
        neighborhood: 'Neighborhood',
        number: '123',
        state: 'State',
        street: 'Street',
      };

      const createdAddressResponse = await request(app.getHttpServer())
        .post(`/address/${client.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(address)
        .expect(201);

      const addressData = createdAddressResponse.body;

      await request(app.getHttpServer())
        .delete(`/address/${addressData.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const deletedAddress = await addressRepository.findOne({
        where: { id: addressData.id },
      });

      expect(deletedAddress).toBeNull();
    });
  });
});
