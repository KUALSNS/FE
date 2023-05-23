import { Editor } from "@tinymce/tinymce-react";
import React, { useRef, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import ChallengeModal from "../components/ChallengeModal";
import { useRecoilState } from "recoil";
import {
  challengeModalState,
  loadingState,
  ChallengeWriteState,
  selectChallengeState,
} from "../atoms/auth";
import { useLocation, useParams } from "react-router";
import { getChallengePage, getAccessToken } from "../remotes";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

function Challenge() {
  const emoticon = ["☘️", "🌕", "🗒", "👍"];
  let { name } = useParams();
  console.log(name);
  const navigate = useNavigate();
  const location = useLocation();
  const tempSaved = { ...location.state };
  console.log("editinfo,", tempSaved);
  const [title, setTitle] = useState(tempSaved.title);
  const [content, setContent] = useState(tempSaved.content);
  const [newChallengeFlag, setFlag] = useRecoilState(challengeModalState);
  console.log(newChallengeFlag);
  const [loading, setLoading] = useRecoilState(loadingState);

  const [saveAlert, setSaveAlert] = useState(false);
  const [saveDisappear, setSaveDisappear] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(false);
  const [selectChallenge, setSelectChallenge] =
    useRecoilState(selectChallengeState);
  const [writeChallenge, setWriteChallenge] =
    useRecoilState(ChallengeWriteState);
  const editorRef = useRef(null);
  const imgUploadRef = useRef(null);

  if (editorRef.current){
    editorRef.current.setContent(content);
  }

  const handleSubmitClick = () => {
    //needfix: server connection
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const handleSaveClick = (idx) => {
    setSaveAlert(true);
    //needfix: server connection
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
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

  // const Retoken = () => {
  //   getAccessToken()
  //     .then((res) => {
  //       localStorage.setItem("accessToken", res.data.data.accessToken);
  //       console.log("access 토큰 만 재발급");
  //     })
  //     .catch((error) => {
  //       if (error.response.data.code === 419) {
  //         localStorage.removeItem("accessToken");
  //         localStorage.removeItem("refreshToken");
  //         alert("로그인을 다시 하세요");
  //         window.location.reload();
  //       } else {
  //         console.log(error);
  //       }
  //     });
  // };

  const DropdownChallenge = () => {
    setActiveDropdown(!activeDropdown);
  };

  const onSelectChallenge = (item) => {
    setSelectChallenge("[" + item.category + "]" + " " + item.challengeName);
    // 드롭다운 버튼 누를시, 챌린지 이름에 맞는 api 호출
    // 근데, url도 바꿔어야하지않나?
    // url 굳이 써야하나. 그냥 페이지만 이동 시키고, 그때 넣어주면 되지않을까., 챌린지이름을
    // 첼린지 페이지 들어와서 여기 안에 들어와서 뿌려주기만 하고,  여기 안에서 드롭다운 버튼으로 이동시, 뿌려줬던 데이터를 업데이트만 해준다.

    setActiveDropdown(false);
  };

  useEffect(() => {
    if (saveAlert) {
      setSaveDisappear(false);
      setTimeout(() => {
        setSaveAlert(false);
        setTimeout(() => {
          setSaveDisappear(true);
        }, 500);
      }, 1500);
    }
  }, [saveAlert]);

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
        {newChallengeFlag && <ChallengeModal />}
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
                <h2>
                  {selectChallenge || "[카테고리명] 챌린지명"}
                  {/* [{category}] {challenge}{" "} */}
                </h2>
                <img
                  width={19}
                  height={19}
                  src={activeDropdown ? "/arrow1.svg" : "/arrow2.svg"}
                ></img>
              </div>
              {activeDropdown ? (
                <div className="drop">
                  {writeChallenge?.challengingArray?.map((item) => {
                    return (
                      <div
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
              <input type="text" value={title} onChange={e=>setTitle(e.target.value)}placeholder="나의 제목을 기록해보세요"></input>

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
                  apiKey="g4mg3drbkngwjqktapnoov8l2rgl77uqi4ji7mr62mheiq20"
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
                {writeChallenge.templateData?.template?.map((t, idx) => (
                  <div className="currentTemplate">
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
  margin-left: 260px;
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
    padding-top: 49px;
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
