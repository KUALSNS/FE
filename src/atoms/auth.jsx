import {atom} from 'recoil'

export const userState = atom({
    key: 'src/atoms/auth.jsx-userState', 
    default: {
      username:'',
      email:'',
      acesstoken:'',
      refreshtoken:'',
    }
  })