import { IsString } from "class-validator";

export class userFindIdDtos {
    
    @IsString()
    id : string
}