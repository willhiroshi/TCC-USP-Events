import React from 'react';

import styles from './styles';
import Button from '@mui/joy/Button';
import DialogActions from '@mui/joy/DialogActions';

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
      <Button color="primary" variant="solid" type="submit" loading={submitButtonLoading}>
        {submitButtonLabel}
      </Button>
      <Button onClick={handleClose} variant="plain" color="primary">
        FECHAR
      </Button>
    </DialogActions>
  );
};

export default ActionButtons;
