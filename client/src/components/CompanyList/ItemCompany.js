import React from 'react';
import styled from 'styled-components';
const ItemCompanyWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
  border-bottom: 2px solid #e2e2e2;
  /* border-top: none; */
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
  .coName {
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
// 홈페이지 coHomePage
const ItemCompany = ({ currentItems }) => {
  return currentItems.map((v, i) => (
    <ItemCompanyWrapper
      key={`${v.superIndTpNm ? v.superIndTpNm._text : 'a'}_${i}`}
    >
      <AreaInfo>
        <div className='sIndTpNm'>
          {v.superIndTpNm ? v.superIndTpNm._text : ''}
        </div>
        <div className='address'>{v.coAddr ? v.coAddr._text : ''}</div>
      </AreaInfo>
      <AreaCorp>
        <div className='coName'>{v.coNm ? v.coNm._text : ''}</div>
        <div className='areaBtn'>
          <button>홈페이지</button>
        </div>
      </AreaCorp>
    </ItemCompanyWrapper>
  ));
};

export default ItemCompany;
