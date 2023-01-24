import axios from "axios";

export const API = axios.create({
    baseURL: "https://api.kontenbase.com/query/api/v1/30e0c3b4-dccc-4d79-8f07-7adf36304d4b/"
})

export function setAuthorization(token) {
    if (!token) {
        delete API.defaults.headers.common;
        return;
    }
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}