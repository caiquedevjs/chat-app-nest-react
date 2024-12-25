import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { userFindIdDtos} from "src/user.dtos//user.find.id.dtos"

@Injectable()
export class UserFindIdService {
    constructor(private prisma: PrismaService) {}

    async getUserById(data: userFindIdDtos) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: data.id
            }
        });

        if (!user) {
            throw new UnauthorizedException("User not found");
        }

        return user;
    }
}