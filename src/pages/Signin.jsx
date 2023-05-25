import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userState } from '../atoms/auth';
import { useRecoilState,useSetRecoilState } from 'recoil'
import styled from 'styled-components';
import { postLoginUser } from '../remotes';
import { authState } from '../atoms/auth';
import { IdPwFindState } from '../atoms/auth';

const SigninWrapper = styled.div`
  font-family: 'Pretendard', sans-serif;
  text-align: center;
  min-height: 100vh;
  padding-top: 83px;
  div{
    font-family: 'Happiness-Sans-Bold', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 26px;
    margin-bottom: 68px;
  }

  img{
    margin-bottom: 212px;
  }

  img:hover{
    cursor: pointer;
  }
`

const SigninForm = styled.form`
    
  input{
    display: block;
    margin: auto;
    width: 328px;
    height: 48px;
    padding: 16px;
    border-radius: 8px;
    border: 1px solid #E3E5E5;
    margin-bottom: 24px;
  }

  input:focus{
    outline: none;
  }

  input::placeholder{
    font-family: 'Pretendard';
    color: #72777A;
  }

  button{
    width: 328px;
    height: 48px;
    border-radius: 8px;
    border: 0;
    color: white;
    background: var(--challenging-blue);
    margin-top: 40px;
    margin-bottom: 24px;
  }
  a{
    cursor: pointer;
  }

  .find{
    display: block;
    width: 328px;
    margin: auto;
    text-align: right;
    font-size: 12px;
    margin-bottom: 275px;
  }
`
const Signin = () => {
  
  const navigate = useNavigate()
  
  const [userId, setUserId] = useState('')
  const [password,setPassword] = useState('')
  const setFindState = useSetRecoilState(IdPwFindState);
  const [user,setUserState] = useRecoilState(userState)
  const setAuth =  useSetRecoilState(authState)


  const LoginSubmit =(e)=>{
    e.preventDefault();
    console.log(userId)
    console.log(password)
    postLoginUser(userId,password)
    .then(res=>{
      console.log(res)
      console.log(res.data.data.accessToken)
      console.log(res.data.data.refreshToken)
      localStorage.setItem("accessToken",res.data.data.accessToken)
      localStorage.setItem("refreshToken",res.data.data.refreshToken)
      setAuth(true)
      navigate('/')
    })
    .catch((err)=>console.log(err))
  }

  const signupRoute =(e)=>{
    navigate('/register')
  }

  const findIdPwRoute = (param)=>{
    setFindState(param);
    navigate('/find')
  }

  return (
    <SigninWrapper>
      <div>로그인</div>
      <SigninForm onSubmit={(e)=>LoginSubmit(e)}>
        <input type='text' placeholder='아이디' value={userId} onChange={(e)=>setUserId(e.target.value)}></input>
        <input type='password' placeholder='비밀번호' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
        <button type='submit'>로그인</button>
        <span className='find'>
          <a onClick={()=>findIdPwRoute("id")}>아이디 찾기</a> | <a onClick={()=>findIdPwRoute("pw")}>비밀번호 찾기</a>
        </span>
      </SigninForm>
      <img src='signin_signupBtn.svg' onClick={signupRoute}/>
    </SigninWrapper>
  )
}

export default Signin