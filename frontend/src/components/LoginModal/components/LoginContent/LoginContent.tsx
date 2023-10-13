import React, { useState } from 'react';
import { DialogContent, IconButton, InputAdornment, TextField } from '@mui/material';
import { Person } from '@mui/icons-material';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginContent = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <DialogContent>
      <TextField
        autoFocus
        sx={{ marginBottom: '15px' }}
        margin="dense"
        id="username"
        name="username"
        label="Nome de usuário"
        type="text"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person />
            </InputAdornment>
          )
        }}
      />
      <TextField
        sx={{ marginBottom: '15px' }}
        margin="dense"
        id="password"
        name="password"
        label="Senha"
        type={showPassword ? 'text' : 'password'}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handlePasswordVisibility}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </DialogContent>
  );
};

export default LoginContent;
