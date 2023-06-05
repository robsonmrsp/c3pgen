import duotone from "components/icons/duotone";
export const navigations = [
  {
    type: "label",
    label: "Admin",
  },
  <#list application.entities as entity>
  {
    name: "${firstLower(entity.displayName)}s",
    icon: duotone.Products,
    children: [
      {
        name: "Lista de ${firstUpper(entity.displayName)}",
        path: "/${firstLower(entity.name)}/list",
      },
      {
        name: "Novo ${firstUpper(entity.displayName)}",
        path: "/${firstLower(entity.name)}/new",
      },
    ],
  },
  </#list>
  {
    type: "label",
    label: "Vendor",
  },
  {
    name: "Earnings",
    icon: duotone.ProjectChart,
    children: [
      {
        name: "Earning History",
        path: "/vendor/earning-history",
      },
      {
        name: "Payouts",
        path: "/vendor/payouts",
      },
      {
        name: "Payout Request",
        path: "/vendor/payout-requests",
      },
      {
        name: "Payout Settings",
        path: "/vendor/payout-settings",
      },
    ],
  },
  {
    name: "Logout",
    icon: duotone.Session,
    path: "/",
  },
];
