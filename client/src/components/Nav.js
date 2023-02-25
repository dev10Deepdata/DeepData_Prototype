import React from 'react';
import styled from 'styled-components';
import background1 from '../utils/img/back1.png';
import background2 from '../utils/img/back2.png';
import { useSelector } from 'react-redux';

// styled
const NavBar = styled.div``;
const Banner1 = styled.div`
  width: 100%;
  aspect-ratio: 1920 / 1007;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center 0;
  background-image: url(${background1});
  align-items: center;
  @media screen and (max-width: 767px) {
    background-size: 1000px;
    height: 500px;
  }
`;
const Banner2 = styled.div`
  width: 100%;
  aspect-ratio: 1920 / 1007;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center 0;
  background-image: url(${background2});
  align-items: center;
  @media screen and (max-width: 767px) {
    background-size: 1000px;
    height: 500px;
  }
`;
const TopNav = styled.div`
  font-family: Hind_Siliguri_SemiBold;
  position: relative;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const RightItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .item {
    color: #fff;
    margin-left: 10px;
    margin-right: 10px;
  }
`;
const LeftItem = styled.div`
  display: flex;
`;

const MyInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 20px;

  height: 30px;

  padding-left: 10px;
  padding-right: 10px;
`;
const Logo = styled.div`
  color: #fff;
  font-family: Righteous;
  font-size: 1.6rem;
  margin-left: 20px;
  margin-right: 20px;
`;

const Rank = styled.div`
  background-color: rgba(999, 999, 999, 0.5);

  width: 60%;
  height: 300px;

  border-radius: 10px;

  position: relative;
  top: 10%;

  margin-left: auto;
  margin-right: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 900px) {
    width: 70%;
    height: 250px;
  }
`;
const RankList = styled.div`
  width: 70%;
  height: 50px;
  border-radius: 20px;
  background-color: #fff;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const RankTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;
// End styled

const Nav = () => {
  const { me } = useSelector((state) => state.data);

  const myInfo = () => {
    return <MyInfo>{`MyInfo _ gender: ${me.gender}  age: ${me.age}`}</MyInfo>;
  };
  const likedRank = () => {
    return (
      <>
        <RankTitle>{`${me.age}대 ${me.gender}이 많이 찾아 본 회사 Top3`}</RankTitle>
        <RankList></RankList>
        <RankList></RankList>
        <RankList></RankList>
      </>
    );
  };
  return (
    <NavBar>
      {me ? (
        <Banner2>
          <TopNav>
            <LeftItem>
              <Logo>DeepData</Logo>
              {me ? myInfo() : ''}
            </LeftItem>
            <RightItem>
              <div className='item'>OpenAPI PJ</div>
              <div className='item'>Contact</div>
            </RightItem>
          </TopNav>
          {/* <Rank>{me ? likedRank() : ''}</Rank> */}
        </Banner2>
      ) : (
        <Banner1>
          <TopNav>
            <LeftItem>
              <Logo>DeepData</Logo>
            </LeftItem>
            <RightItem>
              <div className='item'>OpenAPI PJ</div>
              <div className='item'>Contact</div>
            </RightItem>
          </TopNav>
        </Banner1>
      )}
    </NavBar>
  );
};

export default Nav;
