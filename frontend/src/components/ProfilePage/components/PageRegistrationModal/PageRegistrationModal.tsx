import React, { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  InputAdornment,
  Box,
  Tooltip
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import AddLinkIcon from '@mui/icons-material/AddLink';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import styles from './styles';
import { Source } from '../../../../types/webpage';

interface PageRegistrationModalProps {
  open: boolean;
  saveWebpageIsLoading: boolean;
  handleCloseRegistrationModal: () => void;
  handleSave: (link: string, source: Source) => void;
}

type MenuItem = {
  icon: JSX.Element;
  value: Source;
  label: string;
};

const menuItems: MenuItem[] = [
  {
    icon: <FacebookOutlinedIcon />,
    value: Source.FACEBOOK,
    label: 'Facebook'
  },
  {
    icon: <InstagramIcon />,
    value: Source.INSTAGRAM,
    label: 'Instagram'
  }
];

const isValidUrl = (url: string, source: Source) => {
  let regex;

  switch (source) {
    case Source.FACEBOOK:
      regex = new RegExp('^(https?://)?((w{3}\\.)?)facebook.com/.+$');
      break;
    case Source.INSTAGRAM:
      regex = new RegExp('^(https?://)?((w{3}\\.)?)instagram.com/.+$');
      break;
    default:
      break;
  }

  return regex?.test(url);
};

const PageRegistrationModal = ({
  open,
  saveWebpageIsLoading,
  handleCloseRegistrationModal,
  handleSave
}: PageRegistrationModalProps) => {
  const [link, setLink] = useState<string>('');
  const [source, setSource] = useState<Source>(menuItems[0].value);
  const isLinkValid = !link || !isValidUrl(link, source);

  return (
    <Dialog
      open={open}
      onClose={handleCloseRegistrationModal}
      aria-labelledby="form-dialog-title"
      maxWidth="sm"
    >
      <DialogTitle id="form-dialog-title">Cadastro de página</DialogTitle>

      <DialogContentText sx={styles.subtitle}>
        Registre suas páginas favoritas para receber atualizações sobre eventos futuros que são
        anunciados nelas, proporcionando uma experiência personalizada para você.
      </DialogContentText>

      <DialogContent sx={styles.contentContainer}>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Link"
          type="text"
          fullWidth
          placeholder="https://facebook.com/prgusp"
          autoComplete="off"
          onChange={(e) => setLink(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AddLinkIcon />
              </InputAdornment>
            )
          }}
        />
        <FormControl sx={{ width: '50%' }}>
          <InputLabel id="source-select-label">Origem</InputLabel>
          <Select
            labelId="source-select-label"
            id="source-select"
            label="Origem"
            value={source}
            onChange={(e) => setSource(e.target.value as Source)}
            renderValue={(selected) => {
              const menuItem = menuItems.find((item) => item.value === selected);
              return (
                <Box sx={styles.menuItemContainer}>
                  {menuItem?.icon}
                  {menuItem?.label}
                </Box>
              );
            }}
          >
            {menuItems.map((menuItem, idx) => (
              <MenuItem key={idx} value={menuItem.value} sx={styles.menuItemContainer}>
                {menuItem.icon}
                {menuItem.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions sx={styles.actionsContainer}>
        <Button onClick={handleCloseRegistrationModal} color="primary">
          Cancelar
        </Button>
        <Tooltip title={isLinkValid ? 'Insira um link válido' : ''} placement="bottom" arrow>
          <Box>
            <LoadingButton
              onClick={() => handleSave(link, source)}
              color="primary"
              variant="contained"
              type="button"
              disabled={isLinkValid}
              loading={saveWebpageIsLoading}
            >
              Salvar
            </LoadingButton>
          </Box>
        </Tooltip>
      </DialogActions>
    </Dialog>
  );
};

export default PageRegistrationModal;
