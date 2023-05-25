import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postEmail, getEmailCode, postSignup } from "../remotes";
import ChallengeToast from "../components/toast/ChallengeToast";
import { challengeToastState } from "../atoms/auth";
import { useRecoilState } from "recoil";
import CheckModal from "../components/modal/CheckModal";
import SignupTerm from "../components/etc/SignupTerm";

const SignupWrapper = styled.div`
  font-family: "Pretendard";
  text-align: center;
  padding-top: 76px;
  padding-bottom: 100px;

  .logo {
    margin-bottom: 44px;
    cursor: pointer;
  }
`;

const SignupForm = styled.form`
  width: 614px;
  margin: 0 auto;
  font-size: 16px;

  .field {
    position: relative;
    display: flex;
    flex: 1 1 0;
    justify-content: center;
    padding-top: 24px;
  }

  .field div {
    flex-basis: 90px;
    text-align: left;
    margin: auto 0;
  }

  .field input {
    margin: auto;
    padding: 16px;
    flex-basis: 328px;
    width: 328px;
    height: 48px;
    border-radius: 8px;
    border: 1px solid #e3e5e5;
  }

  .field input:focus {
    outline: none;
  }

  .field input::placeholder {
    font-family: "Pretendard";
    color: #72777a;
  }

  .field button {
    flex-basis: 136px;
    border-radius: 8px;
    border: 0;
    color: white;
    background: var(--challenging-blue);
  }

  button:disabled {
    color: white;
    background: #dddee1;
  }

  .message {
    font-size: 12px;
    padding-left: 120px;
    padding-top: 12px;
    text-align: left;
  }

  .errorMessage {
    color: #ff5247;
  }

  .field .errorBox {
    border: 2px solid #ff5247;
  }

  .field:last-of-type {
    margin-top: 22px;
    margin-bottom: 63px;
  }

  .field:last-of-type div {
    margin-top: 0;
  }

  .policy {
    flex-grow: 1;
    font-size: 12px;
  }

  .policy div {
    display: flex;
    justify-content: center;
  }

  .policy div span {
    width: 160px;
    margin-left: 16px;
    margin-right: 28px;
  }

  .check {
    padding-bottom: 22px;
  }

  .check span {
    color: #7c8089;
  }

  .check img:hover {
    cursor: pointer;
  }

  .check a {
    color: #7c8089;
    text-decoration: underline;
  }

  .check a:hover {
    color: #7c8089;
    text-decoration: underline;
    cursor: pointer;
  }

  .check:nth-child(1) span {
    color: #000000;
  }

  .signupBtn {
    width: 328px;
    height: 48px;
    border: 0;
    color: white;
    background-color: var(--challenging-blue);
    border-radius: 8px;
  }

  .hidden {
    visibility: hidden;
  }

  .none {
    display: none;
  }
`;

const Signup = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [idError, setIdError] = useState(false);
  const [password1Error, setPassword1Error] = useState(false);
  const [password2Error, setPassword2Error] = useState(false);
  const [emailCode, setEmailCode] = useState("");
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [emailCodeError, setEmailCodeError] = useState(false);
  const [check, setCheck] = useState([false, false, false]);
  const [signupFlag, setSignupFlag] = useState(false);
  const [toast, setToast] = useRecoilState(challengeToastState);
  const [okaymodal, setOkaymodal] = useState(false);
  const [showTerm, setShowTerm] = useState(-1);

  useEffect(() => {
    if (
      !idError &&
      userId &&
      !password1Error &&
      password1 &&
      !password2Error &&
      password2 &&
      emailConfirmed &&
      !emailCodeError &&
      username.length > 0 &&
      phone.length === 11 &&
      check[0] &&
      check[1]
    ) {
      setSignupFlag(true);
    } else {
      setSignupFlag(false);
    }
  }, [
    idError,
    password1Error,
    password2Error,
    username,
    email,
    emailCodeError,
    phone,
    ...check,
  ]);

  const homeRoute = (e) => {
    navigate("/");
  };

  const LoginSubmit = (e) => {
    e.preventDefault();

    postSignup(userId, email, password2, username, phone)
      .then((res) => {
        console.log(res);
        setOkaymodal(true);
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          setToast("이미 존재하는 아이디 또는 중복되는 이메일입니다.");
        }
      });
  };

  const handleIdChange = (e) => {
    const value = e.target.value;
    setUserId(value);
  };

  const handlePassword1Change = (e) => {
    const value = e.target.value;
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\[\]\/\\\.,<>?;':"{}|\-_+~!@#$%^&*()=\`\[\]])[A-Za-z\d\[\]\/\\\.,<>?;':"{}|\-_+~!@#$%^&*()=\`\[\]]{8,}$/;
    setPassword1(value);

    if (!regex.test(value)) {
      setPassword1Error(true);
    } else {
      setPassword1Error(false);
    }
  };

  const handlePassword2Change = (e) => {
    const value = e.target.value;
    setPassword2(value);
    if (password1 !== value) {
      setPassword2Error(true);
    } else {
      setPassword2Error(false);
    }
  };

  const handleUsernameChange = (e) => {
    if (username.length <= 8) {
      setUsername(e.target.value);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailCodeChange = (e) => {
    const value = e.target.value;

    const regex = /^[0-9]{0,6}$/;
    if (regex.test(value)) {
      setEmailCode(e.target.value);
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]{0,11}$/;
    if (regex.test(value)) {
      setPhone(value);
    } else if (value.length < phone.length) {
      setPhone(value);
    }
  };

  const handleIdClick = (e) => {
    e.preventDefault();

    if (userId === "existing1") {
      setIdError(true);
    } else {
      setIdError(false);
    }
  };

  const handleEmailClick = (e) => {
    e.preventDefault();

    postEmail(email)
      .then((res) => {
        setEmailConfirmed(true);

        setToast("인증 요청이 되었습니다.");
      })
      .catch((err) => console.log(err));
  };

  const handleEmailCodeClick = (e) => {
    e.preventDefault();

    getEmailCode(email, emailCode)
      .then((res) => {
        setToast("이메일 인증이 완료되었습니다.");
      })
      .catch((err) => {
        setEmailCodeError(true);
        console.log(err);
      });
  };

  const handleCheckAll = () => {
    if (check.every((c) => c === true) === false) {
      setCheck([true, true, true]);
    } else {
      setCheck([false, false, false]);
    }
  };

  const handleCheck = (idx) => {
    const newCheck = [...check];
    newCheck[idx] = !newCheck[idx];
    console.log(newCheck);
    setCheck(newCheck);
  };

  useEffect(() => {
    if (toast) {
      setTimeout(() => {
        setToast(false);
      }, 1500);
    }
  }, [toast]);

  return (
    <SignupWrapper>
      {showTerm >= 0 && <SignupTerm term={showTerm} setTerm={setShowTerm} />}
      {okaymodal && <CheckModal message={"회원가입이 완료되었습니다."} />}
      {toast === "이메일 인증이 완료되었습니다." ? (
        <ChallengeToast message={toast} />
      ) : toast === "인증 요청이 되었습니다." ? (
        <ChallengeToast message={toast} />
      ) : toast === "이미 존재하는 아이디 또는 중복되는 이메일입니다." ? (
        <ChallengeToast message={toast} />
      ) : (
        ""
      )}

      <img
        className="logo"
        src="writon_logo.svg"
        alt="writon"
        onClick={homeRoute}
      />

      <SignupForm>
        <div className="field">
          <div>아이디</div>
          <input
            type="text"
            className={idError ? "errorBox" : ""}
            placeholder="영문, 숫자 5-11자"
            value={userId}
            onChange={handleIdChange}
          />
          <button
            className="hidden"
            disabled={
              /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,11}$/.test(userId)
                ? false
                : true
            }
            onClick={handleIdClick}
          >
            중복 확인
          </button>
        </div>
        {idError ? (
          <div className="message">
            <span className="errorMessage">중복된 아이디입니다.</span>
          </div>
        ) : (
          ""
        )}
        <div className="field">
          <div>비밀번호</div>
          <input
            type="password"
            className={password1Error ? "errorBox" : ""}
            placeholder="숫자, 영문, 특수문자 조합 최소 8자"
            value={password1}
            onChange={handlePassword1Change}
          />
          <button className="hidden" />
        </div>
        {password1Error ? (
          <div className="message">
            <span className="errorMessage">
              비밀번호를 확인해주세요. (숫자, 영문, 특수문자 조합 최소 8자)
            </span>
          </div>
        ) : (
          ""
        )}

        <div className="field">
          <div>비밀번호 확인</div>
          <input
            type="password"
            className={password2Error ? "errorBox" : ""}
            placeholder="비밀번호 재입력"
            value={password2}
            onChange={handlePassword2Change}
          />
          <button className="hidden" />
        </div>
        {password2Error ? (
          <div className="message">
            <span className="errorMessage">비밀번호가 일치하지 않습니다.</span>
          </div>
        ) : (
          ""
        )}

        <div className="field">
          <div>닉네임</div>
          <input
            type="text"
            placeholder="닉네임을 입력해주세요 (8자 제한)"
            value={username}
            onChange={handleUsernameChange}
          />
          <button className="hidden" />
        </div>
        <div className="field">
          <div>이메일</div>
          <input
            type="email"
            readOnly={emailConfirmed ? true : false}
            value={email}
            onChange={handleEmailChange}
          />
          <button
            disabled={email.indexOf("@") > 0 ? false : true}
            onClick={handleEmailClick}
          >
            인증 요청
          </button>
        </div>
        <div className="message">
          <span className="emailMessage">
            {" "}
            계정 분실 시 본인인증을 위한 입력이 필요해요.
          </span>
        </div>
        <div className="field">
          <div>인증 코드</div>
          <input
            disabled={emailConfirmed ? false : true}
            type="text"
            className={emailCodeError ? "errorBox" : ""}
            placeholder="인증 코드 6자리"
            value={emailCode}
            onChange={handleEmailCodeChange}
          />
          <button
            disabled={emailConfirmed ? false : true}
            onClick={handleEmailCodeClick}
          >
            인증
          </button>
        </div>
        {emailCodeError ? (
          <div className="message">
            <span className="errorMessage">잘못된 인증코드입니다.</span>
          </div>
        ) : (
          ""
        )}
        <div className="field">
          <div>휴대폰</div>
          <input
            type="text"
            placeholder="'-' 빼고 숫자만 입력"
            value={phone}
            onChange={handlePhoneChange}
          />
          <button className="hidden" />
        </div>
        <div className="field">
          <div>이용약관 동의</div>
          <div className="policy">
            <div className="check">
              <img
                onClick={handleCheckAll}
                src={
                  check.every((c) => c === true)
                    ? "signup_checkall.svg"
                    : "signup_checkall_disabled.svg"
                }
              />
              <span>약관 전체 동의 (선택 동의 포함)</span>
              <a className="hidden">자세히</a>
            </div>
            <div className="check">
              <img
                onClick={() => handleCheck(0)}
                src={
                  check[0] ? "signup_check.svg" : "signup_check_disabled.svg"
                }
              />
              <span>[필수] 라이톤 이용약관 동의</span>
              <a
                onClick={() => {
                  setShowTerm(0);
                }}
              >
                자세히
              </a>
            </div>
            <div className="check">
              <img
                onClick={() => handleCheck(1)}
                src={
                  check[1] ? "signup_check.svg" : "signup_check_disabled.svg"
                }
              />
              <span>[필수] 개인정보 수집 및 이용 동의</span>
              <a onClick={() => setShowTerm(1)}>자세히</a>
            </div>
            <div className="check">
              <img
                onClick={() => handleCheck(2)}
                src={
                  check[2] ? "signup_check.svg" : "signup_check_disabled.svg"
                }
              />
              <span>[선택] 광고성 정보 수신 동의</span>
              <a onClick={() => setShowTerm(2)}>자세히</a>
            </div>
          </div>
          <button className="hidden" />
        </div>
        <button
          className="signupBtn"
          disabled={signupFlag ? false : true}
          onClick={LoginSubmit}
        >
          가입하기
        </button>
      </SignupForm>
    </SignupWrapper>
  );
};

export default Signup;
