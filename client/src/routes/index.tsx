import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {privateRoutes, publicRoutes} from "./routes";
import AuthPage from "../pages/AuthPage";
import MainLayout from "../layouts/MainLayout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map(({path, Component}) =>
          <Route key={path} path={path} element={<Component/>} />
        )}
        <Route path={'/'} element={<MainLayout/>}>
          {privateRoutes.map(({path, Component}) =>
            <Route key={path} path={path} element={<Component/>} />
          )}
        </Route>
        <Route path={'*'} element={<AuthPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;