import $api from "../api";
import {AxiosResponse} from 'axios'
import {ResetPassResponse} from "../models/response/ResetPassResponse";
import {IResetPass} from "../models/request/ResetPassRequest";

export default class ResetPasswordService {
  static async forgotPassword(email: string): Promise<AxiosResponse<ResetPassResponse>> {
    return $api.post<ResetPassResponse>('/forgot-password', {email})
  }

  static async resetPassword({userId, token, password}: IResetPass): Promise<AxiosResponse<ResetPassResponse>> {
    return $api.post<ResetPassResponse>(`/password-reset/${userId}/${token}`, {password})
  }
}