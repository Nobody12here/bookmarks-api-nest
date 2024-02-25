import { Controller,Get, UseGuards,Req } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';

@Controller('user')
export class UserController {
    @Get()
    @UseGuards(JwtGuard)
    getMe(@GetUser() user:User){
        return user
    }
}
