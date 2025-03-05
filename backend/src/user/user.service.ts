import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { privateDecrypt } from 'crypto';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { HasherService } from 'src/hasher/hasher.service';
import { User } from 'src/schema/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel : Model<User>, private hasherService : HasherService) {}
    async create(user: CreateUserDto): Promise<User> {
        const newUser = new this.userModel(user);
        // Hash the password before saving it to the database
        const hashedPasswordWithSalt = this.hasherService.hashPasswordWithSalting(user.password).split(':');
        newUser.password = hashedPasswordWithSalt[0];
        newUser.salt = hashedPasswordWithSalt[1];
        return newUser.save();

    }

    async isEmailTaken(email: string): Promise<boolean> {
        const user : User | null = await this.userModel.findOne({ email: email }).exec();
        if (user) {
            return true;
        }
        return false;
    }

    async isCredentialsCorrect(email: string, password: string): Promise<boolean> {
        const user : User | null = await this.userModel.findOne({ email: email }).exec();
        if (!user) {
            return false;
        }
        const hashedPasswordWithSalt = this.hasherService.hashPasswordWithStoredSalt(password, user.salt);
        if (user.password === hashedPasswordWithSalt) {
            return true;
        }
        return false;
    }
    
}
