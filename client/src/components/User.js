import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Input, Button, Skeleton } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import '../styles/user.style.css';

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

const User = () => {
    const [image, setImage] = useState(null);
    const [nickname, setNickname] = useState('');
    const [age, setAge] = useState('');
    const [bio, setBio] = useState('');
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpen = () => setOpen(true); 
    const handleClose = () => setOpen(false);

    const handleFormSubmit = () => {
        if (nickname.trim() === '') {
            handleOpen();
        } else {
            navigate('/chat', { state: { nickname, age, bio, image } });
        }
    };
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className="home-container">
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <h2 id="parent-modal-title">Nickname obrigatório</h2>
                    <p id="parent-modal-description">
                        Por favor, insira um nickname para continuar.
                    </p>
                    <Button onClick={handleClose} variant="contained">Fechar</Button>
                </Box>
            </Modal>

            <div className="form-container">
                {/* Formulário à esquerda */}
                <Box className="form-box">
                    <Box className="profile-image-container">
                        {image ? (
                            <img src={image} alt="Profile" className="profile-image" />
                        ) : (
                            <Skeleton variant="circular" width={100} height={100} style={{marginBottom: '20px'}} />
                        )}
                        <label htmlFor="image-upload">
                            <Input
                                type="file"
                                inputProps={{ accept: 'image/*' }}
                                onChange={handleImageChange}
                                id="image-upload"
                                style={{ display: 'none' }}
                            />
                            <Button variant="contained" component="span">Escolher Foto</Button>
                        </label>
                    </Box>

                    <TextField
                        id="nickname-input"
                        label="Nickname"
                        variant="outlined"
                        onChange={(e) => setNickname(e.target.value)}
                        value={nickname}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        id="age-input"
                        label="Age"
                        variant="outlined"
                        type="text"
                        onChange={(e) => setAge(e.target.value)}
                        value={age}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        id="bio-input"
                        label="Bio"
                        variant="outlined"
                        multiline
                        rows={4}
                        onChange={(e) => setBio(e.target.value)}
                        value={bio}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" onClick={handleFormSubmit}>Criar Perfil</Button>
                </Box>
            </div>
        </div>
    );
}

export default User;
