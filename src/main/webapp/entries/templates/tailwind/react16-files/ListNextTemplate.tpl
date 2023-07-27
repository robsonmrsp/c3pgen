"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import BasicPanel from "@/components/panels/basic/BasicPanel";
import DataTable from "@/components/table/DataTable";
import HttpRequest from "@/lib/HttpRequest";

import BasicActionCell from "@/components/table/components/BasicActionCell";

const httpRequest = new HttpRequest("/rs/crud/${firstLower(entity.name)}s");

const getPager${firstUpper(entity.name)}s = async (pagerRequest) => {
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

const List${firstUpper(entity.name)}s = () => {
  const [pagerRequest, setPagerRequest] = useState({});
  const router = useRouter();

  const {
    data: pager,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["${firstLower(entity.name)}s", pagerRequest],
    queryFn: () => getPager${firstUpper(entity.name)}s(pagerRequest),
    keepPreviousData: true,
    staleTime: 5000,
  });

  const columns = [
    { name: "id", type: "number" },
<#list entity.attributes as att>
    {
      name: "${firstUpper(att.name)}",
      label: "${firstUpper(att.displayName)}",
      type: "${att.type.className}",
      formatter: (fieldValue) => fieldValue,
    },
</#list>
    {
      name: "actions",
      label: "Actions",
      type: "cell",
      Cell: ({ item, attribute }) => (
        <BasicActionCell
          item={item}
          onEditItem={() => {
            router.push(`/adm/${firstLower(entity.name)}/${r"${item.id}"}`);
          }}
          onDeleteItem={() => {
            console.log(`Removendo o item ${r"${item.id}"}`);
          }}
        />
      ),
    },
  ];

  return (
    <BasicPanel panelName={"List of ${firstUpper(entity.displayName)}s"}>
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

export default List${firstUpper(entity.name)}s;
