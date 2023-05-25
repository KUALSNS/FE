import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import ChallengeStory from "../components/main/ChallengeStory";
import ChallengeFeed from "../components/main/ChallengeFeed";
import { postLoginMain, getChallenge } from "../remotes";
import ClipLoader from "react-spinners/ClipLoader";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  categoryState,
  challengeState,
  detailuserState,
  authState,
  loadingState,
  activeChallengeState,
} from "../atoms/auth";

const Home = () => {
  const [loading, setLoading] = useRecoilState(loadingState);
  const setChallenge = useSetRecoilState(challengeState);
  const setCategory = useSetRecoilState(categoryState);
  const setDetailuser = useSetRecoilState(detailuserState);
  const setActiveChallenge = useSetRecoilState(activeChallengeState);
  const [auth, setAuth] = useRecoilState(authState);

  const Retoken = () => {
    getAccessToken()
      .then((res) => {
        localStorage.setItem("accessToken", res.data.data.accessToken);
        console.log("Retoken: access 토큰 재발급");
      })
      .catch((error) => {
        if (error.response.data.code === 419) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          alert("로그인을 다시 하세요");
          window.location.reload();
        } else {
          console.log(error);
        }
      });
  };

  useEffect(() => {
    localStorage.removeItem("fixChallenge");
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      postLoginMain()
        .then((res) => {
          setChallenge(res.data.data.challengesArray);
          setCategory(res.data.data.category);
          setDetailuser({
            nickname: res.data.data.nickname,
            challengeCertain: res.data.data.challengeCertain,
          });
          setActiveChallenge({
            userChallengeSu: res.data.data.userChallengeSu,
            coopen: res.data.data.coopen,
            userChallengeArray: res.data.data.userChallengeArray,
          });
          setLoading(false);
          setAuth(true);
        })
        .catch((err) => {
          if (err.response.data.code === 419) {
            Retoken();
          } else {
            console.log(err);
          }
        });
    } else {
      getChallenge()
        .then((res) => {
          setChallenge(res.data.data.challengesArray);
          setCategory(res.data.data.category);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ClipLoader color="#266cf4" loading={loading} size={170} />
      </div>
    );
  } else {
    return (
      <div>
        <Container>
          <ChallengeStory />
          <ChallengeFeed />
        </Container>
      </div>
    );
  }
};

export default Home;

const Container = styled.div`
  background-color: #ffffff;
  max-width: 920px;
  margin: auto;

  margin-top: 80px;
  padding-top: 0.1px;
  padding-bottom: 350px;
`;
