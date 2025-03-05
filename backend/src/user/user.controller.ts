import { Body, Controller, Post, Get, UnauthorizedException, UseGuards, ValidationPipe, Request, BadRequestException, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { SigninUserDto } from 'src/dto/signin-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
    constructor(private userService: UserService, private jwtService : JwtService) {}

    @Post('create')
    async create(@Body(ValidationPipe) user: CreateUserDto): Promise<any> {
        const isEmailTaken = await this.userService.isEmailTaken(user.email);
        if(isEmailTaken){
            throw new BadRequestException('Email is already taken');
        }
        return this.userService.create(user);
    }

    @Post('signin')
    @HttpCode(200)
    async signIn(@Body(ValidationPipe) user: SigninUserDto): Promise<any> {
        const isCredentialsCorrect = await this.userService.isCredentialsCorrect(user.email, user.password);
        if (isCredentialsCorrect) {
            const tokenPayload = {email: user.email};
            const accessToken = await this.jwtService.signAsync(tokenPayload);
            return {accessToken: accessToken, email: user.email};
        }
        else{
            throw new UnauthorizedException();
        }
    }
    @UseGuards(AuthGuard)
    @Get('signedinUser')
    getSignedInUser(@Request() request): Promise<any> {
        return request.user;
    }




}
