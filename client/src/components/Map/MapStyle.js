import styled from 'styled-components';

// styled
export const MapW = styled.div`
  border: #ffb100 8px solid;
  border-radius: 10px;
  box-shadow: 0px 0px 12px 1px #555555
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
`;
export const ButtonWrapper = styled.div`
  #group {
    display: flex;
    flex-direction: column;
  }
  button {
    width: 100px;
    height: 31px;
    border: none;
    border-bottom: 2px #999 solid;
    background-color: #fff;
  }
`;
export const PointInfoWrapper = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffb100;
  border-bottom: 2px solid #000;

  button {
    display: block;
    position: relative;
    float: left;
    width: 120px;
    height: 40px;
    padding: 0;
    margin-left: 10px;
    font-weight: 600;
    text-align: center;
    color: #fff;
    border: none;
    border-radius: 5px;
    transition: all 0.2s;
    cursor: pointer;
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
  #lineDistance {
    background-color: #fff;
    width: 52%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    margin-right: 10px;
  }
`;
export const InfoWrapper = styled.div``;
// End styled
