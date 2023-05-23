import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  loadingState,
  sideToggleState,
  detailuserState,
  authState,
  sideState,
  ChallengeWriteState,
  selectChallengeState,
  challengeToastState,
} from "../atoms/auth";
import { useLocation } from "react-router-dom";
import { postSideBarChallenge } from "../remotes";

function LeftNav() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useRecoilValue(sideToggleState);
  const loading = useRecoilValue(loadingState);
  const detailuser = useRecoilValue(detailuserState);
  const [auth, setAuth] = useRecoilState(authState);
  const [side, setSide] = useRecoilState(sideState);
  const [toast, setToast] = useRecoilState(challengeToastState);
  const sidemenu = [
    ["라이톤 홈", "/"],
    ["글 챌린지", "/challenge"],
    ["글 플래너", "/record"],
    ["마이페이지", "/mypage"],
  ];

  const location = useLocation();
  const pathname = location.pathname;
  const pattern = /\/[^/]*$/;
  const extractedPathname = pathname.replace(pattern, "");

  const [selectChallenge, setSelectChallenge] =
    useRecoilState(selectChallengeState);
  const [writeChallenge, setWriteChallenge] =
    useRecoilState(ChallengeWriteState);

  const selectMenu = (url, idx) => {
    if (auth) {
      if (url === "/challenge") {
        if (detailuser.challengeCertain) {
          // 진행중인 챌린지가 있냐 없냐
          postSideBarChallenge()
            .then((res) => {
              if (res.data.data.challengingArray.length) {
                console.log(res);
                setWriteChallenge(res.data.data);

                console.log(writeChallenge);
                setSelectChallenge(
                  "[" +
                    res.data.data.templateData.challengeCategory +
                    "]" +
                    " " +
                    res.data.data.templateData.challengeName
                );
                setSide(true);
                navigate(url);
              } else {
                setToast("오늘은 모두 다 작성하셨어요!");
              }
            })
            .catch((err) => console.log(err));
        } else {
          setToast("진행중인 챌린지가 없어요!");
          // 모달창 띄우게끔 홈으로 상태하나 보내주기  임시저장된게 업수다/ 진행중인 챌린지가 없습니다.
        }
      } else {
        navigate(url);
      }
    } else {
      navigate("/login");
    }
  };

  const SpaceHome = () => {
    navigate("/");
  };

  return (
    <Sidebar>
      <div className={`sidebar ${toggle ? "open" : ""}`}>
        <div className="sidebar-nav">
          {sidemenu.map((menu, idx) => {
            return (
              <li
                key={idx}
                onClick={() => selectMenu(menu[1], idx)}
                className={menu[1] === pathname ? "selectMenu" : ""}
              >
                {menu[1] === pathname ? (
                  <img height={40} src="/list_logo.svg" />
                ) : (
                  ""
                )}
                <div className="menu">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div>{menu[0]}</div>
                  </div>
                </div>
              </li>
            );
          })}
        </div>
        <div className="list-bottom">
          <img
            onClick={SpaceHome}
            width={114}
            height={27}
            src="/list_bottom.svg"
          />
        </div>
      </div>
    </Sidebar>
  );
}

export default LeftNav;

const Sidebar = styled.div`
  position: fixed;
  width: 236px;
  height: 100%;
  overflow-x: hidden;

  .sidebar {
    position: relative;

    min-height: 100%;
    /* position: absolute; */
    left: -300px;
    width: 236px;
    /* height: 100%; */
    background-color: #fbfbfb;
    transition: transform 0.3s ease-in-out;
    box-shadow: 0px 2px 5px rgba(38, 51, 77, 0.03);
    display: flex;
    flex-direction: column;
  }

  .open {
    transform: translateX(300px);
  }
  .sidebar-nav {
    list-style: none;
    margin-top: 40px;
  }

  .sidebar-nav li {
    width: 188px;
    height: 40px;
    text-decoration: none;
    color: #7c8089;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin: auto;
    margin-bottom: 18px;
  }

  .sidebar-nav .selectMenu {
    background: #e6efff;
    border-radius: 8px;
    color: #000;
  }

  .sidebar-nav li:hover {
    color: #000;
    /* background: rgba(255, 255, 255, 0.2); */
  }

  .sidebar-nav li .menu {
    display: flex;
    font-family: "Happiness Sans";
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 16px;
    justify-content: space-between;
    width: 144px;
    height: 40px;
    align-items: center;
    position: absolute;
    margin-left: 16px;
  }

  .list-bottom {
    position: absolute;
    bottom: 115px; //라이톤 로고 bottom 조정
    width: 236px;
    display: flex;
    justify-content: center;
    /* height: 110px; 
    cursor: pointer;
    /* margin-top: auto; */
  }
  .list-bottom img {
    cursor: pointer;
  }
`;
