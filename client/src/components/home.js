import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal'; // Importar Modal
import '../styles/home.style.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Home = () => {
    const [nickname, setNickname] = useState('');
    const [open, setOpen] = useState(false); // Estado para controlar a modal
    const navigate = useNavigate();

    const handleOpen = () => setOpen(true); // Abrir modal
    const handleClose = () => setOpen(false); // Fechar modal

    const handleNickname = () => {
        if (nickname) {
            navigate('/chat', { state: { nickname } });
        } else {
            handleOpen(); // Abre a modal se o nickname estiver vazio
        }
    }

    return (
        <div className="home-container">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={style}>
                    <h2 id="parent-modal-title">Nickname obrigatório</h2>
                    <p id="parent-modal-description">
                        Por favor, insira um nickname para continuar.
                    </p>
                    <Button onClick={handleClose} variant="contained">Fechar</Button>
                </Box>
            </Modal>

            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField
                        id="input-with-sx"
                        label="Nickname"
                        variant="standard"
                        onChange={(event) => setNickname(event.target.value)}
                    />
                    <Button variant="contained" onClick={handleNickname}>Enviar</Button>
                </Box>
            </Box>
        </div>
    );
}

export default Home;
