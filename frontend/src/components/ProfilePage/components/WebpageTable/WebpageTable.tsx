import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';

import useWebpage from '../../../../hooks/webpage/useWebpage';
import Loading from '../../../Loading/Loading';
import ReloadButton from '../../../ReloadButton/ReloadButton';
import styles from './styles';
import { toast } from 'react-toastify';
import LinkIcon from '@mui/icons-material/Link';
import Link from '@mui/material/Link';
import { Source } from '../../../../types/webpage';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';

export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
}

const columns: Column[] = [
  { id: 'webpage', label: 'Link da página', align: 'left' },
  { id: 'source', label: 'Origem', align: 'left' },
  { id: 'actions', label: 'Ações', align: 'right' }
];

const WebpageTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const { getWebpages } = useWebpage();

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

  const displayedWebpages = useMemo(() => {
    return rowsPerPage > 0
      ? webpages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : webpages;
  }, [webpages, page, rowsPerPage]);

  return (
    <TableContainer sx={styles.tableContainer}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
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
                  <Box sx={styles.linkCellContainer}>
                    {row.source === Source.FACEBOOK && <FacebookOutlinedIcon />}
                    {row.source === Source.INSTAGRAM && <InstagramIcon />}
                    {sourceLabel}
                  </Box>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <TableFooter sx={styles.tableFooterContainer}>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[20, 30, 40, 50, { label: 'All', value: -1 }]}
            colSpan={3}
            count={webpages.length}
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
  );
};

export default WebpageTable;
