import { Editor } from "@tinymce/tinymce-react";
import React, { useRef, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import ChallengeModal from "../components/ChallengeModal";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  challengeModalState,
  loadingState,
  ChallengeWriteState,
  selectChallengeState,
  recordSubmitState,
  sideState,
} from "../atoms/auth";
import { useParams } from "react-router";
import {
  getEachChallenge,
  postPreSubmit,
  postRecordSubmit,
  postSideBarChallenge,
  getChallengePage,
} from "../remotes";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import CheckModal from "../components/modal/CheckModal";

function Challenge() {
  const [side, setSide] = useRecoilState(sideState);
  const emoticon = ["☘️", "🌕", "🗒", "👍"];
  //const API_KEY = process.env.REACT_APP_API_KEY;

  const navigate = useNavigate();

  const [recordSubmit, setRecordSubmit] = useRecoilState(recordSubmitState);

  const [newChallengeFlag, setFlag] = useRecoilState(challengeModalState);
  //dummy data
  console.log(newChallengeFlag);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [title, setTitle] = useState("");
  const [saveAlert, setSaveAlert] = useState(false);
  const [saveDisappear, setSaveDisappear] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(false);
  const [selectChallenge, setSelectChallenge] =
    useRecoilState(selectChallengeState);
  const [writeChallenge, setWriteChallenge] =
    useRecoilState(ChallengeWriteState);
  const [premodal, setPremodal] = useState(false);
  const [reocordmodal, setRecordmodal] = useState(false);

  const editorRef = useRef(null);
  const imgUploadRef = useRef(null);

  const handleSubmitClick = () => {
    //needfix: server connection
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      // setRecordSubmit({
      //   challengeName: writeChallenge.templateData.challengeName,
      //   templateName: writeChallenge.templateData.templates[0].templateTitle,
      //   challengeTitle: title,
      //   challengeContent: editorRef.current.getContent(),
      // });
    }
    postRecordSubmit(
      writeChallenge.templateData.challengeName,
      writeChallenge.templateData.templates[0].templateTitle,
      title,
      editorRef.current.getContent()
    )
      .then((res) => {
        console.log(res); // 오케아 모달창 보내기 (오늘 기록이 완료되었습니다.)// 여기에 오케이 모달창 확인 누르면 navigate(record)
        setRecordmodal(true);
      })
      .catch((err) => console.log(err));

    //navigate("/record");
  };

  const handleSaveClick = (idx) => {
    setSaveAlert(true);
    //needfix: server connection
    // if (editorRef.current) {
    //   console.log(editorRef.current.setContent("<div>dfdfsffd</div>"));
    // }
    postPreSubmit(
      writeChallenge.templateData.challengeName,
      writeChallenge.templateData.templates[0].templateTitle,
      title,
      editorRef.current.getContent()
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handlePlusClick = (t, idx) => {
    if (editorRef.current) {
      const cur = editorRef.current.getContent();
      // console.log(template);
      // console.log(idx);
      // console.log(template[idx]);
      editorRef.current.setContent(cur + t.templateContent);
    }
  };

  const handleImgClick = () => {
    if (!imgUploadRef.current) {
      return;
    }
    imgUploadRef.current.click();
  };

  const handleImgUpload = useCallback((e) => {
    if (!e.target.files) {
      return;
    }
    console.log(e.target.files[0].name);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    console.log(formData);

    /* needfix: connect to server
    axios({
      baseURL: API_HOST,
      url: '/images/:username/thumbnail',
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });*/
  }, []);

  const DropdownChallenge = () => {
    setActiveDropdown(!activeDropdown);
  };

  const onSelectChallenge = (item) => {
    setSelectChallenge("[" + item.category + "]" + " " + item.challengeName);
    getEachChallenge(item.challengeName)
      .then((res) => {
        console.log(res.data);
        setWriteChallenge({
          ...writeChallenge,
          templateData: res.data.data.templateData,
        });
        if (res.data.data.templateCertain) {
          setPremodal(true);
        }
      })
      .catch((err) => console.log(err));
    setActiveDropdown(false);
  };

  const preclick = () => {
    if (side && editorRef.current && writeChallenge.templateCertain) {
      console.log(2);
      setTitle(writeChallenge.temporaryChallenge[0].title);
      editorRef.current.setContent(
        writeChallenge.temporaryChallenge[0].writing
      );
      setPremodal(false);
    }
  };

  useEffect(() => {
    if (side && writeChallenge.templateCertain) {
      setPremodal(true);
      console.log(2);
    }
    const title = localStorage.getItem("challengeName");
    if (title) {
      getEachChallenge(title) // 이 부분 수정필요.. 백엔드 수정 부탁함.
        .then((res) => {
          console.log(res.data);
          setWriteChallenge(res.data.data);
          setSelectChallenge(
            "[" +
              res.data.data.templateData.challengeCategory +
              "]" +
              " " +
              res.data.data.templateData.challengeName
          );
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      postSideBarChallenge()
        .then((res) => {
          if (res.data.data.challengingArray.length) {
            console.log(res);
            setWriteChallenge(res.data.data);

            console.log(writeChallenge);
            setSelectChallenge(
              "[" +
                res.data.data.templateData.challengeCategory +
                "]" +
                " " +
                res.data.data.templateData.challengeName
            );
            setLoading(false);
          } else {
            setToast("오늘은 모두 다 작성하셨어요!");
          }
        })
        .catch((err) => console.log(err));
    }

    //나 관리해서 모달창 띄우기 ( 임시저장된게 있네요?? )
    // 확인 누르면 precclcick 함수 실행

    if (saveAlert) {
      setSaveDisappear(false);
      setTimeout(() => {
        setSaveAlert(false);
        setTimeout(() => {
          setSaveDisappear(true);
        }, 500);
      }, 1500);
    }
  }, [saveAlert, side, writeChallenge.templateCertain]);

  function ChallengePreModal() {
    return (
      <ChallengeModalWrapper>
        <ChallengeBox>
          <div className="text">임시 저장한 챌린지를 이어 쓸까요?</div>
          <div className="btn-1">
            <div className="no">아니오</div>
            <div className="good" onClick={preclick}>
              좋아요
            </div>
          </div>
        </ChallengeBox>
      </ChallengeModalWrapper>
    );
  }

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
      <>
        {premodal && <ChallengePreModal />}
        {reocordmodal && <CheckModal message={"오늘의 기록을 완료했어요"} />}
        <div>
          <Container>
            {!saveDisappear && (
              <div
                className={saveAlert ? "saved showSaved" : "saved hideSaved"}
              >
                작성 중인 글이 저장되었습니다.
              </div>
            )}

            <div className="left">
              <div className="challenge-dropdown" onClick={DropdownChallenge}>
                <h2>{selectChallenge || "[카테고리명] 챌린지명"}</h2>
                <img
                  width={19}
                  height={19}
                  src={activeDropdown ? "/arrow1.svg" : "/arrow2.svg"}
                ></img>
              </div>
              {activeDropdown ? (
                <div className="drop">
                  {writeChallenge?.challengingArray?.map((item, idx) => {
                    return (
                      <div
                        key={idx}
                        className="drop-item"
                        onClick={() => onSelectChallenge(item)}
                      >
                        [{item.category}] {item.challengeName}
                      </div>
                    );
                  })}
                </div>
              ) : (
                ""
              )}

              <input
                type="text"
                placeholder="나의 제목을 기록해보세요"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              ></input>

              <hr />
              <div className="editor">
                <input
                  type="file"
                  accept="image/*"
                  multiple={true}
                  ref={imgUploadRef}
                  onChange={handleImgUpload}
                  style={{ display: "none" }}
                />
                <Editor
                  apiKey={"g4mg3drbkngwjqktapnoov8l2rgl77uqi4ji7mr62mheiq20"}
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  placeholder="내용을 입력해주세요."
                  init={{
                    language: "ko_KR",
                    height: "754px",
                    menubar: false,
                    statusbar: false,
                    plugins: "autolink autosave save directionality image link",
                    toolbar:
                      "blocks fontsizeinput bold italic underline strikethrough customImage forecolor backcolor customRemove ",
                    link_context_toolbar: true,
                    setup: (editor) => {
                      editor.ui.registry.addToggleButton("customImage", {
                        icon: "image",
                        tooltip: "이미지 삽입",
                        onAction: handleImgClick,
                      });
                      editor.ui.registry.addToggleButton("customRemove", {
                        icon: "remove",
                        tooltip: "전체 삭제",
                        onAction: () => {
                          editorRef.current.setContent("");
                        },
                      });
                    },
                  }}
                />
              </div>
            </div>
            <div className="right">
              <div className="saveBtns">
                <button onClick={handleSaveClick} className="pre-btn">
                  임시 저장
                </button>
                <button onClick={handleSubmitClick} className="record-btn">
                  <img src="/record_btn.svg" />
                  챌린지 기록
                </button>
              </div>
              <div className="challenging">진행 중인 챌린지</div>
              <div className="currentChallenge">
                <span className="catTag">
                  {writeChallenge?.templateData.challengeCategory ===
                  "내일 일기"
                    ? emoticon[0]
                    : writeChallenge?.templateData.challengeCategory ===
                      "감정 노트"
                    ? emoticon[1]
                    : writeChallenge?.templateData.challengeCategory ===
                      "하루 기록"
                    ? emoticon[2]
                    : writeChallenge?.templateData.challengeCategory ===
                      "오늘 칭찬"
                    ? emoticon[3]
                    : ""}{" "}
                  {writeChallenge?.templateData.challengeCategory}
                </span>
                <span className="currentTitle">
                  {writeChallenge.templateData.challengeName}
                </span>
              </div>
              <h2>질문 템플릿 상세 검색</h2>
              <div className="currentTemplateContainer">
                {writeChallenge.templateData?.templates?.map((t, idx) => (
                  <div className="currentTemplate" key={idx}>
                    <div>{t.templateTitle}</div>
                    <span className="catTag">
                      {t.category === "내일 일기"
                        ? emoticon[0]
                        : t.category === "감정 노트"
                        ? emoticon[1]
                        : t.category === "하루 기록"
                        ? emoticon[2]
                        : t.category === "오늘 칭찬"
                        ? emoticon[3]
                        : ""}{" "}
                      {t.category}
                    </span>
                    <button onClick={(e) => handlePlusClick(t, idx)}>
                      <img
                        className="plusIcon"
                        src="/challenge_template_plus.svg"
                      ></img>
                      추가
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Challenge;

const Container = styled.div`
  font-family: "Pretendard", sans-serif;
  max-width: 1106px;
  margin: auto;
  width: 1106px;
  height: 1000px;
  margin-top: 80px;
  box-sizing: border-box;
  display: flex;

  .challenge-dropdown {
    height: 20px;
    cursor: pointer;
  }
  .challenge-dropdown img {
    margin-left: 10px;
    align-items: center;
    margin-bottom: 3px;
  }

  .drop {
    position: absolute;
    z-index: 3;
    width: 396px;
    background-color: #ffffff;
    margin-top: 5px;
    left: 261px;
    border-radius: 8px;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
    box-shadow: 0px 2px 38px -8px rgba(39, 39, 39, 0.2);
    color: #272727;
  }

  .drop-item {
    width: 380px;
    height: 40px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e2e4e7;
    margin-left: 5px;
    padding-left: 15px;
    cursor: pointer;
  }

  .challenging {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 16px;
    margin-top: 76px;
  }

  .saved {
    position: absolute;
    left: 0;
    width: 100%;
    height: 72px;
    font-size: 20px;
    line-height: 16px;
    padding: 28px;
    text-align: center;
    color: #f43226;
    background: #e3e4e5;
    z-index: 1;
  }

  .showSaved {
    animation: slideDown 0.5s ease-in-out;
    top: 80px;
  }

  .hideSaved {
    animation: slideUp 0.5s ease-in;
    top: 0;
  }

  .saveDisappear {
    display: none;
  }

  .editor {
    width: 566px;
  }

  .tox .tox-number-input button {
    //font size button
    display: none;
  }

  .tox .tox-number-input input {
    //font size input
    padding: 4px;
  }
  .tox .tox-editor-container {
    z-index: 1;
  }

  .left {
    flex-basis: 566px;
    padding-top: 49px;
  }

  .left h2 {
    font-family: "Happiness-Sans-Bold", sans-serif;
    display: inline-block;
    font-size: 18px;
    margin-bottom: 55px;
    height: 23px;
  }

  .left input {
    font-size: 24px;
    border: 0;
    width: 566px;
    padding-left: 24px;
    margin-top: 48px;
  }

  input:focus {
    outline: none;
  }

  .left hr {
    border: 1px solid #e3e4e5;
    margin-top: 0;
    margin-bottom: 37px;
  }
  .right {
    flex-basis: 540px;
    padding-left: 48px;
    padding-top: 37px;
  }

  .saveBtns {
    position: relative;
  }
  .saveBtns button {
    font-size: 18px;
    width: 140px;
    height: 40px;
    border: 1px solid #bcd6ff;
    border-radius: 2px;

    padding: 0;
    position: absolute;
    right: 0;

    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    /* identical to box height, or 114% */

    text-align: center;

    color: #272727;
  }

  .pre-btn {
    margin-right: 156px;
    background-color: #ffffff;
  }

  .record-btn {
    background-color: #dee9fd;
  }

  .record-btn:hover {
    background: #dee9fd;
    border: 1px solid #bcd6ff;
    color: #266cf4;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  .record-btn img {
    margin-right: 8px;
  }

  /* .saveBtns button:nth-of-type(2) {
    margin-left: 16px;
    background-image: url("challenge_button_logo.svg");
    background-repeat: no-repeat;
    background-color: #272727;
    color: #ffffff;
  } */

  .right h2 {
    margin-top: 36px;
    margin-bottom: 15px;
    font-size: 20px; //추가된 부분
  }

  .currentChallenge {
    width: 100%;
    height: 72px;
    padding: 24px;
    border-radius: 8px;
    background-color: #f3f5f9; //추가된 부분
    font-size: 18px;
  }

  .currentTitle {
    margin-left: 16px;
  }

  .catTag {
    display: inline-block;
    padding: 0 12px;
    width: auto;
    height: 24px;
    color: #7c8089;
    background: #e1eaf8;
    border: 1px solid #bcd6ff;
    border-radius: 32px;
    font-size: 14px;
  }

  .currentTemplateContainer {
    display: grid;
    grid-template-columns: 237px 237px;
    gap: 17px;
  }

  .currentTemplate {
    position: relative;
    min-height: 141px;
    text-align: center;
    padding: 15px;
    background: #f3f5f9;
    box-shadow: 0px 18px 20px -18px rgba(39, 39, 39, 0.2);
    border-radius: 8px;
  }

  .currentTemplate div {
    font-size: 18px;
    margin-bottom: 13px;
  }

  .currentTemplate button {
    width: 206px;
    background: #ffffff;
    border-radius: 2px;
    border: 0;
    position: absolute;
    bottom: 15px;
    left: 15px;
  }

  .plusIcon {
    margin-right: 8px;
  }

  @keyframes slideDown {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0);
    }
  }
  @keyframes slideUp {
    0% {
      transform: translateY(80px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

const ChallengeModalWrapper = styled.div`
  font-family: "Pretendard";
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
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.4);
  z-index: 20;
`;

const ChallengeBox = styled.div`
  width: 390px;
  height: 195px;
  background: #ffffff;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 56px;

  .text {
    margin-bottom: 49px;
  }

  .btn-1 {
    width: 288px;
    display: flex;
    justify-content: space-between;
  }

  .btn-1 div {
    width: 136px;
    border-radius: 2px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    cursor: pointer;
  }

  .btn-1 .no {
    background-color: #272727;
    color: #ffffff;
  }
  .btn-1 .good {
    border: 1px solid #266cf4;
    color: #266cf4;
  }
`;
