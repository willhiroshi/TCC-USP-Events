import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import { useTheme } from '@mui/material/styles';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import useWebpage from '../../../../hooks/webpage/useWebpage';
import Loading from '../../../Loading/Loading';
import ReloadButton from '../../../ReloadButton/ReloadButton';
import styles from './styles';
import { toast } from 'react-toastify';
import WebpageInputModal from '../PageRegistrationModal/WebpageInputModal';
import { Source, Webpage } from '../../../../types/webpage';
import { WebpageRequest } from '../../../../hooks/webpage/types';

export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
}

const columns: Column[] = [
  { id: 'webpage', label: 'Link da página', align: 'left' },
  { id: 'source', label: 'Origem', align: 'left' },
  { id: 'actions', label: 'Ações', align: 'center' }
];

const editModalTitle = 'Edição de página';
const editModalText = 'Atualize as informações referentes à página abaixo:';

export interface WebpageTableProps {
  handleDelete: (webpageId: string) => void;
}

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

const TablePaginationActions = (props: TablePaginationActionsProps) => {
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
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
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
};

const WebpageTable = ({ handleDelete }: WebpageTableProps) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [webpageToEdit, setWebpageToEdit] = useState<Webpage>();

  const { getWebpages, editWebpage } = useWebpage();
  const { mutateAsync: mutateAsyncEditWebpage, isLoading: editWebpageIsLoading } = editWebpage;

  const {
    data: webpages,
    isLoading: webpagesIsLoading,
    isError: webpagesIsError,
    refetch: webpagesRefetch
  } = getWebpages();

  if (webpagesIsLoading || webpagesIsError) {
    if (webpagesIsError) {
      toast.error('Erro ao carregar páginas!');
    }

    return (
      <Box sx={styles.loadingErrorContainer}>
        {webpagesIsLoading ? <Loading /> : <ReloadButton onReload={webpagesRefetch} />}
      </Box>
    );
  }

  const rows = webpages || [];

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenEditWebpageModal = (webpage: Webpage) => {
    setWebpageToEdit(webpage);
    setIsEditModalOpen(true);
  };

  const handleCloseEditWebpageModal = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteWebpage = (webpageId: string) => {
    handleDelete(webpageId);
  };

  const handleEditWebpage = async (link: string, source: Source) => {
    const webpageId = webpageToEdit?.id;
    const webpageRequest: WebpageRequest = {
      id: webpageId,
      link,
      source
    };

    await mutateAsyncEditWebpage({ webpageRequest })
      .then(() => {
        toast.success('Página editada com sucesso');
        setIsEditModalOpen(false);
        webpagesRefetch();
      })
      .catch((error) => {
        switch (error.response?.status) {
          case 400:
            toast.error('Página já cadastrada!');
            break;
          default:
            toast.error('Erro ao editar página');
            break;
        }
      });
  };

  return (
    <Box sx={{ height: '100%' }}>
      <TableContainer sx={styles.tableContainer}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: 'bold', fontSize: '16px' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            )?.map((row, index) => (
              <TableRow hover role="checkbox" key={index}>
                <TableCell>
                  <a href={row.link}>{row.link}</a>
                </TableCell>
                <TableCell align="left">
                  {row.source.charAt(0).toUpperCase() + row.source.slice(1)}
                </TableCell>
                <TableCell sx={styles.actionButtons} align="center">
                  <IconButton
                    sx={{ color: 'blue' }}
                    onClick={() => handleOpenEditWebpageModal(row)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton sx={{ color: 'red' }} onClick={() => handleDeleteWebpage(row.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TableFooter sx={styles.tableFooterContainer}>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
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
      </TableContainer>

      {isEditModalOpen && (
        <WebpageInputModal
          open={isEditModalOpen}
          dialogTitle={editModalTitle}
          dialogText={editModalText}
          webpageToEdit={webpageToEdit}
          handleCloseRegistrationModal={handleCloseEditWebpageModal}
          saveWebpageIsLoading={editWebpageIsLoading}
          handleSave={handleEditWebpage}
        />
      )}
    </Box>
  );
};

export default WebpageTable;
