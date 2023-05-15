import { useState } from "react";
import { styled } from "styled-components";
import { mypageModalState } from "../atoms/auth";
import { useRecoilState } from "recoil";
import MypageModal from "../components/MypageModal";

const check = false; //needfix: email check button, change into atom

const Container = styled.div`
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

function Mypage() {
  const [editing, setEditing] = useState(false);
  const [modalState, setModalState] = useRecoilState(mypageModalState);
  const handleModalClick = (clicked) => {
    setModalState({ show: true, content: clicked });
  };
  return (
    <Container>
      {modalState.show && <MypageModal />}
      <h1 className="title">nickname님, 오늘의 글 기록을 응원해요!</h1>
      <div className="contents">
        <h2>기본 정보</h2>
        <hr />
        <div>
          <h3>아이디</h3>
          <span>id</span>
        </div>
        <div>
          <h3>비밀번호</h3>
          {editing ? (
            <>
              <input></input>
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
          {editing ? <input></input> : <span>nickname</span>}
        </div>
      </div>
      <div className="contents">
        <h2>연락처 정보</h2>
        <hr />
        <div>
          <h3>휴대전화</h3>
          {editing ? <input></input> : <span>010-****-1234</span>}
        </div>
        <div>
          <h3>이메일</h3>
          {editing ? (
            <>
              <input></input>
              <button
                className="modalBtn"
                onClick={() => handleModalClick("email")}
              >
                인증
              </button>
            </>
          ) : (
            <span>email@email.com</span>
          )}
        </div>
        <div>
          <h3>마케팅 수신 동의</h3>
          <img src={check ? "mypage_check.svg" : "mypage_check_disabled.svg"} />
          <span>이메일</span>
        </div>
      </div>
      {editing ? (
        <>
          <button className="edit cancle" onClick={() => setEditing(false)}>
            취소
          </button>
          <button className="edit" onClick={() => setEditing(false)}>
            저장
          </button>
        </>
      ) : (
        <button className="edit" onClick={() => setEditing(true)}>
          수정하기
        </button>
      )}
    </Container>
  );
}

export default Mypage;
