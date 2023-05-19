import React, {useState} from 'react'
import { styled } from 'styled-components'
import { useRecoilState } from 'recoil'
import { mypageModalState, mypageInfoState } from '../atoms/auth'
import { patchPassword, postEmail, getEmailCode, patchEmail } from '../remotes'

function MypageModal() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [emailCode, setEmailCode] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [modalState, setModalState] = useRecoilState(mypageModalState);
  const [userInfo, setUserInfo] = useRecoilState(mypageInfoState)

  const passwordCanSubmit = ()=>{
    if (oldPassword&&newPassword&&checkPassword&&newPassword==checkPassword) return true;
    return false;
  }
  const handlePasswordSubmit = (e, oldpw, newpw)=>{
    e.preventDefault();
    console.log("password change");
    patchPassword(oldpw, newpw)
    
    .then((res)=>{
      alert("비밀번호가 변경되었습니다.")
      console.log(res)
    })
    .catch((err) => {
      if (err.response.data.code === 419) {
        //handlePasswordSubmit(e, oldpw, newpw)
        Retoken();
      } else if (err.response.data.status === 401) {
        alert("기존 비밀번호가 옳지 않습니다.")
      } else {
        console.log(err);
      }
    });
    setModalState({show: false, content: ""})
  }

  const emailConfirm = (email)=>{
    console.log("email confirm", email);
    postEmail(email)
    .then(res=>{
      console.log(res);
      setEmailConfirmed(true);
    })
    .catch((err)=>console.log(err));
  }
  const emailSave = ( email)=>{
    patchEmail(email)
    .then(res=>{
      console.log(res);
      alert("이메일이 변경되었습니다.");
      setUserInfo({...userInfo, "email":email});
    })
    .catch(err=>{
      console.log(err);
    })
  }
  const handleEmailSubmit = (e, email, code)=>{
    e.preventDefault();
    console.log("email code check");
    getEmailCode(email, code)
    .then(res=>{
      console.log(res);
      emailSave(email);
    })
    .catch((err)=>{
      if (err.response.data.code === 419) {
        Retoken();
        //handleEmailSubmit(e, email, code)
      } else if (err.response.data.status === 400) {
        alert("이메일 인증번호가 일치하지 않습니다.");
      }
      else{
        console.log(err);
      }}
    );
    setModalState({show: false, content: ""})
  }
  return (
    <ModalWrapper>
      <div className='modalbox'>
        <img className='xbtn' src='mypage_modalx.svg' onClick={()=>setModalState({show: false, content: ""})}></img>
          {modalState.content==='password'&&
          <form  onSubmit={(e)=>handlePasswordSubmit(e, oldPassword, newPassword)}>
            <span className='password'>비밀번호 변경</span>
            <input type="password" placeholder='현재 비밀번호' value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)}></input>
            <input type="password" placeholder='새 비밀번호' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}></input>
            <input type="password" placeholder='비밀번호 확인' value={checkPassword} onChange={(e)=>setCheckPassword(e.target.value)}></input>
            <button disabled={!passwordCanSubmit()} className='submitBtn'>확인</button>
          </form>}
          {modalState.content==='email'&&
          <form onSubmit={(e)=>handleEmailSubmit(e, newEmail, emailCode)}>
            <span className='email'>이메일 변경</span>
            <div className='confirm'>
            <input type='email' value={newEmail} onChange={(e)=>setNewEmail(e.target.value)} readOnly={emailConfirmed?true:false}  placeholder='이메일 주소 입력'></input>
            <button type="button" disabled={newEmail.indexOf("@")>0?false:true} onClick={()=>emailConfirm(newEmail)}>인증</button>
            </div>
            <input disabled={!emailConfirmed} value={emailCode} onChange={(e)=>setEmailCode(e.target.value)} placeholder='인증번호 입력'></input>
            <button disabled={emailCode.length!==6} className='submitBtn'>수정</button>
          </form>}
      </div>
    </ModalWrapper>
  )
}

const ModalWrapper = styled.div`
  font-family: "Pretendard", sans-serif;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;

  .modalbox{
    position: relative;
    height: 518px;
    width: 513px;
    border-radius: 12px;
    background: #ffffff;
    text-align: center;
  }
  
  .xbtn{
    position: absolute;
    top: 24px;
    right: 24px;
    cursor: pointer;
    margin: 0;
  }

  input:focus{
    outline: 0;
  }

  .modalbox button{
    font-size: 16px;
    color: #ffffff;
    background-color: var(--challenging-blue);
    border: 0;
    border-radius: 2px;
  }

  .modalbox button:disabled{
    background-color: #DDDEE1;
  }

  .modalbox .submitBtn{
    position: absolute;
    bottom: 54px;
    left: 92px;
    width: 328px;
    height: 48px;
  }

  .modalbox span{
    display: block;
    font-size: 18px;
    margin-top: 64px;
  }

  .email{
    margin-bottom: 79px;
  }

  .modalbox .confirm input{
    width: 240px;
    margin-right: 8px;
  }

  .confirm button{
    width: 80px;
    height: 48px;
  }

  .password{
    margin-bottom: 43px;
  }

  .modalbox input{
    width: 328px;
    height: 48px;
    margin-bottom: 32px;
    border-radius: 8px;
    border: 1px solid #E3E5E5;
    padding: 0 16px;
    color: #72777A;
  }
`



export default MypageModal