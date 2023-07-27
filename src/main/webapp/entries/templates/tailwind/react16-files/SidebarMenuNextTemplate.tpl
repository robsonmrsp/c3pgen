import React from "react";
import SidebarMenuItem from "./SidebarMenuItem";

const pags = [
<#list application.entities as entity>
  {
    name: "${firstUpper(entity.displayName)}",
    children: [
      {
        name: "Novo",
        link: "/adm/${firstLower(entity.name)}/create",
      },
      {
        name: "Lista",
        link: "/adm/${firstLower(entity.name)}/list",
      },
    ],
  },
</#list>
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
