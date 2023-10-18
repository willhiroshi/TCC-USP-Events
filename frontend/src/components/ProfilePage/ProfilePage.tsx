import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import styles from './styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PageRegistrationModal from './components/PageRegistrationModal/PageRegistrationModal';
import useWebpage from '../../hooks/webpage/useWebpage';
import { WebpageRequest } from '../../hooks/webpage/types';
import { Source } from '../../types/webpage';
import { toast } from 'react-toastify';

import WebpageTable from './components/WebpageTable/WebpageTable';

const ProfilePage = () => {
  const { getWebpages, saveWebpage } = useWebpage();
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState<boolean>(false);

  const { refetch: refetchWebpages } = getWebpages();
  const { mutateAsync: mutateAsyncSaveWebpage, isLoading: saveWebpageIsLoading } = saveWebpage;

  const handleOpenRegistrationPageModal = () => {
    setIsRegistrationModalOpen(true);
  };

  const handleCloseRegistrationPageModal = () => {
    setIsRegistrationModalOpen(false);
  };

  const handleSaveRegistrationPage = async (link: string, source: Source) => {
    const webpageRequest: WebpageRequest = {
      link,
      source
    };

    await mutateAsyncSaveWebpage({ webpageRequest })
      .then(() => {
        toast.success('Página cadastrada com sucesso!');
        setIsRegistrationModalOpen(false);
        refetchWebpages();
      })
      .catch((error) => {
        switch (error.response?.status) {
          case 400:
            toast.error('Página já cadastrada!');
            break;
          default:
            toast.error('Erro ao cadastrar página!');
            break;
        }
      });
  };

  return (
    <Box sx={styles.outsideContainer}>
      <Paper sx={styles.profileContainer}>
        <Box sx={styles.header}>
          <Typography variant="h5">Configurações</Typography>
        </Box>
        <Divider />

        <Box sx={styles.subheader}>
          <Typography variant="h6">Preferências de usuário</Typography>
          <Button variant="contained" onClick={handleOpenRegistrationPageModal} sx={styles.button}>
            Nova página
          </Button>
        </Box>
        <Divider />

        <WebpageTable />
      </Paper>

      <PageRegistrationModal
        open={isRegistrationModalOpen}
        saveWebpageIsLoading={saveWebpageIsLoading}
        handleCloseRegistrationModal={handleCloseRegistrationPageModal}
        handleSave={handleSaveRegistrationPage}
      />
    </Box>
  );
};

export default ProfilePage;
