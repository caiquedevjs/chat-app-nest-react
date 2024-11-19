import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { useNotification } from '../contexts/NotificationContext.tsx';
import '../styles/chat.style.css';

const socket = io('http://localhost:3333');

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [nickname, setNickname] = useState('');
    const [image, setImage] = useState('');
    const { notify } = useNotification();

    const location = useLocation();
    const nicknameFromHome = location.state?.nickname;
    const imageFromHome = location.state?.image; // Imagem passada do estado

    useEffect(() => {
        if (nicknameFromHome) {
            setNickname(nicknameFromHome);
            setImage(imageFromHome); // Salvar a imagem localmente
            socket.emit('setNickname', { nickname: nicknameFromHome, image: imageFromHome }); // Enviar nickname e imagem
        }

        socket.on('connect', () => {
            console.log('Conectado ao WebSocket');
        });

        socket.on('connect_error', (error) => {
            console.error('Erro de conexão:', error);
        });

        // Receber mensagens e imagens
        socket.on('msgToClient', ({ msg, senderNickname, senderImage }) => {
            setMessages((prev) => [
                ...prev,
                { nickname: senderNickname, text: msg, image: senderImage }
            ]);
            notify(`${senderNickname} enviou uma mensagem.`);
        });

        return () => {
            socket.off('connect');
            socket.off('connect_error');
            socket.off('msgToClient');
        };
    }, [nicknameFromHome, imageFromHome]);

    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Captura o primeiro arquivo
        if (file) {
            setImage(file);  // Armazena o arquivo de imagem
        }
    };
    
    const sendMessage = async () => {
        if (message && image) {
            let base64Image = image;
            
            if (image instanceof File) {
                base64Image = await convertImageToBase64(image); // Converte imagem para base64
            }
    
            socket.emit('msgToServer', { msg: message, image: base64Image });
            setMessage('');
        }
    };
    
    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file); // Lê a imagem como base64
        });
    };
    return (
        <div className='chat-container'>
            <div className='chat-box-container'>
                <div>
                    {messages.map((msg, index) => (
                        <div key={index} className='message'>
                            <img
                                src={msg.image}
                                alt="User Avatar"
                                className='user-image'
                            />
                            <span>
                                <strong>{msg.nickname}:</strong> {msg.text}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className='inputs-and-btn-container'>
                <TextField
                    fullWidth
                    label="📭 Message"
                    id="fullWidth"
                    variant="filled"
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' ? sendMessage() : null}
                    placeholder="Digite sua mensagem"
                />
                <Button onClick={sendMessage} variant="contained">
                    Enviar
                </Button>
            </div>
        </div>
    );
};

export default Chat;
