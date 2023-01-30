import React from 'react';

const CreateButton = ({ list, type }) => {
  const createBtn = (eng, ko, i) => {
    return (
      <button key={eng} className={`${eng}_${i}`}>
        {ko}
      </button>
    );
  };

  if (type === 'state') {
    return (
      <div id='group'>
        {list.map((v, i) => {
          return createBtn(v.properties.CTP_ENG_NM, v.properties.CTP_KOR_NM, i);
        })}
      </div>
    );
  } else if (type === 'city') {
    return (
      <div id='group'>
        {list.map((v, i) => {
          return createBtn(v.properties.SIG_ENG_NM, v.properties.SIG_KOR_NM, i);
        })}
      </div>
    );
  }
};

export default CreateButton;
