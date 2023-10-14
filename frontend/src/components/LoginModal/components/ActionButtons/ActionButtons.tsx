import React from 'react';

import styles from './styles';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import LoadingButton from '@mui/lab/LoadingButton';

interface ActionButtonsProps {
  submitButtonLabel: string;
  submitButtonLoading?: boolean;
  handleClose: () => void;
}

const ActionButtons = ({
  submitButtonLabel,
  submitButtonLoading,
  handleClose
}: ActionButtonsProps) => {
  return (
    <DialogActions sx={styles.actionsContainer}>
      <Button onClick={handleClose} variant="text" color="primary">
        FECHAR
      </Button>
      <LoadingButton
        color="primary"
        variant="contained"
        type="submit"
        loading={submitButtonLoading}
      >
        {submitButtonLabel}
      </LoadingButton>
    </DialogActions>
  );
};

export default ActionButtons;
