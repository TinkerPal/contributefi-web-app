import { getItemFromLocalStorage } from "@/lib/utils";
import axios from "axios";

export function createAccount(data) {
  const requestPayload = {
    email: data.email,
    password: data.password,
  };

  return axios.post(
    `${import.meta.env.VITE_BASE_URL}/auth/signup`,
    requestPayload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}

export function resendOTP(data) {
  const requestPayload = {
    otpPurpose: "EMAIL_VERIFICATION",
    email: data.email,
  };

  const accessToken = getItemFromLocalStorage("accessToken");

  return axios.post(
    `${import.meta.env.VITE_BASE_URL}/auth/resend-otp`,
    requestPayload,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
}

export function verifyEmail(data) {
  const requestPayload = {
    otpPurpose: "EMAIL_VERIFICATION",
    otpCode: data.otp,
  };

  const accessToken = getItemFromLocalStorage("accessToken");

  return axios.post(
    `${import.meta.env.VITE_BASE_URL}/auth/verify-otp`,
    requestPayload,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
}

export function createUsername(data) {
  const requestPayload = {
    username: data.username,
  };

  const accessToken = getItemFromLocalStorage("accessToken");

  return axios.post(
    `${import.meta.env.VITE_BASE_URL}/user/username`,
    requestPayload,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
}

export function checkUsernameAvailability(username) {
  const accessToken = getItemFromLocalStorage("accessToken");

  return axios.get(
    `${import.meta.env.VITE_BASE_URL}/user/check-username?username=${username}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
}

export function loginUser(data) {
  const requestPayload = {
    email: data.email,
    password: data.password,
  };

  return axios.post(
    `${import.meta.env.VITE_BASE_URL}/auth/login`,
    requestPayload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
