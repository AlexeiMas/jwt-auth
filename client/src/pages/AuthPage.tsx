import React, {useMemo} from 'react';
import {useForm} from "react-hook-form";
import {useAppDispatch} from "../store/hooks";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {userLogin, userSignUp} from "../store/userSlice";
import * as routes from "../utils/consts";
import FormBox from "../components/Form/FormBox";
import ContentForm from "../components/Form/ContentForm";
import ActionsForm from "../components/Form/ActionsForm";
import {IAuthForm} from "../types/auth";
import {useAlert} from "../hooks/useAlert";
import {setAlert} from "../store/alertSlice";

const AuthPage = () => {
  const {watch, register, formState: {errors, isValid}, reset} = useForm<IAuthForm>({
    mode: "onBlur",
    reValidateMode: "onChange"
  })
  const {email, password} = watch()
  const isAlert = useAlert()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const loginHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    Promise
      .resolve(dispatch(userLogin({email, password})))
      .then((value) => {
        (typeof value.payload === 'string' || value.payload instanceof String)
          ? dispatch(setAlert({type: "warning", message: value.payload as string}))
          : navigate(routes.HOME_ROUTE)
      })
  }

  const registerHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    dispatch(userSignUp({email, password}))
    dispatch(setAlert({type: "inform", message: <React.Fragment>Letter with activation link was sent to your email: <b>{email}</b></React.Fragment>}))
  }

  useMemo(() => {
    reset()
  }, [location.hash])

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
          {(location.hash === '#register') &&
            <>
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
            </>
          }
        </ContentForm>
        <ActionsForm>
          <div className="links">
            <Link to={routes.FORGOT_PASSWORD_ROUTE}>Forget password</Link>
            {(location.hash === '#register')
              ? <Link to={routes.AUTH_ROUTE + '#login'}>Sign in</Link>
              : <Link to={routes.AUTH_ROUTE + '#register'}>Sign up</Link>
            }
          </div>
          {(location.hash === '#register')
            ? <button onClick={(event) => registerHandler(event)} disabled={!isValid}>Sign up</button>
            : <button onClick={(event) => loginHandler(event)} disabled={!isValid}>Sign in</button>
          }
        </ActionsForm>
      </FormBox>
    </>
  );
};

export default AuthPage;