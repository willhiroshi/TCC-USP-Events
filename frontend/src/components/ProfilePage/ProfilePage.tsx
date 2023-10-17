import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import styles from './styles';
import PageRegistrationModal from './components/PageRegistrationModal/PageRegistrationModal';

const ProfilePage = () => {
  return (
    <Box sx={styles.outsideContainer}>
      <Paper sx={styles.profileContainer}>
        <PageRegistrationModal />
      </Paper>
    </Box>
  );
};

export default ProfilePage;
