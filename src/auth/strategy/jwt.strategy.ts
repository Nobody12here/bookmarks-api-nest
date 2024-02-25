import { Injectable } from "@nestjs/common";
import { ConfigService, getConfigToken } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt"
import { PrismaService } from "../../prisma/prisma.service";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private config:ConfigService,private prisma:PrismaService){
        super({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            
            secretOrKey: config.get('JWT_SECRCET'),
        })
    }
    async validate(payload:{email:string,sub:number}){
        const user = await this.prisma.user.findUnique({
            where:{
                id:payload.sub
            }
        })
        delete user.hash;
        return user
    }
}