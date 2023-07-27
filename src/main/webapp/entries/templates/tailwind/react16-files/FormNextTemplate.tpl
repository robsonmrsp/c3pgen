/* ${entity.name}´s form component generated by JSetup ${JSetupVersion} :  at ${.now}  */
"use client";
import React from "react";
import Link from "next/link";

import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useQuery, useMutation } from "@tanstack/react-query";

import { DateField } from "@/components/forms/inputs/DateField";
import { Switch } from "@/components/forms/inputs/Switch";
import BasicPanel from "@/components/panels/basic/BasicPanel";

import HttpRequest from "@/lib/HttpRequest";

const httpRequest = new HttpRequest("/api/crud/${firstLower(entity.name)}s");

// Another Example age: Yup.number().required().positive().integer(),
const ${firstLower(entity.name)}Schema = Yup.object().shape({
<#list entity.attributes as att>
    <#if isNumeric(att.type.className)>
      <#if att.required >
    ${firstLower(att.name)}: Yup.number().required("${firstUpper(att.displayName)} deve ser informado!"),
      <#else>
    ${firstLower(att.name)}: Yup.number(),
      </#if>
    <#else>
      <#if att.required >
    ${firstLower(att.name)}: Yup.string().required("${firstUpper(att.displayName)} deve ser informado!"),
      <#else>
    ${firstLower(att.name)}: Yup.string(),
      </#if>
    </#if>
</#list>
});

const save${firstUpper(entity.name)} = async (${firstLower(entity.name)}) => {
  const res = await httpRequest.save(${firstLower(entity.name)});
  const ${firstLower(entity.name)}Res = await res.data;
  return ${firstLower(entity.name)}Res;
};

const get${firstUpper(entity.name)} = async (id) => {
  const res = await httpRequest.getById(id);
  const ${firstLower(entity.name)} = await res.data;
  return ${firstLower(entity.name)};
};

export default function Form${firstUpper(entity.name)}({ ${firstLower(entity.name)}Id }) {
  const {
    data: ${firstLower(entity.name)} = {},
    isLoading,
    isFetching,
    error,
  } = useQuery({
    enabled: !!${firstLower(entity.name)}Id,
    queryKey: ["hydrate-${firstLower(entity.name)}-id", { id: +${firstLower(entity.name)}Id }],
    queryFn: () => get${firstUpper(entity.name)}(${firstLower(entity.name)}Id),
  });

  const mutation = useMutation({
    mutationFn: (${firstLower(entity.name)}) => {
      return save${firstUpper(entity.name)}(${firstLower(entity.name)});
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        ["hydrate-${firstLower(entity.name)}-id", { id: +variables.id }],
        data
      );
    },
  });

  return (
    <>
      <BasicPanel panelName={"Cadastro de ${firstUpper(entity.displayName)}"}>
        <Formik
          enableReinitialize={true}
          initialValues={{ ...${firstLower(entity.name)} }}
          validationSchema={${firstLower(entity.name)}Schema}
          onSubmit={(values, actions) => {
            actions.resetForm();
            mutation.mutate(values);
          }}
        >
          {({ values, errors, isSubmitting }) => (
            <Form>
  <#list entity.attributes as att>
    <#if att.viewApproach?? >
      <#if att.type.className == 'Boolean' && att.viewApproach.type  == 'check'  >
              <div className="py-2">
                <label
                  htmlFor="${firstLower(att.name)}"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  ${firstUpper(att.displayName)}
                </label>

                <div className="flex items-center">
                  <label className="text-sm text-gray-500 mr-3 dark:text-gray-400">
                    Sim
                  </label>
                  <Switch
                    name="${firstLower(att.name)}"
                    id="${firstLower(att.name)}"
                    className="relative shrink-0 w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-blue-600 rounded-full cursor-pointer transition-colors ease-in-out duration-200 border border-transparent ring-1 ring-transparent focus:border-blue-600 focus:ring-blue-600 ring-offset-white focus:outline-none appearance-none dark:bg-gray-700 dark:checked:bg-blue-600 dark:focus:ring-offset-gray-800   before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-blue-200"
                  />
                  <label className="text-sm text-gray-500 ml-3 dark:text-gray-400">
                    Não
                  </label>
                </div>
              </div>
      <#elseif att.type.className == 'Date' && att.viewApproach.type  == 'datepicker' >
              <div className="py-2">
                <label
                  htmlFor="${firstLower(att.name)}"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  ${firstUpper(att.displayName)}
                </label>
                <DateField
                  id="${firstLower(att.name)}"
                  name="${firstLower(att.name)}"
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                />
                <ErrorMessage
                  component="p"
                  className="text-sm text-red-600 mt-2"
                  name="${firstLower(att.name)}"
                />
              </div>

      <#elseif att.viewApproach.type  == 'radiogroup'>
      <#elseif att.viewApproach.type  == 'combo'>
              <div className="py-2">
                <label
                  htmlFor="${firstLower(att.name)}"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  ${firstUpper(att.displayName)}
                </label>
                <Field
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  as={"select"}
                  name="${firstLower(att.name)}"
                  id="${firstLower(att.name)}"
                >
                  <option value="">Open this select menu</option>

                </Field>
              </div>
      <#elseif att.viewApproach.type  == 'textarea'  >
              <div className="py-2">
                <label
                  htmlFor="${firstLower(att.name)}"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  ${firstUpper(att.displayName)}
                </label>
                <Field
                  id="${firstLower(att.name)}"
                  name="${firstLower(att.name)}"
                  as={"textarea"}
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                />
                <ErrorMessage
                  component="p"
                  className="text-sm text-red-600 mt-2"
                  name="${firstLower(att.name)}"
                />
              </div>
      <#else>
              <div className="py-2">
                <label
                  htmlFor="${firstLower(att.name)}"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  ${firstUpper(att.displayName)}
                </label>
                <Field
                  id="${firstLower(att.name)}"
                  name="${firstLower(att.name)}"
                  type="text"
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                />
                <ErrorMessage
                  component="p"
                  className="text-sm text-red-600 mt-2"
                  name="${firstLower(att.name)}"
                />
              </div>
      </#if>
    </#if>
  </#list>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
              <div className="flex space justify-start py-8 col-span-6">
                <div className="pr-2">
                  <button className="btn btn-info" type="submit">
                    Salvar
                  </button>
                </div>
                <div className="pl-2">
                  <Link href="/adm/${firstLower(entity.name)}/list">
                    <button className="btn btn-neutral">
                      Voltar para a listagem
                    </button>
                  </Link>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </BasicPanel>
    </>
  );
}
