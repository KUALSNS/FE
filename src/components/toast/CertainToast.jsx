import React from 'react';
import {styled} from 'styled-components';

const CertainToast = () => {
	return (
		<ChallengeToastWrapper>
			<ChallengeBox>
				<div className="sqaure">
					<img src="check.svg" />
				</div>
				<div>진행중인 챌린지가 없어요!</div>
			</ChallengeBox>
		</ChallengeToastWrapper>
	);
};

const ChallengeToastWrapper = styled.div`
	font-family: 'Pretendard';
	font-style: normal;
	font-weight: 500;
	font-size: 18px;
	line-height: 22px;
	/* identical to box height */

	text-align: center;

	color: #272727;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: rgba(0, 0, 0, 0.4);
	z-index: 20;
`;

const ChallengeBox = styled.div`
	height: 125px;
	width: 390px;
	background: #ffffff;
	margin: auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 12px;

	.sqaure {
		width: 24px;
		height: 24px;

		background: #272727;
		border: 1px solid #272727;
		border-radius: 4px;
		margin-bottom: 16px;
	}
`;

export default CertainToast;
