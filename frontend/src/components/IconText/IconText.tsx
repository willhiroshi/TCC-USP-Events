import React from 'react';
import * as styles from './styles';
import { Typography } from '@mui/material';

interface IconTextProps {
  IconComponent: React.ElementType;
  children: React.ReactNode;
}

const IconText = ({ IconComponent, children }: IconTextProps) => (
  <div className={styles.textIcon}>
    <IconComponent />
    <Typography>{children}</Typography>
  </div>
);

export default IconText;
