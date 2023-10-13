import React from 'react';
import { Tab as MUITab, Tabs as MUITabs } from '@mui/material';
import { LoginModalTabs } from '../../LoginModal';
import styles from './styles';

interface TabsProps {
  activeTab: string;
  handleTabChange: (event: React.SyntheticEvent, newValue: LoginModalTabs) => void;
}

const Tabs = ({ activeTab, handleTabChange }: TabsProps) => (
  <MUITabs
    value={activeTab}
    onChange={handleTabChange}
    variant="fullWidth"
    TabIndicatorProps={{
      style: {
        display: 'none'
      }
    }}
  >
    <MUITab
      label="Entrar"
      value={LoginModalTabs.LOGIN}
      sx={styles.tab(activeTab === LoginModalTabs.LOGIN)}
    />
    <MUITab
      label="Registrar"
      value={LoginModalTabs.REGISTER}
      sx={styles.tab(activeTab === LoginModalTabs.REGISTER)}
    />
  </MUITabs>
);

export default Tabs;
