import React from 'react';
import styled from 'styled-components';
import SearchMyCompany from './SearchMyCompany';

const AddInfoContainer = styled.div`
  width: 100%;
  button {
    background-color: #635985;
    border: none;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
  }
  button:hover {
    background-color: #393053;
    transition: all 0.35s;
  }
`;
const SelectInfo = styled.select`
  width: 100%;
  border: none;
  border-radius: 10px;
  height: 40px;
  text-align: center;
  margin: 5px 0px;
`;
const Line = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  border-bottom: 2px solid #e2e2e2;
`;
const AddInfo = ({ onChangeState, onChangeIndustry, onChangeCompany }) => {
  return (
    <AddInfoContainer>
      <Line />
      <SearchMyCompany onChangeCompany={onChangeCompany} />
      <SelectInfo type='state' onChange={onChangeState}>
        <option value=''>관심 지역을 선택하세요.</option>
        <option value='서울'>서울특별시</option>
        <option value='부산'>부산광역시</option>
        <option value='인천'>인천광역시</option>
        <option value='대구'>대구광역시</option>
        <option value='광주'>광주광역시</option>
        <option value='대전'>대전광역시</option>
        <option value='울산'>울산광역시</option>
        <option value='세종'>세종특별자치시</option>
        <option value='경기'>경기도</option>
        <option value='강원'>강원도</option>
        <option value='충북'>충청북도</option>
        <option value='충남'>충청남도</option>
        <option value='경북'>경상북도</option>
        <option value='경남'>경상남도</option>
        <option value='전북'>전라북도</option>
        <option value='전남'>전남</option>
        <option value='제주'>제주특별자치도</option>
      </SelectInfo>
      <SelectInfo type='state' onChange={onChangeIndustry}>
        <option value=''>관심 업종을 선택하세요.</option>
        <option value='농업,임업및어업'>농업, 임업 및 어업</option>
        <option value='광업'>광업</option>
        <option value='제조업'>제조업</option>
        <option value='전기,가스,증기및공기조절공급업'>
          전기, 가스, 증기 및 공기조절 공급업
        </option>
        <option value='수도,하수및폐기물처리,원료 재생업'>
          수도, 하수 및 폐기물 처리, 원료 재생업
        </option>
        <option value='건설업'>건설업</option>
        <option value='도매및소매업'>도매 및 소매업</option>
        <option value='운수및창고업'>운수 및 창고업</option>
        <option value='숙박및음식점업'>숙박 및 음식점업</option>
        <option value='정보통신업'>정보통신업</option>
        <option value='금융및보험업'>금융 및 보험업</option>
        <option value='부동산업'>부동산업</option>
        <option value='전문,과학및기술서비스업'>
          전문, 과학 및 기술 서비스업
        </option>
        <option value='사업시설관리,사업지원및임대서비스업'>
          사업시설 관리, 사업지원 및 임대 서비스업
        </option>
        <option value='공공행정,국방및사회보장행정'>
          공공 행정, 국방 및 사회보장 행정
        </option>
        <option value='교육서비스업'>교육서비스업</option>
        <option value='보건업및사회복지서비스업'>
          보건업 및 사회복지 서비스업
        </option>
        <option value='예술, 스포츠 및 여가관련 서비스업'>
          예술,스포츠및여가관련서비스업
        </option>
        <option value='협회및단체,수리및기타개인서비스업'>
          협회 및 단체, 수리 및 기타 개인 서비스업
        </option>
        <option value='가구내고용활동및달리분류되지않은자가소비생산활동'>
          가구 내 고용활동 및 달리 분류되지 않은 자가소비 생산활동
        </option>
        <option value='국제및외국기관'>국제 및 외국기관</option>
      </SelectInfo>
    </AddInfoContainer>
  );
};

export default AddInfo;
