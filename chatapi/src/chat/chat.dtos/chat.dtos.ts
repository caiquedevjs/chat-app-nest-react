import { IsString, IsDate } from "class-validator";
// oque vou querer no banco de dados do caht api//
// Nome do usuario//    
// Id do usuario//
// Mensagem//
// Data da mensagem//

export class chatCreateDtos {
    @IsString()
    id : string

    @IsString()
    name : string
    
    @IsString()
    id_user : string

    @IsString()
    message : string

    @IsDate()
    date : Date
}