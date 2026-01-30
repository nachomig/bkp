import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { CertificadoAltaResponse, CertificadoRequest } from '../types';
import { environment } from '../environments/environment';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: environment.apiUrl // expected to include /api prefix
});

export function get<T = any>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
  return axiosInstance.get<T>(url, config);
}

export function post<Req = any, Res = any>(url: string, data: Req, config: AxiosRequestConfig = {}): Promise<AxiosResponse<Res>> {
  return axiosInstance.post<Res>(url, data, config);
}

export function put<Req = any, Res = any>(url: string, data: Req, config: AxiosRequestConfig = {}): Promise<AxiosResponse<Res>> {
  return axiosInstance.put<Res>(url, data, config);
}

export function deleteRequest<T = any>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
  return axiosInstance.delete<T>(url, config);
}

export const postCertificado = (data: CertificadoRequest): Promise<AxiosResponse<CertificadoAltaResponse>> =>
  post<CertificadoRequest, CertificadoAltaResponse>('/credito', data);






