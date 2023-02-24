import React, { useState, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const SearchContainer = styled.div`
  margin: 5px 0px;
  width: 100%;
`;
const SearchInput = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  vertical-align: middle;
  input {
    width: 70%;
    height: 40px;
    padding: 0;
    text-align: center;
    border-radius: 10px;
    border: none;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25%;
    height: 40px;
    border-radius: 10px;
    border: none;
    background-color: #635985;
    cursor: pointer;
  }
`;
const Situation = styled.div`
  display: flex;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 10px;

  .myCompany {
    width: 50%;
    height: 40px;
    background-color: #fff;
    padding: 0;
    border: none;
    text-align: center;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #635985;
    height: 40px;
    width: 50%;

    cursor: pointer;
  }
`;
const TypingCompany = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 5px;
  height: ${(props) => (props.open ? '40px' : '0px')};
  overflow: ${(props) => (props.open ? 'none' : 'hidden')};
  input {
    width: 70%;
    height: 40px;
    border: none;
    text-align: center;
    padding: 0;
    border-radius: 10px;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: #635985;

    width: 25%;
    height: 40px;
    border-radius: 10px;
    border: none;
  }
`;
const SearchItem = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px #e2e2e2 solid;
  margin-bottom: 5px;
  font-size: 0.8rem;
  button {
    border: none;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    cursor: pointer;
    background-color: #635985;
  }
`;
const SearchList = styled.div`
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
  background-color: rgba(255, 255, 255, 0.4);
  .title {
    margin-bottom: 10px;
  }
`;

const SearchMyCompany = ({ onChangeCompany }) => {
  const [searchMyCompany, setSearchMyCompany] = useState('');
  const [myCompany, setMyCompany] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [open, setOpen] = useState(false);
  const handleCompany = useCallback((e) => {
    setSearchMyCompany(e.target.value);
  });
  const onClickSeach = async (searchMyCompany) => {
    console.log('검색회사: ', searchMyCompany);
    try {
      console.log(process.env.REACT_APP_SEARCH_API + `${searchMyCompany}`);
      const search = await axios.get(
        process.env.REACT_APP_SEARCH_API + `${searchMyCompany}`
      );
      console.log('search: ', search.data.response.body.items);
      setSearchList([...search.data.response.body.items.item]);
    } catch (error) {
      console.log(error);
    }
  };
  const displayCompanyName = (name) => {
    const $myCompany = document.querySelector('.myCompany');
    $myCompany.value = name;
  };
  const handleMyCompany = useCallback((e) => {
    setMyCompany(e.target.value);
  });
  const onClickOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <SearchContainer>
        <SearchInput>
          <input
            type='text'
            value={searchMyCompany}
            onChange={handleCompany}
            placeholder='재직중인 회사 이름을 적으세요.'
          />
          <button type='button' onClick={() => onClickSeach(searchMyCompany)}>
            기업 검색
          </button>
        </SearchInput>
        {searchList.length > 0 ? (
          <>
            <SearchList>
              <div className='title'>검색 결과</div>
              {searchList.map((v) => (
                <SearchItem value={`${v.corpNm}`}>
                  <div className='companyName'>{`${v.corpNm} 설립일: ${v.enpEstbDt}`}</div>
                  <button
                    type='button'
                    onClick={() => {
                      onChangeCompany(v.corpNm);
                      displayCompanyName(v.corpNm);
                    }}
                  >
                    선택
                  </button>
                </SearchItem>
              ))}
            </SearchList>
          </>
        ) : (
          ''
        )}
      </SearchContainer>

      <Situation>
        <input className='myCompany' disabled />
        <button type='button' onClick={onClickOpen}>
          검색결과에 없는 경우
        </button>
      </Situation>

      <TypingCompany open={open}>
        <input
          type='text'
          value={myCompany}
          onChange={handleMyCompany}
          placeholder='직접 입력하기'
        />
        <button
          type='button'
          onClick={() => {
            onChangeCompany(myCompany);
            displayCompanyName(myCompany);
          }}
        >
          확정
        </button>
      </TypingCompany>
    </>
  );
};

export default SearchMyCompany;
