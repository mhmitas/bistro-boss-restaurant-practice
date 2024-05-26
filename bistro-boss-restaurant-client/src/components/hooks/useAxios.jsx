import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_URL
})

//-------------
const secureAxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_URL
})

const useAxiosSecure = () => {
    // Request interceptor
    // secureAxiosInstance.interceptors.request.use(
    //     () => {

    //     },
    //     (err) => {
    //         // Do something with request error
    //         return Promise.reject(err);
    //     }
    // )
    return secureAxiosInstance
};

export default useAxiosSecure;