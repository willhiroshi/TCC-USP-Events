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

type MenuItem = {
  icon: JSX.Element;
  value: string;
};

const menuItems: MenuItem[] = [
  {
    icon: <FacebookOutlinedIcon />,
    value: 'Facebook'
  },
  {
    icon: <InstagramIcon />,
    value: 'Instagram'
  }
];

const isValidUrl = (url: string, source: string) => {
  let regex;
  if (source === 'Facebook') {
    regex = new RegExp('^(https?://)?((w{3}\\.)?)facebook.com/.+$');
  } else if (source === 'Instagram') {
    regex = new RegExp('^(https?://)?((w{3}\\.)?)instagram.com/.+$');
  }

  return regex?.test(url);
};

const PageRegistrationModal = () => {
  const [open, setOpen] = useState(true);

  const [link, setLink] = useState('');
  const [source, setSource] = useState(menuItems[0].value);

  const isLinkValid = !link || !isValidUrl(link, source);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {};

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="sm">
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
            onChange={(e) => setSource(e.target.value as string)}
            renderValue={(selected) => {
              const menuItem = menuItems.find((item) => item.value === selected);
              return (
                <Box sx={styles.menuItemContainer}>
                  {menuItem?.icon}
                  {menuItem?.value}
                </Box>
              );
            }}
          >
            {menuItems.map((menuItem, idx) => (
              <MenuItem key={idx} value={menuItem.value} sx={styles.menuItemContainer}>
                {menuItem.icon}
                {menuItem.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions sx={styles.actionsContainer}>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Tooltip title={isLinkValid ? 'Insira um link válido' : ''} placement="bottom" arrow>
          <Box>
            <LoadingButton
              onClick={handleSave}
              color="primary"
              variant="contained"
              type="button"
              disabled={isLinkValid}
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
