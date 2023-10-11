import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Typography } from '@mui/material';
import CollapsableSideBarData from '../CollapsableSideBarData/CollapsableSideBarData';
import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import Drawer from './components/Drawer/Drawer';
import DrawerHeader from './components/DrawerHeader/DrawerHeader';
import styles from './styles';
import ProfileItem from './components/ProfileItem/ProfileItem';

const CollapsableSidebar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
  const location = useLocation();

  const handleCloseSidebar = () => setIsSideBarOpen(false);
  const handleOpenSidebar = () => setIsSideBarOpen(true);
  const handleSidebar = () => {
    isSideBarOpen ? handleCloseSidebar() : handleOpenSidebar();
  };

  const buttonsList = CollapsableSideBarData;

  return (
    <Box>
      <Drawer variant="permanent" open={isSideBarOpen}>
        <DrawerHeader>
          {isSideBarOpen && <b>USP Events</b>}
          <IconButton onClick={handleSidebar}>
            {isSideBarOpen ? <KeyboardDoubleArrowLeft /> : <KeyboardDoubleArrowRight />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box sx={styles.listItemsContainer}>
          <List disablePadding>
            {buttonsList.map((item, index) => (
              <Link to={item.path} key={index} style={{ textDecoration: 'none' }}>
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    disableTouchRipple
                    sx={styles.sidebarButton(location.pathname === item.path)}
                  >
                    <ListItemIcon sx={styles.sidebarIcon}>{item.icon}</ListItemIcon>
                    {isSideBarOpen && (
                      <Typography sx={styles.sidebarButtonText}>{item.title}</Typography>
                    )}
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
          <Box>
            <Divider />
            <ProfileItem isSideBarOpen={isSideBarOpen}></ProfileItem>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default CollapsableSidebar;
