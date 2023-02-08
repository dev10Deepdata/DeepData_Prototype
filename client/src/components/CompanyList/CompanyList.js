import React from 'react';
import ItemCompany from './ItemCompany';
import styled from 'styled-components';

const CompanyListWrapper = styled.div``;
const Header = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  border: 2px solid #e2e2e2;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  .title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-right: 15px;
    margin-left: 15px;
  }
`;
const ContentWrapper = styled.div``;
const ContentBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  border: 2px solid #e2e2e2;
  border-top: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;
const Pagination = styled.div``;

const CompanyList = () => {
  return (
    <CompanyListWrapper>
      <Header>
        <div className='title'>기업정보</div>
        <div className='total'>총 1건</div>
      </Header>
      <ContentWrapper>
        <ItemCompany />
        <ContentBottom>
          <Pagination>{'< 1 >'}</Pagination>
        </ContentBottom>
      </ContentWrapper>
    </CompanyListWrapper>
  );
};

export default CompanyList;
