import DefaultLayout from "../layouts";
import ErrorPage from "../pages/ErrorPage";
import Exercise from "../pages/Exercise";
import Home from "../pages/Home";
import Likes from "../pages/Likes";

export enum RoutePath {
  HOME = "/",
  EXERCISE = "exercise",
  LIKES = "likes",
}

const publicRoutes = [
  {
    path: RoutePath.HOME,
    component: Home,
    layout: DefaultLayout,
  },
  {
    path: RoutePath.EXERCISE,
    component: Exercise,
    layout: DefaultLayout,
  },
  {
    path: RoutePath.LIKES,
    component: Likes,
    layout: DefaultLayout,
  },
  {
    path: "/404",
    component: ErrorPage,
    layout: DefaultLayout,
  },
];

export { publicRoutes };
