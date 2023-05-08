import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Challenge from "./pages/Challenge";
import Template from "./pages/Template";
import Record from "./pages/Record";
import Mypage from "./pages/Mypage";
import LeftNav from "./components/LeftNav";
import { getAccessToken } from "./remotes";
import { useSetRecoilState } from "recoil";
import { authState } from "./atoms/auth";
import jwt_decode from "jwt-decode";

function App() {
 
  const setAuth = useSetRecoilState(authState)

  const checkTokenExpiration = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      // 토큰의 만료 시간을 체크
      const tokenExpiration = jwt_decode(accessToken).exp;
      console.log('zz')
      const currentTime = Date.now() / 1000;
      // 토큰이 만료되었다면, 새로운 토큰을 발급
      if (tokenExpiration < currentTime) {
        getAccessToken()
          .then((res) => {
            console.log(res)
            localStorage.setItem("accessToken",res.data.data.accessToken)
            console.log('access 토큰 만 재발급')
          })
          .catch(error => {
            if(error.response.data.code === 419){
              alert('로그인을 다시 하세요')
              setAuth(false)
            }else{
              console.log(error)
            }
          });
      }
    }
  };
  
  setInterval(checkTokenExpiration, 60000); // 60초 마다 토큰 만료 여부를 체크

  return (
    <div>
      <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Signin />}/>
          <Route path='/register' element={<Signup />}/>
          <Route path='/challenge' element={<Challenge />}/>
          <Route path='/record' element={<Record />}/>
          <Route path='/template' element={<Template />}/>
          <Route path='/mypage' element={<Mypage />}/>
      </Routes>
    </div>
  )
}

export default App
