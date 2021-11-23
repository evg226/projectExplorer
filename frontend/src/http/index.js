import axios from "axios";
import {baseURL} from "../utils/constants";

const $host=axios.create({
    baseURL
});

const $authHost=axios.create({
    baseURL
});

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}

