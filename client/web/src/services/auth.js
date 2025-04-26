import axios from "axios";

const login = async (data) => {
  return await axios.post("/api/auth/login", {
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
