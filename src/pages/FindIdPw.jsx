import React, { useState, useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { IdPwFindState, challengeToastState } from "../atoms/auth";
import { postEmail, getIdFind, postPwFind } from "../remotes";
import { styled } from "styled-components";
import CheckModal from "../components/modal/CheckModal";
import ChallengeToast from "../components/toast/ChallengeToast";
function FindIdPw() {
  const findState = useRecoilValue(IdPwFindState);
  console.log("findstate:", findState);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userCode, setUserCode] = useState("");
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [modalState, setModalState] = useState("");
  const [toast, setToast] = useRecoilState(challengeToastState);

  useEffect(() => {
    if (toast) {
      setTimeout(() => {
        setToast(false);
      }, 1500);
    }
  }, [toast]);

  const verifyEmail = () => {
    console.log(userEmail);
    postEmail(userEmail)
      .then((res) => {
        setEmailConfirmed(true);

        setToast("인증번호가 전송되었습니다.");
      })
      .catch((err) => console.log(err));
  };

  const getId = (e) => {
    e.preventDefault();
    getIdFind(userEmail, userCode)
      .then((res) => {
        setModalState(`아이디는 ${res.data.userId}입니다.`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postPw = (e) => {
    e.preventDefault();
    postPwFind(userId, userEmail)
      .then((res) => {
        setModalState("임시 비밀번호가 전송되었습니다.");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <FindIdPwWrapper>
      {toast && <ChallengeToast message={toast} />}
      {modalState && <CheckModal message={modalState} />}
      <h1>{findState === "id" ? "아이디" : "비밀번호"} 찾기</h1>
      {findState === "id" ? (
        <form onSubmit={(e) => getId(e)}>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="닉네임"
          />
          <input
            type="text"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="이메일"
          />
          <button type="button" className="verify" onClick={verifyEmail}>
            인증 요청
          </button>
          <input
            type="text"
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            placeholder="인증번호"
          />
          <button>확인</button>
        </form>
      ) : (
        <form onSubmit={(e) => postPw(e)}>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="아이디"
          />
          <input
            type="text"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="이메일"
          />
          <button>확인</button>
        </form>
      )}
    </FindIdPwWrapper>
  );
}

const FindIdPwWrapper = styled.div`
  text-align: center;
  padding-top: 83px;
  h1 {
    font-size: 26px;
    margin-bottom: 95px;
  }
  form {
    width: 328px;
    margin: auto;
    position: relative;
  }
  input {
    display: block;
    margin: auto;
    width: 328px;
    height: 48px;
    padding: 16px;
    border-radius: 8px;
    border: 1px solid #e3e5e5;
    margin-bottom: 24px;
  }

  input:focus {
    outline: none;
  }

  input::placeholder {
    font-family: "Pretendard";
    color: #72777a;
  }

  button {
    width: 328px;
    height: 48px;
    border-radius: 8px;
    border: 0;
    color: white;
    background: var(--challenging-blue);
    margin-top: 40px;
    margin-bottom: 24px;
  }
  .verify {
    position: absolute;
    right: 0;
    width: 100px;
    right: -120px;
    bottom: 183px;
  }
  a {
    cursor: pointer;
  }
`;
export default FindIdPw;
