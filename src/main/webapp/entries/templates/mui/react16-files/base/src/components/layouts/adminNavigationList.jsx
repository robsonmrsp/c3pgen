import duotone from "components/icons/duotone";
export const navigations = [
  {
    type: "label",
    label: "Admin",
  },
    {
    name: "planos",
    icon: duotone.Products,
    children: [
      {
        name: "Lista de Plano",
        path: "/plan/list",
      },
      {
        name: "Novo Plano",
        path: "/plan/new",
      },
    ],
  },
  {
    name: "contatos",
    icon: duotone.Products,
    children: [
      {
        name: "Lista de Contato",
        path: "/contact/list",
      },
      {
        name: "Novo Contato",
        path: "/contact/new",
      },
    ],
  },
  {
    name: "customer historys",
    icon: duotone.Products,
    children: [
      {
        name: "Lista de Customer history",
        path: "/customerHistory/list",
      },
      {
        name: "Novo Customer history",
        path: "/customerHistory/new",
      },
    ],
  },
  {
    name: "detalhe do planos",
    icon: duotone.Products,
    children: [
      {
        name: "Lista de Detalhe do plano",
        path: "/planDetail/list",
      },
      {
        name: "Novo Detalhe do plano",
        path: "/planDetail/new",
      },
    ],
  },
  {
    name: "customers",
    icon: duotone.Products,
    children: [
      {
        name: "Lista de Customer",
        path: "/customer/list",
      },
      {
        name: "Novo Customer",
        path: "/customer/new",
      },
    ],
  },
  {
    name: "tokens",
    icon: duotone.Products,
    children: [
      {
        name: "Lista de Token",
        path: "/token/list",
      },
      {
        name: "Novo Token",
        path: "/token/new",
      },
    ],
  },
  {
    name: "parceiros",
    icon: duotone.Products,
    children: [
      {
        name: "Lista de Parceiro",
        path: "/partner/list",
      },
      {
        name: "Novo Parceiro",
        path: "/partner/new",
      },
    ],
  },
  {
    name: "statisticss",
    icon: duotone.Products,
    children: [
      {
        name: "Lista de Statistics",
        path: "/statistics/list",
      },
      {
        name: "Novo Statistics",
        path: "/statistics/new",
      },
    ],
  },
  {
    name: "usuários",
    icon: duotone.Products,
    children: [
      {
        name: "Lista de Usuário",
        path: "/user/list",
      },
      {
        name: "Novo Usuário",
        path: "/user/new",
      },
    ],
  },
  {
    name: "papels",
    icon: duotone.Products,
    children: [
      {
        name: "Lista de Papel",
        path: "/role/list",
      },
      {
        name: "Novo Papel",
        path: "/role/new",
      },
    ],
  },
  {
    name: "permissãos",
    icon: duotone.Products,
    children: [
      {
        name: "Lista de Permissão",
        path: "/permission/list",
      },
      {
        name: "Novo Permissão",
        path: "/permission/new",
      },
    ],
  },
  {
    name: "grupo de Permissõess",
    icon: duotone.Products,
    children: [
      {
        name: "Lista de Grupo de Permissões",
        path: "/group/list",
      },
      {
        name: "Novo Grupo de Permissões",
        path: "/group/new",
      },
    ],
  },
  {
    name: "items",
    icon: duotone.Products,
    children: [
      {
        name: "Lista de Item",
        path: "/item/list",
      },
      {
        name: "Novo Item",
        path: "/item/new",
      },
    ],
  },
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
