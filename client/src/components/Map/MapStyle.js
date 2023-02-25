import styled from 'styled-components';

// styled
export const MapW = styled.div`
  border: #ffb100 8px solid;
  border-radius: 10px;
  box-shadow: 0px 0px 12px 1px #555555;
`;
export const MapWrapper = styled.div`
  width: 100%;
  background-color: #ffb100;
  display: flex;

  #kakaoMap {
    width: 90%;
    aspect-ratio: 1/1;
    border-bottom-left-radius: 10px;
  }
  .map-details-info {
    button {
      margin-right: 10px;
      margin-bottom: 10px;
    }
    padding: 10px;
    width: 350px;
    td {
      padding: 2px;
    }
  }
  .map-info {
    padding: 10px;
    width: 350px;
    button {
      margin-right: 10px;
      margin-bottom: 10px;
    }
    td {
      padding: 2px;
    }
  }
  .custom-count-oevrlay {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(22, 255, 0, 0.2);
    color: #243763;
  }
  .map-details-info {
    background-color: #f0eeed;
    table {
      background-color: #dddddd;
      tr {
        background-color: #fff;
      }
    }
  }
  #infoBtnGroup {
    button {
      background-color: #f2921d;
      border: none;
      cursor: pointer;
      border-radius: 10px;
      padding: 5px 10px;
      font-weight: 600;
      overflow: hidden;
    }
    a {
      text-decoration: none;
      color: #000;
    }
  }
`;
export const ButtonWrapper = styled.div`
  #mapControl {
    display: flex;
    flex-direction: column;
  }
  #group {
    display: flex;
    flex-direction: column;
  }
  button {
    font-family: Noto_Sans_Medium;
    cursor: pointer;
    width: 100px;
    height: 31px;
    border: none;
    border-bottom: 2px #999 solid;
    background-color: #fff;
  }
`;
export const PointInfoWrapper = styled.div`
  font-family: Noto_Sans_Bold;
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffb100;
  border-bottom: 2px solid #000;
  .btnWrapper {
    width: 27%;
  }
  button {
    font-family: Noto_Sans_Bold;
    display: block;
    position: relative;
    float: left;
    width: 100%;
    height: 65px;
    padding: 0;
    margin-left: 10px;
    font-weight: 600;
    text-align: center;
    color: #fff;
    border: none;
    transition: all 0.2s;
    cursor: pointer;
  }
  #startPoint {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  #removePoint {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  #startPoint.btnFade {
    background: #00ae68;
  }
  #startPoint.btnFade:hover {
    background: #21825b;
  }
  #startPoint.selection {
    background: #5dc8cd;
  }
  #startPoint.selection:hover {
    background: #01939a;
  }

  #removePoint {
    background: #a74982;
  }
  #removePoint.btnFade:hover {
    background: #6d184b;
  }
  .lineContainer {
    width: 70%;
  }
  #lineDistance {
    background-color: #fff;
    width: 70%;
    height: 130px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    margin-right: 10px;
    input {
      width: 95%;
      text-align: center;
      height: 55px;
      border: none;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      border-bottom: 2px #eeeeee solid;
    }
    .lineItem {
      display: flex;
      align-items: center;
    }
    .lineItemTime {
      width: 100px;
      height: 50px;
      border-bottom: 3px solid #eeeeee;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .lineTime {
      width: 95%;
      height: 55px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
        width: 40px;
        margin-right: 10px;
      }
      .walkIcon {
        height: 30px;
      }
      .cyclingIcon {
        height: 30px;
      }
      .carIcon {
        height: 60px;
      }
    }
  }
`;
export const InfoWrapper = styled.div``;
// End styled
