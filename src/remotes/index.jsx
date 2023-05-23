import axios from "axios";

const WritonAxios = axios.create({
  baseURL: "https://www.writon.store",
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

const getMypageInfo = () =>
  WritonAxios.get("/api/profile", {
    headers: { access: localStorage.getItem("accessToken") },
  });

const patchNamePhone = (nickName, phoneNumber) =>
  WritonAxios.patch(
    "/api/profile",
    {
      nickname: nickName,
      phoneNumber: phoneNumber,
    },
    {
      headers: { access: localStorage.getItem("accessToken") },
    }
  );

const patchPassword = (oldPassword, newPassword) =>
  WritonAxios.patch(
    "/api/profile/password",
    {
      oldPassword: oldPassword,
      newPassword: newPassword,
    },
    {
      headers: { access: localStorage.getItem("accessToken") },
    }
  );

const patchEmail = (newEmail) =>
  WritonAxios.patch(
    "/api/profile/email",
    {
      email: newEmail,
    },
    {
      headers: { access: localStorage.getItem("accessToken") },
    }
  );

const getEachChallenge = (name) =>
  WritonAxios.get(`/api/challenge/write/${name}`, {
    headers: { access: localStorage.getItem("accessToken") },
  });

const postRecordSubmit = (
  challengeName,
  templateName,
  challengeTitle,
  challengeContent
) =>
  WritonAxios.post(
    "/api/challenge/write/register",
    {
      challengeName: challengeName,
      templateName: templateName,
      challengeTitle: challengeTitle,
      challengeContent: challengeContent,
    },
    {
      headers: { access: localStorage.getItem("accessToken") },
    }
  );

const postPreSubmit = (
  challengeName,
  templateName,
  challengeTitle,
  challengeContent
) =>
  WritonAxios.post(
    "/api/challenge/write/temporary-storage",
    {
      challengeName: challengeName,
      templateName: templateName,
      challengeTitle: challengeTitle,
      challengeContent: challengeContent,
    },
    {
      headers: { access: localStorage.getItem("accessToken") },
    }
  );

const postSideBarChallenge = () =>
  WritonAxios.post("/api/challenge/write", "", {
    headers: { access: localStorage.getItem("accessToken") },
  });

const getPlannerHistory = () => 
  WritonAxios.get("/api/planner/history", {
  headers: { access: localStorage.getItem("accessToken") },
}); 

const getPlannerStatistic = () => 
  WritonAxios.get("/api/planner/statistic", {
  headers: { access: localStorage.getItem("accessToken") },
}); 

const getPlannerCalendar = (start, finish) => 
  WritonAxios.get("/api/planner/calendar", {
  headers: { access: localStorage.getItem("accessToken") },
  params: {
    startDate: start,
    finishDate: finish,
  },
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
  getMypageInfo,
  patchNamePhone,
  patchPassword,
  patchEmail,
  getChallengePage,
  getPlannerHistory,
  getPlannerStatistic,
  getPlannerCalendar,
  getEachChallenge,
  postRecordSubmit,
  postPreSubmit,
  postSideBarChallenge,
};
