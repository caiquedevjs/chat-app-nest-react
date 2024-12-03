import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import '../styles/home.style.css';

const Home = () => {
    const navigate = useNavigate();
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3334/user_login/login', {
                Mail: mail,
                password: password,
            });

            // Armazenar token no localStorage
            localStorage.setItem('token', response.data.accessToken);
            alert("Login successful!");

            // Navegar para a página principal
            navigate('/chat');
        } catch (error) {
            alert("Login failed: " + error.response?.data?.message || error.message);
        }
    };

    return (
        <div className='home-container'>
            <div className='home-container-box'>
                <TextField
                    required
                    label="Mail"
                    type='mail'
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className='btn-container'>
                    <Button variant='contained' id='btn-login' onClick={handleLogin}>Entrar</Button>
                </div>
            </div>
        </div>
    );
};

export default Home;
