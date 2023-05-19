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

export const mypageSubscribeState = atom({
  key: "src/atoms/auth.jsx-mypageSubscribeState",
  default: false,
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

export const mypageInfoState = atom({
  key: "src/atoms/auth.jsx-mypageInfoState",
  default: {
    "id":"",
    "password":"",
    "nickname":"",
    "phone":"",
    "email":"",
    "mar":""
  }
})
