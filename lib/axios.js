import axios from "axios";
const Token = process.env.NEXT_PUBLIC_TOKEN;
export const Axios = axios.create({
  baseURL:
    // "https://themefisher-backend.vercel.app/",
    "http://localhost:4001/",

  headers: {
    authorization: `Bearer ${Token}`,
  },
});
