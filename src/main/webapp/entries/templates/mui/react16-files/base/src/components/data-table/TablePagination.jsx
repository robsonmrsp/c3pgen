import { Box, Pagination, Stack, styled } from "@mui/material";
import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    fontSize: 14,
    fontWeight: 500,
    color: theme.palette.grey[900],
    border: `1px solid transparent`,
  },
  "& .MuiPaginationItem-page:hover": {
    borderRadius: 20,
    backgroundColor: "transparent",
    color: theme.palette.info.main,
    border: `1px solid ${theme.palette.info.main}`,
  },
  "& .MuiPaginationItem-page.Mui-selected": {
    borderRadius: 20,
    backgroundColor: "transparent",
    color: theme.palette.info.main,
    border: `1px solid ${theme.palette.info.main}`,
    ":hover": {
      backgroundColor: "transparent",
    },
  },
  "& .MuiPaginationItem-previousNext": {
    margin: 10,
    borderRadius: 20,
    color: theme.palette.info.main,
    border: `1px solid ${theme.palette.info.main}`,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));
const ThePagination = (props) => <StyledPagination {...props} />;



// TODO no futuro esse componente deve se comportar diferente dependendo do device, 
// vai ficar uma linha para o counter e uma para o pagination

// Tem que fazer os calculos 
const TablePagination = ({ onChangePagination, pager = {} }) => {

  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount, setPageCount] = React.useState(10);


  useEffect(() => {
    onChangePagination && onChangePagination({ pageSize, page })
    console.log("page, pageSize, pageCount", page, pageSize, pageCount)
  }, [page, pageCount]);

  useEffect(() => {
    const pagerTotalRecords = pager.totalRecords || 0
    const pagerPageSize = pageSize || 10
    const totalPages = Math.ceil(pagerTotalRecords / pagerPageSize)

    if (page > totalPages) {
      setPage(1);
    }
    if (totalPages > 10) {
      setPageCount(totalPages);
    } else if ((pagerTotalRecords / pagerPageSize) > 5) {
      setPageCount(5);
    } else {
      setPageCount(2);
    }
  }, [pager, pageSize]);

  const handleNewPage = (newPage) => {
    console.log(newPage);
    setPage(newPage);
  }

  const handleNewPageSize = (newPageSize) => {
    console.log(newPageSize);
    setPageSize(newPageSize)
  }

  return <Stack
    direction="row"
    justifyContent="flex-end"
    alignItems="flex-start"
    spacing={2}
  >
    <Stack
      direction="row"
      justifyContent="flex-end"
      alignItems="flex-start"
      spacing={1}
      py={1}
    >
      <Box py={1}>
        <InputLabel id="label">Registros por página</InputLabel>
      </Box>
      <NativeSelect
        onChange={(event) => handleNewPageSize(event.target.value)}
        defaultValue={pageSize}
        inputProps={{
          name: 'age',
          id: 'uncontrolled-native',
        }}
      >
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
      </NativeSelect>
    </Stack>
    <ThePagination page={page} count={pageCount} defaultPage={1} onChange={(_, newPage) => handleNewPage(newPage)} color="primary" />
  </Stack>
}
export default TablePagination;