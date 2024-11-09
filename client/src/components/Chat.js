import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';  // Importar useLocation
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
    const { notify } = useNotification();

    const location = useLocation();  // Para acessar o estado da navegação
    const nicknameFromHome = location.state?.nickname;  // Extrair o nickname do estado

    useEffect(() => {
        if (nicknameFromHome) {
            setNickname(nicknameFromHome);  // Setar o nickname recebido
            socket.emit('setNickname', nicknameFromHome);  // Enviar o nickname ao servidor
        }

        socket.on('connect', () => {
            console.log('Conectado ao WebSocket');
        });
        socket.on('connect_error', (error) => {
            console.error('Erro de conexão:', error);
        });

        socket.on('msgToClient', (msg, nickname) => {
            setMessages((prev) => [...prev, `${nickname}: ${msg}`]);
            notify(`${nickname} acaba de enviar uma mensagem.`); // Notifique quando uma mensagem chegar
        });

        return () => {
            socket.off('connect');
            socket.off('connect_error');
            socket.off('msgToClient');
        };
    }, [nicknameFromHome]);

    const sendMessage = () => {
        if (message) {
            socket.emit('msgToServer', message);
            setMessage('');
        }
    };

    return (
        <div className='chat-container'>
            <div className='chat-box-container'>
                <div>
                    {messages.map((msg, index) => (
                        <div key={index} className='message'>{msg}</div>
                    ))}
                </div>
            </div>

            <div className='inputs-and-btn-container'>
                <TextField
                    fullWidth label="📭 Message"
                     id="fullWidth"
                    variant="filled"
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' ? sendMessage() : null}
                    placeholder="Digite sua mensagem"
                />
                <Button onClick={sendMessage} variant="contained">Enviar</Button>
            </div>
        </div>
    );
};

export default Chat;
