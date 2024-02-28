import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto/EditUserdto';

@Injectable()
export class UserService {
    constructor(private prisma:PrismaService){}
    updateUser(userId:number, dto:EditUserDto){
        console.log("user id = ",userId);
        console.log("DTO = ",dto)
    }
}
