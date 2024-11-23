import React from 'react';
import {useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import '../styles/home.style.css';


const Home = ()=>{
    const navigate = useNavigate();
   const handlerSingIn =()=>{
    navigate('/singin')
   }
    return(


        <div className='home-container'>
            <div className='home-container-box'>
                <TextField

                        required
                        id="outlined-required"
                        label="Mail"
                        type='mail'
                        defaultValue=""
                        />
                       
                       <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                    />
                <div className='btn-container'>
                    <Button  variant='contained' id='btn-login'>Entrar</Button>
                </div>
                <div className='sing-in-container'>
                    <p className='sing-up-text' onClick={handlerSingIn}>Sign-up</p>
                    <div className='icons-container'>
                        <InstagramIcon id='icons-instagram' />
                        <XIcon id='icons-x' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
