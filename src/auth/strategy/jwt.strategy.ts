import { Injectable } from "@nestjs/common";
import { ConfigService, getConfigToken } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt"
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private config:ConfigService){
        super({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            
            secretOrKey: config.get('JWT_SECRCET'),
        })
    }
    validate(payload:any){
        console.log(payload)
 
    }
}