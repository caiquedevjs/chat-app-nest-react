import { loginUserDtos } from "src/user.dtos/user.login.dtos";
import { loginUserService } from "../user.service/user.login.service";
import { Post, Body, Controller } from "@nestjs/common";

@Controller('user_login')
export class userLoginController {
    constructor(private readonly userLoginService: loginUserService) {}

    @Post('login')
    async login(@Body() data: loginUserDtos) {
        return this.userLoginService.userLogin(data);
    }
}
