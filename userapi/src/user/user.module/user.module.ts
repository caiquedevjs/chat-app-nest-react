import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";
import { userCreateController } from '../user.controller/user.create.controller';
import { userCreateService } from '../user.service/user.create.service';
import { PrismaService } from '../user.service/prisma.service';
import { loginUserService } from '../user.service/user.login.service';
import { userLoginController } from '../user.controller/user.login.crontroller';
import { UserControllerFindId } from '../user.controller/user.find.id.controller';
import { UserFindIdService } from '../user.service/user.find.id.service';
import { UserControllerFindMail } from '../user.controller/user.find.mail.controller';
import { UserFindMailService } from '../user.service/user.find.mail.service';
import { UserChangeProfileImageService } from '../user.service/user.change.profileimg.service';
import { UserProfileController } from '../user.controller/user.profile.controller';
import { CloudinaryService } from 'src/infra/cloudinary.service';



@Module({
  imports: [
    JwtModule.register({
        secret: 'your_secret_key',
        signOptions: { expiresIn: '1h' },
    }),
],
  controllers: [userCreateController,userLoginController, UserControllerFindId, UserControllerFindMail, UserProfileController],
  providers: [userCreateService, PrismaService,loginUserService, UserFindIdService, UserFindMailService, UserChangeProfileImageService, CloudinaryService],
})
export class userModule {}