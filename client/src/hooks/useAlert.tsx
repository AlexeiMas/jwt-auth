import React, {useCallback, useMemo} from "react";
import {resetAlert} from "../store/alertSlice";
import {AUTH_ROUTE} from "../utils/consts";
import Alert from "../components/Alert";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {useNavigate} from "react-router-dom";

export const useAlert = (): JSX.Element | undefined => {
  const {type, message} = useAppSelector(state => state.alert)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onOkHandler = useCallback(() => {
    dispatch(resetAlert())
    navigate(AUTH_ROUTE)
  }, [type === "inform", dispatch, navigate])

  const onCloseHandler = useCallback(() => {
    Promise.resolve(dispatch(resetAlert())).then(() => navigate(AUTH_ROUTE))
  }, [type === "warning", dispatch, navigate])

  const isAlert = useMemo(() => {
    if (!type) {
      return;
    }
    return (type === "inform") ? <Alert onOk={onOkHandler} message={message}/> : <Alert onClose={onCloseHandler} message={message}/>
  }, [message !== ''])

  return isAlert
}