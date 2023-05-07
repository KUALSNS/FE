import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userState } from '../atoms/auth';
import { useRecoilState,useSetRecoilState } from 'recoil'
import styled from 'styled-components';
import singupBtn from '../static/signin_signupBtn.svg';

const SigninWrapper = styled.div`
  text-align: center;
  min-height: 100vh;
  padding-top: 83px;

  img{
    margin-bottom: 212px;
  }

  img:hover{
    cursor: pointer;
  }
`

const SigninForm = styled.div`
  div{
    font-family: 'Happiness-Sans-Bold', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 26px;
    margin-bottom: 68px;
  }
  input{
    display: block;
    margin: auto;
    padding: 16px;
    width: 328px;
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

  span{
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
  
  const [userId, sdetUserId] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUserState] = useRecoilState(userState)

  const LoginSubmit =(e)=>{
    e.preventDefault();
    navigate('/')
  }

  const signupRoute =(e)=>{
    navigate('/register')
  }

  return (
    <SigninWrapper>
      <SigninForm>
        <div>로그인</div>
        <input type='text' placeholder='아이디' value={userId} onChange={(e)=>setUserId(e.target.value)}></input>
        <input type='password' placeholder='비밀번호' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
        <button onClick={LoginSubmit}>로그인</button>
        <span>아이디 찾기 | 비밀번호 찾기</span>
      </SigninForm>
      <img src={singupBtn} onClick={signupRoute}/>
    </SigninWrapper>
  )
}

export default Signin