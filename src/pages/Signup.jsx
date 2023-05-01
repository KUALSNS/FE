import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Signup = () => {

    const navigate = useNavigate()

    const [email,setEmail] = useState('')
    const [password,setPw] = useState('')
    const [username,setUsername]=useState('');
  
    const spaceHome = () =>{
      navigate('/')
    }
  
    const LoginSubmit =(e)=>{
      e.preventDefault();
      navigate('/')
     
    }

  return (
    <div style={{display:'flex', justifyContent:"center",alignItems:'center',height:'500px'}}>
      <div>
        <div onClick={spaceHome} style={{display:'flex', fontSize:'50px',fontWeight:'600' ,margin:"60px", justifyContent:'center',alignItems:'center', fontStyle:'italic', cursor:'pointer'}}>Tarae</div>
        <Form onSubmit={(e)=>LoginSubmit(e)} style={{width:'500px'}}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Your Name</Form.Label>
                <Form.Control type="name" placeholder="Your Name" style={{fontSize:'20px'}}  onChange={(event)=>{setUsername(event.currentTarget.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" style={{fontSize:'20px'}}  onChange={(event)=>{setEmail(event.currentTarget.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" style={{fontSize:'20px'}}  onChange={(event)=>{setPassword(event.currentTarget.value)}}/>
            </Form.Group>
            <Button variant="dark" size="lg" type="submit" style={{float:'right'}} >
                Sign up
            </Button>
      </Form>
      </div>
    </div>
  )
}

export default Signup