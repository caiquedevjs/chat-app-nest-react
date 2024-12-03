import { IsEmail, IsString } from "class-validator";

export class loginUserDtos {
    @IsEmail()
    Mail : string

    @IsString()
    password : string
}