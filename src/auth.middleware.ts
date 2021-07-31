import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

export interface dataUser extends Request {
   user: {
       id: string,
       iat: number
   }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(private readonly jwtService: JwtService){}

    async use(req: Request, res: Response, next: NextFunction) {
        try{
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]

            const data: dataUser = await this.jwtService.verifyAsync(token)
            req.user = data
            next()
            
        } catch (e) {
            throw new UnauthorizedException()
        }
        
    }

}


