import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useWebpage from '../../../../hooks/webpage/useWebpage';
import Loading from '../../../Loading/Loading';
import ReloadButton from '../../../ReloadButton/ReloadButton';
import styles from './styles';
import { toast } from 'react-toastify';
import WebpageInputModal from '../PageRegistrationModal/WebpageInputModal';
import { Source, Webpage } from '../../../../types/webpage';
import { WebpageRequest } from '../../../../hooks/webpage/types';
import LinkIcon from '@mui/icons-material/Link';
import Link from '@mui/material/Link';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';

export interface Column {
  id: string;
  label: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  align?: 'right' | 'left' | 'center';
}

const columns: Column[] = [
  { id: 'webpage', label: 'Link da página', align: 'left', width: '60%' },
  { id: 'source', label: 'Origem', align: 'left' },
  { id: 'actions', label: 'Ações', align: 'center' }
];

const editModalTitle = 'Edição de página';
const editModalText = 'Atualize as informações referentes à página abaixo';

export interface WebpageTableProps {
  handleDelete: (webpageId: string) => void;
}

const WebpageTable = ({ handleDelete }: WebpageTableProps) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
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

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedWebpages = useMemo(() => {
    return rowsPerPage > 0
      ? webpages?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : webpages;
  }, [webpages, page, rowsPerPage]);

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
            {displayedWebpages?.map((row, index) => {
              const linkLabel = row.link.replace('https://', '');
              const sourceLabel = row.source.charAt(0).toUpperCase() + row.source.slice(1);
              return (
                <TableRow hover role="checkbox" key={index}>
                  <TableCell sx={styles.linkCellContainer}>
                    <LinkIcon color="action" sx={{ rotate: '-45deg' }} />
                    <Link href={row.link} underline="hover" target="_blank">
                      {linkLabel}
                    </Link>
                  </TableCell>
                  <TableCell align="left">
                    <Box sx={styles.sourceCellContainer}>
                      {row.source === Source.FACEBOOK && <FacebookOutlinedIcon />}
                      {row.source === Source.INSTAGRAM && <InstagramIcon />}
                      {sourceLabel}
                    </Box>
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
              );
            })}
          </TableBody>
        </Table>

        <TableFooter sx={styles.tableFooterContainer}>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[20, 30, 40, 50, { label: 'Tudo', value: -1 }]}
              colSpan={3}
              count={webpages.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'Linhas por página'
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
