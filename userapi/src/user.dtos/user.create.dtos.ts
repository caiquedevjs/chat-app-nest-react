import { IsEmail,  IsOptional, IsString,  } from "class-validator"


export class userCrateDtos {
    @IsOptional()
    @IsString()
    id? : string

    @IsString()
    name : string

    @IsEmail()
    mail : string

    @IsString()
    password : string

    @IsString()
    age : string

    @IsOptional()
    @IsString()
    bio? : string

    @IsString()
    nickname : string

}