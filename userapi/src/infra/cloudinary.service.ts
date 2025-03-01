import { Injectable } from "@nestjs/common";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: "dnyv12zwd",
    api_key: "486325716315252",
    api_secret: "ALaDcgktKz3oGj45YAAHl5Wdq3Y",
});

@Injectable()
export class CloudinaryService {
    uploader: any;
    async uploadImage(file: Express.Multer.File): Promise<string> {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream((error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);  //💡 Retorna a URL da imagem
            }).end(file.buffer);  // 💡 Envia o arquivo para o Cloudinary
        });
    }
}
