import React, { useEffect } from 'react';
import styles from './styles';
import HomePage from '../HomePage/HomePage';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LocationlessPostsGrid from '../PostsGrid/PostsGrid';
import CollapsableSidebar from '../CollapsableSidebar/CollapsableSidebar';
import { Box, CssBaseline } from '@mui/material';
import ProfilePage from '../ProfilePage/ProfilePage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const RedirectToRoot = () => {
    const navigate = useNavigate();

    useEffect(() => {
      navigate('/');
    }, [navigate]);

    return null;
  };

  return (
    <Box sx={styles.wrapper}>
      <CssBaseline />
      <Box display="flex">
        <CollapsableSidebar />
        <Box flexGrow={1}>
          <Routes>
            <Route path="/*" element={<RedirectToRoot />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/locationless" element={<LocationlessPostsGrid />} />
            <Route path="/profile" element={<PrivateRoute Component={ProfilePage} />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
