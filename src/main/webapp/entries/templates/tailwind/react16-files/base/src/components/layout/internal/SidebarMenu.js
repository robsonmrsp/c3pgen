import React from "react";
import SidebarMenuItem from "./SidebarMenuItem";

const pags = [
  {
    name: "Filmes",
    children: [
      {
        name: "Novo",
        link: "/adm/movie/create",
      },
      {
        name: "Lista",
        link: "/adm/movie/list",
      },
    ],
  },
];
function SidebarMenu({ pages = [...pags] }) {
  return (
    <ul className="space-y-2">
      {pages?.map((page) => {
        return <SidebarMenuItem page={page} key={page.name} />;
      })}
    </ul>
  );
}

export default SidebarMenu;
