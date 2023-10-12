import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';
import styles from './styles';
import LoginModal from '../../../LoginModal/LoginModal';

interface ProfileItemProps {
  isSideBarOpen: boolean;
}

const ProfileItem = ({ isSideBarOpen }: ProfileItemProps) => {
  const isLoggedIn = false;

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (!isLoggedIn) {
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
            <AccountCircle fontSize="large" />
          </ListItemIcon>
          {isSideBarOpen &&
            (!isLoggedIn ? (
              <Typography sx={styles.loginRegisterText}>Entrar ou Registrar</Typography>
            ) : (
              <Box>
                <Typography sx={styles.usernameText}>willhiroshi</Typography>
                <Typography sx={styles.nameText}>Willian Hiroshi</Typography>
              </Box>
            ))}
        </ListItemButton>
      </ListItem>
      <LoginModal open={openLoginModal} handleClose={handleClose} />
    </>
  );
};

export default ProfileItem;
