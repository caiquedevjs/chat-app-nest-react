import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { CloudinaryService } from "src/infra/cloudinary.service";


@Injectable()
export class UserChangeProfileImageService {
    constructor(private prismaService: PrismaService, private cloudinaryService: CloudinaryService) {}

    async updateProfileImage(userId: string, file: Express.Multer.File) {
        const user = await this.prismaService.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new NotFoundException("User not found");
        }

        // 💡 Enviar o arquivo para o Cloudinary
        const imageUrl = await this.cloudinaryService.uploadImage(file);

        // 💡 Atualizar o usuário com a URL da imagem
        return this.prismaService.user.update({
            where: { id: userId },
            data: { profileImage: imageUrl },
        });
    }
}
