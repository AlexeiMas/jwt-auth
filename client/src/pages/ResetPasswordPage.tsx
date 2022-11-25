import React from 'react';
import FormBox from "../components/Form/FormBox";
import ContentForm from "../components/Form/ContentForm";
import ActionsForm from "../components/Form/ActionsForm";
import {useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {IAuthForm} from "../types/auth";
import {useAppDispatch} from "../store/hooks";
import ResetPasswordService from "../services/ResetPasswordService";
import {IResetPass} from "../models/request/ResetPassRequest";
import {setAlert} from "../store/alertSlice";
import {useAlert} from "../hooks/useAlert";
import {AxiosError} from "axios";
import {ResetPassResponse} from "../models/response/ResetPassResponse";

const ResetPasswordPage = () => {
  const {watch, register, formState: {errors, isValid}} = useForm<Omit<IAuthForm, "email">>({
    mode: "onBlur",
    reValidateMode: "onChange"
  })
  const {password} = watch()
  const dispatch = useAppDispatch()
  const {userId, token} = useParams<Omit<IResetPass, "password">>()
  const isAlert = useAlert()

  const resetHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (userId && token) {
      try {
        const res = await ResetPasswordService.resetPassword({userId, token, password});
        res.data.message && dispatch(setAlert({type: "inform", message: res.data.message}));
      } catch (e) {
        const err = e as AxiosError<ResetPassResponse>
        if (err && err.response) {
          dispatch(setAlert({type: "warning", message: err.response.data.message}))
        }
      }
    } else {
      dispatch(setAlert({type: "warning", message: "Something went wrong..."}))
    }
  }

  return (
    <>
      {isAlert}
      <FormBox>
        <ContentForm>
          <label>
            Password:
            <input
              {...register("password", {
                required: "Field is important for filling",
                minLength: {
                  value: 3,
                  message: "min length is 3"
                },
                maxLength: {
                  value: 8,
                  message: "max length is 8"
                }
              })}
              id="password"
              type="password"
              placeholder={'Password'}
            />
          </label>
          {errors.password && <span role="alert">{errors.password.message}</span>}
          <label>
            Repeat password:
            <input
              {...register("confirmPass", {
                required: "Field is important for filling",
                validate: value => value === password || "Passwords are not the same",
                minLength: {
                  value: 3,
                  message: "min length is 3"
                },
                maxLength: {
                  value: 8,
                  message: "max length is 8"
                },
              })}
              id="confirmPass"
              type="password"
              placeholder={'Confirm your password'}
            />
          </label>
          {errors.confirmPass && <span role="alert">{errors.confirmPass.message}</span>}
        </ContentForm>
        <ActionsForm>
            <button onClick={(event) => resetHandler(event)} disabled={!isValid}>Reset password</button>
        </ActionsForm>
      </FormBox>

    </>
  );
};

export default ResetPasswordPage;