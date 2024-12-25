import { Controller, Get, Param } from '@nestjs/common';
import { UserFindIdService } from '../user.service/user.find.id.service';


@Controller('user_id')
export class UserControllerFindId {
  constructor(private readonly userFindIdService : UserFindIdService) {}

@Get(':id')
async getUser(@Param('id') id: string) {
const userFindIdDto = { id };
const user = await this.userFindIdService.getUserById(userFindIdDto);
    if (!user) {
      throw new Error('User not found.');
    }
    return user;
  }
}