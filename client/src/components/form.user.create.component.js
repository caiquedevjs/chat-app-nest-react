import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const FormCreateUser = () =>{
    return(

        <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="outlined-required"
            label="Name"
            defaultValue=""
          />
          <TextField
            required
            id="outlined-required"
            label="Mail"
            defaultValue=""
          />
          <TextField
            required
            id="outlined-required"
            label="Bio"
            defaultValue=""
          />
         
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
       
          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </div>
      </Box>
    )
};

export default FormCreateUser;