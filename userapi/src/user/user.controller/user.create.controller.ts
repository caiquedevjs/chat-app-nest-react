import { userCrateDtos } from "src/user.dtos/user.create.dtos";
import { userCreateService } from "../user.service/user.create.service";
import { Post, Controller, Body } from "@nestjs/common";


@Controller('user')
export class userCreateController {
    constructor(private readonly createUserService : userCreateService){}

@Post('create_user')
async create(@Body() data : userCrateDtos){
 return this.createUserService.createUser(data)
}


}
