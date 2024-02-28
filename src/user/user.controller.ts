import { Controller,Get, UseGuards,Req, Patch, Body } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { UserService } from './user.service';
import { EditUserDto } from './dto/EditUserdto';
@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
    constructor(private userService:UserService){}
    @Get()
    
    getMe(@GetUser() user:User){
        
        return user
    }

    @Patch()
    updateUser(@GetUser('id') id:number,@Body() dto:EditUserDto){
        return this.userService.updateUser(id,dto);
    }
}
