import React from 'react';
import styles from './styles';
import { Typography } from '@mui/material';

interface IconTextProps {
  IconComponent: React.ElementType;
  children: React.ReactNode;
}

const IconText = ({ IconComponent, children }: IconTextProps) => (
  <div style={styles.textIcon}>
    <IconComponent />
    <Typography>{children}</Typography>
  </div>
);

export default IconText;
