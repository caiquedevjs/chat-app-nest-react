import React from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import '../styles/form.user.create.style.css';
import useCreateUser from '../hooks/useCreateUser.hook';

const FormCreateUser = () => {
  
    const {
      name, setName,
      mail, setMail,
      bio, setBio,
      password, setPassword,
      age, setAge,
      nickname, setNickname, // Novo estado para nickname
      loading,
      error,
      handleSubmit,
    } = useCreateUser();

    return (
        <div className='form-container'>
          <div className='form-container-box'>
            <form onSubmit={handleSubmit} id='box-form-id'>
              <TextField
                required
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                required
                label="Mail"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
              <TextField
                label="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <TextField
                required
                label="Nickname" // Novo campo nickname
                value={nickname} 
                onChange={(e) => setNickname(e.target.value)} 
              />
              <TextField
                required
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                required
                label="Age"
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <Button type="submit" variant="contained" color="primary" disabled={loading}>
                  {loading ? 'Criando...' : 'Criar Usuário'}
              </Button>
              
              {error && <div style={{ color: 'red' }}>{error}</div>}
            </form>
          </div>
        </div>
    );
};

export default FormCreateUser;
