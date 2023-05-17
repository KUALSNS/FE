import React, {useState} from 'react';
import { styled } from 'styled-components';
import Parser from 'html-react-parser';
import RecordProgressTape from './RecordProgressTape';
function RecordChallenges() {
  //needfix: dummy data
  const category = "내일 일기 ☘️";
  const challenge = "30일 희망 일기";
  const content = "<div>다가오는 휴일 먹고 싶었던 <span style=background-color:yellow>바스크 치즈 케이크</span>가 생각만큼 맛있었으면 좋겠다. 이번에는 고양이와 시간을 보낸 후 보고 싶었던 카지노 3화를 보면서 여유롭게 시간을 보낼 수 있다면 정말 행복할 것 같다.</div> <div>여름 대비 옷 쇼핑도 해야하는데 나에게 딱 맞는 옷들이 많기를 바라고 여행용 바캉스룩도 많이 나와 있었으면 좋겠다.</div><div>알차고 멋진 여름방학을 보낼 것이 기대된다. 더 길게 써서 아래로 쭉 늘어나는 게 보고 싶다. 날씨가 너무 덥다. 여름이 사라졌으면 좋겠다. 이제 여름이 시작이라니 말도 안 된다. 정말이지 말이 하나도 안 된다. 여름이 너무 싫다. 어제 방에서 모기가 나와서 깜짝 놀랐다. 그래도 여름방학이 있으니까 행복하다. 끝!</div>"
  const progress = 50;
  const userChallenge = [
    {"category": category,
    "challenge": challenge,
    "content": content,
    "progress": progress,
    },
    {"category": category,
    "challenge": challenge,
    "content": content,
    "progress": progress,
    }
  ]
  //dummy data
  const [longContent, setLongContent] = useState([])
  const [showFilter, setShowFilter] = useState(false);
  const filter = ["진행 중인 챌린지", "임시 저장 챌린지", "종료된 챌린지"];
  const [filterIdx, setFilterIdx] = useState(0);
  const showTextOnly = (content)=>{
    return content.replace(/<[^>]*>?/g, '');
  }
  const handleContentClick = (idx)=>{
    if (longContent.indexOf(idx)>-1){
        const newLongContent = longContent.filter(item=>item!==idx);
        setLongContent(newLongContent);
    }
    else{
        const newLongContent = [...longContent, idx];
        setLongContent(newLongContent);
    }
  }

  return (
    <RecordChallengesWrapper>
        <div className='topbar'>
            <h2>{filter[filterIdx]}</h2><img className='dropdown' onClick={()=>setShowFilter(!showFilter)} src='calendar_title_dropdown.svg'/>
            {showFilter&&
            <div className='filter'>
                {filter.map((item, idx)=>(
                    <div key={idx} className={filterIdx===idx?"selected":"notselected"} onClick={()=>{setFilterIdx(idx);setShowFilter(false)}}>{item}</div>
                ))}
            </div>}
        </div>
        <div className='challengeList'>
            {userChallenge.map((item, idx)=>(
                <div className={longContent.indexOf(idx)>-1?"challengeItem longerItem":"challengeItem"}>
                    <div className='challengeInfo'>
                        <div className='titlebar'>
                            <div className='tag'>{item.category}</div><h2>{item.challenge}</h2>
                            <button><img src='calendar_edit.svg'/>수정하기</button>
                        </div>
                        <div onClick={()=>{handleContentClick(idx)}} className={longContent.indexOf(idx)>-1?"challengeContent longerItem":"challengeContent shorterItem"}>
                            {longContent.indexOf(idx)>-1?
                            Parser(item.content)
                            :showTextOnly(item.content)}
                        </div>
                    </div>
                    <div className='progressTape'>
                        <RecordProgressTape progress={item.progress}/>
                    </div>
                </div>
            ))}
        </div>
    </RecordChallengesWrapper>

  )
}

const RecordChallengesWrapper = styled.div`

.topbar{
    position: relative;
    padding-top: 68px;
    padding-bottom: 25px;
  }
  .topbar h2{
    font-family: 'Happiness-Sans-Bold', sans-serif;
    font-size: 18px;
    width: 126px;
    height: 23px;
    margin-right: 2px;
    display: inline-block;
  }
  .topbar img{
    cursor: pointer;
  }
  .filter{
    position: absolute;
    width: 228px;
    box-shadow: 0px 2px 38px -8px rgba(39, 39, 39, 0.2);
    border-radius: 8px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    z-index: 20;
    gap: 1px;
  }

  .filter div{
    flex-grow: 1;
    padding: 14px;
    font-size: 14px;
    line-height: 14px;
    border-bottom: 1px solid #E2E4E7;
    cursor: pointer;
  }
  .filter div:last-of-type{
    border: 0;
  }
  .challengeList{
    width: 100%;
    border: 1px solid #E2E4E7;
    border-radius: 8px;
    padding: 24px;
  }
  .challengeItem{
    margin-bottom: 24px;
    display: flex;
  }
  .challengeItem:last-of-type{
    margin-bottom: 0;
  }
  .challengeInfo{
    background: #F3F5F9;
    border-radius: 8px;
    height: 100%;
    width: 720px;
    margin-right: 84px;
    padding: 32px 24px;
  }
  .titlebar{
    display: flex;
    position: relative;
    width: 100%;
    margin-bottom: 21px;
  }
  .titlebar .tag{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 95px;
    height: 24px;
    font-size: 14px;
    border-radius: 32px;
    color: #7C8089;
    background: #E1EAF8;
    border: 1px solid #BCD6FF;
  }
  .titlebar h2{
    font-size: 18px;
    margin: 0;
    margin-left: 16px;
  }
  .titlebar button{
    position: absolute;
    right: 0;
    background: #ffffff;
    width: 120px;
    height: 35px;
    border: 0;
    border-radius: 2px;
    top: -5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .titlebar button img{
    margin-right: 8px;
  }
  .challengeContent{
    width: 656px;
    height: 84px;
    line-height: 28px;
    font-size: 18px;
    cursor: pointer;
  }

  .longerItem{
    height: fit-content;
  }

  .shorterItem{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .longContent{
    height: 150px;
  }
  .progressTape{
    margin-top: 29px;
    position: relative;
  }
`

export default RecordChallenges