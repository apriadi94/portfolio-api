import { BadRequestException, Body, Controller, Get, Post, Req } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}

    @Get('list')
    async getUser(@Req() req: Request){
        return req.user
    }

    @Post('login')
    async login(@Body() user: {
        username: string,
        password: string
    }){
        const userResult = await this.userService.getUser(user.username)

        if(!userResult || !await bcrypt.compare(user.password, userResult.password)){
            throw new BadRequestException('Invalid Cradential')
        }

        const jwt = await this.jwtService.signAsync({ id: userResult.id })
        
        return jwt
    }

    @Post('register')
    async newUser(@Body() user: User){
        user.password = await bcrypt.hash(user.password, 12);
        return this.userService.create(user);
    }
}
