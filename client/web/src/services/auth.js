import axios from "axios";

const login = async (data) => {
  await axios.post("/api/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

const register = async (data) => {
  await axios.post("/api/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

const auth = {
  login: login,
  register: register,
};

export default auth;
