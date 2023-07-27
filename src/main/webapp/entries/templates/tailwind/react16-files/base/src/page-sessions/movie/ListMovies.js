"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import BasicPanel from "@/components/panels/basic/BasicPanel";
import DataTable from "@/components/table/DataTable";
import HttpRequest from "@/lib/HttpRequest";
import { useRouter } from "next/navigation";
import BasicActionCell from "@/components/table/components/BasicActionCell";
const httpRequest = new HttpRequest("/rs/crud/movies");

const getPagerMovies = async (pagerRequest) => {
  const { page = 1, pageSize = 5, order, orderBy } = pagerRequest;

  const res = await httpRequest.getPage({
    page,
    pageSize,
    orderBy,
    direction: order,
  });

  const pager = await res.data;
  return pager;
};

const ListMovies = () => {
  const [pagerRequest, setPagerRequest] = useState({});
  const router = useRouter();

  const {
    data: pager,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["movies", pagerRequest],
    queryFn: () => getPagerMovies(pagerRequest),
    keepPreviousData: true,
    staleTime: 5000,
  });

  const columns = [
    { name: "id", type: "number" },
    { name: "title", label: "Título", type: "string" },
    {
      name: "budget",
      label: "Orçamento",
      type: "number",
      formatter: (number) => `R$ ${number},00`,
    },
    { name: "overview", label: "Sinópse", type: "string" },
    { name: "releaseDate", label: "Lançamento", type: "string" },
    {
      name: "revenue",
      label: "Receita",
      type: "number",
      formatter: (number) => `R$ ${number},00`,
    },
    {
      name: "actions",
      label: "Actions",
      type: "cell",
      Cell: ({ item, attribute }) => (
        <BasicActionCell
          item={item}
          onEditItem={() => {
            router.push(`/adm/movie/${item.id}`);
          }}
          onDeleteItem={() => {
            console.log(`Deletando o item ${item.id}`);
          }}
        />
      ),
    },
  ];

  return (
    <BasicPanel panelName={"List of Movies"}>
      <DataTable
        onChangePager={(newPagerRequest) => setPagerRequest(newPagerRequest)}
        pager={pager}
        pagerRequest={pagerRequest}
        fetching={isFetching}
        columns={columns}
      />
    </BasicPanel>
  );
};

export default ListMovies;
