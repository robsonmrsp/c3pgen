/* User´s Search Page generated by JSetup v0.95 :  at 2 de jun de 2023 19:04:24  */
import { useEffect, useState } from 'react';
import Head from 'next/head';
import dayjs from 'dayjs';
import Router from 'next/router';
import { Box,Stack, Container, Typography, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'
import { DatePicker } from '@mui/x-date-pickers';
import DashboardLayout from "components/layouts/admin";

import { ActionCell } from '@/components/grid/ActionCell';
import HttpRequest from '@/lib/HttpRequest'
const toFilterUser = (values) => {
  return { 
    ...values,
  }
}

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Nome',
    width: 150,
    editable: false,
  },	
  {
    field: 'username',
    headerName: 'Username',
    width: 150,
    editable: false,
  },	
  {
    field: 'email',
    headerName: 'E-mail',
    width: 150,
    editable: false,
  },	
  {
    field: 'password',
    headerName: 'Senha',
    width: 150,
    editable: false,
  },	
  {
    field: 'enable',
    headerName: 'Ativo?',
    width: 150,
    editable: false,
  },	
  {
    field: 'image',
    headerName: 'Foto',
    width: 150,
    editable: false,
  },	
  {
    field: 'print',
    headerName: 'Ações',
    sortable: false,
    filterable: false,
    editable: false,
    width: 150,
    disableColumnMenu: false,
    renderCell: (cellValues) => <ActionCell
      {...cellValues}
      onEdit={(row) => {
        Router
          .push('/user/edit/' + row.id)
          .catch(console.error);
      }}
      onDelete={(row) => {
        console.log("Removendo o registro ", row);
      }}
    />
  }
];


const Page = () => {
  const service = new HttpRequest("/api/crud/users");

  const [pageSize, setPageSize] = useState(5);
  const [pageItems, setPageItems] = useState([]);

  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({ field: 'id', sort: 'desc' });
  const [values, setValues] = useState({
    name: '',	
    username: '',	
    email: '',	
    password: '',	
    enable:false,
    image: '',	
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await service.getPage({ page, pageSize, orderBy: sort.field, direction: sort.sort, ...filter });

      const json = await response.data;
      setPageItems(json.items);
      setTotalItems(json.totalRecords);
    }
    fetchData()
      .catch(console.error);;
  }, [pageSize, page, sort, filter])

  // sortmodel é um array, pegar apenas o primeiro elemento
  const sortChange = (sortModels, detail) => {
    const [sortModel = {}] = sortModels;
    setSort(sortModel);
  }

  const pageChange = (newPageNumber, detail) => {
    console.log(newPageNumber)
    setPage(newPageNumber + 1);
  }

  const searchByFilter = () => {

    setFilter(toFilterUser(values));
  }
  const pageSizeChange = (newPageSize, detail) => {
    console.log(newPageSize)
    setPageSize(newPageSize)
  }

  return (
    <Box py={4}>
        <Head>
          <title>
            Listagem de Users
          </title>
        </Head>
        <Card>
          <CardHeader
            title="Filtro de pesquisa"
          />
          <Divider />
          <CardContent>
            <TextField
              fullWidth
              label="Nome"
              margin="normal"
              name="name"
              onChange={handleChange}
              type="text"
              value={values.name}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Username"
              margin="normal"
              name="username"
              onChange={handleChange}
              type="text"
              value={values.username}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="E-mail"
              margin="normal"
              name="email"
              onChange={handleChange}
              type="text"
              value={values.email}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Senha"
              margin="normal"
              name="password"
              onChange={handleChange}
              type="text"
              value={values.password}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Foto"
              margin="normal"
              name="image"
              onChange={handleChange}
              type="text"
              value={values.image}
              variant="outlined"
            />
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              p: 2
            }}
          >
            <Stack direction="row" spacing={2}>
              <Button
                color="primary"
                variant="contained"
                onClick={searchByFilter}
              >
                Pesquisar
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => Router.push('/user/new').catch(console.error)}
              >
                Novo
              </Button>
            </Stack>
          </Box>
        </Card>
        <Card>
          <CardHeader
            title="Listagem"
          />
          <Divider />
          <CardContent>
            <Box sx={{ pt: 3 }}>
              <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={pageItems}
                  columns={columns}
                  pageSize={pageSize}
                  rowCount={totalItems}
                  rowsPerPageOptions={[5, 10, 20]}
                  onSortModelChange={sortChange}
                  onPageChange={pageChange}
                  onPageSizeChange={pageSizeChange}
                  sortingMode='server'
                  paginationMode='server'
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
    </Box>
  );
};


Page.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page;
