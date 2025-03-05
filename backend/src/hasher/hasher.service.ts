import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class HasherService {
    // This function takes a password as input and returns the hashed password with a salt. Used in sign up to store in the database.
    hashPasswordWithSalting(password: string): string {
        const salt = crypto.randomBytes(16).toString('hex');
        return crypto.createHash('sha256').update(password + salt).digest('hex') + ':' + salt;
      }
      // This function takes a password and a salt as input and returns the hashed password. Used to validate sign in.
      hashPasswordWithStoredSalt(password: string, salt: string): string {
        return crypto.createHash('sha256').update(password + salt).digest('hex');
      }

}
