import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import geojson from '../../api/TL_SCCO_SIG.json';
import koreaDo from '../../api/korea_do_data.json';
import koreaSi from '../../api/korea_si.json';
import { deletePolygon } from './Function_map/kakaoMapApi';
import EupMyeonDong from '../../api/HJD.json';

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
import { REMOVE_OVERLAY_SUCCESS } from '../../reducers/mapControl';

const Map = () => {
  const { kakao } = window;
  const { selectedState } = useSelector((state) => state.data);
  const { position, cityCompany, selectTown, countOverlay, tempCountOverlay } =
    useSelector((state) => state.mapControl);
  const dispatch = useDispatch();

  const [krMap, setKrMap] = useState(); // 카카오맵 저장
  const [customOverlay, setCustomOverlay] = useState(); // 카카오맵 저장

  // 출발지점 저장
  const [startPoint, setStartPoint] = useState();
  let SPmarker;
  let EPmarker;

  // 도, 특별시, 광역시
  let DoData = koreaDo.features; // 해당 구역 이름, 좌표 등
  let DoCoordinates = []; // 좌표 저장
  let DoName = ''; // 행정구 이름
  let DoKoName = '';

  // 시군구
  let data = geojson.features; // 해당 구역 이름, 좌표 등
  let coordinates = []; // 좌표 저장
  let name = ''; // 행정구 이름

  // 시군구
  let SiData = koreaSi.features; // 해당 구역 이름, 좌표 등
  let SiCoordinates = []; // 좌표 저장
  let SiName = ''; // 행정구 이름

  // 읍면동
  let EmdData = EupMyeonDong.features; // 해당 구역 이름, 좌표 등
  let EmdCoordinates = []; // 좌표 저장
  let EmdName = ''; // 읍면동 이름

  // 폴리곤 보관
  let polygons = [];
  let liPolygons = [];

  const [renderSwitch, setRenderSwitch] = useState(false);

  /**
   * 초기값 false (화면 버튼을 눌러도 동작하지 않게 설정)
   * 폴리곤 클릭시 true로 변경하여 화면 버튼을 활성화
   * 화면 버튼 클릭시 false로 스위치
   */
  let lenSw = false;

  // 데이터를 불러오는 작업이 중복 되지 않게 하는 flag변수
  // let flag = true;

  // 폴리곤 내에서 드래그를 막고자 하는 변수
  let draggable = true;

  const [companyMarkers, setCompanyMarker] = useState([]);

  const [companyInfo, setCompanyInfo] = useState([]);

  let set = false;
  // 카카오맵 초기 셋팅
  useEffect(() => {
    const container = document.getElementById('kakaoMap');
    const options = {
      center: new kakao.maps.LatLng(36.6017606568142, 127.80702241209042),
      level: 13,
    };
    if (renderSwitch) {
      console.log(set, lenSw);
      setKrMap(new kakao.maps.Map(container, options));
      setCustomOverlay(new kakao.maps.CustomOverlay({}));
      deletePolygon(liPolygons);
      deletePolygon(polygons);
      // if (companyMarkers) {
      //   deleteMarker(companyMarkers, setCompanyMarker);
      // }
      if (companyMarkers || companyInfo) {
        deleteMarker(companyMarkers, setCompanyMarker);
        deleteInfo(companyInfo, setCompanyInfo);
      }
      DoData.forEach((val) => {
        DoCoordinates = val.geometry.coordinates;
        DoName = val.properties.CTP_ENG_NM;
        stateDisplayArea(
          DoCoordinates,
          DoName,
          polygons,
          krMap,
          customOverlay,
          draggable,
          liPolygons,
          dispatch,
          selectedState,
          companyMarkers,
          companyInfo,
          cityCompany,
          startPoint,
          setStartPoint,
          countOverlay
        );
      });
      setRenderSwitch(false);
      return;
    }

    setKrMap(new kakao.maps.Map(container, options));
    setCustomOverlay(new kakao.maps.CustomOverlay({}));
  }, [renderSwitch]);

  // 카카오맵 셋팅
  useEffect(() => {
    if (!krMap) {
      return;
    }

    // 도 새성
    DoData.forEach((val) => {
      DoCoordinates = val.geometry.coordinates;
      DoName = val.properties.CTP_ENG_NM;
      stateDisplayArea(
        DoCoordinates,
        DoName,
        polygons,
        krMap,
        customOverlay,
        draggable,
        liPolygons,
        dispatch,
        selectedState,
        companyMarkers,
        companyInfo,
        cityCompany,
        startPoint,
        setStartPoint,
        countOverlay
      );
    });

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

    // EPmarker.setMap(null);
    SPmarker.setMap(null);

    const $startPoint = document.querySelector('#startPoint');
    const $removePoint = document.querySelector('#removePoint');

    let spFlag = false;
    // let startPointData;

    $startPoint.addEventListener('click', onChangeSpFlag);
    $removePoint.addEventListener('click', onRemovePoint);

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

    /**
     * 포인트 및 측정라인 제거
     */
    function onRemovePoint() {
      console.log('remove Point');
      polyline.setMap(null);
      SPmarker.setMap(null);
      EPmarker.setMap(null);
    }

    kakao.maps.event.addListener(krMap, 'click', function (mouseEvent) {
      console.log('event: ', spFlag);
      if (spFlag) {
        // 클릭한 위도, 경도 정보를 가져옵니다
        let latlng = mouseEvent.latLng;
        console.log(latlng);
        // startPointData = latlng;

        // // 마커 위치를 클릭한 위치로 옮깁니다
        SPmarker.setPosition(latlng);
        SPmarker.setMap(krMap);
        setStartPoint(latlng);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [krMap]);

  // 클러스터 생성 테스트
  useEffect(() => {
    if (!(countOverlay && cityCompany)) {
      return;
    }

    console.log(countOverlay);
    for (let i = 0; i < countOverlay.length; i++) {
      const divideCP = [];
      cityCompany.map((v) => {
        if (v['coAddr']['_text'].indexOf(countOverlay[i]['name']) !== -1) {
          divideCP.push(v);
        }
      });
      console.log('why: ', countOverlay[i]['coor']);
      let CountOverlay = new kakao.maps.CustomOverlay({});
      CountOverlay.setContent(`<div class="custom-count-oevrlay">${divideCP.length}</div>`);
      CountOverlay.setContent();
      CountOverlay.setPosition(countOverlay[i]['coor']);
      CountOverlay.setMap(krMap);
    }
  }, [countOverlay, cityCompany]);

  // 폴리곤 클릭 레벨 변경
  useEffect(() => {
    if (!position) {
      return;
    }
    krMap.setLevel(position.level);
    krMap.setCenter(position.center);
  }, [position, cityCompany]);

  useEffect(() => {
    if (tempCountOverlay.length > 0) {
      console.log(tempCountOverlay['CountOverlay']);
      for (let i = 0; i < tempCountOverlay.length; i++) {
        console.log(tempCountOverlay[i]['CountOverlay']);
        tempCountOverlay[i]['CountOverlay'].setMap(null);
      }
      dispatch({
        type: REMOVE_OVERLAY_SUCCESS,
      });
    }
    if (!(cityCompany && selectTown)) {
      return;
    }
    if (companyInfo) {
      deleteInfo(companyInfo, setCompanyInfo);
    }
    const divideCP = [];
    cityCompany.map((v) => {
      if (v['coAddr']['_text'].indexOf(selectTown.li) !== -1) {
        divideCP.push(v);
      }
    });
    // companyMarkers
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
      startPoint,
      krMap
    );
    console.log('marker: ', companyMarkers);
  }, [cityCompany, selectTown, startPoint, EPmarker, tempCountOverlay]);

  // end Map

  const onResetHandle = useCallback(() => {
    setRenderSwitch(true);
    console.log(set, lenSw);
  }, []);

  return (
    <MapW>
      <PointInfoWrapper>
        <div>
          <button id='startPoint' className='btnFade'>
            출발지점 지정
          </button>
          <button id='removePoint' className='btnFade'>
            포인트 초기화
          </button>
        </div>
        <div id='lineDistance'></div>
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
