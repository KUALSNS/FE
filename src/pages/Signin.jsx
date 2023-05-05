import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userState } from '../atoms/auth';
import { useRecoilState,useSetRecoilState } from 'recoil';
import { postLoginUser } from '../remotes';
import { authState } from '../atoms/auth';

const Signin = () => {


  const navigate = useNavigate()
  
  const [email,setEmail] = useState('')
  const [password,setPw] = useState('')
  const [user,setUserState] = useRecoilState(userState)
  const setAuth =  useSetRecoilState(authState)


  const spaceHome = () =>{
    navigate('/')
  }

  const LoginSubmit =(e)=>{
    e.preventDefault();
    console.log(email)
    console.log(password)
    postLoginUser(email,password)
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


  return (
    <div style={{display:'flex', justifyContent:"center",alignItems:'center',height:'500px'}}>
      <div>
        <div onClick={spaceHome} style={{display:'flex', fontSize:'50px',fontWeight:'600' ,margin:"60px", justifyContent:'center',alignItems:'center', fontStyle:'italic', cursor:'pointer'}}>Tarae</div>
        <Form style={{width:'500px'}} onSubmit={(e)=>LoginSubmit(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="text" placeholder="Enter email" style={{fontSize:'20px'}} onChange={e=>setEmail(e.target.value)} />
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
  )
}

export default Signin