import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schema/user.schema';
import { HasherService } from 'src/hasher/hasher.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  providers: [UserService, HasherService],
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
JwtModule.register({
  global: true,
  signOptions: { expiresIn: '1d' },
  secret: process.env.JWT_SECRET || 'secret',
})],
})
export class UserModule {}
