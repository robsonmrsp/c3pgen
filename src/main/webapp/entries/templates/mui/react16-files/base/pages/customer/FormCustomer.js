/* Customer´s Form generated by JSetup v0.95 :  at 2 de jun de 2023 19:04:24 */  
import { useEffect, useState } from 'react';
import Head from 'next/head';
import dayjs from 'dayjs';
import Router from 'next/router';
import { TextField, CheckboxWithLabel } from 'formik-mui';
import { Formik, Form, Field } from 'formik';
import { DatePicker } from 'formik-mui-x-date-pickers';

import { Button, LinearProgress, Card, CardContent, CardHeader, Divider, Box, Stack } from '@mui/material';
import DashboardLayout from "components/layouts/admin";
import HttpRequest from '@/lib/HttpRequest'
import { useRouter } from 'next/router'

const initValues = {
  code: '',	
  name: '',	
  fantasyName: '',	
  corporateName: '',	
  email: '',	
  phoneNumber: '',	
  status: '',	
  document: '',	
}

const toCustomer = (values) => {
  return { 
    ...values,
  }
}

const Customer = () => {
  const service = new HttpRequest("/api/crud/customers");
  const router = useRouter()
  const [formValues, setFormValues] = useState(initValues);
  const { id } = router.query

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const response = await service.getById(id);
        const json = await response.data;
        setFormValues(json)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData().catch(console.error);
  }, []);

  const save = async (formValues) => {
    const response = await service.save(toCustomer(formValues));
    const json = await response.data;
    console.log(json)
  }

  const formValidate = (values) => {
    const errors = {};
  /*
    if (!values.Customer) {errors.title = 'Invalid!';}	
    if (!values.Customer) {errors.title = 'Invalid!';}	
    if (!values.Customer) {errors.title = 'Invalid!';}	
    if (!values.Customer) {errors.title = 'Invalid!';}	
    if (!values.Customer) {errors.title = 'Invalid!';}	
    if (!values.Customer) {errors.title = 'Invalid!';}	
    if (!values.Customer) {errors.title = 'Invalid!';}	
    if (!values.Customer) {errors.title = 'Invalid!';}	
  */
    return errors;
  }

  return (
    <Box py={4}>
        <Head>
          <title>
            Cadastro de Customer
          </title>
        </Head>
        <Card>
          <CardHeader
            title="Novo Customer"
          />

          <Divider />
          <CardContent>
            <Formik
              enableReinitialize={true}
              initialValues={formValues}
              validate={formValidate}

              onSubmit={(values, { setSubmitting }) => {
                save(values);
                setSubmitting(false);
              }}
            >
              {({ submitForm, isSubmitting }) => (
                <Form>
                  <Box marginTop={2}>
                    <Field
                      component={TextField}
                      name="code"
                      type="text"
                      label="Code"
                      variant="outlined"
                      fullWidth
                    />
                  </Box>
                  <Box marginTop={2}>
                    <Field
                      component={TextField}
                      name="name"
                      type="text"
                      label="Name"
                      variant="outlined"
                      fullWidth
                    />
                  </Box>
                  <Box marginTop={2}>
                    <Field
                      component={TextField}
                      name="fantasyName"
                      type="text"
                      label="Fantasy name"
                      variant="outlined"
                      fullWidth
                    />
                  </Box>
                  <Box marginTop={2}>
                    <Field
                      component={TextField}
                      name="corporateName"
                      type="text"
                      label="Corporate name"
                      variant="outlined"
                      fullWidth
                    />
                  </Box>
                  <Box marginTop={2}>
                    <Field
                      component={TextField}
                      name="email"
                      type="text"
                      label="Email"
                      variant="outlined"
                      fullWidth
                    />
                  </Box>
                  <Box marginTop={2}>
                    <Field
                      component={TextField}
                      name="phoneNumber"
                      type="text"
                      label="Phone number"
                      variant="outlined"
                      fullWidth
                    />
                  </Box>
                  <Box marginTop={2}>
                    <Field
                      component={TextField}
                      name="status"
                      type="text"
                      label="Status"
                      variant="outlined"
                      fullWidth
                    />
                  </Box>
                  <Box marginTop={2}>
                    <Field
                      component={TextField}
                      name="document"
                      type="text"
                      label="Document"
                      variant="outlined"
                      fullWidth
                    />
                  </Box>
                  {isSubmitting && <LinearProgress />}
                  <Divider />
                  <Box marginTop={2}>
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        onClick={submitForm}
                      >
                        Salvar
                      </Button>
                      <Button
                        variant="text"
                        color="secondary"
                        disabled={isSubmitting}
                        onClick={() => Router.push('/customer/list').catch(console.error)}
                      >
                        Ver listagem
                      </Button>
                    </Stack>
                  </Box>
                </Form>
              )}
            </Formik>
          </CardContent>
          <Divider />
        </Card>
    </Box>
  );
};

Customer.getLayout = (customer) => {
  return <DashboardLayout>  {customer} </DashboardLayout>;
};

export default Customer;