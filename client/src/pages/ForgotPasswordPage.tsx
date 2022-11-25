import React from 'react';
import {useForm} from "react-hook-form";
import {IAuthForm} from "../types/auth";
import {useAppDispatch} from "../store/hooks";
import FormBox from "../components/Form/FormBox";
import ContentForm from "../components/Form/ContentForm";
import ActionsForm from "../components/Form/ActionsForm";
import ResetPasswordService from "../services/ResetPasswordService";
import {setAlert} from "../store/alertSlice";
import {useAlert} from "../hooks/useAlert";

const ForgotPasswordPage = () => {
  const {watch, register, formState: {errors, isValid}, reset} = useForm<Pick<IAuthForm, "email">>({
    mode: "onBlur",
    reValidateMode: "onChange"
  })
  const {email} = watch()
  const dispatch = useAppDispatch()
  const isAlert = useAlert()

  const forgotHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const res = await ResetPasswordService.forgotPassword(email)
    res.data.message && dispatch(setAlert({type: "inform", message: res.data.message}));
    reset()
  }

  return (
    <>
      {isAlert}
      <FormBox>
        <ContentForm>
          <label>
            Email:
            <input
              {...register("email", {
                required: "Field is important for filling",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not watch email format"
                }
              })}
              id="email"
              type="email"
              placeholder={'Email'}
            />
          </label>
          {errors.email && <span role="alert">{errors.email.message}</span>}
        </ContentForm>
        <ActionsForm>
          <button onClick={(event) => forgotHandler(event)} disabled={!isValid}>Request a password reset</button>
        </ActionsForm>
      </FormBox>
    </>
  );
};

export default ForgotPasswordPage;