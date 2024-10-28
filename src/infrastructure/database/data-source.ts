import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './entities/user.entity';
import { Client } from './entities/client.entity';
import { Address } from './entities/address.entity';

dotenvConfig({ path: '.env' });

const config = {
  type: `${process.env.DB_TYPE}`,
  host: `${process.env.DB_HOST}`,
  port: `${process.env.DB_PORT}`,
  username: `${process.env.DB_USERNAME}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_DATABASE}`,
  entities: [User, Client, Address],
  migrations: [__dirname + '/migrations/*.ts'],
  autoLoadEntities: true,
  synchronize: process.env.NODE_ENV === 'test' ? true : false,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
