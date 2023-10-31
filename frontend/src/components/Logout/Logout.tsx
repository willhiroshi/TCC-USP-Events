import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import React from 'react';
import styles from './styles';
import { User } from '../../types/user';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import useUserStore from '../../store/userStore';
import { toast } from 'react-toastify';
import useUser from '../../hooks/user/useUser';
import { useNavigate } from 'react-router';

export const AUTH_TOKENS_KEY = 'authTokens';

interface LogoutProps {
  user?: User | null;
  isSideBarOpen: boolean;
}

const Logout = ({ user, isSideBarOpen }: LogoutProps) => {
  const authTokens = useUserStore((state) => state.authTokens);
  const setUser = useUserStore((state) => state.setUser);
  const setAuthTokens = useUserStore((state) => state.setAuthTokens);

  const { postLogout } = useUser();
  const navigate = useNavigate();

  const invalidateSession = () => {
    localStorage.removeItem(AUTH_TOKENS_KEY);
    setAuthTokens(null);
    setUser(null);
  };

  const handleLogout = async () => {
    const refreshToken = authTokens?.refresh;

    await postLogout
      .mutateAsync({ logoutRequset: { refreshToken: refreshToken! } })
      .then(() => {
        toast.success('Logout realizado com sucesso!');
        invalidateSession();
        navigate('/');
      })
      .catch((error) => {
        switch (error.response?.status) {
          case 400:
            toast.error('Sessão expirada!');
            break;
          default:
            toast.error('Erro ao realizar logout!');
            break;
        }
      });
  };

  return (
    <>
      {user && authTokens && (
        <ListItemButton disableTouchRipple sx={styles.listItemButton} onClick={handleLogout}>
          <ListItemIcon sx={styles.logoutIcon}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifySelf: 'center'
              }}
            >
              <LogoutIcon fontSize="small" />
            </Box>
          </ListItemIcon>

          {isSideBarOpen && (
            <Box>
              <Typography sx={styles.LogoutText}>Sair</Typography>
            </Box>
          )}
        </ListItemButton>
      )}
    </>
  );
};

export default Logout;
