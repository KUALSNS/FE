import { useState, useEffect } from "react";
import { styled } from "styled-components";
import {
  mypageInfoState,
  mypageModalState,
  mypageSubscribeState,
  challengeToastState,
} from "../atoms/auth";
import { useRecoilState } from "recoil";
import MypageModal from "../components/mypage/MypageModal";
import MypageSubscribe from "../components/mypage/MypageSubscribe";
import { getMypageInfo, getAccessToken, patchNamePhone } from "../remotes";
import SubscribeCupon from "../components/SubscribeCupon";
import ChallengeToast from "../components/toast/ChallengeToast";

const check = false;

function Mypage() {
  const [editing, setEditing] = useState(false);
  const [nicknameInput, setNicknameInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [userInfo, setUserInfo] = useRecoilState(mypageInfoState);
  const [toast, setToast] = useRecoilState(challengeToastState);
  const [modalState, setModalState] = useRecoilState(mypageModalState);
  const [subscribeState, setSubscribeState] =
    useRecoilState(mypageSubscribeState);
  const handleModalClick = (clicked) => {
    setModalState({ show: true, content: clicked });
  };

  useEffect(() => {
    mypageInit();
  }, []);

  const mypageInit = () => {
    console.log("mypageinit");
    getMypageInfo()
      .then((res) => {
        console.log(res);
        const data = res.data.responseData;
        setUserInfo({
          id: data.identifier,
          password: data.password,
          nickname: data.nickname,
          phone: data.phone,
          email: data.email,
          mar: data.mar_email,
        });
        setNicknameInput(data.nickname);
        setPhoneInput(data.phone);
      })
      .catch((err) => {
        console.log(err.response.data.code);
        if (err.response.data.code === 419) {
          Retoken();
        } else {
          console.log(err);
        }
      });
  };

  const Retoken = () => {
    getAccessToken()
      .then((res) => {
        localStorage.setItem("accessToken", res.data.data.accessToken);
      })
      .catch((error) => {
        if (error.response.data.code === 419) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          alert("로그인을 다시 하세요");
          window.location.reload();
        } else {
          console.log(error);
        }
      });
  };

  const saveEdit = () => {
    patchNamePhone(nicknameInput, phoneInput)
      .then((res) => {
        setUserInfo({
          ...userInfo,
          nickname: nicknameInput,
          phone: phoneInput,
        });
        setToast("저장되었습니다.");
      })
      .catch((err) => {
        console.log(err);
      });
    setEditing(false);
  };

  return (
    <>
      {toast === "저장되었습니다." ? <ChallengeToast message={toast} /> : ""}
      <SubscribeCupon />
      <MypageSubscribe />
      {modalState.show && <MypageModal />}
      <Container>
        <h1 className="title">
          {userInfo.nickname}님, 오늘의 글 기록을 응원해요!
        </h1>{" "}
        <button
          className="subscribe"
          onClick={() => setSubscribeState(!subscribeState)}
        >
          멤버십 관리
        </button>
        <div className="contents">
          <h2>기본 정보</h2>
          <hr />
          <div>
            <h3>아이디</h3>
            <span>{userInfo.id}</span>
          </div>
          <div>
            <h3>비밀번호</h3>
            {editing ? (
              <>
                <input disabled value="******"></input>
                <button
                  className="modalBtn"
                  onClick={() => handleModalClick("password")}
                >
                  비밀번호 변경
                </button>
              </>
            ) : (
              <span>********</span>
            )}
          </div>
          <div>
            <h3>닉네임</h3>
            {editing ? (
              <input
                value={nicknameInput}
                onChange={(e) => setNicknameInput(e.target.value)}
              ></input>
            ) : (
              <span>{userInfo.nickname}</span>
            )}
          </div>
        </div>
        <div className="contents">
          <h2>연락처 정보</h2>
          <hr />
          <div>
            <h3>휴대전화</h3>
            {editing ? (
              <input
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
              ></input>
            ) : (
              <span>
                {userInfo.phone.slice(0, 3)}-****-{userInfo.phone.slice(-4)}
              </span>
            )}
          </div>
          <div>
            <h3>이메일</h3>
            {editing ? (
              <>
                <input disabled value={userInfo.email}></input>
                <button
                  className="modalBtn"
                  onClick={() => handleModalClick("email")}
                >
                  인증
                </button>
              </>
            ) : (
              <span>{userInfo.email}</span>
            )}
          </div>
          <div>
            <h3>마케팅 수신 동의</h3>
            <img
              src={check ? "mypage_check.svg" : "mypage_check_disabled.svg"}
            />
            <span>이메일</span>
          </div>
        </div>
        {editing ? (
          <>
            <button className="edit cancle" onClick={() => setEditing(false)}>
              취소
            </button>
            <button className="edit" onClick={saveEdit}>
              저장
            </button>
          </>
        ) : (
          <button className="edit" onClick={() => setEditing(true)}>
            수정하기
          </button>
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  position: relative;
  max-width: 1106px;
  margin-top: 80px;
  padding-top: 52px;
  margin-left: 378px;
  margin-bottom: 149px;
  font-family: "Pretendard", sans-serif;
  width: 920px;
  h1 {
    font-family: "Happiness-Sans-Bold";
    font-size: 28px;
    margin-bottom: 56px;
  }

  .subscribe {
    position: absolute;
    right: 0;
    top: 52px;
    width: 123px;
    height: 40px;
    background: #dee9fd;
    border: 1px solid #bcd6ff;
    border-radius: 2px;
  }

  hr {
    border: 1px solid #e2e4e7;
    width: 920px;
    margin-top: 13px;
    margin-bottom: 34px;
  }

  h2 {
    font-family: "Happiness-Sans-Bold";
    font-size: 20px;
  }

  .contents h3 {
    display: inline-block;
    font-size: 16px;
    width: 182px;
    vertical-align: top;
  }

  .contents span {
    display: inline-block;
    width: 200px;
    height: 42px;
    color: #72777a;
  }

  .contents input {
    position: absolute;
    top: -10px;
    width: 200px;
    height: 42px;
    border-radius: 8px;
    border: 1px solid #e3e5e5;
    padding: 0 16px;
    color: #72777a;
    font-size: 13px;
    vertical-align: top;
  }

  input:focus {
    outline: none;
  }

  img {
    margin-right: 8px;
  }

  .contents {
    margin-bottom: 81px;
  }

  .contents > div {
    height: 42px;
    margin-bottom: 12px;
    position: relative;
  }

  .modalBtn {
    //needfix: moves up tlqkf
    margin-left: 463px;
    width: 119px;
    height: 32px;
    background: none;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    vertical-align: top;
  }

  .edit {
    margin-top: 8px;
    background-color: var(--challenging-blue);
    border: 0;
    border-radius: 8px;
    color: white;
    width: 136px;
    height: 48px;
  }

  .cancle {
    background: #dddee1;
    margin-right: 20px;
  }
`;

export default Mypage;
