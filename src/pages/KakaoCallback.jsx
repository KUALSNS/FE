import axios from 'axios';
import React, {useEffect} from 'react';
import {useNavigate} from 'react-router';
import {authState} from '../atoms/auth';
import {useRecoilState, useSetRecoilState} from 'recoil';

const KakaoCallback = () => {
	const navigate = useNavigate();
	const setAuth = useSetRecoilState(authState);
	useEffect(() => {
		const params = new URL(document.location.toString()).searchParams;
		const code = params.get('code');
		console.log('인가', code);

		axios
			.post(
				`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${
					import.meta.env.VITE_client_id
				}&redirect_uri=${import.meta.env.VITE_redirect_uri}&code=${code}`,
				{},
				{
					headers: {
						'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
					},
				},
			)
			.then(res => {
				localStorage.setItem('Token', res.data.access_token);
				axios
					.post(
						'https://www.writon.store/api/user/kakao-login',
						{},
						{
							headers: {
								'Content-type':
									'application/x-www-form-urlencoded;charset=utf-8',
								access: res.data.access_token,
							},
						},
					)
					.then(res => {
						console.log(res);
						localStorage.setItem('accessToken', res.data.data.accessToken);
						localStorage.setItem('refreshToken', res.data.data.refreshToken);
						setAuth(true);
						navigate('/');
					})
					.catch(res => console.log(err));
			});
	}, []);
	return <></>;
};

export default KakaoCallback;
