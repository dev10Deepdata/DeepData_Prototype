import React from 'react';
import styled from 'styled-components';

const BasicContainer = styled.div`
  width: 100%;
  select {
    border: none;
    border: 1px #000 solid;
    width: 100%;
    height: 40px;
    border-radius: 10px;
    text-align: center;
    margin-top: 5px;
    margin-bottom: 5px;
    cursor: pointer;
    @media screen and (max-width: 767px) {
      width: 90%;
    }
  }

  button {
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

const BasicInfo = ({ onChangeGender, onChangeAge }) => {
  return (
    <BasicContainer>
      <select type='gender' onChange={onChangeGender}>
        <option value='male'>남성</option>
        <option value='female'>여성</option>
      </select>
      <select type='age' onChange={onChangeAge}>
        <option value='10'>10대</option>
        <option value='20'>20대</option>
        <option value='30'>30대</option>
        <option value='40'>40대</option>
        <option value='50'>50대</option>
        <option value='60'>60대</option>
        <option value='70'>70대</option>
      </select>
      
    </BasicContainer>
  );
};

export default BasicInfo;
