/**
 * 정보에 따른 콘텐츠 내용 정의
 * @param {object} v
 * @returns
 */
const createContent = async (v) => {
  const content = `
        <div class='map-details-info'>
          <div id="infoBtnGroup">
            <button id="btnClick">Interest</button>
            <a href="https://www.google.com/search?q=${v.coNm._text}" target="_blank" >
              <button id="btnClick">Search</button>
            </a>
          </div>
          <table>
            <tr>
              <td>업체명</td>
              <td>${v.coNm._text}</td>
            </tr>
            <tr>
              <td>대표자</td>
              <td>${v.reperNm._text}</td>
            </tr>
            <tr>
              <td>등록연도</td>
              <td>${v.reperNm._text}</td>
            </tr>
            <tr>
              <td>전화번호</td>
              <td>${v.coTelNo._text}</td>
            </tr>
            <tr>
              <td>소재지</td>
              <td>${v.coAddr._text}</td>
            </tr>
            <tr>
              <td>주생산품</td>
              <td>${v.coMainProd._text}</td>
            </tr>
            <tr>
              <td>사업자등록번호</td>
              <td>${v.busiNo._text}</td>
            </tr>
            <tr>
              <td>선정연도</td>
              <td>${v.selYear._text}</td>
            </tr>
          </table>
        </div>
        `;

  return content;
};

export default createContent;
