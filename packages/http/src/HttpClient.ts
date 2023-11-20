/**
 * @type: service
 * @name: http
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { App } from "@ikx/core";
import { FetchDataConfig, FetchDataResult } from "@ikx/types";

export class HttpClient {
  private readonly app: App;
  private readonly axios: AxiosInstance;

  constructor(app: App) {
    this.app = app;
    this.axios = axios.create({
      baseURL: "/api",
    });
  }
  public bootstrap() {}

  public getUri(config?: AxiosRequestConfig): string {
    return this.axios.getUri(config);
  }

  public request<T = any, R = AxiosResponse<T>, D = any>(
    config: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.axios.request(config);
  }
  public get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.axios.get(url, config);
  }

  public delete<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.axios.delete(url, config);
  }
  public head<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.axios.head(url, config);
  }
  public options<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.axios.options<T, R, D>(url, config);
  }
  public post<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.axios.post(url, data, config);
  }
  public put<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.axios.put(url, data, config);
  }
  public patch<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.axios.patch(url, data, config);
  }
  public postForm<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.axios.postForm(url, data, config);
  }
  public putForm<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.axios.putForm(url, data, config);
  }
  patchForm<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.axios.patchForm(url, data, config);
  }

  public async load<T = unknown>({
    source,
    params,
    ttl,
  }: FetchDataConfig<T>): Promise<FetchDataResult<T>> {
    const { cache, http, compactUrl } = this.app;

    if (!source?.apiUrl) {
      return Promise.resolve([undefined, false, undefined, undefined]);
    }

    const url = compactUrl(source, params);

    // check caching enable
    if (ttl) {
      const data = cache.get(url);

      if (data) {
        return Promise.resolve(data) as Promise<FetchDataResult<T>>;
      }
    }

    try {
      const response = await http.request({
        url: url,
        method: source.apiMethod ?? "GET",
      });
      const { meta, message, data } = response.data;

      const result = [data, false, message, meta] as FetchDataResult<T>;

      if (ttl) {
        cache.store(url, result, ttl);
      }
      return result;
    } catch (error) {
      return [undefined, false, error, undefined] as FetchDataResult<T>;
    }
  }
}

export default HttpClient;
