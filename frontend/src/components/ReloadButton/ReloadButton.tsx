import React from 'react';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';

interface ReloadButtonProps {
  onReload: () => void;
}

const ReloadButton = ({ onReload }: ReloadButtonProps) => {
  return (
    <IconButton
      size="large"
      color="primary"
      aria-label="reload"
      component="span"
      onClick={onReload}
    >
      <RefreshIcon />
    </IconButton>
  );
};

export default ReloadButton;
