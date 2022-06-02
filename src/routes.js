// import
import Dashboard from "views/Dashboard/Dashboard";
import Tables from "views/Dashboard/Tables";

import Personas from "views/Dashboard/Personas";
import Perfil from "views/Dashboard/Perfil";
import Perfil1 from "views/Dashboard/Perfil1";
import Cargos from "views/Dashboard/Cargos";
import Sedes from "views/Dashboard/Sedes";
import Organos from "views/Dashboard/Organos";
import Oficinas from "views/Dashboard/Oficinas";

import Billing from "views/Dashboard/Billing";
import RTLPage from "views/Dashboard/RTL";
import Profile from "views/Dashboard/Profile";
import SignIn from "views/Auth/SignIn.js";
import SignUp from "views/Auth/SignUp.js";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon
} from "components/Icons/Icons";

import { FaUsers } from 'react-icons/fa';


var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   rtlName: "لوحة القيادة",
  //   icon: <StatsIcon color="inherit" />,
  //   component: Tables,
  //   layout: "/admin",
  // },
  {
    name: "ADMIN PAGES",
    category: "account",
    rtlName: "صفحات",
    state: "pageCollapse",
    views: [
    {
      path: "/personas",
      name: "Personas",
      rtlName: "personas",
      icon: <FaUsers color="inherit" />,
      component: Personas,
      layout: "/admin",
    },
    {
      path: "/perfiles",
      name: "Perfil",
      rtlName: "perfiles",
      icon: <FaUsers color="inherit" />,
      component: Perfil,
      layout: "/admin",
      exact: true,
    },
    {
      path: "/perfiles1",
      name: "Perfil1",
      rtlName: "perfiles1",
      icon: <FaUsers color="inherit" />,
      component: Perfil1,
      layout: "/admin",
      exact: true,
    },
    {
      path: "/cargos",
      name: "Cargos",
      rtlName: "cargos",
      icon: <FaUsers color="inherit" />,
      component: Cargos,
      layout: "/admin",
      exact: true,
    },
    {
      path: "/sedes",
      name: "Sedes",
      rtlName: "sedes",
      icon: <FaUsers color="inherit" />,
      component: Sedes,
      layout: "/admin",
      exact: true,
    },
    {
      path: "/organos",
      name: "Organos",
      rtlName: "organos",
      icon: <FaUsers color="inherit" />,
      component: Organos,
      layout: "/admin",
      exact: true,
    },
    {
      path: "/oficinas",
      name: "Oficinas",
      rtlName: "oficinas",
      icon: <FaUsers color="inherit" />,
      component: Oficinas,
      layout: "/admin",
      exact: true,
    },
  ]
  },
  // {
  //   path: "/perfiles/all",
  //   name: "All",
  //   rtlName: "لوحة القيادة",
  //   icon: <FaUsers color="inherit" />,
  //   component: Perfil,
  //   layout: "/admin",
  // },
  // {
  //   path: "/billing",
  //   name: "Billing",
  //   rtlName: "لوحة القيادة",
  //   icon: <CreditIcon color="inherit" />,
  //   component: Billing,
  //   layout: "/admin",
  // },
  // {
  //   path: "/rtl-support-page",
  //   name: "RTL",
  //   rtlName: "آرتيإل",
  //   icon: <SupportIcon color="inherit" />,
  //   component: RTLPage,
  //   layout: "/rtl",
  // },
  {
    name: "ACCOUNT PAGES",
    category: "account",
    rtlName: "صفحات",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Profile",
        rtlName: "لوحة القيادة",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/admin",
      },
      {
        path: "/signin",
        name: "Sign In",
        rtlName: "لوحة القيادة",
        icon: <DocumentIcon color="inherit" />,
        component: SignIn,
        layout: "/auth",
      },
      {
        path: "/signup",
        name: "Sign Up",
        rtlName: "لوحة القيادة",
        icon: <RocketIcon color="inherit" />,
        secondaryNavbar: true,
        component: SignUp,
        layout: "/auth",
      },
    ],
  },
];

export default dashRoutes;