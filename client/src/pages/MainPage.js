import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CompanyCount from '../components/CompanyCount';
import Map from '../components/Map/Map';

const MainLayout = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 900px;

  @media screen and (max-width: 899px) {
    width: 100%;
  }
`;
const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-left: 10px;
  margin-top: 30px;
  margin-bottom: 10px;
`;
const MainPage = () => {
  const navigate = useNavigate();
  const { me } = useSelector((state) => state.data);

  // store에 me의 유무를 확인 하고 me 가 없다면 인적사항 페이지로 이동
  useEffect(() => {
    if (!me) {
      navigate('/');
    }
  }, [me, navigate]);

  return (
    <MainLayout>
      <Title>Map</Title>
      <Map />
      <Title>Company Count</Title>
      <CompanyCount />
    </MainLayout>
  );
};
export default MainPage;
