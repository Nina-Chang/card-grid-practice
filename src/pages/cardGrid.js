import React, { useMemo, useState, useEffect } from 'react'
import styled from 'styled-components';

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

const CardsContainerGrid = styled.div`
  width: 1655px;
  height: 671px;
  margin-top: 20px;
  display: grid;
  justify-content: center;
  align-content: center;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  /* background-color: #000; */

  ${({ pairCount }) => {
    // 3-7 pairs: 2 rows, 211px width, 16px gap
    if (pairCount >= 3 && pairCount <= 7) {
      return `
        grid-template-columns: repeat(${pairCount}, 211px);
        grid-template-rows: repeat(2, 218px);
        gap: 16px;
      `;
    }

    // 8 pairs: 2 rows, 211px width, 0px gap
    if (pairCount === 8) {
      return `
        grid-template-columns: repeat(8, 211px);
        grid-template-rows: repeat(2, 218px);
        gap: 0px;
      `;
    }

    // 9 pairs: 6 cols × 198px, 3 rows, 16px gap
    if (pairCount === 9) {
      return `
        grid-template-columns: repeat(6, 198px);
        grid-template-rows: repeat(3, 205px);
        gap: 16px;
      `;
    }

    // 10-12 pairs: 8 cols × 198px, 3 rows, 10px gap
    if (pairCount >= 10 && pairCount <= 12) {
      return `
        grid-template-columns: repeat(8, 198px);
        grid-template-rows: repeat(3, 205px);
        gap: 10px;
      `;
    }

    // 13-14 pairs: 7 cols × 147px, 4 rows, 18px/20px gaps
    if (pairCount >= 13 && pairCount <= 14) {
      return `
        grid-template-columns: repeat(7, 147px);
        grid-template-rows: repeat(4, 152px);
        grid-row-gap: 18px;
        grid-column-gap: 20px;
      `;
    }

    // 15-16 pairs: 8 cols × 147px, 4 rows, 18px/20px gaps
    if (pairCount >= 15 && pairCount <= 16) {
      return `
        grid-template-columns: repeat(8, 147px);
        grid-template-rows: repeat(4, 152px);
        grid-row-gap: 18px;
        grid-column-gap: 20px;
      `;
    }

    // 17-18 pairs: 9 cols × 147px, 4 rows, 18px/20px gaps
    if (pairCount >= 17 && pairCount <= 18) {
      return `
        grid-template-columns: repeat(9, 147px);
        grid-template-rows: repeat(4, 152px);
        grid-row-gap: 18px;
        grid-column-gap: 20px;
      `;
    }

    // 19-20 pairs: 10 cols × 147px, 4 rows, 18px/20px gaps
    if (pairCount >= 19 && pairCount <= 20) {
      return `
        grid-template-columns: repeat(10, 147px);
        grid-template-rows: repeat(4, 152px);
        grid-row-gap: 18px;
        grid-column-gap: 20px;
      `;
    }

    // Default for 1-2 pairs
    return `
      grid-template-columns: repeat(${Math.min(pairCount * 2, 4)}, 1fr);
      grid-template-rows: repeat(2, 200px);
      gap: 16px;
    `;
  }}
`;


const CardFrame = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-origin: center;

  ${({ pairCount }) => {
    if (pairCount >= 13) {
      return `
        transform: scale(0.8);
        width: 135%;
        height: 135%;
        margin-top: -24px;
        margin-left: -20px;
        ${pairCount === 13 ? '&:nth-child(22) { grid-column-start: 2; }' : ''}
        ${pairCount === 15 ? '&:nth-child(25) { grid-column-start: 2; }' : ''}
        ${pairCount === 17 ? '&:nth-child(28) { grid-column-start: 2; }' : ''}
        ${pairCount === 19 ? '&:nth-child(31) { grid-column-start: 2; }' : ''}
      `;
    }
    
    if (pairCount === 10) {
      return `
        width: 100%;
        height: 100%;
        &:nth-child(17) { grid-column-start: 3; }
      `;
    }
    
    if (pairCount === 11) {
      return `
        width: 100%;
        height: 100%;
        &:nth-child(17) { grid-column-start: 2; }
      `;
    }
    
    return `
      width: 100%;
      height: 100%;
    `;
  }}
`;


export const CardGrid = () => {
    const [cards, setCards] = useState([])
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [cardDisabled, setCardDisabled] = useState(false)
    const [matchFrameVisible, setMatchFrameVisible] = useState(false)

    const pageStyle = { 
        backgroundImage: `url(./images/background/doodle_matching_03_FHD.png)`,
        loading:'eager'
    };

    const gamePairs = useMemo(() => 
        cfg.questions?.[0]?.pairs || [], 
    [cfg.questions]
    );

    const pairCount=gamePairs.length


  const shuffleCards = () => { // 洗牌
    const text=gamePairs?.map(pair => pair.text) || []
    const img=gamePairs?.map(pair => pair.image) || []
    const shuffleCards=[...text,...img]
      .sort(() => Math.random() - 0.5)
      .map((content) => ({
        id: Math.random(),
        content,
        active:false,
        matched:null,
      }));
    setCards(shuffleCards);
  }

  useEffect(() => {
    shuffleCards()
  }, []);

const handleCardClick = (card) => {
    // if(!cardDisabled){
    //   choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
      setCards(prevCards => prevCards.map(c => 
        c.id === card.id ? { ...c, active: true } : c
      ));
    // }
  }

  return (
    <div className="page-container" style={pageStyle}>
        {/* 玩家區域 */}
        <div className="player-container">
        {
            cfg.players?.map((player, index) => (
            <div key={player.id || index} className="player-content">
                <img className="player-arrow" style={{visibility: player.status ? 'visible' : 'hidden'}} width={33} height={23} src={"./images/object/doodle_matching_arrow.png"} alt="Arrow" />
                <img className="player-frame" src={player.frame || `./images/object/doodle_matching_score_finch_0${index+1}.png`} alt="Game Frame" />
                <span className="player-score-text">{player.score || 0}</span>
            </div>
            ))
        }
        </div>

        <CardsContainerGrid pairCount={pairCount}>
            {cards.map((card) => (
            <CardFrame pairCount={pairCount} key={card?.id} style={{visibility:card?.disabled&&card?.disabled===true ? 'hidden' : 'visible'}}  onClick={()=>{handleCardClick(card)}}>
                <img src={`./images/object/doodle_matching_${card?.matched && card?.matched===true?"right":card?.matched===false?"wrong":"question"}.png`} alt="Card" />
                {card?.matched===null && card?.active && <img className={"card-choosed"} src={`./images/object/doodle_matching_choose.png`} alt="Card" />}
                {
                card?.content && card?.content.includes('/') ?
                <img className="card-content" style={{width:'150px'}} src={card?.content} alt="Card Content" /> :
                <span className="card-content" style={{width:'175px'}} >{card?.content}</span>
                }
            </CardFrame>
            ))}

            {/* 答對框 */}
            {
            matchFrameVisible && (
            <div className="matching-answer-frame">
                <img src={"./images/object/doodle_matching_answer_frame.png"} alt="Answer Frame" />
                <div className="matching-answer-content">
                <div className="matching-answer-cards">
                    <div className="card-frame">
                    <img src={"./images/object/doodle_matching_question.png"} alt="question" />
                    {
                        choiceOne && choiceOne?.content && choiceOne?.content.includes('/') ?
                        <img className="card-content" style={{width:'150px'}} src={choiceOne?.content} alt="Card Content" /> :
                        <span className="card-content" style={{width:'175px'}} >{choiceOne?.content}</span>
                    }
                    </div>
                    <div className="card-frame">
                    <img src={"./images/object/doodle_matching_question.png"} alt="question" />
                    {
                        choiceTwo && choiceTwo?.content && choiceTwo?.content.includes('/') ?
                        <img className="card-content" style={{width:'150px'}} src={choiceTwo?.content} alt="Card Content" /> :
                        <span className="card-content" style={{width:'175px'}} >{choiceTwo?.content}</span>
                    }
                    </div>
                </div>
                <div className="matching-answer-text">Great!</div> 
                <button className="image-button next-button" onClick={()=>{}}>
                    <img src={"./images/object/doodle_matching_next_button02.png"} alt="question" />
                    <span className="next-button-text">Next</span>
                </button>
                </div>
            </div>
            )
            }
        </CardsContainerGrid>
    </div>
  )
}
