import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';
import styles from './styles';

interface ProfileItemProps {
  isSideBarOpen: boolean;
}

const ProfileItem = ({ isSideBarOpen }: ProfileItemProps) => {
  return (
    <Link to="/profile" style={{ textDecoration: 'none' }}>
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton disableTouchRipple sx={styles.listItemButton}>
          <ListItemIcon sx={styles.profileIcon}>
            <AccountCircle fontSize="large" />
          </ListItemIcon>
          {isSideBarOpen && (
            <Box>
              <Typography sx={styles.usernameText}>willhiroshi</Typography>
              <Typography sx={styles.nameText}>Willian Hiroshi</Typography>
            </Box>
          )}
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default ProfileItem;
