import { IsEmail, IsNumber, IsOptional, IsString,  } from "class-validator"


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

    @IsNumber()
    Age : number

    @IsString()
    bio : string
    

}