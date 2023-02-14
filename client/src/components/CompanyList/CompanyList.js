import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import DataLoading from './DataLoading';
import ItemCompany from './ItemCompany';
import WaitingForm from './WaitingForm';

const CompanyListWrapper = styled.div`
  border-radius: 10px;
  box-shadow: 0px 0px 12px 1px #555555;
  overflow: hidden;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  /* border: 2px solid #e2e2e2; */
  border-bottom: 2px solid #e2e2e2;

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
  /* border: 2px solid #e2e2e2; */
  /* border-top: none; */
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;
const Pagination = styled.div`
  display: flex;
  min-width: 200px;
  align-items: center;
  justify-content: space-between;
  .moveBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0eeed;
    width: 25px;
    height: 25px;
    border-radius: 3px;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
  }
  .num {
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 10px;
    padding-right: 10px;
    background-color: #f0eeed;
    margin-left: 5px;
    margin-right: 5px;
    cursor: pointer;
  }
  .current {
    font-weight: 600;
    color: #3f979b;
  }
`;

const CompanyList = () => {
  const { cityCompany, loadCompanyDataLoading } = useSelector(
    (state) => state.mapControl
  );

  const pageRange = 10; // 화면에 나타날 페이지 갯수
  const totalItem = cityCompany ? cityCompany.length : ''; // 총 데이터의 갯수
  const limitItem = 10; // 한 페이지 당 나타낼 데이터의 갯수
  const totalPage = Math.ceil(totalItem / limitItem); // 총 페이지
  const totalGroup = Math.ceil(totalPage / pageRange);

  const [page, setPage] = useState(1); // 현재 페이지
  const [pageGroup, setPageGroup] = useState(Math.ceil(page / pageRange));
  const [firstNumber, setFirstNumber] = useState(1); // 페이지네이션 시작 숫자
  const [lastNumber, setLastNumber] = useState(); // 페이지네이션 마지막 숫자
  const [groupArr, setGroupArr] = useState([]); // 현재 페이지의 페이지네이션

  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    // 마지막 숫자 구하기
    let last = pageGroup * pageRange;
    if (last > totalPage) {
      last = totalPage;
      setLastNumber(totalPage);
    } else {
      setLastNumber(last);
    }
    // 첫번째 숫자 구하기
    let first = last - (pageRange - 1);
    if (first < 10) {
      first = 1;
    } else {
      setFirstNumber(first);
    }
    // 페이지 그룹 배열
    let arr = [];
    for (let i = first; i <= last; i++) {
      arr.push(i);
    }
    setGroupArr(arr);
  }, [cityCompany, firstNumber, lastNumber, pageGroup, totalPage]);

  useEffect(() => {
    if (!cityCompany) {
      return;
    }
    let startNum;
    if (page === 1) {
      startNum = 0;
    } else {
      startNum = (page - 1) * 10 + 1;
    }
    const currnetList = cityCompany.slice(startNum, startNum + 10);
    setCurrentItems(currnetList);
  }, [cityCompany, firstNumber, page]);

  // 렌더링시 첫 번째 페이지 하이라이트
  useEffect(() => {
    let currnetList = document.querySelectorAll('.num');
    if (currnetList.length > 0) {
      currnetList[0].classList.add('current');
      setPage(parseInt(currnetList[0].innerText));
    }
  }, [groupArr]);

  // 현재 페이지 하이라이트
  const onClickPagination = (current, e) => {
    let currnetList = document.querySelectorAll('.num');
    for (let i = 0; i < currnetList.length; i++) {
      currnetList[i].classList.remove('current');
    }
    e.target.classList.add('current');
    setPage(current);
  };

  const onClickPageMove = (e) => {
    if (e.target.outerText === '<') {
      if (pageGroup !== 1) {
        setPageGroup(pageGroup - 1);
      }
    } else if (e.target.outerText === '>') {
      if (pageGroup !== totalGroup) {
        setPageGroup(pageGroup + 1);
      }
    }
  };

  return (
    <CompanyListWrapper>
      <Header>
        <div className='title'>기업정보</div>
        <div className='total'>{`총 ${
          cityCompany ? cityCompany.length : 0
        }건`}</div>
      </Header>

      {cityCompany ? (
        <ContentWrapper>
          {loadCompanyDataLoading ? (
            <DataLoading />
          ) : (
            <ItemCompany currentItems={currentItems} />
          )}
          <ContentBottom>
            <Pagination>
              <div className='moveBtn moveForward' onClick={onClickPageMove}>
                {'<'}
              </div>
              {groupArr.map((v, i) => (
                <div
                  className='num'
                  key={`${v}_${i}`}
                  onClick={(e) => onClickPagination(v, e)}
                >
                  {v}
                </div>
              ))}
              <div className='moveBtn moveBack' onClick={onClickPageMove}>
                {'>'}
              </div>
            </Pagination>
          </ContentBottom>
        </ContentWrapper>
      ) : loadCompanyDataLoading ? (
        <DataLoading />
      ) : (
        <WaitingForm />
      )}
    </CompanyListWrapper>
  );
};

export default CompanyList;
