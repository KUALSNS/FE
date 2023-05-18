import { atom } from "recoil";

export const authState = atom({
  key: "src/atoms/auth.jsx-authState",
  default: false,
});

export const sideToggleState = atom({
  key: "src/atoms/auth.jsx-sideToggleState",
  default: true,
});

export const userState = atom({
  key: "src/atoms/auth.jsx-userState",
  default: {
    username: "",
    email: "",
    acesstoken: "",
    refreshtoken: "",
  },
});

export const mypageModalState = atom({
  key: "src/atoms/auth.jsx-mypageModalState",
  default: {
    show: false,
    content: "",
  },
});

// export const sideBarState = atom({
//   key: "src/atoms/auth.jsx-sideBarState",
//   default: "/",
// });

export const detailuserState = atom({
  key: "src/atoms/auth.jsx-detailuserState",
  default: { nickname: "", challengeCertain: false },
});

export const challengeState = atom({
  key: "src/atoms/auth.jsx-challengeState",
  default: [],
});

export const categoryState = atom({
  key: "src/atoms/auth.jsx-categoryState",
  default: [],
});

export const activeChallengeState = atom({
  key: "src/atoms/auth.jsx-nicknameState",
  default: { userChallengeSu: 0, coopen: 0, userChallengeArray: [] },
});

export const challengeModalState = atom({
  key: "src/atoms/auth.jsx-challengeModalState",
  default: true,
});

export const loadingState = atom({
  key: "src/atoms/auth.jsx-challengeModalState",
  default: true,
});

export const ChallengeWriteState = atom({
  key: "src/atoms/auth.jsx-ChallengewriteState",
  default: { challengeName: [], templateData: {} },
});

export const selectChallengeState = atom({
  key: "src/atoms/auth.jsx-selectChallengeState",
  default: "",
});
