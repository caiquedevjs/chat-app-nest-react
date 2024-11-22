import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { userCrateDtos } from "src/user.dtos/user.create.dtos";
import { error } from "console";

@Injectable()
export  class userCreateService {
    constructor( private  prismaService : PrismaService){}

    async createUser(data : userCrateDtos){
       const user = await this.prismaService.user.findFirst(
        {where:
            {
                mail : data.mail
            }
        }
       )
       if(user){
        throw error('already registered user.')
       }
       try{
        const user = await this.prismaService.user.create({
            data: {
            
                name: data.name,
                mail: data.mail,
                password: data.password,
                Age: data.Age,
                bio: data.bio,
            },
        });
       }
       catch(error){
        throw new Error(error);
        
       }
    }
    
}