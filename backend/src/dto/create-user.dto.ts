import { IsEmail, IsString, Length, Matches, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @Length(3)
    name: string;
    @IsEmail()
    email: string;
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(/[A-Za-z]/, { message: 'Password must contain at least one letter' })
    @Matches(/\d/, { message: 'Password must contain at least one number' })
    @Matches(/[@$!%*#?&]/, { message: 'Password must contain at least one special character' })
    password: string;
}