import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from '../atoms/auth';
import { patchLogoutUser } from '../remotes';

const Home = () => {

  const navigate = useNavigate()
  const [auth,setAuth] = useRecoilState(authState)

  const Logout = ()=>{
    patchLogoutUser()
    .then((res)=>{
      console.log(res)
    }).catch(err=>console.log(err))
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setAuth(false)
    navigate("/")
  }

  return (
    <div>
        {!auth ?
        <div>
          <Link to='/login'>Sign in</Link>
          <Link to='/register'>Sign up</Link>
        </div>
        :
        <button onClick={Logout}>로그아웃</button>}
    </div>
  )
}

export default Home