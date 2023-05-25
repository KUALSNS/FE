import { atom } from "recoil";

export const authState = atom({
  key: "src/atoms/auth.jsx-authState",
  default: false,
});

export const sideToggleState = atom({
  key: "src/atoms/auth.jsx-sideToggleState",
  default: true,
});

export const semiListToggleState = atom({
  key: "src/atoms/auth.jsx-semiListToggleState",
  default: false,
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

export const TitleState = atom({
  key: "src/atoms/auth.jsx-TitleState",
  default: "",
});

export const startChallengeModalState = atom({
  key: "src/atoms/auth.jsx-startChallengeModalState",
  default: false,
});

export const mypageModalState = atom({
  key: "src/atoms/auth.jsx-mypageModalState",
  default: {
    show: false,
    content: "",
  },
});

export const mypageSubscribeState = atom({
  key: "src/atoms/auth.jsx-mypageSubscribeState",
  default: false,
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
  key: "src/atoms/auth.jsx-activeChallengeState",
  default: { userChallengeSu: 0, coopen: 0, userChallengeArray: [] },
});

export const challengeModalState = atom({
  key: "src/atoms/auth.jsx-challengeModalState",
  default: true,
});

export const loadingState = atom({
  key: "src/atoms/auth.jsx-loadingState",
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

export const recordModalState = atom({
  key: "src/atoms/auth.jsx-recordModalState",
  default: false,
});

export const subscribeModalState = atom({
  key: "src/atoms/auth.jsx-subscribeModalState",
  default: false,
});

export const subscribedState = atom({
  key: "src/atoms/auth.jsx-subscribedState",
  default: false,
});

export const mypageInfoState = atom({
  key: "src/atoms/auth.jsx-mypageInfoState",
  default: {
    id: "",
    password: "",
    nickname: "",
    phone: "",
    email: "",
    mar: "",
  },
});

export const recordSubmitState = atom({
  key: "src/atoms/auth.jsx-recordSubmitState",
  default: {
    challengeName: "",
    templateName: "",
    challengeTitle: "",
    challengeContent: "",
  },
});

export const sideState = atom({
  key: "src/atoms/auth.jsx-sideState",
  default: false,
});

export const certainToastState = atom({
  key: "src/atoms/auth.jsx-certainToastState",
  default: false,
});

export const challengeToastState = atom({
  key: "src/atoms/auth.jsx-challengeToastState",
  default: "",
});

export const SmallScreenState = atom({
  key: "src/atoms/auth.jsx-SmallScreenState",
  default: false,
});

export const IdPwFindState = atom({
  key: "src/atoms/auth.jsx-IdPwFindState",
  default: "",
});