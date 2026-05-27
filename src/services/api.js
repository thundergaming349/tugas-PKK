import axios from "axios";

const API_BASE_URL = "tugaspkkbe-production.up.railway.app/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Request interceptor — auto-attach Bearer token
api.interceptors.request.use(
    (config) => {
        const token =
            localStorage.getItem("token") || sessionStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

// Response interceptor — handle 401 (Unauthorized)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("login_time");
            localStorage.removeItem("remember_me");

            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");

            // Jangan redirect jika sudah di halaman login atau register
            const publicPaths = ["/login", "/register"];
            if (!publicPaths.includes(window.location.pathname)) {
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    },
);

export default api;
