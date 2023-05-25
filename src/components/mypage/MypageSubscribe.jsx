import React, { useEffect } from "react";
import { styled } from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  mypageSubscribeState,
  subscribedState,
  activeChallengeState,
  subscribeModalState,
} from "../../atoms/auth";
import { postActivateCupon } from "../../remotes";

function MypageSubscribe() {
  const [showState, setShowState] = useRecoilState(mypageSubscribeState);
  const activeChallenge = useRecoilValue(activeChallengeState);
  const setSubscribeModalState = useSetRecoilState(subscribeModalState);
  const [subscriber, setSubscriber] = useRecoilState(subscribedState);

  const handleCuponClick = () => {
    postActivateCupon()
      .then((res) => {
        console.log(res);
        setSubscribeModalState(true);
        setSubscriber(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {}, [activeChallenge.coopen]);

  return (
    <SubscribeWrapper showState={showState}>
      <div className="topbar">
        <div className="xbtn" onClick={() => setShowState(false)}>
          <img src="record_modal_xbtn.svg"></img>
        </div>
        <div className="logoArea">
          <img src="record_modal_logo.svg"></img>멤버십 관리
        </div>
      </div>

      {subscriber ? (
        <h2>
          현재 이용 중인
          <br />
          라이톤 업 멤버십이에요
        </h2>
      ) : (
        <h2>
          현재 이용 중인
          <br />
          멤버십이 없어요...
        </h2>
      )}
      {subscriber ? (
        <div>
          {subscribedState && (
            <div className="membership">
              <h3>
                30일{" "}
                <span className="blue">
                  라이톤 업<img src="mypage_subscribe_logoup.svg" />
                </span>{" "}
                체험 쿠폰
              </h3>
              <div className="info">
                <img src="mypage_subscribe_yellowcheck.svg" />
                챌린지 무제한 부스터
              </div>
              <div className="info">
                <img src="mypage_subscribe_yellowcheck.svg" />
                통계 분석 전체 열람
              </div>
              <hr />
              <div className="period">이용 기간 2023.05.11 - 2023.06.11</div>
            </div>
          )}
          <button disabled className="unsubscribe">
            해지하기
          </button>
        </div>
      ) : (
        <div className="subscribeArea">
          <div className="cupon">
            <h2>라이톤 업 구독자가 되어주세요 😢</h2>
            <p>멤버십에 가입하려면 하단 버튼을 클릭해주세요</p>
            <button onClick={handleCuponClick}>체험하기 쿠폰 사용</button>
          </div>
        </div>
      )}
    </SubscribeWrapper>
  );
}

const SubscribeWrapper = styled.div`
  font-family: "Pretendard", sans-serif;
  position: fixed;
  max-height: 100vh;
  overflow-y: hidden;
  top: 0;
  right: 0;
  height: 100%;
  background: #ffffff;
  width: 470px;
  z-index: 20;
  box-shadow: -10px 4px 16px -12px rgba(39, 39, 39, 0.1);
  padding: 58px 40px;
  transform: ${(props) =>
    props.showState ? "translateX(0%);" : "translateX(100%);"};
  transition: transform 0.5s ease-in-out;
  .topbar {
    margin-top: 18px;
    margin-bottom: 68px;
    display: flex;
    justify-content: space-between;
  }
  .topbar .xbtn {
    cursor: pointer;
  }

  h2 {
    font-family: "Happiness-Sans-Bold", sans-serif;
    font-size: 22px;
    line-height: 32px;
    margin-bottom: 22px;
  }
  .blue {
    color: var(--challenging-blue);
  }
  .membership {
    position: relative;
    width: 390px;
    height: 176px;
    background: #f5f9ff;
    border-radius: 8px;
    padding: 20px 24px;
  }
  .membership h3 {
    font-family: "Happiness-Sans-Bold", sans-serif;
    font-size: 18px;
    margin-bottom: 20px;
  }
  .membership .info {
    margin-bottom: 16px;
    font-size: 14px;
  }
  .membership .info img {
    margin-right: 8px;
  }
  .membership hr {
    position: absolute;
    width: 390px;
    border: 1px solid #e3e4e5;
    top: 120px;
    left: 0;
  }
  .period {
    font-size: 12px;
    color: #7c8089;
    margin-top: 26px;
  }
  .unsubscribe {
    position: absolute;
    bottom: 137px;
    right: 66px;
    width: 337px;
    height: 62px;
    background: var(--challenging-blue);
    color: white;
    border-radius: 2px;
    font-size: 16px;
    text-align: center;
    border: 0;
  }
  .unsubscribe:disabled {
    background: #dddee1;
    color: #72777a;
  }

  .cupon {
    margin-top: 100px;
    height: 189px;
    background: url("record_modal_cupon_background.svg") no-repeat;
    border: 1px solid #e2e4e7;
    border-radius: 8px;
    text-align: center;
  }
  .cupon h2 {
    margin-top: 41px;
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: 700;
  }

  .cupon p {
    font-size: 12px;
    line-height: 15px;
    color: #7c8089;
    margin-bottom: 15px;
  }

  .cupon button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 16px;
    margin: auto;
    width: 142px;
    height: 40px;
    background: #266cf4;
    color: #ffffff;
    border: 0;
    font-size: 14px;
    border-radius: 2px;
  }
`;
export default MypageSubscribe;
