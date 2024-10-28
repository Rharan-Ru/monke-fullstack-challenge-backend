import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from '../../infrastructure/controllers/client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from '../../infrastructure/database/entities/client.entity';
import { User } from '../../infrastructure/database/entities/user.entity';
import { AddressService } from '../address/address.service';
import { AddressModule } from '../address/address.module';
import { Address } from '../../infrastructure/database/entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, User, Address]), AddressModule],
  controllers: [ClientController],
  providers: [ClientService, AddressService],
})
export class ClientModule {}
