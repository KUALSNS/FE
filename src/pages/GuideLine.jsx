import React, {useEffect, useState, useRef, useCallback} from 'react';
import {styled} from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const GuideLine = () => {
	const slickRef = useRef(null);
	const [num, setNum] = useState(0);
	const REACT_SLIDER_SETTINGS = {
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		speed: 1200,
		beforeChange: (_, newIndex) => {
			setNum(newIndex);
		},
	};

	const guideImgTitle = [
		{
			title: '글 챌린지 고르기 🚀',
			text: '홈에서 바로 글 챌린지를 탐색하고, 글 챌린지를 시작해요',
		},
		{
			title: '질문 템플릿 추가하기 ➕',
			text: '선택한 챌린지 기반의 질문 템플릿을 확인하고 템플릿을 추가해요',
		},
		{
			title: '글 챌린지 기록하기 📝',
			text: '질문 템플릿으로 글 챌린지를 기록해요',
		},
		{
			title: '글 플래너 활용하기 📆',
			text: '나의 챌린지 기록에 맞춘 글 플래너를 확인해요',
		},
	];
	const guideIMG = [
		'/guideIMG1.png',
		'/guideIMG2.png',
		'/guideIMG3.png',
		'/guideIMG4.png',
	];
	const guideTEXT = [
		`30일 글 챌린지를 탐색하고
    글쓰기 버튼을 누르면 챌린지 시작할 수 있어요`,
		`글 기록의 시작이 고민될 때, 질문 템플릿 사용을 위해
  추가 버튼을 눌러 글쓰기를 시작해요`,
		`질문 템플릿으로 글 작성 후 챌린지 기록으로 저장해요
  💡 챌린지 기록은 글 플래너에서 확인이 가능해요`,
		`나의 챌린지 기록에 맞춘 달성률, 달력, 달성 배지 기능을 제공해요
  💡 홈 화면에서도 참여 챌린지 상태 확인이 가능해요`,
	];
	const dotline = [1, 2, 3, 4];
	const previous = useCallback(() => slickRef.current.slickPrev(), []);
	const next = useCallback(() => slickRef.current.slickNext(), []);

	return (
		<Container>
			<div className="Firstguide">
				<div className="guideLogo">
					<img src="/guidelineLogo.png" width={454} />
				</div>
				<div className="guideText">
					<h1>라이톤 200% 사용 설명서</h1>
					<p>
						글쓰기 과정에서 내용 작성, 글 주제 선정, 꾸준한 동기부여에 대해
						어려움을 겪으신 적이 있나요?
					</p>
					<p>
						이제, 라이톤으로 어려움을 해소해보세요 📝 <br />✅ 글 챌린지를
						고르고, 글 템플릿을 통해 기록하고, 나의 기록에 맞춘 플래너를
						활용하면 끝!
					</p>
				</div>
			</div>
			<div className="line"></div>
			<div className="Secondguide">
				<div className="guideImgTitle">
					{guideImgTitle.map((item, idx) => {
						if (idx === num) {
							return (
								<>
									<h1>{item.title}</h1>
									<p>{item.text}</p>
								</>
							);
						}
					})}
				</div>
				<div className="guideImgContainer">
					<div className="head">
						<div className="orderNum">{num + 1}/4</div>
					</div>
					<Slider {...REACT_SLIDER_SETTINGS} ref={slickRef}>
						{guideIMG.map((item, idx) => {
							return (
								<div className="slider" key={idx}>
									<img src={item} alt="가이드이미지" />
								</div>
							);
						})}
					</Slider>
					<div>
						<div className="preArrow" onClick={previous}>
							<img src="/guideArrow.svg" alt="pre" />
						</div>

						<div className="nextArrow" onClick={next}>
							<img src="/guideArrow.svg" alt="next" />
						</div>
					</div>
					<div className="guideImgText">
						{guideTEXT.map((item, idx) => {
							if (num === idx) {
								return <pre>{item} </pre>;
							}
						})}
					</div>
					<div className="dotLine">
						<div className={0 === num && 'active'}></div>
						<div className={1 === num && 'active'}></div>
						<div className={2 === num && 'active'}></div>
						<div className={3 === num && 'active'}></div>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default GuideLine;

const Container = styled.div`
	color: #272727;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 28px;
	max-width: 624px;
	margin-top: 132px;
	font-family: 'Pretendard', sans-serif;

	margin: 80px auto 460px;
	/* padding-left: 30px; */

	.Firstguide {
		display: flex;
		justify-content: center;
	}
	.Firstguide .guideLogo {
		z-index: -1;
		background-color: #e1eaf8;
		width: 100vw;
		position: absolute;
		left: 0;
		height: 350px;
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: 924px;
		margin-top: 52px;
	}
	.Firstguide .guideText {
		padding-top: 452px;
		margin-bottom: 62px;
	}

	.Firstguide .guideText h1 {
		font-size: 24px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
		color: #272727;
		margin-bottom: 16px;
		font-family: 'Happiness-Sans-Bold', sans-serif;
	}

	.line {
		z-index: -1;
		height: 6px;
		width: 100vw;
		position: absolute;
		left: 0;
		background-color: #efefef;
	}

	.Secondguide {
		height: 300px;
		margin-top: 62px;
	}
	.guideImgTitle {
		width: 624px;
		margin-left: 15px;
	}
	.guideImgTitle h1 {
		font-size: 24px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
		margin-bottom: 17px;
		font-family: 'Happiness-Sans-Bold', sans-serif;
	}
	.Secondguide .guideImgContainer {
		height: 537px;
		border-radius: 17px;
		border: 2px solid #bcd6ff;
		margin-bottom: 200px;
		position: relative;
	}
	.Secondguide .head {
		height: 72px;
		background-color: #e1eaf8;
		border-radius: 17px 17px 0 0;
		position: relative;
	}
	.Secondguide .orderNum {
		width: 78px;
		height: 27px;
		border-radius: 13.5px;
		background: #fff;
		display: flex;
		text-align: center;
		justify-content: center;
		position: absolute;
		right: 36px;
		top: 0;
		bottom: 0;
		margin: auto;
	}
	.Secondguide .guideImgContainer img {
		width: 100%;
		/* margin-top: 25px; */
	}
	.Secondguide .guideImgText {
		background-color: #e1eaf8;
		height: 110px;
		position: absolute;
		bottom: 0;
		border-radius: 0 0 17px 17px;
		display: flex;
		text-align: center;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
	.Secondguide .guideImgText pre {
		margin: auto;
		color: #000;
		text-align: center;
		font-family: 'Pretendard', sans-serif;
		font-size: 15px;
		font-style: normal;
		font-weight: 400;
		line-height: 28px;
	}

	.preArrow {
		background-color: #fff;
		border: 2px solid #bcd6ff;
		border-radius: 50%;
		width: 54px;
		height: 54px;
		z-index: 1;
		position: absolute;
		top: 45%;
		display: flex;
		justify-content: center;
		align-items: center;
		left: -29px;
		cursor: pointer;
	}
	.preArrow img {
		transform: rotate(180deg);
		height: 15px;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-o-user-select: none;
		user-select: none;
	}
	.nextArrow {
		background-color: #fff;
		border: 2px solid #bcd6ff;
		border-radius: 50%;
		width: 54px;
		height: 54px;
		z-index: 1;
		position: absolute;
		top: 45%;
		display: flex;
		justify-content: center;
		align-items: center;
		right: -28px;
		cursor: pointer;
	}
	.nextArrow img {
		height: 15px;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-o-user-select: none;
		user-select: none;
	}

	.dotLine {
		position: absolute;
		bottom: -41px;
		display: flex;
		justify-content: center;
		width: 100%;
	}
	.dotLine div {
		width: 44px;
		height: 1px;
		background-color: #000;
		margin-right: 7px;
	}

	.dotLine .active {
		width: 73px;
		height: 2px;
	}
`;
