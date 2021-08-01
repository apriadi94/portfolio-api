import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async userData(){
        const userData = await this.userService.getUser(process.env.PROFILE_USERNAME.toLowerCase())
        return userData
    }

}
