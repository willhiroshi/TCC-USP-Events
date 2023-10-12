import React, { useState } from 'react';
import { Dialog } from '@mui/material';
import Tabs from './components/Tabs/Tabs';
import LoginContent from './components/LoginContent/LoginContent';
import RegisterContent from './components/RegisterContent/RegisterContent';
import ActionButtons from './components/ActionButtons/ActionButtons';

export enum LoginModalTabs {
  LOGIN = 'Login',
  REGISTER = 'Register'
}

interface LoginModalProps {
  open: boolean;
  handleClose: () => void;
}

const LoginModal = ({ open, handleClose }: LoginModalProps) => {
  const [activeTab, setActiveTab] = useState<LoginModalTabs>(LoginModalTabs.LOGIN);

  const handleTabChange = (_: React.SyntheticEvent, newValue: LoginModalTabs) => {
    setActiveTab(newValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const body: { [key: string]: string | FormDataEntryValue } = {};
    for (const [key, value] of form.entries()) {
      body[key] = value;
    }
  };

  return (
    <Dialog
      open={open}
      fullWidth={true}
      maxWidth="xs"
      PaperProps={{
        style: {
          position: 'absolute',
          top: '20%'
        }
      }}
    >
      <Tabs activeTab={activeTab} handleTabChange={handleTabChange} />
      {activeTab === LoginModalTabs.LOGIN ? (
        <form onSubmit={handleSubmit}>
          <LoginContent />
          <ActionButtons submitButtonLabel="Entrar" handleClose={handleClose} />
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <RegisterContent />
          <ActionButtons submitButtonLabel="Registrar-se" handleClose={handleClose} />
        </form>
      )}
    </Dialog>
  );
};

export default LoginModal;
