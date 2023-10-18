import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import styles from './styles';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import PageRegistrationModal from './components/PageRegistrationModal/PageRegistrationModal';
import useWebpage from '../../hooks/webpage/useWebpage';
import { WebpageRequest } from '../../hooks/webpage/types';
import { Source } from '../../types/webpage';
import { toast } from 'react-toastify';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import { useTheme } from '@mui/material/styles';

import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
}

const columns: Column[] = [
  { id: 'webpage', label: 'Link da página', align: 'left' },
  { id: 'source', label: 'Fonte', align: 'left' },
  { id: 'actions', label: 'Ações', align: 'right' }
];

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

const ProfilePage = () => {
  const { getWebpages, saveWebpage } = useWebpage();
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState<boolean>(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

  const handleOpenNewPageDrawer = () => {
    setIsRegistrationModalOpen(true);
  };

  const handleCloseNewPageDrawer = () => {
    setIsRegistrationModalOpen(false);
  };

  const { data: webpages, refetch: refetchWebpages } = getWebpages();

  const { mutateAsync: mutateAsyncSaveWebpage, isLoading: saveWebpageIsLoading } = saveWebpage;

  const handleSave = async (link: string, source: Source) => {
    const webpageRequest: WebpageRequest = {
      link,
      source
    };

    await mutateAsyncSaveWebpage({ webpageRequest })
      .then(() => {
        toast.success('Página cadastrada com sucesso!');
        setIsRegistrationModalOpen(false);
        refetchWebpages();
      })
      .catch((error) => {
        switch (error.response?.status) {
          case 400:
            toast.error('Página já cadastrada!');
            break;
          default:
            toast.error('Erro ao cadastrar página!');
            break;
        }
      });
  };

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  console.log(webpages);

  return (
    <Box sx={styles.outsideContainer}>
      <Paper sx={styles.profileContainer}>
        <Box sx={styles.header}>
          <Typography variant="h5">Configurações</Typography>
        </Box>
        <Divider />
        <Box sx={styles.subheader}>
          <Typography variant="h6">Preferências de usuário</Typography>
          <Button variant="contained" onClick={handleOpenNewPageDrawer} sx={styles.button}>
            Nova página
          </Button>
        </Box>
        <Divider />
        <TableContainer sx={{ height: '100vh' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? webpages?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : webpages
              )?.map((row, index) => (
                <TableRow hover role="checkbox" key={index}>
                  <TableCell>
                    <a href={row.link}>{row.link}</a>
                  </TableCell>
                  <TableCell align="left">{row.source}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={webpages!.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page'
                    },
                    native: true
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
      <PageRegistrationModal
        open={isRegistrationModalOpen}
        saveWebpageIsLoading={saveWebpageIsLoading}
        handleCloseRegistrationModal={handleCloseNewPageDrawer}
        handleSave={handleSave}
      />
    </Box>
  );
};

export default ProfilePage;
