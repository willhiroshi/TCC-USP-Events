import React, { useState } from 'react';
import { LoginRequest, RegisterRequest } from '../../hooks/user/types';
import { toast } from 'react-toastify';
import Tabs from './components/Tabs/Tabs';
import LoginContent from './components/LoginContent/LoginContent';
import RegisterContent from './components/RegisterContent/RegisterContent';
import ActionButtons from './components/ActionButtons/ActionButtons';
import useUser from '../../hooks/user/useUser';
import Dialog from '@mui/material/Dialog';

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

  const { postLogin, postRegister } = useUser();
  const { isLoading: loginIsLoading } = postLogin;
  const { isLoading: registerIsLoading } = postRegister;

  const handleTabChange = (_: React.SyntheticEvent, newValue: LoginModalTabs) => {
    setActiveTab(newValue);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const body: { [key: string]: string | FormDataEntryValue } = {};
    for (const [key, value] of form.entries()) {
      body[key] = value;
    }

    if (activeTab === LoginModalTabs.LOGIN) {
      const loginRequest: LoginRequest = {
        username: body.username as string,
        password: body.password as string
      };

      await handleLogin(loginRequest);
    } else {
      const registerRequest: RegisterRequest = {
        username: body.username as string,
        password: body.password as string,
        email: body.email as string,
        name: body.name as string
      };

      await handleRegister(registerRequest);
    }
  };

  const handleLogin = async (loginRequest: LoginRequest) => {
    await postLogin
      .mutateAsync({ loginRequest: loginRequest })
      .then(() => {
        toast.success('Login realizado com sucesso!');
        handleClose();
      })
      .catch((error) => {
        switch (error.response?.status) {
          case 401:
            toast.error('Usuário ou senha incorretos!');
            break;
          default:
            toast.error('Erro ao realizar login!');
            break;
        }
      });
  };

  const handleRegister = async (registerRequest: RegisterRequest) => {
    const registerSuccessMessage = (
      <p>
        Registro realizado com sucesso!
        <br />
        Faça login para continuar
      </p>
    );

    await postRegister
      .mutateAsync({ registerRequest: registerRequest })
      .then(() => {
        toast.success(registerSuccessMessage, {
          autoClose: 5000
        });
        handleClose();
      })
      .catch((error) => {
        switch (error.response?.status) {
          case 400:
            toast.error('Usuário já cadastrado!');
            break;
          default:
            toast.error('Erro ao realizar registro!');
            break;
        }
      });
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
          <ActionButtons
            submitButtonLabel="ENTRAR"
            handleClose={handleClose}
            submitButtonLoading={loginIsLoading}
          />
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <RegisterContent />
          <ActionButtons
            submitButtonLabel="REGISTRAR-SE"
            handleClose={handleClose}
            submitButtonLoading={registerIsLoading}
          />
        </form>
      )}
    </Dialog>
  );
};

export default LoginModal;
