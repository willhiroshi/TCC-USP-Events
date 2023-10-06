import { styled } from '@mui/material/styles';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1.5),
  paddingLeft: '18px',
  ...theme.mixins.toolbar
}));

export default DrawerHeader;
