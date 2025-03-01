import { Controller, Patch, Param, Body, UseInterceptors, NestInterceptor, UploadedFile } from "@nestjs/common";
import { UserChangeProfileImageService } from '../user.service/user.change.profileimg.service';
import { Express } from 'express';
import { FileInterceptor } from "@nestjs/platform-express/multer";

@Controller("user")
export class UserProfileController {
    constructor(private userChangeProfileImageService: UserChangeProfileImageService) {}

    @Patch(":id/profile-image")
    @UseInterceptors(FileInterceptor("profileImage")) // 💡 Nome precisa ser o mesmo do frontend, no arquivo useUpdateProfileImage.js , 
    async updateProfileImage(
      @Param("id") userId: string,
      @UploadedFile() file: Express.Multer.File
    ) {
      console.log("Arquivo recebido no backend:", file); // 💡 Verifique se file não está undefined
    
      if (!file) {
        throw new Error("Nenhum arquivo foi enviado!");
      }
    
      return this.userChangeProfileImageService.updateProfileImage(userId, file);
    }
}
