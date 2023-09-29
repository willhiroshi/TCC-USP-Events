import * as styles from './styles';
import React, { useState } from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CollapsableSideBarData from '../CollapsableSideBarData/CollapsableSideBarData';
import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9.2)} + 1px)`
  }
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1.5),
  paddingLeft: '18px',
  ...theme.mixins.toolbar
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    })
  })
);

const CollapsableSidebar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);

  const handleCloseSidebar = () => setIsSideBarOpen(false);
  const handleOpenSidebar = () => setIsSideBarOpen(true);
  const handleSidebar = () => {
    isSideBarOpen ? handleCloseSidebar() : handleOpenSidebar();
  };

  const buttonsList = CollapsableSideBarData;

  return (
    <Box className={styles.body}>
      <Drawer variant="permanent" open={isSideBarOpen}>
        <DrawerHeader>
          {isSideBarOpen && <h3>USP Events</h3>}
          <IconButton onClick={handleSidebar}>
            {isSideBarOpen ? <KeyboardDoubleArrowLeft /> : <KeyboardDoubleArrowRight />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {buttonsList.map((item, index) => (
            <Link to={item.path} key={index} style={{ textDecoration: 'none' }}>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton className={styles.listItemButton(isSideBarOpen)}>
                  <ListItemIcon className={styles.listItemIcon(isSideBarOpen)}>
                    {item.icon}
                  </ListItemIcon>
                  {isSideBarOpen && (
                    <ListItemText
                      primary={item.title}
                      className={styles.listItemText(isSideBarOpen)}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default CollapsableSidebar;
