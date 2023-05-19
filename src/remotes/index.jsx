import axios from "axios";

const WritonAxios = axios.create({
  baseURL: "http://13.125.64.157",
});

const postLoginUser = (userIdentifier, userPassword) =>
  WritonAxios.post("/api/user/login", { userIdentifier, userPassword });

const getAccessToken = () =>
  WritonAxios.get("/api/user/login/reissue-token", {
    headers: {
      access: localStorage.getItem("accessToken"),
      refresh: localStorage.getItem("refreshToken"),
    },
  });

const patchLogoutUser = () =>
  WritonAxios.patch("/api/user/logout", "", {
    headers: { access: localStorage.getItem("accessToken") },
  });

const postEmail = (userEmail) =>
  WritonAxios.post("/api/user/signup/verify-email-code", { email: userEmail });

const getEmailCode = (userEmail, userEmailCode) =>
  WritonAxios.get("/api/user/signup/verify-email", {
    params: {
      email: userEmail,
      code: userEmailCode,
    },
  });

const postSignup = (userId, userEmail, userPassword, nickname, phoneNumber) =>
  WritonAxios.post("/api/user/signup", {
    userId: userId,
    email: userEmail,
    password: userPassword,
    nickname: nickname,
    phoneNumber: phoneNumber,
  });

const getChallenge = () => WritonAxios.get("/api/challenge");

const postLoginMain = () =>
  WritonAxios.post("/api/challenge/main", "", {
    headers: { access: localStorage.getItem("accessToken") },
  });

const getChallengePage = (name) =>
  WritonAxios.get(`/api/challenge/start/${name}`, {
    headers: { access: localStorage.getItem("accessToken") },
  });

export {
  postLoginUser,
  patchLogoutUser,
  getAccessToken,
  postEmail,
  getEmailCode,
  postSignup,
  postLoginMain,
  getChallenge,
  getChallengePage,
};
