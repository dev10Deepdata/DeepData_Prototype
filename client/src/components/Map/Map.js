import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import koreaDo from '../../api/korea_do_data.json';
import { deletePolygon } from './Function_map/kakaoMapApi';
import {
  MapW,
  MapWrapper,
  ButtonWrapper,
  PointInfoWrapper,
  InfoWrapper,
} from './MapStyle';
import { stateDisplayArea } from './Function_map/displayArea';
import {
  createMarker,
  deleteInfo,
  deleteMarker,
} from './Function_map/markerHandle';
import {
  CREATE_CUSTOM_COMPANY_OVERLAY_SUCCESS,
  REMOVE_COMPANY_DATA_REQUEST,
  REMOVE_OVERLAY_SUCCESS,
} from '../../reducers/mapControl';
import car from '../../utils/img/car.png';
import cycling from '../../utils/img/cycling.png';
import walk from '../../utils/img/walk.png';
const Map = () => {
  const { kakao } = window;
  const {
    position,
    cityCompany,
    selectTown,
    countOverlay,
    tempCountOverlay,
    removeOverlay,
    customCountOverlay,
  } = useSelector((state) => state.mapControl);
  const dispatch = useDispatch();

  const [krMap, setKrMap] = useState(); // 카카오맵 저장

  // 출발지점 저장
  const [startPoint, setStartPoint] = useState([]);
  let SPmarker;

  // 폴리곤 보관
  let polygons = [];
  let liPolygons = [];

  const [renderSwitch, setRenderSwitch] = useState(true); // 첫 렌더링시 동작 할 수 있게
  const [companyMarkers, setCompanyMarker] = useState([]);
  const [companyInfo, setCompanyInfo] = useState([]);

  // 카카오맵 초기 셋팅
  useEffect(() => {
    if (!renderSwitch) {
      return;
    }

    const container = document.getElementById('kakaoMap');
    const options = {
      center: new kakao.maps.LatLng(36.6017606568142, 127.80702241209042),
      level: 13,
    };
    if (krMap) {
      if (liPolygons || polygons) {
        // 폴리곤 초기화
        deletePolygon(liPolygons);
        deletePolygon(polygons);
      }
      if (companyMarkers || companyInfo) {
        // 인포창, 마커 초기화
        deleteMarker(companyMarkers, setCompanyMarker);
        deleteInfo(companyInfo, setCompanyInfo);
      }
      if (customCountOverlay.length > 0) {
        // 오버레이 초기화
        for (let i = 0; i < customCountOverlay.length; i++) {
          // console.log(customCountOverlay[i]);
          customCountOverlay[i].setMap(null);
        }
        dispatch({
          type: REMOVE_OVERLAY_SUCCESS,
        });
      }
      if (cityCompany) {
        dispatch({
          type: REMOVE_COMPANY_DATA_REQUEST,
        });
      }
      let DoData = koreaDo.features; // 해당 구역 이름, 좌표 등
      DoData.forEach((val) => {
        // 도, 특별시, 광역시
        let DoCoordinates = val.geometry.coordinates;
        let DoName = val.properties.CTP_ENG_NM;
        let KoName = val.properties.CTP_KOR_NM;
        stateDisplayArea(
          DoCoordinates,
          DoName,
          KoName,
          polygons,
          krMap,
          liPolygons,
          dispatch,
          companyInfo
        );
      });
      setRenderSwitch(false);
      return;
    }
    setKrMap(new kakao.maps.Map(container, options));
  }, [renderSwitch, krMap]);

  // 출발지 - 목적지 코드 수정 필요
  useEffect(() => {
    if (!krMap) {
      return;
    }
    // 출발지점 - 목적지점 line
    let polyline = new kakao.maps.Polyline({
      map: krMap,
      strokeWeight: 5,
      strokeColor: '#FF00FF',
      strokeOpacity: 0.8,
      strokeStyle: 'solid',
    });
    // 선 생성 및 거리 측정
    // 출발지점 생성
    // 출발지점 마커 이미지 정의
    var imageSrc = './img/SPmarker.png', // 마커이미지의 주소입니다
      imageSize = new kakao.maps.Size(22, 36), // 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(10, 39) };
    var markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );
    // 마커 정의

    SPmarker = new kakao.maps.Marker({ map: krMap, image: markerImage });

    SPmarker.setMap(null);

    const $startPoint = document.querySelector('#startPoint');
    // const $removePoint = document.querySelector('#removePoint');

    let spFlag = false;
    // let startPointData;

    $startPoint.addEventListener('click', onChangeSpFlag);
    // $removePoint.addEventListener('click', onRemovePoint);

    function onChangeSpFlag() {
      spFlag = !spFlag;
      console.log(spFlag);
      if (spFlag === true) {
        $startPoint.textContent = '출발지점 확정';
        $startPoint.classList.replace('btnFade', 'selection');
      } else {
        $startPoint.textContent = '출발지점 재지정';
        $startPoint.classList.replace('selection', 'btnFade');
      }
    }

    // /**
    //  * 포인트 및 측정라인 제거
    //  */
    // function onRemovePoint() {
    //   console.log('remove Point');
    //   polyline.setMap(null);
    //   SPmarker.setMap(null);
    //   console.log(EPmarker);
    //   // EPmarker.setMap(null);
    //   // setEPMarker(null);
    // }

    kakao.maps.event.addListener(krMap, 'click', function (mouseEvent) {
      if (spFlag) {
        // 클릭한 위도, 경도 정보를 가져옵니다
        let latlng = mouseEvent.latLng;
        console.log(latlng);
        // 마커 위치를 클릭한 위치로 옮깁니다
        SPmarker.setPosition(latlng);
        SPmarker.setMap(krMap);
        setStartPoint(latlng);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [krMap]);

  // useEffect(() => {
  //   const $removePoint = document.querySelector('#removePoint');
  //   $removePoint.addEventListener('click', onRemovePoint);
  //   /**
  //    * 포인트 및 측정라인 제거
  //    */
  //   function onRemovePoint() {
  //     console.log('remove Point');
  //     // polyline.setMap(null);
  //     SPmarker.setMap(null);
  //     console.log(EPmarker);
  //     EPmarker.setMap(null);
  //     setEPMarker(null);
  //   }
  // }, [SPmarker, EPmarker]);

  // 클러스터 생성 테스트 // 수정 필요
  useEffect(() => {
    if (!(countOverlay && cityCompany)) {
      return;
    }
    // console.log('cityCompany', cityCompany);
    for (let i = 0; i < countOverlay.length; i++) {
      const divideCP = [];
      cityCompany.map((v) => {
        try {
          // console.log('v', v['coAddr']['_text']);
          if (v['coAddr']['_text'].indexOf(countOverlay[i]['name']) !== -1) {
            divideCP.push(v);
          }
        } catch (error) {
          console.log('no address');
        }
      });
      if (divideCP.length !== 0) {
        let CountOverlay = new kakao.maps.CustomOverlay({});
        CountOverlay.setContent(
          `<div class="custom-count-oevrlay">${divideCP.length}</div>`
        );
        CountOverlay.setContent();
        CountOverlay.setPosition(countOverlay[i]['coor']);
        CountOverlay.setMap(krMap);
        dispatch({
          type: CREATE_CUSTOM_COMPANY_OVERLAY_SUCCESS,
          data: CountOverlay,
        });
      }
    }
  }, [countOverlay, cityCompany, dispatch]);

  // 폴리곤 클릭 레벨 변경
  useEffect(() => {
    if (!position) {
      return;
    }
    krMap.setLevel(position.level);
    krMap.setCenter(position.center);
  }, [position]);

  useEffect(() => {
    if (!(cityCompany && selectTown)) {
      return;
    }
    if (companyInfo) {
      deleteInfo(companyInfo, setCompanyInfo);
    }
    const divideCP = [];
    cityCompany.map((v) => {
      if (
        (v['coAddr'] ? v['coAddr']['_text'].indexOf(selectTown.li) : '') !== -1
      ) {
        divideCP.push(v);
      }
    });
    if (companyMarkers) {
      deleteMarker(companyMarkers, setCompanyMarker);
    }
    createMarker(
      divideCP,
      krMap,
      companyMarkers,
      setCompanyMarker,
      companyInfo,
      setCompanyInfo,
      startPoint
    );
    console.log('marker: ', companyMarkers);
  }, [cityCompany, selectTown, startPoint]);

  // 기업카운터 제거
  useEffect(() => {
    if (removeOverlay) {
      console.log(customCountOverlay);
      // console.log(tempCountOverlay['CountOverlay']);
      for (let i = 0; i < customCountOverlay.length; i++) {
        console.log(customCountOverlay[i]);
        customCountOverlay[i].setMap(null);
      }
      dispatch({
        type: REMOVE_OVERLAY_SUCCESS,
      });
    }
  }, [tempCountOverlay, customCountOverlay, removeOverlay, dispatch]);
  // end Map

  const onResetHandle = useCallback(() => {
    setKrMap(null);
    setRenderSwitch(true);
  }, []);

  return (
    <MapW>
      <PointInfoWrapper>
        <div className='btnWrapper'>
          <button id='startPoint' className='btnFade'>
            출발지점 지정
          </button>
          <button id='removePoint' className='btnFade'>
            포인트 초기화
          </button>
        </div>
        <div id='lineDistance'>
          <input
            className='distance'
            type='text'
            placeholder='목적지를 생성시 거리를 측정합니다.'
            disabled
          />
          <div className='lineTime'>
            <div className='lineItem'>
              <img src={walk} alt='walk' className='walkIcon' />
              <div className='lineItemTime' id='walk'></div>
            </div>
            <div className='lineItem'>
              <img src={cycling} alt='cycling' className='cyclingIcon' />
              <div className='lineItemTime' id='cycling'></div>
            </div>
            <div className='lineItem'>
              <img src={car} alt='car' className='carIcon' />
              <div className='lineItemTime' id='car'></div>
            </div>
          </div>
        </div>
      </PointInfoWrapper>
      <MapWrapper>
        <div id='kakaoMap'></div>
        <ButtonWrapper>
          <button id='mapRerender' onClick={onResetHandle}>
            화면
          </button>
          <ButtonWrapper id='mapControl'></ButtonWrapper>
        </ButtonWrapper>
      </MapWrapper>
      <InfoWrapper id='info'></InfoWrapper>
    </MapW>
  );
};

export default Map;
