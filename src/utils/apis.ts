import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}`,
  headers: {
    accept: "application/json",
    Authorization: `${process.env.NEXT_PUBLIC_TMDB_AUTHORIZATION_TOKEN}`,
  },
});

export default axiosInstance;
