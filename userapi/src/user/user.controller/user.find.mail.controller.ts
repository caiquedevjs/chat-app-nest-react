import { Controller, Get, Param } from '@nestjs/common';
import { UserFindMailService } from '../user.service/user.find.mail.service';

@Controller('user_mail')
export class UserControllerFindMail {
  constructor(private readonly userFindMailService : UserFindMailService) {}

@Get(':mail')
async getUser(@Param('mail') mail: string) {
const userFindMailDto = { mail };
const user = await this.userFindMailService.getUserByMail(userFindMailDto);
    if (!user) {
      throw new Error('User not found.');
    }
    return user;
  }
}