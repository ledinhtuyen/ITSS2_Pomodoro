import { lazy } from 'react';

const DefaultLayout = lazy(() => import('../layouts'))
const DetailBlog = lazy(() => import('../pages/DetailBlog'));
const DetailVideo = lazy(() => import('../pages/DetailVideo'));
const ErrorPage = lazy(() => import('../pages/ErrorPage'));
const Exercise = lazy(() => import('../pages/Exercise'));
const Home = lazy(() => import('../pages/Home'));
const Likes = lazy(() => import('../pages/Likes'));


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
    path: `/${RoutePath.EXERCISE}/blog/:id`,
    component: DetailBlog,
    layout: DefaultLayout,
  },
  {
    path: `/${RoutePath.EXERCISE}/video/:id`,
    component: DetailVideo,
    layout: DefaultLayout,
  },
  {
    path: "/404",
    component: ErrorPage,
    layout: DefaultLayout,
  },
];

export { publicRoutes };
