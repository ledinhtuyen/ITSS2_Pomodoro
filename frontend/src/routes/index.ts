import DefaultLayout from "../layouts";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";

const publicRoutes = [
  {
    path: "",
    component: Home,
    layout: null,
  },
  {
    path: "/404",
    component: ErrorPage,
    layout: DefaultLayout,
  },
];

export { publicRoutes };
