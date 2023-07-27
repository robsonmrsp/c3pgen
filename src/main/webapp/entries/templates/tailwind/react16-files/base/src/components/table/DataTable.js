import React, { useState } from "react";
import Pagination from "@/components/table/components/Pagination";
import Counter from "@/components/table/components/Counter";
import ColumnHeader from "@/components/table/components/ColumnHeader";

const DataTable = ({
  pager = {},
  onChangePager,
  pagerRequest,
  fetching,
  columns,
}) => {
  const [pagerState, setPagerState] = useState(pagerRequest);

  const { items } = pager;
  return (
    <div>
      <div className=" w-full p-4 my-4 bg-white rounded">
        <div className="overflow-x-auto ">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg grid grid-cols-1 divide-y ">
            <div className="grid grid-cols-2  bg-white p-2 rounded pb-3 text-gray-900">
              <div className="justify-items-start">
                <Counter
                  initialPageSize={pager.pageSize}
                  onChangeCounter={(newPageSize) =>
                    onChangePager({ ...pagerRequest, pageSize: newPageSize })
                  }
                />
              </div>
              <div className="grid justify-items-end">
                <div className=" maxw-fit">
                  <label className=" text-sm">
                    Pesquisa:
                    <input
                      type="text"
                      placeholder="Digite aqui sua pesquisa"
                      className="input sm:w-64 md:w-80 lg:w-96  input-bordered input- mx-w-fit"
                    />
                  </label>
                </div>
              </div>
            </div>

            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700   uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-800 ">
                <tr>
                  {columns?.map((column) => {
                    return (
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm  text-left text-gray-800 uppercase bg-white border-b border-gray-200 "
                      >
                        <ColumnHeader
                          column={column}
                          order={pagerRequest.order}
                          orderBy={pagerRequest.orderBy}
                          onchangeOrder={({ order, orderBy }) =>
                            onChangePager({ ...pagerRequest, order, orderBy })
                          }
                        />
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {items?.map((item) => (
                  <tr key={item.id}>
                    {columns?.map(({ name, formatter, Cell }) => {
                      return (
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <div className="flex items-center">
                            <div className="flex-shrink-0"></div>
                            <div className="">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {Cell ? (
                                  <Cell item={item} attribute={name} />
                                ) : formatter ? (
                                  formatter(item[name])
                                ) : (
                                  item[name]
                                )}
                              </p>
                            </div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="grid grid-cols-2 gap-4 bg-white p-1 rounded pb-2 text-gray-900">
              <div className="justify-items-start top-10 ">
                <div className="pt-2">
                  {fetching
                    ? "Consultando..."
                    : `Mostrando Registros ${
                        (pager.actualPage - 1) * pager.pageSize + 1
                      } ao ${pager.actualPage * pager.pageSize} de ${
                        pager.totalRecords
                      }`}
                </div>
              </div>
              <div className="grid justify-items-end">
                <Pagination
                  actualPage={pager.actualPage}
                  pageSize={pager.pageSize}
                  totalRecords={pager.totalRecords}
                  totalPages={pager.totalRecords}
                  onChangePageNumber={(newPage) =>
                    onChangePager({ ...pagerRequest, page: newPage })
                  }
                />
              </div>
            </div>
            <div className="flex items-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DataTable;
