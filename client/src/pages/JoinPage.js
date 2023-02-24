/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { JOIN_REQUEST } from '../reducers/data';
import AddInfo from '../components/UserInformation/AddInfo';
import BasicInfo from '../components/UserInformation/BasicInfo';

// styled
const Dummy = styled.div`
  height: 200px;
`;
const Layout = styled.div`
  text-align: center;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
`;
const Wrapper = styled.div`
  width: 50%;
  margin-top: 40px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 20px;

  h1 {
    color: #fff;
    font-family: Righteous;
    margin-top: 50px;
  }
  p {
    color: #a3c7d6;
    font-family: Hind_Siliguri_Light;
    margin-bottom: 50px;
  }
  @media screen and (max-width: 767px) {
    width: 90%;
  }
  form {
    width: 65%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
  }
  .Submit {
    border: none;
    color: #fff;
    font-size: 1rem;
    font-family: Righteous;
    background-color: #00337c;
    border-radius: 10px;
    border-bottom: 1px #000 solid;
    width: 100%;
    height: 40px;
    margin-top: 15px;
    margin-bottom: 5px;
    cursor: pointer;
    @media screen and (max-width: 767px) {
      width: 90%;
    }
  }
`;
const AddDisplay = styled.div`
  margin-right: auto;
  margin-top: 2px;
  border: none;
  border-radius: 6px;
  width: 120px;
  height: 25px;
  background-color: #434242;
  color: #fff;
  font-size: 0.7rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  :hover {
    background-color: #222222;
    color: #fff;
    transition: all 0.35s;
  }
`;
// End styled

/**
 * 기본 인적사항 작성 하여 store 및 db에 데이터 저장하는 페이지
 * @returns
 */
const JoinPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { me } = useSelector((state) => state.data);
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('10');
  const [state, setState] = useState('');
  const [industry, setindustry] = useState('');
  const [company, setCompany] = useState('');

  const [display, setDisplay] = useState(false);
  const onChangeDisplay = (display) => setDisplay(!display);

  const onChangeAge = useCallback((e) => {
    setAge(e.target.value);
  });
  const onChangeGender = useCallback((e) => {
    setGender(e.target.value);
  });
  const onChangeState = useCallback((e) => {
    setState(e.target.value);
  });
  const onChangeIndustry = useCallback((e) => {
    setindustry(e.target.value);
  });
  const onChangeCompany = useCallback((company) => {
    setCompany(company);
  });

  // store에 me가 담겨있으면 메인페이지로 이동
  useEffect(() => {
    if (me) {
      navigate('/main');
    }
  }, [me, navigate]);

  /**
   * submit btn 클릭시 인적사항을 DB 및 store에 저장
   */
  const onSubmitForm = useCallback(
    (e) => {
      console.log('gender', gender);
      console.log('age', age);
      console.log('state', state);
      console.log('industry', industry);
      console.log('company', company);
      e.preventDefault();
      dispatch({
        type: JOIN_REQUEST,
        data: {
          age,
          gender,
        },
      });
    },
    [gender, age, state, industry, company, dispatch]
  );
  return (
    <Dummy>
      <Layout>
        <Wrapper>
          <h1>DeepData</h1>
          <form onSubmit={onSubmitForm}>
            <BasicInfo
              onChangeGender={onChangeGender}
              onChangeAge={onChangeAge}
            />
            <AddDisplay onClick={() => onChangeDisplay(display)}>
              추가 정보 입력하기
            </AddDisplay>
            {display ? (
              <AddInfo
                onChangeState={onChangeState}
                onChangeIndustry={onChangeIndustry}
                onChangeCompany={onChangeCompany}
              />
            ) : (
              ''
            )}
            <button className='Submit' type='submit'>
              Go!
            </button>
          </form>
          <p>Hello, Enter your information and Proceed.</p>
        </Wrapper>
      </Layout>
    </Dummy>
  );
};

export default JoinPage;
