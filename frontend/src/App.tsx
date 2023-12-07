import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { publicRoutes } from "./routes";
import DefaultLayout from "./layouts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route) => {
          if (route.layout) {
            const Layout = route.layout;
            const View = route.component;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Layout>
                    <View />
                  </Layout>
                }
              />
            );
          } else {
            const View = route.component;
            return (
              <Route key={route.path} path={route.path} element={<View />} />
            );
          }
        })}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
