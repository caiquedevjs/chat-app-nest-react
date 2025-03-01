import { IsString } from "class-validator";

export class UserProfileImageDto {
    @IsString()
    profileImage: string;
}
