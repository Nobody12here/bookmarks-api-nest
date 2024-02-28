import { IsOptional, IsString, IsUrl, isString } from "class-validator";


export class CreateBookmarkDto{
    @IsString()
    title:string

    @IsString()
    @IsOptional()
    description?:string

    @IsUrl()
    link:string
}