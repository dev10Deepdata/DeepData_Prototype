import React, { useEffect } from 'react';
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
import { deleteMarker } from './Function_map/markerHandle';
import { useState } from 'react/cjs/react.production.min';

const Map = () => {
  const { kakao } = window;
  const { me, selectedState } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  // const [krMap, setKrMap] = useState(); // 카카오맵 저장

  // 데이터를 불러오는 작업이 중복 되지 않게 하는 flag변수
  let flag = true;

  console.log('1.map render');

  // // 카카오맵 초기 셋팅
  // useEffect(()=>{

  // },[])

  // 카카오맵 셋팅
  useEffect(() => {
    console.log('Map.js/useEffect()');
    const container = document.getElementById('kakaoMap');
    const options = {
      center: new kakao.maps.LatLng(36.6017606568142, 127.80702241209042),
      level: 13,
    };
    const map = new kakao.maps.Map(container, options);

    const customOverlay = new kakao.maps.CustomOverlay({});

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

    /**
     * 초기값 false (화면 버튼을 눌러도 동작하지 않게 설정)
     * 폴리곤 클릭시 true로 변경하여 화면 버튼을 활성화
     * 화면 버튼 클릭시 false로 스위치
     */
    let lenSw = false;

    // 출발지점 - 목적지점 line
    let polyline = new kakao.maps.Polyline({
      map: map,
      strokeWeight: 5,
      strokeColor: '#FF00FF',
      strokeOpacity: 0.8,
      strokeStyle: 'solid',
    });

    // 폴리곤 내에서 드래그를 막고자 하는 변수
    let draggable = true;

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

    let markers = []; // 생선된 마커를 담는다.
    let info = []; // 생성된 infoWindow를 담는다.

    // // 충청남도
    DoData.forEach((val) => {
      DoCoordinates = val.geometry.coordinates;
      DoName = val.properties.CTP_ENG_NM;
      stateDisplayArea(
        DoCoordinates,
        DoName,
        polygons,
        map,
        customOverlay,
        draggable,
        liPolygons,
        dispatch,
        selectedState,
        markers,
        info
      );
    });

    function setCenter() {
      // 이동할 위도 경도 위치를 생성합니다
      var moveLatLon = new kakao.maps.LatLng(
        36.6017606568142,
        127.80702241209042
      );
      map.setLevel(13, {
        animate: {
          duration: 50, //확대 애니메이션 시간
        },
      });
      // 지도 중심을 이동 시킵니다
      map.setCenter(moveLatLon);
    }

    // 화면을 초기 값으로 초기화 한다.
    const $mapRerender = document.querySelector('#mapRerender');
    $mapRerender.addEventListener('mousedown', function () {
      setCenter();
      deletePolygon(liPolygons);
      deletePolygon(polygons);

      if (lenSw) {
        DoData.forEach((val) => {
          DoCoordinates = val.geometry.coordinates;
          DoName = val.properties.CTP_ENG_NM;
          stateDisplayArea(
            DoCoordinates,
            DoName,
            polygons,
            map,
            customOverlay,
            draggable,
            liPolygons,
            dispatch
          );
        });
        deleteMarker(markers);
        lenSw = false;
      }
    });
    $mapRerender.addEventListener('mouseup', function () {
      setCenter();
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
    let SPmarker = new kakao.maps.Marker({ map: map, image: markerImage });
    let EPmarker = new kakao.maps.Marker({ map: map, image: markerImage });

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

    kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
      console.log('event: ', spFlag);
      if (spFlag) {
        // console.log('SpSet');

        // 클릭한 위도, 경도 정보를 가져옵니다
        let latlng = mouseEvent.latLng;
        startPointData = latlng;

        // // 마커 위치를 클릭한 위치로 옮깁니다
        SPmarker.setPosition(latlng);
        SPmarker.setMap(map);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <button id='mapRerender'>화면</button>
          <ButtonWrapper id='mapControl'></ButtonWrapper>
        </ButtonWrapper>
      </MapWrapper>
      <InfoWrapper id='info'></InfoWrapper>
    </MapW>
  );
};

export default Map;
