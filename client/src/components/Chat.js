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
    const imageFromHome = location.state?.image; // A URL da imagem

    useEffect(() => {
        if (nicknameFromHome) {
            setNickname(nicknameFromHome);
            setImage(imageFromHome); // A URL da imagem recebida
            socket.emit('setNickname', { nickname: nicknameFromHome, image: imageFromHome });
        }

        socket.on('connect', () => {
            console.log('Conectado ao WebSocket');
        });

        socket.on('connect_error', (error) => {
            console.error('Erro de conexão:', error);
        });

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

    const sendMessage = async () => {
        if (message && image) {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('nickname', nickname);
    
            const response = await fetch('http://localhost:3333/upload/profile', {
                method: 'POST',
                body: formData,
            });
    
            const data = await response.json();
            const imageUrl = data.url;
    
            socket.emit('msgToServer', { msg: message, image: imageUrl });
            setMessage('');
        }
    };

    return (
        <div className='chat-container'>
            <div className='chat-box-container'>
                <div>
                    {messages.map((msg, index) => (
                        <div key={index} className='message'>
                            <img
                                src={msg.image} // A URL da imagem que foi recebida
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
