import React from 'react';
import styled from 'styled-components';
import Progress from './Progress';
import {useState} from 'react';
import {useRecoilValue, useRecoilState} from 'recoil';
import {
	activeChallengeState,
	authState,
	detailuserState,
	challengeToastState,
	selectChallengeState,
	ChallengeWriteState,
	sideState,
} from '../../atoms/auth';
import {useNavigate} from 'react-router-dom';
import {postSideBarChallenge, Retoken} from '../../remotes';
import {format} from 'date-fns';

const ChallengeStory = () => {
	const [nextDate, setNextDate] = useState(
		new Date(new Date().setMonth(new Date().getMonth() + 1)),
	);
	const [close, setClose] = useState(true);
	const [isHovered, setIsHovered] = useState(false);
	const auth = useRecoilValue(authState);
	const activeChallenge = useRecoilValue(activeChallengeState);
	const detailuser = useRecoilValue(detailuserState);
	const [toast, setToast] = useRecoilState(challengeToastState);
	const navigate = useNavigate();
	const [writeChallenge, setWriteChallenge] =
		useRecoilState(ChallengeWriteState);
	const [selectChallenge, setSelectChallenge] =
		useRecoilState(selectChallengeState);
	const [side, setSide] = useRecoilState(sideState);
	const AddStory = () => {
		if (auth) {
			if (detailuser.challengeCertain) {
				postSideBarChallenge()
					.then(res => {
						if (res.data.data.challengingArray.length) {
							setWriteChallenge(res.data.data);
							setSelectChallenge(
								'[' +
									res.data.data.templateData.challengeCategory +
									']' +
									' ' +
									res.data.data.templateData.challengeName,
							);
							setSide(true);
							localStorage.removeItem('challengeName');

							localStorage.removeItem('fixChallenge');
							navigate('/challenge');
						} else {
							setToast('오늘은 모두 다 작성하셨어요!');
						}
					})
					.catch(err => {
						if (err.response.data.code === 419) {
							Retoken(AddStory);
						} else if (err.response && err.response.status === 404) {
							setToast('오늘은 모두 다 작성하셨어요!');
						}
					});
			} else {
				setToast('진행중인 챌린지가 없어요!');
			}
		} else {
			navigate('/sociallogin');
		}
	};

	return (
		<Container>
			{auth ? (
				<div className="story-container">
					<div className="add-challenge" onClick={AddStory}>
						<img src="/addStory.svg" />
					</div>
					<div className="progressies">
						{activeChallenge?.userChallengeArray?.map((item, idx) => {
							return <Progress item={item} idx={idx} key={idx} />;
						})}
					</div>
					{close ? (
						<div
							className="challenge-text"
							onMouseOver={() => setIsHovered(true)}
							onMouseLeave={() => setIsHovered(false)}
						>
							{!isHovered ? (
								<div>
									🔥 이번 달 챌린지는 {format(nextDate, 'M')}월{' '}
									{format(nextDate, 'dd')}일 마감이에요
								</div>
							) : (
								<div>
									<div className="hover-text1">
										🔥 이번 달 챌린지는 {format(nextDate, 'M')}월{' '}
										{format(nextDate, 'dd')}일 마감이에요
									</div>
									<div className="hover-text2">
										{format(new Date(), 'M')}월 {format(new Date(), 'dd')}일
										부터 30일 동안 진행돼요
									</div>
								</div>
							)}
							<div className="close">
								<img
									onClick={() => setClose(false)}
									width={10}
									src="close.svg"
								/>
							</div>
						</div>
					) : (
						''
					)}
				</div>
			) : (
				<div className="story-container">
					<div className="add-challenge" onClick={AddStory}>
						<img src="addStory.svg" />
					</div>
					{close ? (
						<div className="before-challenge-text">
							<div>🔥 30일 글 챌린지로 꾸준한 글쓰기를 시작해볼까요?</div>
							<div className="close">
								<img
									onClick={() => setClose(false)}
									width={8}
									src="/close.svg"
								/>
							</div>
						</div>
					) : (
						''
					)}
				</div>
			)}
		</Container>
	);
};

export default ChallengeStory;

const Container = styled.div`
	.progressies {
		display: flex;
		width: 400px;
		overflow-x: auto;
		white-space: nowrap;
		height: 110px;
		margin-top: 40px;
		padding-left: 45px;
	}

	.progressies::-webkit-scrollbar {
		display: none;
	}
	.story-container {
		background-color: #ffffff;
		max-width: 920px;
		height: 105px;
		margin-top: 40px;
		padding-bottom: 32px;
		display: flex;
		border-bottom: 1px solid #e2e4e7;
		position: relative;
		align-items: center;
		z-index: 0;
	}

	.add-challenge {
		width: 65px;
		height: 65px;
		background-color: #272727;
		color: #266cf4;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		border: none;
		cursor: pointer;
		margin-left: 33px;
	}

	.challenge-text {
		width: 302px;
		height: 32px;
		text-align: center;
		border: 1px solid #fce184;
		border-radius: 16px;
		display: flex;
		position: absolute;
		right: 0;
		font-family: 'Pretendard';
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 16px;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		background-color: #fff8e0;
	}

	.before-challenge-text {
		display: flex;
		align-items: center;
		padding: 8px 16px;

		position: absolute;
		width: 390px;
		height: 32px;

		background: #fff8e0;
		border: 1px solid #fce184;
		border-radius: 16px;
		font-family: 'Pretendard';
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 16px;
		margin-left: 114px;
	}

	.close {
		margin-left: 8px;
		cursor: pointer;
		align-items: center;
		display: flex;
	}

	.challenge-text:hover {
		width: 302px;
		height: 59px;
		border: 1px solid #fce184;
		border-radius: 16px;
		padding-bottom: 15px;
	}

	.hover-text1 {
		margin-bottom: 4px;
	}

	.hover-text2 {
		font-family: 'Pretendard';
		font-style: normal;
		font-weight: 400;
		font-size: 12px;
		line-height: 20px;
		position: absolute;
		left: 40px;
		color: #7c8089;
	}
`;
