import { Editor } from "@tinymce/tinymce-react";
import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

function Challenge() {
  //needfix: dummy data, should be atom (or state?)
  const template = [{
    title:"템플릿1", 
    contents: "<div>테스트 div입니당. 템플릿1</div>"
    },
    {
      title:"템플릿2", 
      contents: "<div style='color: red;'>얘는 빨간색. 템플릿2</div>"
    },
    {
      title:"템플릿3", 
      contents: "<h1>h1 템플릿3</h1>"
    },
    {
      title:"템플릿4", 
      contents: "<div>첫째줄 테스트 div</div><div>둘째줄 템플릿4</div>"
    },
    {
      title:"템플릿5", 
      contents: "<div>테스트 div입니당. 템플릿5</div>"
    },
    {
      title:"템플릿6", 
      contents: "<div>테스트 div입니당. 템플릿6</div>"
    },
    ]
  const challenge = "챌린지명"
  const category = "카테고리명"
  //dummy data

  const [saveAlert, setSaveAlert] = useState(false);
  const [saveDisappear, setSaveDisappear] = useState(true);
  useEffect(() => {
    console.log("hihihi");
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
  
  

  const editorRef = useRef(null);
  const handleSubmitClick = () => {
    //needfix: server connection
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const handleSaveClick = (idx) =>{
    setSaveAlert(true);
    //needfix: server connection
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  }

  const handlePlusClick = (idx) => {
    if (editorRef.current) {
      const cur = editorRef.current.getContent()
      console.log(template)
      console.log(idx)
      console.log(template[idx])
      editorRef.current.setContent(cur + template[idx].contents);
    }
  };
  return (
    <>
      <div>
        <Container>
          {<div className={saveAlert ? "saved showSaved" : "saved hideSaved" + (saveDisappear ? " saveDisappear" : "")}>작성 중인 글이 저장되었습니다.</div>}
          <div className='left'>
            <h2>[{category}] {challenge} </h2><img src="challenge_title_dropdown_disabled.svg"></img>
            <input type='text' placeholder="나의 제목을 기록해보세요"></input>
            <hr/>
            <div className='editor'>
              <Editor
              apiKey='g4mg3drbkngwjqktapnoov8l2rgl77uqi4ji7mr62mheiq20'
              onInit={(evt, editor) => editorRef.current = editor}
              placeholder='내용을 입력해주세요.'
              init={{
                language : 'ko_KR',
                height: '754px',
                menubar: false,
                statusbar: false,
                plugins: 'autolink autosave save directionality image link',
                toolbar: 'blocks fontsizeinput bold italic underline strikethrough image forecolor backcolor | removestyle ',
                editimage_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
                link_context_toolbar: true,
              }}
              />
            </div>
          </div>
          <div className='right'>
              <div className='saveBtns'>
                <button  onClick={handleSaveClick}>임시 저장</button>
                <button  onClick={handleSubmitClick}>챌린지 기록</button>
              </div>
              <h2>진행 중인 챌린지</h2>
              <div className="currentChallenge">
                <span className="catTag">{category}</span><span className="currentTitle">{challenge}</span>
              </div>
              <h2>질문 템플릿 상세 검색</h2>
              <div className="currentTemplateContainer">
                {template.map((t, idx)=>(
                  <div className="currentTemplate">
                    <div>{t.title}</div>
                    <span className="catTag">{category}</span>
                    <button onClick={(e)=>handlePlusClick(idx)}><img className="plusIcon" src="challenge_template_plus.svg"></img>추가</button>
                  </div>
                ))}
              </div>
            </div>
        </Container>
      </div>

      
    </>
  );
}

export default Challenge;

const Container = styled.div`
  font-family: 'Pretendard', sans-serif;
  max-width: 1106px;
  margin: auto;
  margin-left: 260px;
  width: 1106px;
  height: 1000px;
  margin-top: 64px;
  box-sizing: border-box;
  display: flex;

  .saved{
    position: absolute;
    left: 0;
    width: 100%;
    height: 72px;
    font-size: 20px;
    line-height: 16px;
    padding: 28px;
    text-align: center;
    color: #F43226;
    background: #E3E4E5;
    }

  .showSaved{
    animation: slideDown 0.5s ease-in-out;
    top: 88px;
  }

  .hideSaved{
    animation: slideUp 0.5s ease-in;
    top: 0;
  }

  .saveDisappear{
    display: none;
  }

  .editor{ 
    width: 566px;
  }

  .tox .tox-number-input button{ //font size button
    display: none
  }

  .tox .tox-number-input input{ //font size input
    padding: 4px;
  }


  .left{
    flex-basis: 566px;
    padding-top: 49px;
  }

  .left h2{
    font-family: 'Happiness-Sans-Bold', sans-serif;
    display: inline-block;
    font-size: 18px;
    margin-bottom: 55px;
    height: 23px;
  }

  .left input{
    font-size: 24px;
    border: 0;
    width: 566px;
    padding-left: 24px;
  }

  input:focus{
    outline: none;
  }

  .left hr{
    border: 1px solid #E3E4E5;
    margin-top: 0;
    margin-bottom: 37px;
  }
  .right{
    flex-basis: 540px;
    padding-left: 48px;
    padding-top: 113px;
  }

  .saveBtns button{
    font-size: 18px;
    width: 238px;
    height: 52px;
    border: 1px solid #272727;
    border-radius: 2px;
    background-color: #ffffff;
    padding: 0;
  }
  
  .saveBtns button:nth-of-type(2){
    margin-left: 16px;
    background-image: url('challenge_button_logo.svg');
    background-repeat: no-repeat;
    background-color: #272727;
    color: #ffffff;
  }

  .right h2{
    margin-top: 36px;
    margin-bottom: 15px;
  }

  .currentChallenge{
    width: 100%;
    height: 72px;
    padding: 24px;
    border-radius: 8px;
    background-color: #EDEFF3;
    font-size: 18px;
  }

  .currentTitle{
    margin-left: 16px;
  }

  .catTag{
    display: inline-block;
    padding: 0 12px;
    width: auto;
    height: 24px;
    color: #7C8089;
    background: #E1EAF8;
    border: 1px solid #BCD6FF;
    border-radius: 8px;
    font-size: 14px;
  }

  .currentTemplateContainer{
    display: grid;
    grid-template-columns: 237px 237px;
    gap: 17px;
  }

  .currentTemplate{
    position: relative;
    min-height: 141px;
    text-align: center;
    padding: 15px;
    background: #f3f5f9;
    box-shadow: 0px 18px 20px -18px rgba(39, 39, 39, 0.2);
    border-radius: 8px;
  }

  .currentTemplate div{
    font-size: 18px;
    margin-bottom: 13px;
  }

  .currentTemplate button{
    width: 206px;
    background: #ffffff;
    border-radius: 2px;
    border: 0;
    position: absolute;
    bottom: 15px;
    left: 15px;
  }

  .plusIcon{
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
          transform: translateY(88px);
      }
      100% {
          transform: translateY(0);
      }
  }  

`;
