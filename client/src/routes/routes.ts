import * as routes from '../utils/consts'
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import HomePage from "../pages/HomePage";

export type TRoutes = {
  path: string
  Component: () => JSX.Element
}

export const publicRoutes: TRoutes[] = [
  {
    path: routes.FORGOT_PASSWORD_ROUTE,
    Component: ForgotPasswordPage
  },
  {
    path: routes.RESET_PASSWORD_ROUTE,
    Component: ResetPasswordPage
  }
]

export const privateRoutes: TRoutes[] = [
  {
    path: routes.HOME_ROUTE,
    Component: HomePage
  }
]