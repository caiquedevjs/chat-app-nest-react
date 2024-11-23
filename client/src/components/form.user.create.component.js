import React from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import '../styles/form.user.create.style.css';
import useCreateUser from '../hooks/useCreateUser.hook'

const FormCreateUser = () =>{
    const {
      name, setName,
      mail, setMail,
      bio, setBio,
      password, setPassword,
      age, setAge,
      loading,
      error,
      handleSubmit,
    } = useCreateUser()

    return(
        <div className='form-conteiner'>
          <div className='form-container-box'>
       
        <form onSubmit={handleSubmit} id='box-form-id'>
          <TextField
            required
            id="outlined-required"
            label="Name"
            value={name}
            onChange={(e)=> setName(e.target.value)}
            defaultValue=""
          />
          <TextField
            required
            id="outlined-required"
            label="Mail"
            value={mail}
            onChange={(e)=>setMail(e.target.value)}
            defaultValue=""
          />
          <TextField
            required
            id="outlined-required"
            label="Bio"
            value={bio}
            onChange={(e)=> setBio(e.target.value)}
            defaultValue=""
          />
         
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            autoComplete="current-password"
          />
       
          <TextField
            id="outlined-required"
            label="Age"
            type="text"
            value={age}
            onChange={(e)=>setAge(e.target.value)}
            
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? 'Criando...' : 'Criar Usuário'}
          </Button>
          
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
      
      </div>
      </div>
    )
};

export default FormCreateUser;