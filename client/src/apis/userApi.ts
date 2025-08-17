import axios from "axios";

const userApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL + "/user",
  withCredentials: true,
});

userApi.defaults.withCredentials = true;

userApi.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

userApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/user/refresh-token`,
          {},
          { withCredentials: true }
        );

        return userApi(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default userApi;
