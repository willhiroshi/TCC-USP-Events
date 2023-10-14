import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import LoginIcon from '@mui/icons-material/Login';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import styles from './styles';
import LoginModal from '../../../LoginModal/LoginModal';
import useUserStore from '../../../../store/userStore';

interface ProfileItemProps {
  isSideBarOpen: boolean;
}

const ProfileItem = ({ isSideBarOpen }: ProfileItemProps) => {
  console.log('ProfileItem rendered'); // Add this line
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
      </ListItem>
      <LoginModal open={openLoginModal} handleClose={handleClose} />
    </>
  );
};

export default ProfileItem;
