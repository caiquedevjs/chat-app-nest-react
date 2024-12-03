import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { loginUserDtos } from "src/user.dtos/user.login.dtos";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class loginUserService {
    constructor(private prismaService: PrismaService, private jwtService: JwtService) {}

    async userLogin(data: loginUserDtos) {
        const user = await this.prismaService.user.findFirst({
            where: {
                mail: data.Mail,
                password: data.password,
            },
        });

        if (!user) {
            throw new UnauthorizedException("Invalid credentials");
        }

        // Gerar JWT
        const payload = { mail: user.mail, sub: user.id };
        const token = this.jwtService.sign(payload);

        return { accessToken: token };
    }
}
