import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useState} from 'react';
import {useRecoilValue} from 'recoil';
import {
	challengeState,
	categoryState,
	detailuserState,
	authState,
} from '../../atoms/auth';
import ChallengeItem from './ChallengeItem';

const ChallengeFeed = () => {
	const challenge = useRecoilValue(challengeState);
	const categories = useRecoilValue(categoryState);
	const auth = useRecoilValue(authState);
	const [isHovered, setIsHovered] = useState(false);
	const detailuser = useRecoilValue(detailuserState);
	const [activeCategories, setActiveCategories] = useState([]);

	const onSelectAll = () => {
		setActiveCategories([]);
	};

	const onSelectCategory = e => {
		const {name} = e.target;
		if (activeCategories.includes(name)) {
			setActiveCategories(prev => prev.filter(c => c !== name));
		} else {
			setActiveCategories(prev => [...prev, name]);
		}
	};

	const filteredItems = challenge?.filter(item => {
		if (activeCategories.length === 0) {
			return true;
		} else {
			return activeCategories.includes(item.category);
		}
	});

	return (
		<Container>
			<Title>
				<div>
					{auth ? detailuser.nickname : '익명'}님을 위한 라이톤 30일 글 챌린지
				</div>
				<div style={{justifyContent: 'left'}}>
					<div
						className="question"
						onMouseOver={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
					>
						?
					</div>
					{isHovered && (
						<div className="hover-question">
							챌린지를 위한 관심 태그를 설정해보세요
						</div>
					)}
				</div>
			</Title>

			<Category>
				<div className="category">
					<div className="itemAll">
						<button
							onClick={onSelectAll}
							className={`button ${
								activeCategories.length === 0 ? 'all' : 'notall'
							}`}
						>
							전체
						</button>
					</div>
					{categories.map((category, idx) => (
						<div className="itemExcept" key={idx} onClick={onSelectCategory}>
							<button
								key={category}
								name={category}
								className={`button ${
									activeCategories.includes(category) ? 'except' : 'not'
								}`}
							>
								{category}
							</button>
						</div>
					))}
				</div>
			</Category>
			<div className="search">검색된 챌린지 주제 {filteredItems.length}개</div>

			<ChallengeLists>
				{filteredItems.map((item, idx) => {
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
		</Container>
	);
};

export default ChallengeFeed;

const ChallengeLists = styled.div`
	width: 920px;
	height: 100%;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-column-gap: 28px;
	grid-row-gap: 32px;
	grid-auto-rows: 180px;
	justify-content: space-between;
`;

const Container = styled.div`
	background-color: #ffffff;
	max-width: 920px;
	height: 700px;
	margin-top: 44px;
	position: relative;

	.search {
		float: right;
		margin-bottom: 14px;
		font-family: 'Pretendard';
		font-style: normal;
		font-weight: 400;
		font-size: 14px;
		line-height: 17px;

		color: #7c8089;
	}
`;

const Title = styled.div`
	font-family: 'Happiness-Sans-Bold';
	font-style: normal;
	font-weight: 800;
	font-size: 26px;
	line-height: 32px;
	justify-content: center;
	text-align: center;
	display: flex;
	color: #272727;
	align-items: center;

	div {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.question {
		width: 23px;
		height: 23px;
		border-radius: 50%;
		margin-left: 8px;
		background: #fce184;
		font-family: 'Pretendard';
		font-style: normal;
		font-weight: 400;
		font-size: 14px;
		line-height: 17px;
		text-align: center;
		color: #272727;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1;
		position: relative;
	}

	.hover-question {
		position: absolute;
		width: 304px;
		height: 32px;

		background: #fff8e0;
		border: 1px solid #fce184;
		border-radius: 16px;
		font-family: 'Pretendard';
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 16px;
		padding-left: 17px;
		color: #272727;
	}
`;

const Category = styled.div`
	width: 612px;
	height: 40px;
	background-color: #ffffff;
	display: flex;
	margin: auto;
	margin-top: 33px;
	margin-bottom: 18px;
	position: relative;
	justify-content: center;

	.category {
		display: flex;
		font-family: 'Pretendard';
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 16px;
	}

	.category button {
		border: 0;
		background-color: transparent;
	}

	.category .itemAll {
		width: 76px;
		padding-right: 16px;
		margin-right: 16px;
		border-right: 1px solid #e2e4e7;
		cursor: pointer;
		color: #272727;
	}
	.category .itemExcept {
		width: 118px;
		padding-right: 12px;
		cursor: pointer;
		margin-right: 16px;
		position: relative;
		border-radius: 32px;
	}

	.category .itemExcept button::after {
		content: '';
		display: block;
		width: 1px;
		height: 16px;
		background-color: #bcd6ff;
		position: absolute;
		top: 12px;
		right: 35px;
	}
	.category .itemExcept button::before {
		content: '';
		display: block;
		width: 16px;
		height: 16px;
		position: absolute;
		top: 12px;
		right: 15px;
		background-image: url('/plus.svg');
		background-repeat: no-repeat;
		background-position: center;
	}

	.category .itemExcept button.except::before {
		content: '';
		display: block;
		width: 16px;
		height: 16px;
		position: absolute;
		top: 12px;
		right: 15px;
		background-image: url('/minus.svg');
		background-repeat: no-repeat;
		background-position: center;
	}

	.img-category img {
		margin-bottom: 3px;
	}

	.category .button {
		padding: 12px 16px;
		display: flex;
		border-radius: 32px;
	}

	.category .all {
		width: 63px;
		height: 40px;
		background: #e1eaf8;
		border: 1px solid #bcd6ff;
		border-radius: 32px;
	}
	.category .except {
		width: 118px;
		height: 40px;

		background: #e1eaf8;
		border: 1px solid #bcd6ff;
		border-radius: 32px;
	}

	.category .not {
		width: 118px;
		height: 40px;
		background: #ffffff;
		border: 1px solid #bcd6ff;
		color: #272727;
	}

	.category .not:hover {
		background: #eef1f7;
	}

	.category .notall {
		width: 63px;
		height: 40px;
		background: #ffffff;
		border: 1px solid #bcd6ff;
		color: #272727;
	}

	.category .notall:hover {
		background: #eef1f7;
	}

	.select {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 12px 16px;
		cursor: pointer;

		position: absolute;
		width: 90px;
		height: 40px;
		right: 0;

		border: 1px solid #266cf4;
		border-radius: 2px;

		font-family: 'Pretendard';
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 16px;

		color: #266cf4;
	}
`;
