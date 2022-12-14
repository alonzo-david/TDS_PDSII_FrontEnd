import views from "../../view";

/**
 * HOME ROUTE
 */
const HOME_ROUTE = {
  component: views.Home,
  path: "/",
};

/*
 * PUBLIC ROUTES
 */
const PUBLIC_ROUTES = [
  {
    component: views.Login,
    path: "/Login",
  },

  {
    component: views.Registrar,
    path: "/Registrar",
  },
  {
    component: views.Welcome,
    path: "/Welcome",
  },
  /*{
    component: views.NotFound,
    path: "/404",
  },*/
];

/*
 * PRIVATE ROUTES
 */
const PRIVATE_ROUTES = [
  {
    component: views.Dashboard,
    path: "/Dashboard",
  },
  {
    component: views.Partida,
    path: "/Partida",
  },
  {
    component: views.Perfil,
    path: "/Perfil",
  },
];

/*
 * ADMIN ROUTES
 */
const ADMIN_ROUTES = [
  {
    component: views.DashboardAdmin,
    path: "/DashboardAdmin",
  },
  {
    component: views.Perfil,
    path: "/PerfilAdmin",
  },
  {
    component: views.ConfigApi,
    path: "/ConfigApi",
  },
];

/*
 * USER ROUTES
 */
const USER_ROUTES = [
  {
    component: views.Dashboard,
    path: "/Dashboard",
  },
  {
    component: views.Partida,
    path: "/Partida",
  },
  {
    component: views.Perfil,
    path: "/Perfil",
  },
];

const NOT_FOUND_ROUTE = {
  component: views.NotFound,
};

/*
 * ROUTES
 */
const ROUTES = {
  HOME: HOME_ROUTE,
  PUBLIC: PUBLIC_ROUTES,
  PRIVATE: PRIVATE_ROUTES,
  ADMIN: ADMIN_ROUTES,
  USER: USER_ROUTES,
  NOT_FOUND: NOT_FOUND_ROUTE,
};

export default ROUTES;
