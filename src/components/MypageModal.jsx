import React from 'react'
import { styled } from 'styled-components'
import { useRecoilState } from 'recoil'
import { mypageModalState } from '../atoms/auth'

const ModalWrapper = styled.div`
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

  .modalbox button{
    font-size: 16px;
    position: absolute;
    bottom: 54px;
    lefT: 92px;
    width: 328px;
    height: 48px;
    color: #ffffff;
    background-color: var(--challenging-blue);
    border: 0;
    border-radius: 2px;
  }

  .modalbox button:disabled{
    background-color: #DDDEE1;
  }

  .modalbox span{
    display: block;
    font-size: 18px;
    margin-top: 64px;
  }

  .email{
    margin-bottom: 79px;
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


function MypageModal() {

  const [modalState, setModalState] = useRecoilState(mypageModalState);
  
  return (
    <ModalWrapper>
      <div className='modalbox'>
        <img className='xbtn' src='mypage_modalx.svg' onClick={()=>setModalState({show: false, content: ""})}></img>
          {modalState.content==='password'&&
          <form>
            <span className='password'>비밀번호 변경</span>
            <input placeholder='현재 비밀번호'></input>
            <input placeholder='새 비밀번호'></input>
            <input placeholder='비밀번호 확인'></input>
            <button onClick={()=>setModalState({show: false, content: ""})}>확인</button>
          </form>}
          {modalState.content==='email'&&
          <form>
            <span className='email'>이메일 변경</span>
            <input placeholder='이메일 주소 입력'></input>
            <input placeholder='인증번호 입력'></input>
            <button onClick={()=>setModalState({show: false, content: ""})}>인증</button>
          </form>}
      </div>
    </ModalWrapper>
  )
}

export default MypageModal