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

function App() {
 
  const setAuth = useSetRecoilState(authState)

  const checkTokenExpiration = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      // 토큰의 만료 시간을 체크합니다.
      const tokenExpiration = jwt_decode(accessToken).exp;
      const currentTime = Date.now() / 1000;
      // 토큰이 만료되었다면, 새로운 토큰을 발급받습니다.
      if (tokenExpiration < currentTime) {
        getAccessToken()
          .then((res) => {
            console.log(res)
            if(res.message === 'login again!'){
              alert('로그인을 다시 하세요')
              setAuth(false)
            }else{
              // 새로운 Access Token으로 요청을 보낼 수 있도록 설정합니다.
            localStorage.setItem("accessToken",res.data.data.accessToken)
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  };
  
  setInterval(checkTokenExpiration, 60000); // 60초 마다 토큰 만료 여부를 체크합니다.

  return (
    <div>
      <LeftNav/>
      <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Signin />}/>
          <Route path='/register' element={<Signup />}/>
          <Route path='/challenge' element={<Challenge />}/>
          <Route path='/template' element={<Template />}/>
          <Route path='/record' element={<Record />}/>
          <Route path='/mypage' element={<Mypage />}/>
      </Routes>
    </div>
  )
}

export default App
