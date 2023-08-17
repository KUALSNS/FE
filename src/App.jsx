import {Routes, Route, useLocation} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Challenge from './pages/Challenge';

import Record from './pages/Record';
import Mypage from './pages/Mypage';
import FindIdPw from './pages/FindIdPw';
import LeftNav from './components/navigation/LeftNav';
import {postAccessToken} from './remotes';
import {useRecoilState} from 'recoil';
import {authState, challengeToastState, SmallScreenState} from './atoms/auth';
import jwt_decode from 'jwt-decode';
import {useEffect} from 'react';
import Navigation from './components/navigation/Navigation';
import ChallengeToast from './components/toast/ChallengeToast';

function App() {
	const location = useLocation();
	const [auth, setAuth] = useRecoilState(authState);
	const [isSmallScreen, setIsSmallScreen] = useRecoilState(SmallScreenState);

	const [toast, setToast] = useRecoilState(challengeToastState);

	useEffect(() => {
		const accessToken = localStorage.getItem('accessToken');
		if (accessToken) {
			setAuth(true);
		}

		function handleResize() {
			setIsSmallScreen(window.innerWidth <= 1390);
		}

		window.addEventListener('resize', handleResize);
		handleResize();

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		if (toast) {
			setTimeout(() => {
				setToast(false);
			}, 1500);
		}
	}, [toast]);
	return (
		<div>
			{location.pathname == '/login' ||
			location.pathname == '/find' ||
			location.pathname == '/register' ? (
				''
			) : (
				<div>
					<Navigation />
					{!isSmallScreen ? (
						<div>
							<LeftNav />
						</div>
					) : (
						''
					)}
				</div>
			)}
			{toast === '이미 진행 중인 챌린지에요!' ? (
				<ChallengeToast message={toast} />
			) : toast === '진행중인 챌린지가 없어요!' ? (
				<ChallengeToast message={toast} />
			) : toast === '오늘은 모두 다 작성하셨어요!' ? (
				<ChallengeToast message={toast} />
			) : toast === '더 이상 챌린지를 진행할 수 없어요!' ? (
				<ChallengeToast message={toast} />
			) : toast === '제목을 입력해주세요!' ? (
				<ChallengeToast message={toast} />
			) : (
				''
			)}

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/challenge" element={<Challenge />} />

				<Route path="/record" element={<Record />} />

				<Route path="/mypage" element={<Mypage />} />
				<Route path="/login" element={<Signin />} />
				<Route path="/register" element={<Signup />} />
				<Route path="/find" element={<FindIdPw />} />
			</Routes>
		</div>
	);
}

export default App;
