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


export const sideBarState = atom({
  key: "src/atoms/auth.jsx-sideBarState",
  default: 0,
});

export const challengeState = atom({
  key: "src/atoms/auth.jsx-challengeState",
  default: [],
});

export const challengeModalState = atom({
  key: "src/atoms/auth.jsx-challengeModalState",
  default: true,

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
