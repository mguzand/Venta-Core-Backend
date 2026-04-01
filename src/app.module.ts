import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigServicePG } from './config/database/postgres.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigServiceSQL } from './config/database/sqlserver.config';
import { PostgresModule } from './modules/postgres/postgres.module';
import { sqlModule } from './modules/sql/sql.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './common/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    PostgresModule,
    sqlModule,

    TypeOrmModule.forRootAsync({
      name: 'postgres',
      useClass: TypeOrmConfigServicePG,
    }),

    TypeOrmModule.forRootAsync({
      name: 'sqlserver',
      useClass: TypeOrmConfigServiceSQL,
    }),
    CommonModule,
    AuthModule,
  ],
  providers: [AppService],
})
export class AppModule {}
