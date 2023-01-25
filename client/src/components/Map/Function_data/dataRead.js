import { CNcity } from '../../../api/chungnam';
import axios from 'axios';

/**
 * 주소를 '시' 별로 구분하여 분류한다.
 * @param {*} state
 */
export const dataSet = (state, CnDivision) => {
  state.data.data.map((v) => {
    const city = CNcity[v['소재지'].slice(0, 3)];
    CnDivision[city].push(v);
    return 0;
  });
};

/**
 * 문자열 괄호 문자 제거 함수
 * @param {*} s
 * @returns
 */
export function removeParentheses(s) {
  let item;
  let stack = [];
  for (let x of s) {
    if (x === ')') {
      //여는괄호(자신의 짝)까지 pop
      while (stack.pop() !== '('); //'('까지 pop하고 거짓이 됨-> 반복문 중단
    } else stack.push(x); //닫는 괄호가 아닐 때는 push
  }
  //console.log(stack); //배열의 형태로 들어가있음 ['a', 'b', 'c']
  item = stack.join(''); //string으로 합쳐줌
  return item;
}

   /**
     * 기업정보 검색
     * @param {string} company
     * @param {string} address
     * @returns
     */
    export const searchCompany = async (company, address) => {
      try {
        console.log('search company: ', company);
        let newCompany = company;
        console.log('search newCompany: ', newCompany);
        const check = company.indexOf('㈜');
        if (check !== -1) {
          console.log('(주) 있음.');
          const test = newCompany.replace('㈜', '');
          newCompany = test;
          console.log('(주)제거: ', newCompany);
        }
        const search = await axios.get(
          process.env.REACT_APP_SEARCH_API + `${newCompany}`
        );
        //
        console.log('search: ', search.data.response.body.items.item);
        const item = search.data.response.body.items.item.find((v) => {
          const sItem = removeParentheses(v.enpBsadr.replace('충청남도 ', ''));
          return sItem.replace(/ /g, '') === address.replace(/ /g, '');
        });
        return item;
      } catch (error) {
        console.log(error);
      }
    };