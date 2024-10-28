import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from '../../infrastructure/controllers/address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from '../../infrastructure/database/entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
