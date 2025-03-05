import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HasherService } from './hasher/hasher.service';

@Module({
  imports: [UserModule, MongooseModule.forRoot('mongodb://localhost/app')],
  controllers: [AppController],
  providers: [AppService, HasherService],
})
export class AppModule {}
