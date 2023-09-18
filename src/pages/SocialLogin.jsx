import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

const SocialLogin = () => {
	const navigate = useNavigate();
	const signupRoute = e => {
		navigate('/register');
	};
	const signinRoute = e => {
		navigate('/login');
	};
	const homeRoute = e => {
		navigate('/');
	};

	const kakaoLogin = e => {
		e.preventDefault();
		const url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
			import.meta.env.VITE_client_id
		}&redirect_uri=${
			import.meta.env.VITE_redirect_uri
		}&response_type=code&lang=ko`;
		window.location.href = url;
	};

	return (
		<Container>
			<div className="title">로그인</div>
			<img
				className="writonLogo"
				src="writonLogo(174px).svg"
				onClick={homeRoute}
			/>
			<div className="LoginBtn">
				<button className="kakao" onClick={kakaoLogin}>
					<img className="kakaoImg" src="kakao.svg" />
					<div>카카오로 3초만에 시작하기</div>
				</button>
				<button className="email" onClick={signinRoute}>
					<div>이메일로 로그인</div>
				</button>
			</div>
			<img
				className="register"
				src="signin_signupBtn.svg"
				onClick={signupRoute}
			/>
		</Container>
	);
};

const Container = styled.div`
	zoom: 0.85;
	font-family: 'Pretendard', sans-serif;
	text-align: center;
	min-height: 700px;
	width: 328px;
	margin: auto;
	position: relative;
	.title {
		color: #272727;
		text-align: center;
		font-size: 26px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
		top: 83px;
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
	}
	.writonLogo {
		top: 244px;
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		cursor: pointer;
	}
	.LoginBtn {
		font-family: 'Pretendard', sans-serif;
		font-size: 15px;
		font-style: normal;
		font-weight: 500;
		top: 387px;
		position: absolute;
	}
	.LoginBtn button {
		/* display: block; */
		margin: auto;
		width: 328px;
		height: 46px;
		border: none;
		outline: none;
		background-color: inherit;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.LoginBtn .kakaoImg {
		position: absolute;
		left: 21px;
	}

	.LoginBtn .kakao {
		border-radius: 8px;
		background: #fee500;
		margin: auto;
		margin-bottom: 31px;
	}
	.LoginBtn .email {
		border-radius: 8px;
		border: 2px solid #dddee1;
	}
	.register {
		position: absolute;
		top: 726px;
		left: 0;
		right: 0;
		margin: auto;
		margin-bottom: 212px;
		cursor: pointer;
	}
`;

export default SocialLogin;
