import React, { useState } from 'react';
import { DialogContent, TextField, InputAdornment, IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const RegisterContent = () => {
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
              <PersonIcon />
            </InputAdornment>
          )
        }}
      />
      <TextField
        sx={{ marginBottom: '15px' }}
        margin="dense"
        id="email"
        name="email"
        label="Email"
        type="email"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
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
      <TextField
        margin="dense"
        id="name"
        name="name"
        label="Nome"
        type="text"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon />
            </InputAdornment>
          )
        }}
      />
    </DialogContent>
  );
};

export default RegisterContent;
