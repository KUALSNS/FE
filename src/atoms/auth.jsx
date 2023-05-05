import {atom} from 'recoil'


export const authState = atom({
    key:'src/atoms/auth.jsx-authState',
    default:false
    
})


export const userState = atom({
    key: 'src/atoms/auth.jsx-userState', 
    default: {
      username:'',
      email:'',
      acesstoken:'',
      refreshtoken:'',
    }
  })