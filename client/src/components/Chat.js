import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { useNotification } from '../contexts/NotificationContext.tsx';
import { jwtDecode } from 'jwt-decode';
import useGetUser from '../hooks/useGetUser.hook.js';
import '../styles/chat.style.css';

const socket = io('http://localhost:3333');

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [nickname, setNickname] = useState('');
    const [colorNickname, setColorNickname] = useState('');
    const [image, setImage] = useState('');
    const { notify } = useNotification();
    const { loading, getUserId, userData } = useGetUser();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token de autenticação não encontrado');
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.sub; // 💡 ID do usuário no token
            if (userId) {
                getUserId(userId);
            }
        } catch (error) {
            console.error("Erro ao decodificar o token:", error);
        }

        socket.on('connect', () => {
            console.log('Conectado ao WebSocket');
        });

        socket.on('connect_error', (error) => {
            console.error('Erro de conexão:', error);
        });

        socket.on('msgToClient', ({ msg, senderNickname, senderImage, senderColorNickname }) => {
            const nowMoment = new Date();
            const formattedTime = nowMoment.toLocaleTimeString('pt-BR');

            setMessages((prev) => [
                ...prev,
                {
                    nickname: senderNickname,
                    text: msg,
                    image: senderImage,
                    colorNickname: senderColorNickname,
                    time: formattedTime
                }
            ]);
            notify(`${senderNickname} enviou uma mensagem.`);
        });

        return () => {
            socket.off('connect');
            socket.off('connect_error');
            socket.off('msgToClient');
        };
    }, []);

    //💡  Atualiza a imagem, nickname e cor quando `userData` é carregado  e envia os dados em tempo real para o socket
    useEffect(() => {
        if (userData) {
            setNickname(userData.nickname);
            setColorNickname(userData.colorNickname);
            setImage(userData.profileImage || 'default-avatar.png');
    
            // 💡Envia os dados do usuário para o WebSocket
            socket.emit('setNickname', {
                nickname: userData.nickname,
                image: userData.profileImage || 'default-avatar.png',
                colorNickname: userData.colorNickname
            });
        }
    }, [userData]);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('msgToServer', {
                msg: message,
                image,
                colorNickname
            });
            setMessage('');
        }
    };

    return (
        <div className='chat-container'>
            <div className='chat-box-container-div'>
                <div className='chat-box-container'>
                    <div>
                        {messages.map((msg, index) => (
                            <div key={index} className='message'>
                                <div>
                                    <img
                                        src={msg.image}
                                        alt="User Avatar"
                                        className='user-image'
                                    />
                                </div>
                                <span>
                                    <strong style={{ color: msg.colorNickname }}>
                                        {msg.nickname}:
                                    </strong>{' '}
                                    {msg.text}
                                    <div>
                                        <span style={{ fontSize: '0.8rem', color: '#888', marginLeft: '75%' }}>
                                            {msg.time}
                                        </span>
                                    </div>
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
                    <Button onClick={sendMessage} variant="contained" sx={{ bgcolor: 'success.main', color: 'white' }}>
                        Enviar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
