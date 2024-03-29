import React, {useState, useEffect} from 'react';
import {styled} from 'styled-components';
import Parser from 'html-react-parser';
import RecordProgressTape from './RecordProgressTape';
import {getPlannerHistory, getPlannerStatistic, Retoken} from '../../remotes';
import ChallengeItem from '../main/ChallengeItem';
import {useRecoilValue} from 'recoil';
import {challengeState, selectChallengeState} from '../../atoms/auth';
import {useNavigate} from 'react-router';

function RecordChallenges() {
	const allChallengeServed = useRecoilValue(challengeState);
	const [finChallenge, setFinChallenge] = useState([]);
	const [ongoChallenge, setOngoChallenge] = useState([]);
	const [tempChallenge, setTempChallenge] = useState([]);
	const [selectedChallenge, setSelectedChallenge] = useState([]);
	const [longContent, setLongContent] = useState([]);
	const [showFilter, setShowFilter] = useState(false);
	const [emptyFlag, setEmptyFlag] = useState(true);
	const filter = ['진행 중인 챌린지', '임시 저장 챌린지', '종료된 챌린지'];
	const [filterIdx, setFilterIdx] = useState(0);

	const navigate = useNavigate();
	useEffect(() => {
		getPlannerHistory()
			.then(res => {
				const allChallenge = res.data.data.userChallengeHistory;
				setFinChallenge(allChallenge.finishedChallenges);
				setOngoChallenge(allChallenge.ongoingChallenges);
				setTempChallenge(allChallenge.temporarilySavedChallenges);
				setSelectedChallenge(allChallenge.ongoingChallenges);
			})
			.catch(err => {
				if (err.response.data.code === 419) {
					Retoken();
				} else {
					console.log(err);
				}
			});
	}, []);

	useEffect(() => {
		if (
			finChallenge.length > 0 ||
			ongoChallenge.length > 0 ||
			tempChallenge.length > 0
		)
			setEmptyFlag(false);
	}, [finChallenge, ongoChallenge, tempChallenge, selectedChallenge]);

	useEffect(() => {
		if (filterIdx === 0) {
			setSelectedChallenge(ongoChallenge);
			localStorage.setItem('fixChallenge', '진행중');
		} else if (filterIdx === 1) {
			setSelectedChallenge(tempChallenge);
			localStorage.setItem('fixChallenge', '임시저장');
		} else if (filterIdx === 2) {
			setSelectedChallenge(finChallenge);
			localStorage.setItem('fixChallenge', '끝남');
		}
	}, [filterIdx]);

	const handleEditClick = (title, content, challengeName) => {
		localStorage.setItem('challengeName', challengeName);
		navigate('/challenge', {
			state: {
				title: title,
				content: content,
			},
		});
	};
	const showTextOnly = content => {
		if (content === undefined) return;
		const div = document.createElement('div');
		div.innerHTML = content;

		return div.textContent || '';
	};
	const handleContentClick = idx => {
		if (longContent.indexOf(idx) > -1) {
			const newLongContent = longContent.filter(item => item !== idx);
			setLongContent(newLongContent);
		} else {
			const newLongContent = [...longContent, idx];
			setLongContent(newLongContent);
		}
	};
	const handleFilterClick = idx => {
		setFilterIdx(idx);
		setShowFilter(false);
	};

	return (
		<RecordChallengesWrapper>
			{emptyFlag ? (
				<>
					<div className="empty">
						<h2>이런 챌린지는 어때요?</h2>
						<p>라이톤은 지속적인 글쓰기를 위한 글 챌린지를 응원해요</p>
						<ChallengeLists>
							{allChallengeServed.map((item, idx) => {
								return (
									<ChallengeItem
										title={item.title}
										category={item.category}
										image={item.image}
										key={idx}
									/>
								);
							})}
						</ChallengeLists>
					</div>
				</>
			) : (
				<>
					<div className="topbar">
						<h2 onClick={() => setShowFilter(!showFilter)}>
							{filter[filterIdx]}
						</h2>
						<img
							className="dropdown"
							onClick={() => setShowFilter(!showFilter)}
							src="calendar_title_dropdown.svg"
						/>
						{showFilter && (
							<div className="filter">
								{filter.map((item, idx) => (
									<div
										key={idx}
										className={filterIdx === idx ? 'selected' : 'notselected'}
										onClick={() => handleFilterClick(idx)}
									>
										{item}
									</div>
								))}
							</div>
						)}
					</div>
					<div className="challengeList">
						{!selectedChallenge.length ? (
							<>
								<div className="emptyInfo">
									아직 {filter[filterIdx]}가 없어요
								</div>
								<img
									className="emptyTape"
									src="record_challenge_emptytape.svg"
								/>
							</>
						) : (
							selectedChallenge.map((chal, idx) =>
								chal.user_challenge_templetes?.map((item, temIdx) => (
									<div
										key={temIdx}
										className={
											longContent.indexOf(idx * 100 + temIdx) > -1
												? 'challengeItem longerItem'
												: 'challengeItem'
										}
									>
										<div className="challengeInfo">
											<div className="titlebar">
												<div className="tag">
													<img
														className="emoji"
														src={chal.challenges.category.emogi}
													/>
													{chal.challenges.category.name}
												</div>
												<h2>{chal.challenges.title}</h2>
												<button
													onClick={() =>
														handleEditClick(
															item.title,
															item.writing,
															chal.challenges.title,
														)
													}
												>
													<img src="calendar_edit.svg" />
													수정하기
												</button>
											</div>
											<div
												onClick={() => {
													handleContentClick(idx * 100 + temIdx);
												}}
												className={
													longContent.indexOf(idx * 100 + temIdx) > -1
														? 'challengeContent longerItem'
														: 'challengeContent shorterItem'
												}
											>
												<h2 className="contentTitle">{item.title}</h2>
												<p>
													{longContent.indexOf(idx * 100 + temIdx) > -1
														? Parser(item.writing)
														: showTextOnly(item.writing)}
												</p>
											</div>
										</div>

										<div className="progressTape">
											<RecordProgressTape
												progress={chal.achievement}
												colorIdx={idx}
											/>
										</div>
									</div>
								)),
							)
						)}
					</div>
				</>
			)}
		</RecordChallengesWrapper>
	);
}

const ChallengeLists = styled.div`
	width: 920px;
	height: 100%;
	display: grid;
	grid-template-columns: repeat(3, 1fr); /* 3개의 열을 생성 */

	grid-column-gap: 28px; /* 열 간격 설정 */
	grid-row-gap: 32px;
	grid-auto-rows: 180px;
	justify-content: space-between;
`;

const RecordChallengesWrapper = styled.div`
	.empty h2 {
		font-family: 'Happiness-Sans-Bold', sans-serif;
		font-size: 24px;
		margin-top: 55px;
		margin-bottom: 10px;
	}
	.empty p {
		font-size: 18px;
		color: #7c8089;
		margin-bottom: 33px;
	}
	.topbar {
		position: relative;
		padding-top: 68px;
		padding-bottom: 25px;
	}
	.topbar h2 {
		font-family: 'Happiness-Sans-Bold', sans-serif;
		font-size: 18px;
		height: 23px;
		margin-right: 2px;
		display: inline-block;
		cursor: pointer;
	}
	.topbar img {
		cursor: pointer;
	}
	.filter {
		position: absolute;
		width: 288px;
		box-shadow: 0px 2px 38px -8px rgba(39, 39, 39, 0.2);
		border-radius: 8px;
		background: #ffffff;
		display: flex;
		flex-direction: column;
		z-index: 1;
		gap: 1px;
		padding: 16px;
	}

	.filter div {
		flex-grow: 1;
		height: 36px;
		display: flex;
		align-items: center;
		padding-left: 10px;
		font-size: 14px;
		line-height: 14px;
		cursor: pointer;
		color: #7c8089;
	}

	.filter :nth-child(2) {
		margin: 8px 0;
	}

	.filter .selected {
		background: #f3f5f9;
		border-radius: 4px;
		color: #272727;
	}
	.challengeList {
		position: relative;
		width: 100%;
		border: 1px solid #e2e4e7;
		border-radius: 8px;
		padding: 24px;
	}
	.challengeItem {
		margin-bottom: 24px;
		display: flex;
	}
	.challengeItem:last-of-type {
		margin-bottom: 0;
	}
	.emptyInfo {
		width: 720px;
		height: 182px;
		background: #f3f5f9;
		border-radius: 8px;
		font-size: 14px;
		color: #7c8089;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.emptyTape {
		position: absolute;
		top: 53px;
		right: 77px;
	}
	.challengeInfo {
		background: #f3f5f9;
		border-radius: 8px;
		height: 100%;
		width: 720px;
		margin-right: 84px;
		padding: 32px 24px;
	}
	.titlebar {
		display: flex;
		position: relative;
		width: 100%;
		margin-bottom: 21px;
	}
	.titlebar .tag {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 95px;
		height: 24px;
		font-size: 14px;
		border-radius: 32px;
		color: #7c8089;
		background: #e1eaf8;
		border: 1px solid #bcd6ff;
	}
	.titlebar .emoji {
		width: 14px;
		height: 14px;
		margin-right: 2px;
	}
	.titlebar h2 {
		font-size: 18px;
		margin: 0;
		margin-left: 16px;
	}
	.titlebar button {
		position: absolute;
		right: 0;
		background: #ffffff;
		width: 120px;
		height: 35px;
		border: 0;
		border-radius: 2px;
		top: -5px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.titlebar button img {
		margin-right: 8px;
	}
	.challengeContent {
		width: 656px;
		height: 84px;
		line-height: 28px;
		font-size: 18px;
		cursor: pointer;
	}

	.contentTitle {
		font-size: 20px;
		margin-bottom: 10px;
		font-weight: 500;
	}

	.longerItem {
		height: fit-content;
	}

	.shorterItem {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}

	.longContent {
		height: 150px;
	}
	.progressTape {
		margin-top: 29px;
		position: relative;
	}
`;

export default RecordChallenges;
