import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigServiceSQL implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      name: 'sqlserver',
      type: 'mssql',
      host: this.configService.get<string>('SQLSERVER_HOST'),
      port: Number(this.configService.get<string>('SQLSERVER_PORT')),
      username: this.configService.get<string>('SQLSERVER_USER'),
      password: this.configService.get<string>('SQLSERVER_PASSWORD'),
      database: this.configService.get<string>('SQLSERVER_DB'),
      autoLoadEntities: true,
      synchronize: false,
      logging: true,
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    };
  }
}
