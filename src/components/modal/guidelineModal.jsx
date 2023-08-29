import React, {useState} from 'react';
import {useNavigate} from 'react-router';
// import {useNavigate} from 'react-router';
import {styled} from 'styled-components';

const GuidelineModal = ({onClose, setOnClose}) => {
	const navigate = useNavigate();

	return (
		<GuideModalWrapper>
			<GuideBox>
				<div className="close">
					<img
						src="/modalClose.svg"
						alt="close"
						width={14}
						onClick={() => setOnClose(!onClose)}
					/>
				</div>
				<div className="Modalcenter">
					<div className="title">
						라이톤 설명서 <div className="titleOpen">OPEN!</div>
					</div>
					<div className="text">
						글 챌린지 시작과 글 템플릿 활용 방법을 확인해요.
					</div>
					<img src="/guidelineLogo.png" alt="모달로고" width={276} />
				</div>
				<div className="Btn">
					<div className="todayStopBtn">
						<p
							onClick={() => {
								localStorage.setItem('guideModal', true);
								setOnClose(true);
							}}
						>
							오늘 그만 보기
						</p>
					</div>
					<div className="spaceBtn">
						<p
							onClick={() => {
								navigate('/guideline');
								localStorage.setItem('guideModal', true);
								setOnClose(true);
							}}
						>
							보러 가기
						</p>
					</div>
				</div>
			</GuideBox>
		</GuideModalWrapper>
	);
};

export default GuidelineModal;

const GuideModalWrapper = styled.div`
	font-family: 'Pretendard', sans-serif;
	font-style: normal;
	font-weight: 500;
	font-size: 18px;
	line-height: 22px;
	overflow: auto;
	text-align: center;
	color: #272727;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	background: rgba(0, 0, 0, 0.4);
	z-index: 20;
`;

const GuideBox = styled.div`
	width: 390px;
	height: 400px;
	background: #ffffff;
	border-radius: 12px;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	.close {
		position: absolute;
		top: 26px;
		width: 100%;
	}
	.close img {
		position: absolute;
		right: 44px;
		cursor: pointer;
	}

	.Modalcenter {
		position: absolute;
		top: 58px;
		font-size: 18px;
		font-style: normal;
		font-weight: 900;
		line-height: normal;
		text-align: center;
	}
	.Modalcenter .title {
		color: #272727;
		display: flex;
		justify-content: center;
	}
	.Modalcenter .titleOpen {
		color: #266cf4;
		margin-left: 6px;
	}
	.Modalcenter .text {
		margin-top: 22px;
		color: #7c8089;
		text-align: center;
		font-family: Pretendard;
		font-size: 15px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}
	.Modalcenter img {
		margin-right: 20px;
		margin-top: 51px;
	}
	.Btn {
		display: flex;
		position: absolute;
		bottom: 0;

		width: 100%;
		height: 62px;
		border-radius: 0 0 12px 12px;
		background-color: #266cf4;
	}
	.todayStopBtn,
	.spaceBtn {
		width: 50%;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;

		font-size: 14px;
		font-style: normal;
		font-weight: 500;
		line-height: 16px;
	}
	.todayStopBtn p {
		color: rgba(255, 255, 255, 0.5);
		cursor: pointer;
	}
	.spaceBtn p {
		color: #fff;
		cursor: pointer;
	}

	.todayStopBtn::after {
		content: '';
		width: 1px;
		height: 18px;
		background-color: #d6d6d6;
		display: block;
		position: absolute;
		right: 0;
	}

	.Btn p {
		margin: 0;
	}
`;
