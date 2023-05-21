import React, {useState, useEffect} from 'react';
import { styled } from 'styled-components';
import Parser from 'html-react-parser';
import RecordProgressTape from './RecordProgressTape';
import { getPlannerHistory, getPlannerStatistic } from '../remotes';
import ChallengeItem from './ChallengeItem';
import { useRecoilValue } from 'recoil';
import { challengeState } from '../atoms/auth';

function RecordChallenges() {
  const allChallengeServed = useRecoilValue(challengeState);
  const [finChallenge, setFinChallenge] = useState([])
  const [ongoChallenge, setOngoChallenge] = useState([])
  const [tempChallenge, setTempChallenge] = useState([])
  const [selectedChallenge, setSelectedChallenge] = useState([])
  const [longContent, setLongContent] = useState([])
  const [showFilter, setShowFilter] = useState(false);
  const [emptyFlag, setEmptyFlag] = useState(true);
  const filter = ["진행 중인 챌린지", "임시 저장 챌린지", "종료된 챌린지"];
  const [filterIdx, setFilterIdx] = useState(0);

  useEffect(() => {
    getPlannerHistory()
    .then((res)=>{
      const allChallenge = res.data.data.userChallengeHistory;
      setFinChallenge(allChallenge.finishedChallenges);
      setOngoChallenge(allChallenge.ongoingChallenges);
      setTempChallenge(allChallenge.temporarilySavedChallenges);
      setSelectedChallenge(allChallenge.ongoingChallenges);
    })
    .catch(err=>console.log(err));
  }, [])
  
  useEffect(() => {
    if (finChallenge.length > 0 || ongoChallenge.length > 0 || tempChallenge.length > 0) setEmptyFlag(false);
  }, [finChallenge, ongoChallenge, tempChallenge, selectedChallenge]);
  
  useEffect(() => {
    if (filterIdx===0){
      setSelectedChallenge(ongoChallenge);
    }
    else if (filterIdx===1){
      setSelectedChallenge(tempChallenge);
    }
    else if (filterIdx===2){
      setSelectedChallenge(finChallenge);
    }
  }, [filterIdx])
  

  const showTextOnly = (content)=>{
    if (content===undefined) return;
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
  const handleFilterClick = (idx) =>{
    setFilterIdx(idx);
    setShowFilter(false);
  }

  return (
    <RecordChallengesWrapper>
      {emptyFlag?
      <>
      <div className='empty'>
        <h2>이런 챌린지는 어때요?</h2>
        <p>라이톤은 지속적인 글쓰기를 위한 글 챌린지를 응원해요</p>
        <ChallengeLists>
        {allChallengeServed.map((item) => {
          return (
            <ChallengeItem
              title={item.title}
              category={item.category}
              image={item.image}
            />
          );
        })}
      </ChallengeLists>
      </div>
      </>
      :
      <>
        <div className='topbar'>
            <h2>{filter[filterIdx]}</h2><img className='dropdown' onClick={()=>setShowFilter(!showFilter)} src='calendar_title_dropdown.svg'/>
            {showFilter&&
            <div className='filter'>
                {filter.map((item, idx)=>(
                    <div key={idx} className={filterIdx===idx?"selected":"notselected"} onClick={()=>handleFilterClick(idx)}>{item}</div>
                ))}
            </div>}
        </div>
        <div className='challengeList'>
            {selectedChallenge.map((chal, idx) => (
              chal.user_challenge_templetes?.map((item, temIdx) => (
                <div className={longContent.indexOf(idx*100+temIdx)>-1?"challengeItem longerItem":"challengeItem"}>
                    <div className='challengeInfo'>
                        <div className='titlebar'>
                            <div className='tag'><img className='emoji' src={chal.challenges.category.emogi}/>{chal.challenges.category.name}</div><h2>{chal.challenges.title}</h2>
                            <button><img src='calendar_edit.svg'/>수정하기</button>
                        </div>
                        <div onClick={()=>{handleContentClick(idx*100+temIdx)}} className={longContent.indexOf(idx*100+temIdx)>-1?"challengeContent longerItem":"challengeContent shorterItem"}>
                          <h2 className='contentTitle'>{item.title}</h2>
                          <p>
                            {longContent.indexOf(idx*100+temIdx)>-1?
                            Parser(item.writing)
                            :
                            showTextOnly(item.writing)}
                          </p>
                        </div>
                    </div>
                    <div className='progressTape'>
                        <RecordProgressTape progress={chal.achievement}/>
                    </div>
                </div>
                ))
              ))}
        </div>
      </>
      }
    </RecordChallengesWrapper>

  )
}

const ChallengeLists = styled.div`
  width: 920px;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3개의 열을 생성 */

  grid-column-gap: 28px; /* 열 간격 설정 */
  grid-row-gap: 32px;
  grid-auto-rows: 180px;
  justify-content: space-between;
`;

const RecordChallengesWrapper = styled.div`
  .empty h2{
    font-family: 'Happiness-Sans-Bold', sans-serif;
    font-size: 24px;
    margin-top: 55px;
    margin-bottom: 10px;
  }
  .empty p{
    font-size: 18px;
    color: #7C8089;
    margin-bottom: 33px;
  }
  .topbar{
    position: relative;
    padding-top: 68px;
    padding-bottom: 25px;
  }
  .topbar h2{
    font-family: 'Happiness-Sans-Bold', sans-serif;
    font-size: 18px;
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
  .titlebar .emoji{
    width: 14px;
    height: 14px;
    margin-right: 2px;
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

  .contentTitle{
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: 500;
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