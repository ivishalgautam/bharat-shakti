import config from "@/config";
import axios from "axios";

const login = async (data) => {
  const url = `${config.next_public_url}/api/auth/login`;

  return await axios.post(url, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

const loginRequest = async (data) => {
  return await axios.post("/api/auth/login-request", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

const loginVerify = async (data) => {
  return await axios.post("/api/auth/login-verify", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

const registerRequest = async (data) => {
  return await axios.post("/api/auth/register-request", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

const registerVerify = async (data) => {
  return await axios.post("/api/auth/register-verify", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

const forgotPassword = async (data) => {
  return await axios.post("/api/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

const resetPassword = async (data) => {
  return await axios.post("/api/auth/reset-password", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

const auth = {
  login: login,
  loginRequest: loginRequest,
  loginVerify: loginVerify,
  registerRequest: registerRequest,
  registerVerify: registerVerify,
  forgotPassword: forgotPassword,
  resetPassword: resetPassword,
};

export default auth;
