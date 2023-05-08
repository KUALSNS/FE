import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userState } from '../atoms/auth';
import { useRecoilState,useSetRecoilState } from 'recoil'
import styled from 'styled-components';
import singupBtn from '../static/signin_signupBtn.svg';
import { postLoginUser } from '../remotes';
import { authState } from '../atoms/auth';

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
  
  const [userId, setUserId] = useState('')
  const [password,setPassword] = useState('')
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

/*

    <div style={{display:'flex', justifyContent:"center",alignItems:'center',height:'500px'}}>
      <div>
        <div onClick={spaceHome} style={{display:'flex', fontSize:'50px',fontWeight:'600' ,margin:"60px", justifyContent:'center',alignItems:'center', fontStyle:'italic', cursor:'pointer'}}>Tarae</div>
        <Form style={{width:'500px'}} onSubmit={(e)=>LoginSubmit(e)}>
          <Form.Group className="mb-3" controlId="formBasicuserId">
            <Form.Label>userId address</Form.Label>
            <Form.Control type="text" placeholder="Enter userId" style={{fontSize:'20px'}} onChange={e=>setuserId(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" style={{fontSize:'20px'}} onChange={e=>setPw(e.target.value)} />
          </Form.Group>
          <Button variant="dark" size="lg" type="submit" style={{float:'right'}} > 
            Sign in
          </Button>
        </Form>
      </div>
    </div>
*/