import config from "@/config";
import axios from "axios";

const login = async (data) => {
  const url = `${config.next_public_url}/api/auth/login`;

  return await axios.post(url, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

const register = async (data) => {
  return await axios.post("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

const auth = {
  login: login,
  register: register,
};

export default auth;
