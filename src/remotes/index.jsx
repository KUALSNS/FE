import axios from "axios";

const WritonAxios = axios.create({
  baseURL: "https://www.tarae.store",
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

const getEmail = (userEmail) =>
  WritonAxios.get("/api/user/signup/verify-email-code", { userEmail });

const postEmailCode = (userEmail, userEmailCode) =>
  WritonAxios.post("/api/user/signup/verify-email", {
    userEmail,
    userEmailCode,
  });

const postSignup = (userId, userEmail, userPassword, nickname, phoneNumber) =>
  WritonAxios.post("/api/user/signup", {
    userId,
    userEmail,
    userPassword,
    nickname,
    phoneNumber,
  });

const getCategory = () => WritonAxios.get("/api/challenge/whole-category");
export {
  postLoginUser,
  patchLogoutUser,
  getAccessToken,
  getEmail,
  postEmailCode,
  postSignup,
  getCategory,
};

