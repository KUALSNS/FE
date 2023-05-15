import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState, sideToggleState } from "../atoms/auth";
import { patchLogoutUser } from "../remotes";

const Navigation = () => {
  const navigate = useNavigate();
  const [listToggle, setListToggle] = useRecoilState(sideToggleState);
  const [userToggle, setUserToggle] = useState(false);
  const auth = useRecoilValue(authState);

  const sidebarToggle = () => {
    setListToggle(!listToggle);
  };
  const userInfoToggle = () => {
    setUserToggle(!userToggle);
  };

  const Logout = () => {
    patchLogoutUser()
      .then((res) => {
        console.log(res);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.reload();
      })
      .catch((err) => console.log(err));
    setAuth(false);
  };

  const SpaceHome = () => {
    navigate("/");
  };

  const SpaceToLogin = () => {
    navigate("/login");
  };

  const SpaceToRegister = () => {
    navigate("/register");
  };

  return (
    <Container>
      <ContainerLeft>
        <div className="navi-logo">
          <img onClick={SpaceHome} height={80} src="navigation.svg" />
        </div>
        <div className="navi-list">
          <img onClick={sidebarToggle} src="menu.svg" />
        </div>
      </ContainerLeft>
      <ContainerRight>
        <div className={auth ? "after-right" : "before-right"}>
          <div className="challenge-title">
            <div>5월 25일 오늘 진행 중인 챌린지 </div>
            <div className="count"> 2/2</div>
          </div>
          {auth ? (
            <div className="user-info" onClick={userInfoToggle}>
              <img width={22} src="user_img.svg" />
              <div className="name">라이언님</div>
              <img width={12} src={!userToggle ? "arrow1.svg" : "arrow2.svg"} />
              {userToggle ? (
                <div>
                  <div className="drop">
                    <div className="drop-container">
                      <div
                        className="text"
                        style={{ textAlign: "center", lineHeight: "28px" }}
                      >
                        라이언님 하이
                      </div>
                      <div className="control">
                        <div>마이페이지</div>
                        <div onClick={Logout}>로그아웃</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div className="before-user">
              <div onClick={SpaceToLogin}>로그인</div>
              <div onClick={SpaceToRegister}>회원가입</div>
            </div>
          )}
        </div>
      </ContainerRight>
    </Container>
  );
};

export default Navigation;

const Container = styled.div`
  min-width: 920px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: #266cf4;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  padding-left: 60px;
  padding-right: 74px;
  padding-left: 30px;
  padding-right: 30px;
  z-index: 10;
  a {
    color: #ffffff;
    text-decoration: none;
  }
  z-index: 2;
`;

const ContainerLeft = styled.div`
  display: flex;
  position: absolute;

  .navi-list {
    position: absolute;
    z-index: 4;
    top: 25px;
    cursor: pointer;
    left: -40px;
  }

  .navi-logo img {
    cursor: pointer;
  }
`;

const ContainerRight = styled.div`
  .before-right {
    display: flex;
    margin: auto;
    margin-left: 205px;
    justify-content: space-between;
    width: 1062px;
    z-index: 2;
  }

  .after-right {
    display: flex;
    margin: auto;
    margin-left: 205px;
    justify-content: space-between;
    width: 1106px;
    z-index: 2;
  }

  .before-user {
    width: 134px;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 16px;

    color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .before-user div {
    cursor: pointer;
  }

  .challenge-title {
    display: flex;
    font-family: "Happiness-Sans-Bold";
    color: #ffffff;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    align-items: center;
  }
  .count {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    margin-left: 8px;
    color: #ffffff;
    margin-bottom: 2px;
  }

  .user-info {
    color: #ffffff;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid #d9d9d9;
    border-radius: 32px;
    width: 148px;
    height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: relative;
  }

  .user-info .name {
    margin-left: 8px;
    margin-right: 8px;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 16px;
  }

  .sign {
    display: block;
  }

  .drop-triangle {
    position: absolute;
    z-index: 2;
    border-bottom: 20px solid lightgray;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    margin-right: 60px;
    right: 0;
    margin-top: 25px;
    border-radius: 10px;
  }
  .drop {
    position: absolute;
    z-index: 3;
    width: 148px;
    height: 232px;
    background-color: violet;
    margin-top: 20px;
    right: 0;
    border-radius: 10px;
    display: flex;
  }
  .drop-container {
    width: 134px;
    height: 165px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;
