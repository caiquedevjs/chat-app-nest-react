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
    const [colorNickname, setColorNickname] = useState('');
    const [image, setImage] = useState('');
    const { notify } = useNotification();

    const location = useLocation();
    const nicknameFromHome = location.state?.nickname;
    const imageFromHome = location.state?.image; // A URL da imagem
    const colorNicknameFromHome = location.state?.colorNickname;

    useEffect(() => {
        if (nicknameFromHome) {
            setNickname(nicknameFromHome);
            setColorNickname(colorNicknameFromHome);
            setImage(imageFromHome);

            socket.emit('setNickname', {
                nickname: nicknameFromHome,
                image: imageFromHome,
                colorNickname: colorNicknameFromHome
            });
        }

        socket.on('connect', () => {
            console.log('Conectado ao WebSocket');
        });

        socket.on('connect_error', (error) => {
            console.error('Erro de conexão:', error);
        });

        socket.on('msgToClient', ({ msg, senderNickname, senderImage, senderColorNickname }) => {
            // Captura o momento atual quando a mensagem é recebida
            const nowMoment = new Date();
            const formattedTime = nowMoment.toLocaleTimeString('pt-BR');

            setMessages((prev) => [
                ...prev,
                {
                    nickname: senderNickname,
                    text: msg,
                    image: senderImage,
                    colorNickname: senderColorNickname,
                    time: formattedTime // Armazena a hora junto com a mensagem
                }
            ]);
            notify(`${senderNickname} enviou uma mensagem.`);
        });

        return () => {
            socket.off('connect');
            socket.off('connect_error');
            socket.off('msgToClient');
        };
    }, [nicknameFromHome, imageFromHome, colorNicknameFromHome]);

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
                                    <span style={{ fontSize: '0.8rem', color: '#888',  marginLeft: '75%'}}>
                                        
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
