import React from 'react';
import * as styles from './styles';
import HomePage from '../HomePage/HomePage';
import { Route, Routes } from 'react-router-dom';
import LocationlessPostsGrid from '../PostsGrid/PostsGrid';
import CollapsableSidebar from '../CollapsableSidebar/CollapsableSidebar';
import { Box, CssBaseline } from '@mui/material';

function App() {
  return (
    <Box className={styles.wrapper}>
      <CssBaseline />
      <CollapsableSidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/locationless" element={<LocationlessPostsGrid />} />
      </Routes>
    </Box>
  );
}

export default App;
