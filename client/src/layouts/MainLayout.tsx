import React, {useEffect} from 'react';
import {checkAuth} from "../store/userSlice";
import * as routes from "../utils/consts";
import {Outlet, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../store/hooks";

const MainLayout = () => {
  const {isAuth} = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      dispatch(checkAuth())
    }
  }, [])

  useEffect(() => {
    if (!isAuth) {
      navigate(routes.AUTH_ROUTE)
    }
  }, [isAuth, navigate])

  return (
    <div>
      <Outlet/>
    </div>
  );
};

export default MainLayout;