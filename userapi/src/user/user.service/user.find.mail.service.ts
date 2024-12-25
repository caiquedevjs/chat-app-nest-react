import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { userFindMailDtos} from "src/user.dtos/user.find.mail.dtos"

@Injectable()
export class UserFindMailService {
    constructor(private prisma: PrismaService) {}

    async getUserByMail(data: userFindMailDtos) {
        const user = await this.prisma.user.findFirst({
            where: {
                mail: data.mail
            }
        });

        if (!user) {
            throw new UnauthorizedException("User not found");
        }

        return user;
    }
}