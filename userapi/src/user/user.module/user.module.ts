import { Module } from '@nestjs/common';
import { userController } from '../user.controller/user.controller';
import { userCreateService } from '../user.service/user.create.service';
import { PrismaService } from '../user.service/prisma.service';



@Module({
  controllers: [userController],
  providers: [userCreateService, PrismaService],
})
export class userModule {}