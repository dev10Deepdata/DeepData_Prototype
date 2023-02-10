import React from 'react';
import styled from 'styled-components';
import loading from '../../utils/img/loadingGif.gif';

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Header = styled.div`
  color: #0f6292;
  font-size: 1.6rem;
  font-weight: 600;
  margin-top: 20px;
`;

const DataLoading = () => {
  return (
    <LoadingWrapper>
      <Header>데이터를 불러오는 중 입니다.</Header>
      <img src={loading} alt='loading' />
    </LoadingWrapper>
  );
};

export default DataLoading;
