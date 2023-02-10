import React from 'react';
import styled from 'styled-components';
import buildingImg from '../../utils/img/building.png';
import listBack from '../../utils/img/listBackground.jpg';

const WaitingWrapper = styled.div`
  display: flex;
  background-image: url(${listBack});
  background-size: cover;
  img {
    width: 50%;
  }
`;
const Info = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  .textForm {
    border-radius: 20px;
    padding: 10px;
    width: 80%;
    background-color: rgba(0, 0, 0, 0.4);
    h2 {
      color: #fff;
    }
    p {
      color: #cccccc;
    }
  }
`;
const WaitingForm = () => {
  return (
    <WaitingWrapper>
      <img src={buildingImg} alt='building' />
      <Info>
        <div className='textForm'>
          <h2>지역이 선택되지 않았습니다.</h2>
          <p>
            위 지도에서 지역을 선택하시면 해당 지역의 기업의 리스트를 확인 하실
            수 있습니다.
          </p>
        </div>
      </Info>
    </WaitingWrapper>
  );
};

export default WaitingForm;
