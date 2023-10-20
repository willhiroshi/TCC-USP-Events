import React, { useState } from 'react';
import styles from './styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { WebpageRequest } from '../../hooks/webpage/types';
import { Source } from '../../types/webpage';
import { toast } from 'react-toastify';
import WebpageInputModal from './components/PageRegistrationModal/WebpageInputModal';
import useWebpage from '../../hooks/webpage/useWebpage';
import WebpageTable from './components/WebpageTable/WebpageTable';

const dialogTitle = 'Cadastro de página';
const dialogText =
  'Registre suas páginas favoritas para receber atualizações sobre eventos futuros \
  que são anunciados nelas, proporcionando uma experiência personalizada para você.';

const ProfilePage = () => {
  const { getWebpages, saveWebpage, deleteWebpage } = useWebpage();
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState<boolean>(false);

  const { refetch: refetchWebpages } = getWebpages();
  const { mutateAsync: mutateAsyncSaveWebpage, isLoading: saveWebpageIsLoading } = saveWebpage;
  const { mutateAsync: mutateAsyncDeleteWebpage } = deleteWebpage;

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

  const handleDeleteWebpage = async (webpageId: string) => {
    await mutateAsyncDeleteWebpage({ webpageId })
      .then(() => {
        toast.success('Página removida com sucesso!');
        refetchWebpages();
      })
      .catch((error) => {
        switch (error.response?.status) {
          case 404:
            toast.error('Erro ao buscar página!');
            break;
          default:
            toast.error('Erro ao remover página!');
            break;
        }
      });
  };

  const getTooltipText = () => {
    return (
      <Typography sx={styles.infoText}>
        Insira as páginas de sua preferência de onde os eventos serão buscados
      </Typography>
    );
  };

  return (
    <Box sx={styles.outsideContainer}>
      <Paper sx={styles.profileContainer}>
        <Box sx={styles.header}>
          <Typography variant="h5">Configurações</Typography>
        </Box>
        <Divider />

        <Box sx={styles.subheader}>
          <Box sx={styles.infoHeader}>
            <Typography variant="h6">Preferências de usuário</Typography>
            <Tooltip title={getTooltipText()} arrow placement="top">
              <IconButton>
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <Button variant="contained" onClick={handleOpenRegistrationPageModal} sx={styles.button}>
            Nova página
          </Button>
        </Box>
        <Divider />

        <WebpageTable handleDelete={handleDeleteWebpage} />
      </Paper>

      <WebpageInputModal
        open={isRegistrationModalOpen}
        dialogTitle={dialogTitle}
        dialogText={dialogText}
        saveWebpageIsLoading={saveWebpageIsLoading}
        handleCloseRegistrationModal={handleCloseRegistrationPageModal}
        handleSave={handleSaveRegistrationPage}
      />
    </Box>
  );
};

export default ProfilePage;
