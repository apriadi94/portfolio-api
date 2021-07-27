import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(private readonly jwtService: JwtService){}

    async use(req: any, res: any, next: () => void) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if(token){
            const data = await this.jwtService.verifyAsync(token)
            if(!data) throw new UnauthorizedException()

            next()
        }else{
            throw new UnauthorizedException()
        }
    }

}


