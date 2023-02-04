import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import geojson from '../../api/TL_SCCO_SIG.json';
import koreaDo from '../../api/korea_do_data.json';
import koreaSi from '../../api/korea_si.json';

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

const Map = () => {
  const { kakao } = window;
  const { me, selectedState } = useSelector((state) => state.data);
  const { position, cityCompany, selectTown } = useSelector(
    (state) => state.mapControl
  );
  const dispatch = useDispatch();

  const [krMap, setKrMap] = useState(); // 카카오맵 저장
  const [customOverlay, setCustomOverlay] = useState(); // 카카오맵 저장

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
  // const [renderSwitch, setRenderSwitch] = useState(false);

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

  // let markers = []; // 생선된 마커를 담는다.
  const [companyMarkers, setCompanyMarker] = useState([]);
  // let info = []; // 생성된 infoWindow를 담는다.
  const [companyInfo, setCompanyInfo] = useState([]);

  let set = false;
  // 카카오맵 초기 셋팅
  useEffect(() => {
    console.log(set, lenSw);
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
          cityCompany
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

    // 출발지점 - 목적지점 line
    let polyline = new kakao.maps.Polyline({
      map: krMap,
      strokeWeight: 5,
      strokeColor: '#FF00FF',
      strokeOpacity: 0.8,
      strokeStyle: 'solid',
    });

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
        cityCompany
      );
    });

    // End 초기화

    // 폴리곤 클릭시 해당 지역으로 줌 하며, 생성되어 있는 폴리곤 제거한다.

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
    let SPmarker = new kakao.maps.Marker({ map: krMap, image: markerImage });
    let EPmarker = new kakao.maps.Marker({ map: krMap, image: markerImage });

    const $startPoint = document.querySelector('#startPoint');
    const $removePoint = document.querySelector('#removePoint');

    let spFlag = false;
    let startPointData = '';
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
        // console.log('SpSet');

        // 클릭한 위도, 경도 정보를 가져옵니다
        let latlng = mouseEvent.latLng;
        startPointData = latlng;

        // // 마커 위치를 클릭한 위치로 옮깁니다
        SPmarker.setPosition(latlng);
        SPmarker.setMap(krMap);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [krMap]);

  // 맵 변화 감지
  useEffect(() => {
    if (!position) {
      return;
    }
    krMap.setLevel(position.level);
    krMap.setCenter(position.center);
    // console.log('cityCompany변화', cityCompany);
  }, [position, cityCompany]);

  useEffect(() => {
    if (!(cityCompany && selectTown)) {
      return;
    }
    // if (info) {
    //   // console.log('info: ', info);
    //   for (let i = 0; i < info.length; i++) {
    //     info[i].close();
    //   }
    // }
    // companyInfo setCompanyInfo
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
      setCompanyInfo
    );
    console.log('marker: ', companyMarkers);
  }, [cityCompany, selectTown]);

  if (!(companyMarkers || companyInfo)) {
    return;
  }
  console.log(krMap);
  // 화면을 초기 값으로 초기화 한다.
  // const $mapRerender = document.querySelector('#mapRerender');

  // $mapRerender.addEventListener('click', function () {
  //   // setCenter();
  //   deletePolygon(liPolygons);
  //   deletePolygon(polygons);
  //   if (companyMarkers) {
  //     deleteMarker(companyMarkers, setCompanyMarker);
  //   }

  //   if (lenSw) {
  //     DoData.forEach((val) => {
  //       DoCoordinates = val.geometry.coordinates;
  //       DoName = val.properties.CTP_ENG_NM;
  //       stateDisplayArea(
  //         DoCoordinates,
  //         DoName,
  //         polygons,
  //         krMap,
  //         customOverlay,
  //         draggable,
  //         liPolygons,
  //         dispatch,
  //         selectedState,
  //         companyMarkers,
  //         companyInfo,
  //         cityCompany
  //       );
  //     });
  //     lenSw = false;
  //   }
  // });

  // function setCenter() {
  //   // 이동할 위도 경도 위치를 생성합니다
  //   var moveLatLon = new kakao.maps.LatLng(
  //     36.6017606568142,
  //     127.80702241209042
  //   );
  //   krMap.setLevel(13);
  //   // 지도 중심을 이동 시킵니다
  //   krMap.setCenter(moveLatLon);
  // }

  /**
   * 폴리곤을 클릭시 생성된 폴리곤을 모두 지우는 함수.
   * @param {*} polygons
   */
  const deletePolygon = (polygons) => {
    for (let i = 0; i < polygons.length; i++) {
      polygons[i].setMap(null);
    }
    polygons = [];
    lenSw = true;
  };

  const onResetHandle = () => {
    setRenderSwitch(true);
    console.log(set, lenSw);
  };

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
