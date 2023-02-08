import React from 'react';
import styled from 'styled-components';
const ItemCompanyWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
  border: 2px solid #e2e2e2;
  border-top: none;
  height: 130px;
`;
const AreaInfo = styled.div`
  .sIndTpNm {
    font-size: 1.4rem;
    font-weight: 500;
    margin-bottom: 10px;
  }
  .indTpNm {
    color: #666a73;
    margin-bottom: 5px;
  }
  .address {
    color: #808080;
    font-weight: 600;
  }
`;
const AreaCorp = styled.div`
  width: 30%;
  .corpName {
    font-size: 1.4rem;
    font-weight: 800;
  }
  button {
    background-color: #fff;
    border: 1px #666a73 solid;
    border-radius: 8px;
    cursor: pointer;
  }
`;
const ItemCompany = () => {
  return (
    <ItemCompanyWrapper>
      <AreaInfo>
        <div className='sIndTpNm'>전문, 과학 및 기술 서비스업</div>
        <div className='indTpNm'>
          건축기술, 엔지니어링 및 기타 과학기술 서비스업
        </div>
        <div className='address'>강원 인제군 인제읍 덕산로20번길 94</div>
      </AreaInfo>
      <AreaCorp>
        <div className='corpName'>주식회사고려엔지니어링</div>
        <div className='areaBtn'>
          <button>홈페이지</button>
        </div>
      </AreaCorp>
    </ItemCompanyWrapper>
  );
};

export default ItemCompany;
