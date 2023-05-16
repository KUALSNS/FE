import { Routes, Route, Link, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Challenge from "./pages/Challenge";
import Template from "./pages/Template";
import Record from "./pages/Record";
import Mypage from "./pages/Mypage";
import LeftNav from "./components/LeftNav";
import { getAccessToken } from "./remotes";
import { useRecoilState } from "recoil";
import { authState } from "./atoms/auth";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { patchLogoutUser } from "./remotes";
import Navigation from "./components/Navigation";

function App() {
  const location = useLocation();
  const [auth, setAuth] = useRecoilState(authState);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const checkTokenExpiration = () => {
    // getCategory()
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // 토큰의 만료 시간을 체크
      const tokenExpiration = jwt_decode(accessToken).exp;
      console.log("zz");
      const currentTime = Date.now() / 1000;
      // 토큰이 만료되었다면, 새로운 토큰을 발급
      if (tokenExpiration < currentTime) {
        getAccessToken()
          .then((res) => {
            console.log(res);
            localStorage.setItem("accessToken", res.data.data.accessToken);
            console.log("access 토큰 만 재발급");
          })
          .catch((error) => {
            if (error.response.data.code === 419) {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              alert("로그인을 다시 하세요");
              setAuth(false);
            } else {
              console.log(error);
            }
          });
      }
    }
  };

  setInterval(checkTokenExpiration, 60000);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setAuth(true);
    }

    function handleResize() {
      setIsSmallScreen(window.innerWidth <= 1390);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const Logout = () => {
    patchLogoutUser()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAuth(false);
    navigate("/");
  };

  return (
    <div>
      {/* {!auth ? (
        <div className="sign" style={{ position: "relative", zIndex: "30" }}>
          <Link to="/login">Sign in</Link>
          <Link to="/register">Sign up</Link>
        </div>
      ) : (
        <button style={{ position: "relative", zIndex: "30" }} onClick={Logout}>
          로그아웃
        </button>
      )} */}
      {/* <button onClick={checkTokenExpiration}>토큰 재발급 </button> */}
      {location.pathname == "/login" || location.pathname == "/register" ? (
        ""
      ) : (
        <div>
          <Navigation />
          {!isSmallScreen ? (
            <div>
              <LeftNav />
            </div>
          ) : (
            ""
          )}
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route path="/record" element={<Record />} />
        <Route path="/template" element={<Template />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
