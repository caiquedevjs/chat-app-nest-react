import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";
import { userCreateController } from '../user.controller/user.create.controller';
import { userCreateService } from '../user.service/user.create.service';
import { PrismaService } from '../user.service/prisma.service';
import { loginUserService } from '../user.service/user.login.service';
import { userLoginController } from '../user.controller/user.login.crontroller';



@Module({
  imports: [
    JwtModule.register({
        secret: 'your_secret_key',
        signOptions: { expiresIn: '1h' },
    }),
],
  controllers: [userCreateController,userLoginController],
  providers: [userCreateService, PrismaService,loginUserService],
})
export class userModule {}