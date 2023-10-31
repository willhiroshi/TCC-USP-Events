import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import LoginIcon from '@mui/icons-material/Login';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from './styles';
import LoginModal from '../../../LoginModal/LoginModal';
import useUserStore from '../../../../store/userStore';
import Logout from '../../../Logout/Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider';

interface ProfileItemProps {
  isSideBarOpen: boolean;
}

const ProfileItem = ({ isSideBarOpen }: ProfileItemProps) => {
  const user = useUserStore((state) => state.user);

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (!user) {
      setOpenLoginModal(true);
    } else {
      navigate('/profile');
    }
  };

  const handleClose = () => {
    setOpenLoginModal(false);
  };

  return (
    <>
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton disableTouchRipple sx={styles.listItemButton} onClick={handleProfileClick}>
          <ListItemIcon sx={styles.profileIcon}>
            {!user ? <LoginIcon fontSize="large" /> : <AccountCircle fontSize="large" />}
          </ListItemIcon>
          {isSideBarOpen &&
            (!user ? (
              <Typography sx={styles.loginRegisterText}>Entrar ou Registrar</Typography>
            ) : (
              <Box>
                <Typography sx={styles.usernameText}>{user.username}</Typography>
                <Typography sx={styles.nameText}>{user.name}</Typography>
              </Box>
            ))}
        </ListItemButton>
        <Divider />
        <Logout user={user} isSideBarOpen={isSideBarOpen} />
      </ListItem>
      <LoginModal open={openLoginModal} handleClose={handleClose} />
    </>
  );
};

export default ProfileItem;
