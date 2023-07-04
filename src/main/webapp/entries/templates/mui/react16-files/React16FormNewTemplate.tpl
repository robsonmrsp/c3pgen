/* ${entity.name}´s Form generated by JSetup ${JSetupVersion} :  at ${.now} */  
import { useEffect, useState } from 'react';
import Head from 'next/head';
import dayjs from 'dayjs';
import Router from 'next/router';
import { TextField, CheckboxWithLabel } from 'formik-mui';
import { Formik, Form, Field } from 'formik';
import { DatePicker } from 'formik-mui-x-date-pickers';
import AlertMessage from "components/alert/AlertMessage";

import { Button, LinearProgress, Card, CardContent, CardHeader, Divider, Box, Stack } from '@mui/material';
import DashboardLayout from "components/layouts/admin";
import HttpRequest from '@/lib/HttpRequest'
import { useRouter } from 'next/router'

const initValues = {
<#list entity.attributes as att>
  <#if att.viewApproach?? >
	<#if att.type.className == 'Boolean' && att.viewApproach.type  == 'check'  >
  ${firstLower(att.name)}:false,
	<#elseif att.type.className == 'Date' && att.viewApproach.type  == 'datepicker' >
  ${firstLower(att.name)}: dayjs(),
	<#elseif att.viewApproach.type  == 'radiogroup'>
	<#elseif att.viewApproach.type  == 'combo'  >
	<#else>
  ${firstLower(att.name)}: '',	
	</#if>
  </#if>
</#list>              
}

const to${firstUpper(entity.name)} = (values) => {
  return { 
    ...values,
<#list entity.attributes as att>
  <#if att.viewApproach?? >
	<#elseif att.type.className == 'Date' && att.viewApproach.type  == 'datepicker' >
    ${firstLower(att.name)}: dayjs(values.${firstLower(att.name)}).format('DD/MM/YYYY'),
  </#if>
</#list>              
  }
}

const ${firstUpper(entity.name)} = () => {
  const service = new HttpRequest("/api/crud/${firstLower(entity.name)}s");
  const router = useRouter()
  const [formValues, setFormValues] = useState(initValues);
  const [alertModel, setAlertModel] = useState({ displayAlert: false, messageAlert: '' });

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
  }, [router]);

  const save = async (formValues) => {
    try {
      const response = await service.save(to${firstUpper(entity.name)}(formValues));
      const json = await response.data;
      setAlertModel({ displayAlert: true, type: 'success', messageAlert: '${firstUpper(entity.displayName)} salvo com sucesso!' });
    } catch (error) {
      setAlertModel({ displayAlert: true, type: 'error', messageAlert: 'Problemas ao salvar ${firstUpper(entity.displayName)}!' });
    }
  }


  const formValidate = (values) => {
    const errors = {};
  /*
<#list entity.attributes as att>
  <#if att.viewApproach?? >
    if (!values.${firstUpper(entity.name)}) {errors.title = 'Invalid!';}	
  </#if>
</#list>    
  */
    return errors;
  }

  return (
    <Box py={4}>
        <Head>
          <title>
            Cadastro de ${firstUpper(entity.displayName)}
          </title>
        </Head>
        <Card>
          <CardHeader
            title="Cadastro de ${firstUpper(entity.displayName)}"
          />

          <Divider />
          <CardContent>
            {alertModel.displayAlert && <AlertMessage onClickClose={() => setAlertModel({ displayAlert: false })} type={alertModel.type} message={alertModel.messageAlert} />}
            <Formik
              enableReinitialize={true}
              initialValues={formValues}
              validate={formValidate}

              onSubmit={(values, { resetForm, setSubmitting }) => {
                const { id } = values;
                save(values);
                if (!id) {
                  resetForm({ values: initValues })
                }
                setSubmitting(false);
              }}
            >
              {({ submitForm, isSubmitting }) => (
                <Form>
    <#list entity.attributes as att>
      <#if att.viewApproach?? >
        <#if att.type.className == 'Boolean' && att.viewApproach.type  == 'check'  >
                  <Box marginTop={2}>
                    <Field
                      component={CheckboxWithLabel}
                      type="checkbox"
                      name="${firstLower(att.name)}"
                      Label={{ label: '${firstUpper(att.displayName)}' }}
                    />
                  </Box>
        <#elseif att.type.className == 'Date' && att.viewApproach.type  == 'datepicker' >
                  <Box marginTop={2}>
                    <Field
                      component={DatePicker}
                      type="text"
                      name="${firstLower(att.name)}"
                      label="${firstUpper(att.displayName)}"
                      views={['year', 'month', 'day']}
                      inputFormat="DD/MM/YYYY"
                    />
                  </Box>
        <#elseif att.viewApproach.type  == 'radiogroup'>
        <#elseif att.viewApproach.type  == 'combo'  >
        <#else>
                  <Box marginTop={2}>
                    <Field
                      component={TextField}
                      name="${firstLower(att.name)}"
                      type="text"
                      label="${firstUpper(att.displayName)}"
                      variant="outlined"
                      fullWidth
                    />
                  </Box>
        </#if>
      </#if>
    </#list>
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
                        onClick={() => Router.push('/${firstLower(entity.name)}/list').catch(console.error)}
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

${firstUpper(entity.name)}.getLayout = (${firstLower(entity.name)}) => {
  return <DashboardLayout>  {${firstLower(entity.name)}} </DashboardLayout>;
};

export default ${firstUpper(entity.name)};