import { IsString } from "class-validator";

export class userFindMailDtos {
    @IsString()
    mail : string
}