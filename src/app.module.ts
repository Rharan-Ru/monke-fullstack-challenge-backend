// nestJs module
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
// nestJs controllers/services
import { AppController } from './app.controller';
import { AppService } from './app.service';
// nestJs application modules
import { ClientModule } from './application/client/client.module';
import { UserModule } from './application/user/user.module';
import { AuthModule } from './infrastructure/auth/auth.module';
import { JwtAuthGuard } from './infrastructure/auth/jwt-auth.guard';
import { DatabaseModule } from './infrastructure/database/database.module';
import typeorm from './infrastructure/database/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from './application/address/address.module';

@Module({
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
    ClientModule,
    UserModule,
    AuthModule,
    AddressModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
