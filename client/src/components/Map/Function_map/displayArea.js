import react from 'react';
import koreaSi from '../../../api/korea_si.json';
import cityCode from '../../../api/city.json';
import { deletePolygon, pointCentroid } from './kakaoMapApi';
import HJD from '../../../api/HJDL.json';

import {
  CREATE_COMPANY_MARKER_REQUEST,
  CREATE_COMPANY_OVERLAY_REQUEST,
  LOAD_COMPANY_DATA_REQUEST,
  REMOVE_COMPANY_OVERLAY_REQUEST,
  SET_POSITION_REQUEST,
} from '../../../reducers/mapControl';

const { kakao } = window;

export const stateDisplayArea = (
  coordinates,
  name,
  koName,
  polygons,
  map,
  liPolygons,
  dispatch,
  info
) => {
  let path = [];
  let points = [];
  coordinates.forEach((v) => {
    let tempPath = [];
    let tempPoint = [];
    v.forEach((coordinate) => {
      let point = {};
      point.x = coordinate[1];
      point.y = coordinate[0];
      tempPoint.push(point);
      tempPath.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));
    });
    points.push(tempPoint);
    path.push(tempPath);
  });

  // 구역 경계 생성
  let polygon;
  polygon = new kakao.maps.Polygon({
    map: map,
    path: path, // 그려질 다각형의 좌표 배열입니다
    strokeWeight: 2, // 선의 두께입니다
    strokeColor: '#004c80', // 선의 색깔입니다
    strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: 'solid', // 선의 스타일입니다
    fillColor: '#fff', // 채우기 색깔입니다
    fillOpacity: 0.4, // 채우기 불투명도 입니다
  });

  polygons.push(polygon);

  // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다
  kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
    polygon.setOptions({ fillColor: '#09f' });
  });

  // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
  kakao.maps.event.addListener(polygon, 'mouseout', function () {
    polygon.setOptions({ fillColor: '#fff' });
  });

  let siData = koreaSi.features;

  kakao.maps.event.addListener(polygon, 'click', function (mouseEvent) {
    switch (name) {
      case 'Gangwon-do':
        setPositionCenter(
          11,
          new kakao.maps.LatLng(37.73919895548271, 128.22828117457084),
          dispatch
        );
        break;
      case 'Gyeonggi-do':
        setPositionCenter(
          11,
          new kakao.maps.LatLng(37.53757927947221, 127.20134382044043),
          dispatch
        );
        break;
      case 'Gyeongsangnam-do':
        setPositionCenter(
          11,
          new kakao.maps.LatLng(35.283006157310886, 128.33919530955006),
          dispatch
        );
        break;
      case 'Gyeongsangbuk-do':
        setPositionCenter(
          11,
          new kakao.maps.LatLng(36.25873330451512, 128.85702005272682),
          dispatch
        );
        break;
      case 'Gwangju':
        setPositionCenter(
          9,
          new kakao.maps.LatLng(35.14322929166207, 126.85227509851431),
          dispatch
        );
        break;
      case 'Daegu':
        setPositionCenter(
          9,
          new kakao.maps.LatLng(35.83491559340961, 128.58213935896225),
          dispatch
        );
        break;
      case 'Daejeon':
        setPositionCenter(
          9,
          new kakao.maps.LatLng(36.32269483677606, 127.38968701671737),
          dispatch
        );
        break;
      case 'Busan':
        setPositionCenter(
          9,
          new kakao.maps.LatLng(35.20262044191565, 129.0195029126348),
          dispatch
        );
        break;
      case 'Seoul':
        setPositionCenter(
          9,
          new kakao.maps.LatLng(37.55300422304861, 127.01206388620648),
          dispatch
        );
        break;
      case 'Sejong-si':
        setPositionCenter(
          9,
          new kakao.maps.LatLng(36.584391383316586, 127.2207973037805),
          dispatch
        );
        break;
      case 'Ulsan':
        setPositionCenter(
          9,
          new kakao.maps.LatLng(35.54565177650688, 129.23870238065314),
          dispatch
        );
        break;
      case 'Incheon':
        setPositionCenter(
          10,
          new kakao.maps.LatLng(37.50133410083853, 126.5321865078648),
          dispatch
        );
        break;
      case 'Jellanam-do':
        setPositionCenter(
          11,
          new kakao.maps.LatLng(34.914873311403966, 127.01096488698131),
          dispatch
        );
        break;
      case 'Jeollabuk-do':
        setPositionCenter(
          11,
          new kakao.maps.LatLng(35.68316104761558, 127.14398551596905),
          dispatch
        );
        break;
      case 'Jeju-do':
        setPositionCenter(
          10,
          new kakao.maps.LatLng(33.37008097412234, 126.54587022000568),
          dispatch
        );
        break;
      case 'Chungcheongnam-do':
        setPositionCenter(
          11,
          new kakao.maps.LatLng(36.53450947749846, 126.87683044222051),
          dispatch
        );
        break;
      case 'Chungcheongbuk-do':
        setPositionCenter(
          11,
          new kakao.maps.LatLng(36.75755940408185, 127.74952230420188),
          dispatch
        );
        break;
      default:
        break;
    }

    deletePolygon(polygons);
    console.log('name', koName);

    let selectCity = siData.filter((city) => city.properties.State === name);
    let cityCoordinates;
    let cityName;

    let stateCode = cityCode.cityCode.filter((v) => v.city_ko === koName);
    let region = stateCode[0]['code'];
    console.log('code: ', stateCode[0].code);
    dispatch({
      type: LOAD_COMPANY_DATA_REQUEST,
      data: {
        region,
      },
    });

    selectCity.forEach((city) => {
      cityCoordinates = city.geometry.coordinates;
      cityName = city.properties.SIG_KOR_NM;
      cityDisplayArea(
        cityCoordinates,
        cityName,
        polygons,
        map,
        liPolygons,
        dispatch,
        info
      );
    });
  });
};

export async function cityDisplayArea(
  coordinates,
  name,
  polygons,
  map,
  liPolygons,
  dispatch,
  info
) {
  let path = [];
  let points = [];

  // code 추출
  let code;
  cityCode.cityCode.map((v) =>
    v.city_ko.indexOf(name) !== -1 ? (code = v.code) : ''
  );

  coordinates.forEach((v) => {
    let tempPath = [];
    let tempPoint = [];
    v.forEach((coordinate) => {
      let point = {};
      point.x = coordinate[1];
      point.y = coordinate[0];
      tempPoint.push(point);
      tempPath.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));
    });
    points.push(tempPoint);
    path.push(tempPath);
  });
  // 구역 경계 생성
  let polygon;

  polygon = new kakao.maps.Polygon({
    map: map,
    path: path, // 그려질 다각형의 좌표 배열입니다
    strokeWeight: 2, // 선의 두께입니다
    strokeColor: '#004c80', // 선의 색깔입니다
    strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: 'solid', // 선의 스타일입니다
    fillColor: '#fff', // 채우기 색깔입니다
    fillOpacity: 0.4, // 채우기 불투명도 입니다
  });

  polygons.push(polygon);

  // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다
  kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
    polygon.setOptions({ fillColor: '#09f' });
  });

  // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
  kakao.maps.event.addListener(polygon, 'mouseout', function () {
    polygon.setOptions({ fillColor: '#fff' });
    // customOverlay.setMap(null);
  });

  const centerCoor = pointCentroid(points);

  kakao.maps.event.addListener(polygon, 'click', async function (mouseEvent) {
    let region = code;
    dispatch({
      type: LOAD_COMPANY_DATA_REQUEST,
      data: {
        region,
      },
    });
    dispatch({
      type: REMOVE_COMPANY_OVERLAY_REQUEST,
    });

    let HjdData = HJD.features;
    let HjdCoordinates = [];
    let HjdName = '';

    deletePolygon(liPolygons);

    setPositionCenter(10, centerCoor, dispatch);

    // 읍면동 생성
    HjdData.forEach((val) => {
      if (val.properties['sggnm'] === name) {
        HjdCoordinates = val.geometry.coordinates[0];
        HjdName = val.properties['temp'];
        townDisplayArea(
          HjdCoordinates,
          HjdName,
          liPolygons,
          map,
          dispatch,
          info
        );
      }
    });

    console.log('polygons', polygons);
    polygons.map((v) => {
      v.setOptions({
        strokeColor: '#e2e2e2',
        strokeOpacity: 0.7,
        fillOpacity: 0.1,
      });
      return 0;
    });
  });
}

export function townDisplayArea(
  coordinates,
  name,
  liPolygons,
  map,
  dispatch,
  info
) {
  let path = [];
  let points = [];

  coordinates.forEach((v) => {
    let tempPath = [];
    let tempPoint = [];
    v.forEach((coordinate) => {
      let point = {};
      point.x = coordinate[1];
      point.y = coordinate[0];
      tempPoint.push(point);
      tempPath.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));
    });
    points.push(tempPoint);
    path.push(tempPath);
  });
  // 구역 경계 생성
  let polygon;
  polygon = new kakao.maps.Polygon({
    map: map,
    path: path, // 그려질 다각형의 좌표 배열입니다
    strokeWeight: 2, // 선의 두께입니다
    strokeColor: '#54B435', // 선의 색깔입니다
    strokeOpacity: 0.9, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: 'solid', // 선의 스타일입니다
    fillColor: '#CDE990', // 채우기 색깔입니다
    fillOpacity: 0.2, // 채우기 불투명도 입니다
  });
  liPolygons.push(polygon);
  const liCenterCoor = pointCentroid(points); // 리 폴리곤의 중앙 좌표 정의

  dispatch({
    type: CREATE_COMPANY_OVERLAY_REQUEST,
    data: {
      name: name,
      coor: liCenterCoor,
    },
  });

  // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다
  kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
    polygon.setOptions({ fillColor: '#09f' });
  });
  // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
  kakao.maps.event.addListener(polygon, 'mouseout', function () {
    polygon.setOptions({ fillColor: '#CDE990' });
  });

  kakao.maps.event.addListener(polygon, 'click', function (mouseEvent) {
    // 현재 열려 있는 인포창 닫기
    if (info) {
      for (let i = 0; i < info.length; i++) {
        info[i].close();
      }
    }

    dispatch({
      type: CREATE_COMPANY_MARKER_REQUEST,
      data: {
        li: name,
      },
    });
    dispatch({
      type: REMOVE_COMPANY_OVERLAY_REQUEST,
    });
    setPositionCenter(9, liCenterCoor, dispatch);
  });
}

function setPositionCenter(level, coor, dispatch) {
  dispatch({
    type: SET_POSITION_REQUEST,
    data: {
      level: level,
      center: coor,
    },
  });
}
