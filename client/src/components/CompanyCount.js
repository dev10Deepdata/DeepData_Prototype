import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { CnEng } from '../api/chungnam';

// styled
const CompanyWrapper = styled.div`
box-shadow: 0px 0px 12px 1px #555555;
  background-color: #A0C3D2;
  width: 100%;
  margin-top: 13px;
  margin-left: auto;
  margin-right: auto;
  padding: 5px;
  height: 115px;
  border-radius: 10px;
  overflow: scroll;
`;

const Wrapper = styled.div`
  .sym {
    background-color: #fff;
    display: inline-block;
    margin: 5px;
    padding: 5px;
    border-radius: 10px;
  }
`;
// End styled

/**
 * 지역별 기업의 수를 표시 해주는 컴포넌트
 */
const CompanyCount = () => {
  const { cnData } = useSelector((state) => state.data);

  useEffect(() => {
    if (cnData !== null) {
      CnEng.map((v) => {
        const $countList = document.querySelector('#countList');
        const node = document.createElement('div');
        const text = document.createTextNode(
          `${v}: ${cnData['CnDivision'][v].length}`
        );
        node.appendChild(text);
        node.className = 'sym';
        $countList.appendChild(node);

        return 0;
      });
    }
  }, [cnData]);
  return (
    <CompanyWrapper>
      <Wrapper id='countList'></Wrapper>
    </CompanyWrapper>
  );
};

export default CompanyCount;
