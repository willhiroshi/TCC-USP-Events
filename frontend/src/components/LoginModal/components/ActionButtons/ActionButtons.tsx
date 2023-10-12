import React from 'react';
import { Button, DialogActions } from '@mui/material';
import styles from './styles';

interface ActionButtonsProps {
  submitButtonLabel: string;
  handleClose: () => void;
}

const ActionButtons = ({ submitButtonLabel, handleClose }: ActionButtonsProps) => {
  return (
    <DialogActions sx={styles.actionsContainer}>
      <Button onClick={handleClose} color="primary">
        Fechar
      </Button>
      <Button color="primary" variant="contained" type="submit">
        {submitButtonLabel}
      </Button>
    </DialogActions>
  );
};

export default ActionButtons;
