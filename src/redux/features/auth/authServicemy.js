import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const API_URL = `${BACKEND_URL}/api/users/`;

// Validate email
export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// Register User
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  return response.data;
};

// login User
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  return response.data;
};

// logout User
const logout = async () => {
  const response = await axios.get(API_URL + "logout");
  return response.data.message;
};

// get login status
const getLoginStatus = async () => {
  const response = await axios.get(API_URL + "loginStatus");
  return response.data;
};

// get user profile
const getUser = async (userData) => {
  const response = await axios.get(API_URL + "getUser", userData);
  return response.data;
};

// Update profile
const updateUser = async (userData) => {
  const response = await axios.patch(API_URL + "updateUser", userData);
  return response.data;
};

// send verification email
const sendVerificationEmail = async (userData) => {
  const response = await axios.post(
    API_URL + "sendVerificationEmail",
    userData
  );
  return response.data;
};

// Verify User
const verifyUser = async (verificationToken) => {
  const response = await axios.patch(
    `${API_URL}verifyUser/${verificationToken}`
  );

  return response.data.message;
};

// Change Password
const changePassword = async (userData) => {
  const response = await axios.patch(API_URL + "changePassword", userData);

  return response.data.message;
};

// forgot Password
const forgotPassword = async (userData) => {
  const response = await axios.post(API_URL + "forgotPassword", userData);

  return response.data.message;
};

// Reset Password
const resetPassword = async (userData, resetToken) => {
  const response = await axios.patch(
    `${API_URL}resetPassword/${resetToken}`,
    userData
  );

  return response.data.message;
};

const authService = {
  register,
  login,
  logout,
  getLoginStatus,
  getUser,
  updateUser,
  sendVerificationEmail,
  verifyUser,
  changePassword,
  forgotPassword,
  resetPassword,
};

export default authService;
