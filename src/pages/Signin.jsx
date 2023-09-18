import React, {useEffect} from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {userState} from '../atoms/auth';
import {useRecoilState, useSetRecoilState} from 'recoil';
import styled from 'styled-components';
import {postLoginUser} from '../remotes';
import {IdPwFindState} from '../atoms/auth';
import {authState, challengeToastState} from '../atoms/auth';
import ChallengeToast from '../components/toast/ChallengeToast';

const SigninWrapper = styled.div`
	zoom: 0.85;
	font-family: 'Pretendard', sans-serif;
	text-align: center;
	min-height: 100vh;
	padding-top: 83px;
	position: relative;
	div {
		font-family: 'Happiness-Sans-Bold', sans-serif;
		font-weight: 700;
		font-style: normal;
		font-size: 26px;
		margin-bottom: 68px;
	}

	img {
		margin-bottom: 212px;
		position: absolute;
		top: 726px;
		left: 0;
		right: 0;
		margin: auto;
	}

	img:hover {
		cursor: pointer;
	}
`;

const SigninForm = styled.form`
	input {
		display: block;
		margin: auto;
		width: 328px;
		height: 48px;
		padding: 16px;
		border-radius: 8px;
		border: 1px solid #e3e5e5;
		margin-bottom: 24px;
	}

	input:focus {
		outline: none;
	}

	input::placeholder {
		font-family: 'Pretendard';
		color: #72777a;
	}

	button {
		width: 328px;
		height: 48px;
		border-radius: 8px;
		border: 0;
		color: white;
		background: var(--challenging-blue);
		margin-top: 40px;
		margin-bottom: 24px;
	}
	a {
		cursor: pointer;
	}

	.find {
		display: block;
		width: 328px;
		margin: auto;
		text-align: right;
		font-size: 12px;
	}
`;
const Signin = () => {
	const navigate = useNavigate();
	const [userId, setUserId] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUserState] = useRecoilState(userState);
	const setAuth = useSetRecoilState(authState);
	const [toast, setToast] = useRecoilState(challengeToastState);
	const setFindState = useSetRecoilState(IdPwFindState);

	const LoginSubmit = e => {
		e.preventDefault();
		postLoginUser(userId, password)
			.then(res => {
				localStorage.setItem('accessToken', res.data.data.accessToken);
				localStorage.setItem('refreshToken', res.data.data.refreshToken);
				setAuth(true);
				navigate('/');
			})
			.catch(err => {
				if (err.response && err.response.status === 404) {
					setToast('입력하신 정보와 일치하는 아이디가 없습니다.');
				} else if (err.response && err.response.status === 419) {
					setToast('비밀번호가 일치하지 않습니다.');
				}
			});
	};

	const findIdPwRoute = param => {
		setFindState(param);
		navigate('/find');
	};

	const signupRoute = e => {
		navigate('/register');
	};

	return (
		<div>
			{toast === '입력하신 정보와 일치하는 아이디가 없습니다.' ? (
				<ChallengeToast message={toast} />
			) : toast === '비밀번호가 일치하지 않습니다.' ? (
				<ChallengeToast message={toast} />
			) : (
				''
			)}
			<SigninWrapper>
				<div>로그인</div>
				<SigninForm onSubmit={e => LoginSubmit(e)}>
					<input
						type="text"
						placeholder="아이디"
						value={userId}
						onChange={e => setUserId(e.target.value)}
					></input>
					<input
						type="password"
						placeholder="비밀번호"
						value={password}
						onChange={e => setPassword(e.target.value)}
					></input>
					<button type="submit">로그인</button>
					<span className="find">
						<a onClick={() => findIdPwRoute('id')}>아이디 찾기</a> |{' '}
						<a onClick={() => findIdPwRoute('pw')}>비밀번호 찾기</a>
					</span>
				</SigninForm>
				<img src="signin_signupBtn.svg" onClick={signupRoute} />
			</SigninWrapper>
		</div>
	);
};

export default Signin;
