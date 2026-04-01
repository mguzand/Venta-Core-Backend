import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigServicePG implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      name: 'postgres',
      type: 'postgres',
      host: this.configService.get<string>('POSTGRES_HOST'),
      port: Number(this.configService.get<string>('POSTGRES_PORT')),
      username: this.configService.get<string>('POSTGRES_USER'),
      password: this.configService.get<string>('POSTGRES_PASSWORD'),
      database: this.configService.get<string>('POSTGRES_DB'),
      schema: 'public',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    };
  }
}
