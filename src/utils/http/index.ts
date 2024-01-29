import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import { ElMessage, ElLoading } from 'element-plus'

const URL: string = import.meta.env.VITE_API_BASE_URL
enum RequestEnums {
    TIMEOUT = 5000,
    LOGINFAIL = 203, // 登录失败
    OVERDUE = 401, // 登录失效
    SUCCESS = 200, // 请求成功
}

const config: AxiosRequestConfig = {
    baseURL: URL,
    timeout: RequestEnums.TIMEOUT
}

class JMHttp {
    private axiosInstance: AxiosInstance
    private loadingInstance: any;

    constructor(config: AxiosRequestConfig) {
        // 实例化 axios
        this.axiosInstance = axios.create(config)
        this.setupInterceptors()
    }

    private setupInterceptors(): void {
        /*
            请求拦截器
        */
        this.axiosInstance.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                this.showLoading()
                const token = localStorage.getItem('TOKEN_KEY') || ''
                return {
                    ...config,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token
                    }
                }
            },
            (error: AxiosError) => {
                return Promise.reject(error)
            }
        )

        /* 响应拦截器 */
        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => {
                this.hideLoading()
                const { data } = response

                if (data.code && data.code !== RequestEnums.SUCCESS) {
                    this.handleErrorResponse(data)
                    return Promise.reject(data)
                }

                return data
            },
            (error: AxiosError) => {
                this.hideLoading()
                const { response } = error
                if (response) {
                    this.handleCode(response.status)
                }

                if (!window.navigator.onLine) {
                    this.handleNetworkError()
                }

                if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
                    this.handleTimeout()
                }

                return Promise.reject(error)
            }
        )
    }

    private handleCode(code: number): void {
        switch (code) {
            case 401:
                this.showError('登录失败，请重新登录')
                break
            default:
                this.showError('请求失败')
                break
        }
    }

    private handleTimeout(): void {
        this.showError('请求超时，请重试')
    }

    private handleErrorResponse(data: any): void {
        const { code } = data

        switch (code) {
            case RequestEnums.LOGINFAIL:
                localStorage.removeItem('TOKEN_KEY')
                this.showError(data.msg)
                break
            case RequestEnums.OVERDUE:
                localStorage.setItem('TOKEN_KEY', '')
                // router.replace({
                //     path: '/login'
                // })
                this.showError(data.msg)
                break
            default:
                this.showError('请求失败')
                break
        }
    }

    private handleNetworkError(): void {
        this.showError('网络连接失败，请检查网络')
        // router.replace({
        //     path: '/404'
        // })
    }

    private showLoading(): void {
        this.loadingInstance = ElLoading.service({
            fullscreen: true,
            background: 'rgba(255,255,255,0.5)'
        });
    }

    private hideLoading(): void {
        if (this.loadingInstance) {
            this.loadingInstance.close();
        }
    }

    private showError(msg: string): void {
        ElMessage.error(msg)
    }

    public get<T>(url: string, params?: object): Promise<T> {
        return this.axiosInstance.get(url, { params })
    }

    public post<T>(url: string, params?: object): Promise<T> {
        return this.axiosInstance.post(url, params)
    }

    public put<T>(url: string, params?: object): Promise<T> {
        return this.axiosInstance.put(url, params)
    }

    public delete<T = any>(url: string, params?: object): Promise<T> {
        return this.axiosInstance.delete(url, { params })
    }
}

export default new JMHttp(config)