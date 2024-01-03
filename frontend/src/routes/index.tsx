import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Loading from "../components/Loading";
import DefaultLayout from "../layouts";
import Home from "../pages/Home";
import Likes from "../pages/Likes";
import Exercise from "../pages/Exercise";
import ErrorPage from "../pages/ErrorPage";
import ExerciseDetail from "../pages/ExerciseDetail";

const Router: React.FC = () => {
  const routes = useRoutes([
    {
      element: <DefaultLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "likes", element: <Likes /> },
        {
          path: "exercise",
          children: [
            { path: "", element: <Exercise /> },
            { path: "blog/:id", element: <ExerciseDetail exerciseType="post" /> },
            { path: "video/:id", element: <ExerciseDetail exerciseType="video" /> },
          ],
        },
        { path: "*", element: <ErrorPage /> },
      ],
    },
  ]);

  return <Suspense fallback={<Loading />}>{routes}</Suspense>;
};

export default Router;
