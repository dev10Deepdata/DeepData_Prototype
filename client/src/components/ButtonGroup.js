import React from 'react';
import { city } from '../api/chungnam';
/**
 * 카카오맵을 컨트롤 하기 위한 버튼 지역별 버튼 생성
 * @param {*} param0
 * @returns
 */
const ButtonGroup = ({ code }) => {
  const createBtn = (city, i) => {
    return (
      <button key={i} className={`${code}_${i}`}>
        {city}
      </button>
    );
  };

  return (
    <>
      <div id='group'>
        {city.map((v, i) => {
          return createBtn(v, i, code);
        })}
      </div>
    </>
  );
};

export default ButtonGroup;
