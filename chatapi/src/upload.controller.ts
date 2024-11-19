import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import axios from 'axios';
import { Express } from 'express'; // Importando a definição de Express

@Controller('upload')
export class UploadController {
  private readonly imgurClientId = 'Seu-Client-ID';  // Substitua pelo seu Client-ID do Imgur

  @Post('profile')
  @UseInterceptors(FileInterceptor('image')) // Não precisamos de diskStorage aqui
  async uploadProfile(@UploadedFile() file: Express.Multer.File) {
    try {
      // Crie um Blob a partir do Buffer da imagem
      const imageBlob = new Blob([file.buffer], { type: file.mimetype });

      // Crie uma instância de FormData para enviar a imagem
      const formData = new FormData();
      formData.append('image', imageBlob, file.originalname); // Usando o Blob aqui

      // Envie a imagem para o Imgur
      const response = await axios.post('https://api.imgur.com/3/upload', formData, {
        headers: {
          'Authorization': `Client-ID ${this.imgurClientId}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      // Retorne a URL pública da imagem no Imgur
      return { url: response.data.data.link };

    } catch (error) {
      console.error('Erro ao fazer o upload para o Imgur', error);
      throw new Error('Erro ao fazer o upload da imagem.');
    }
  }
}
