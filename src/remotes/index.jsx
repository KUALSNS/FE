import axios from 'axios';

const WritonAxios = axios.create({
	baseURL: 'https://www.writon.store:443',
});

const postLoginUser = (userIdentifier, userPassword) =>
	WritonAxios.post('/api/user/login', {userIdentifier, userPassword});

const postAccessToken = () =>
	WritonAxios.post('/api/user/login/reissue-token', '', {
		headers: {
			access: localStorage.getItem('accessToken'),
			refresh: localStorage.getItem('refreshToken'),
		},
	});

const Retoken = (func, param, first, second) => {
	postAccessToken()
		.then(res => {
			localStorage.setItem('accessToken', res.data.data.accessToken);
			console.log('Retoken: access 토큰 재발급');
			if (!func) {
				window.location.reload();
			} else {
				func(param, first, second);
			}
		})
		.catch(error => {
			if (error.response.data.code === 419) {
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
				alert('로그인을 다시 하세요');
				window.location.reload();
			} else {
				console.log(error);
			}
		});
};

const patchLogoutUser = () =>
	WritonAxios.patch('/api/user/logout', '', {
		headers: {access: localStorage.getItem('accessToken')},
	});

const postEmail = userEmail =>
	WritonAxios.post('/api/user/signup/verify-email-code', {email: userEmail});

const getEmailCode = (userEmail, userEmailCode) =>
	WritonAxios.get('/api/user/signup/verify-email', {
		params: {
			email: userEmail,
			code: userEmailCode,
		},
	});

const postSignup = (userId, userEmail, userPassword, nickname, phoneNumber) =>
	WritonAxios.post('/api/user/signup', {
		identifier: userId,
		email: userEmail,
		password: userPassword,
		nickname: nickname,
		phoneNumber: phoneNumber,
	});

const getChallenge = () => WritonAxios.get('/api/challenge');

const postLoginMain = () =>
	WritonAxios.post('/api/challenge/main', '', {
		headers: {access: localStorage.getItem('accessToken')},
	});

const getChallengePage = name =>
	WritonAxios.get(`/api/write/start/${name}`, {
		headers: {access: localStorage.getItem('accessToken')},
	});

const getMypageInfo = () =>
	WritonAxios.get('/api/profile', {
		headers: {access: localStorage.getItem('accessToken')},
	});

const patchNamePhone = (nickName, phoneNumber) =>
	WritonAxios.patch(
		'/api/profile',
		{
			nickname: nickName,
			phoneNumber: phoneNumber,
		},
		{
			headers: {access: localStorage.getItem('accessToken')},
		},
	);

const patchPassword = (oldPassword, newPassword) =>
	WritonAxios.patch(
		'/api/profile/password',
		{
			oldPassword: oldPassword,
			newPassword: newPassword,
		},
		{
			headers: {access: localStorage.getItem('accessToken')},
		},
	);

const patchEmail = newEmail =>
	WritonAxios.patch(
		'/api/profile/email',
		{
			email: newEmail,
		},
		{
			headers: {access: localStorage.getItem('accessToken')},
		},
	);

const getEachChallenge = name =>
	WritonAxios.get(`/api/write/${name}`, {
		headers: {access: localStorage.getItem('accessToken')},
	});

const postRecordSubmit = (
	challengeName,
	templateName,
	challengeTitle,
	challengeContent,
) =>
	WritonAxios.post(
		'/api/write/register',
		{
			challengeName: challengeName,
			templateName: templateName,
			challengeTitle: challengeTitle,
			challengeContent: challengeContent,
		},
		{
			headers: {access: localStorage.getItem('accessToken')},
		},
	);

const postPreSubmit = (
	challengeName,
	templateName,
	challengeTitle,
	challengeContent,
) =>
	WritonAxios.post(
		'/api/write/temporary-storage',
		{
			challengeName: challengeName,
			templateName: templateName,
			challengeTitle: challengeTitle,
			challengeContent: challengeContent,
		},
		{
			headers: {access: localStorage.getItem('accessToken')},
		},
	);

const postSideBarChallenge = () =>
	WritonAxios.post('/api/write', '', {
		headers: {access: localStorage.getItem('accessToken')},
	});

const getPlannerHistory = () =>
	WritonAxios.get('/api/planner/history', {
		headers: {access: localStorage.getItem('accessToken')},
	});

const getPlannerStatistic = () =>
	WritonAxios.get('/api/planner/statistic', {
		headers: {access: localStorage.getItem('accessToken')},
	});

const getPlannerCalendar = (start, finish) =>
	WritonAxios.get('/api/planner/calendar', {
		headers: {access: localStorage.getItem('accessToken')},
		params: {
			startDate: start,
			finishDate: finish,
		},
	});

const postActivateCupon = () =>
	WritonAxios.post(
		'/api/profile/coupon',
		{
			couponCode: 1,
		},
		{
			headers: {access: localStorage.getItem('accessToken')},
		},
	);

const getIdFind = (email, code) =>
	WritonAxios.get('/api/user/idFind', {
		headers: {access: localStorage.getItem('accessToken')},
		params: {
			email: email,
			code: code,
		},
	});

const postPwFind = (id, email) =>
	WritonAxios.post(
		'/api/user/passwordFind',
		{
			identifier: id,
			userEmail: email,
		},
		{
			headers: {access: localStorage.getItem('accessToken')},
		},
	);

const getCheckId = userId =>
	WritonAxios.get(`/api/user/check-identifier?checkIdentifier=${userId}`);
// 지동으로 결과값이 반환된다.

export {
	postLoginUser,
	patchLogoutUser,
	postAccessToken,
	postEmail,
	getEmailCode,
	postSignup,
	postLoginMain,
	getChallenge,
	getMypageInfo,
	patchNamePhone,
	patchPassword,
	patchEmail,
	getChallengePage,
	getPlannerHistory,
	getPlannerStatistic,
	getPlannerCalendar,
	getEachChallenge,
	postRecordSubmit,
	postPreSubmit,
	postSideBarChallenge,
	postActivateCupon,
	getIdFind,
	postPwFind,
	Retoken,
	getCheckId,
};
