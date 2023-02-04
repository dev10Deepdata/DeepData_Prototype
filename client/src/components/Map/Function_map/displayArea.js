import koreaSi from '../../../api/korea_si.json';
import cityCode from '../../../api/city.json';
import axios from 'axios';

import { deletePolygon, pointCentroid } from './kakaoMapApi';
import HJD from '../../../api/HJDL.json';
import {
  LOAD_COMPANY_DATA_REQUEST,
  LOAD_WK_DATA_REQUEST,
} from '../../../reducers/data';
import { createMarker, deleteMarker } from './markerHandle';
import { SET_POSITION_REQUEST } from '../../../reducers/mapControl';

const { kakao } = window;

export function stateDisplayArea(
  coordinates,
  name,
  polygons,
  map,
  customOverlay,
  draggable,
  liPolygons,
  dispatch,
  selectedState,
  markers,
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

  // pointCentroid(points);
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

  //

  // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다
  // 지역명을 표시하는 커스텀오버레이를 지도위에 표시합니다
  kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
    polygon.setOptions({ fillColor: '#09f' });
    draggable = false;
    map.setDraggable(draggable);
  });

  // 다각형에 mousemove 이벤트를 등록하고 이벤트가 발생하면 커스텀 오버레이의 위치를 변경합니다
  kakao.maps.event.addListener(polygon, 'mousemove', function (mouseEvent) {
    customOverlay.setPosition(mouseEvent.latLng);
  });

  // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
  // 커스텀 오버레이를 지도에서 제거합니다
  kakao.maps.event.addListener(polygon, 'mouseout', function () {
    draggable = true;
    map.setDraggable(draggable);

    polygon.setOptions({ fillColor: '#fff' });
    customOverlay.setMap(null);
  });

  let siData = koreaSi.features;
  // let selectCity;

  kakao.maps.event.addListener(polygon, 'click', function (mouseEvent) {
    let level;
    switch (name) {
      case 'Gangwon-do':
        draggable = true;
        map.setDraggable(draggable);
        // level = 11;
        // map.setLevel(level, {
        //   anchor: new kakao.maps.LatLng(38.0529076353974, 128.366277430163),
        //   animate: {
        //     duration: 50, //확대 애니메이션 시간
        //   },
        // });
        setPositionCenter(
          11,
          new kakao.maps.LatLng(37.73919895548271, 128.22828117457084),
          dispatch
        );
        break;
      case 'Gyeonggi-do':
        draggable = true;
        map.setDraggable(draggable);
        // level = 11;
        // map.setLevel(level, {
        //   anchor: new kakao.maps.LatLng(37.871721918984896, 126.97654151910734),
        //   animate: {
        //     duration: 50, //확대 애니메이션 시간
        //   },
        // });
        setPositionCenter(
          11,
          new kakao.maps.LatLng(37.53757927947221, 127.20134382044043),
          dispatch
        );
        break;
      case 'Gyeongsangnam-do':
        draggable = true;
        map.setDraggable(draggable);
        level = 11;
        // map.setLevel(level, {
        //   anchor: new kakao.maps.LatLng(34.93804553521694, 128.42889339624926),
        //   animate: {
        //     duration: 50, //확대 애니메이션 시간
        //   },
        // });
        setPositionCenter(
          11,
          new kakao.maps.LatLng(35.283006157310886, 128.33919530955006),
          dispatch
        );
        break;
      case 'Gyeongsangbuk-do':
        draggable = true;
        map.setDraggable(draggable);
        // level = 11;
        // map.setLevel(level, {
        //   anchor: new kakao.maps.LatLng(36.25873330451512, 128.85702005272682),
        //   animate: {
        //     duration: 50, //확대 애니메이션 시간
        //   },
        // });
        setPositionCenter(
          11,
          new kakao.maps.LatLng(36.25873330451512, 128.85702005272682),
          dispatch
        );
        break;
      case 'Gwangju':
        draggable = true;
        map.setDraggable(draggable);
        level = 9;
        // map.setLevel(level, {
        //   anchor: new kakao.maps.LatLng(35.08466390322525, 126.75980911015365),
        //   animate: {
        //     duration: 50, //확대 애니메이션 시간
        //   },
        // });
        setPositionCenter(
          9,
          new kakao.maps.LatLng(35.14322929166207, 126.85227509851431),
          dispatch
        );
        break;
      case 'Daegu':
        draggable = true;
        map.setDraggable(draggable);
        // level = 9;
        // map.setLevel(level, {
        //   anchor: new kakao.maps.LatLng(35.754541179239794, 128.5862731412402),
        //   animate: {
        //     duration: 50, //확대 애니메이션 시간
        //   },
        // });
        setPositionCenter(
          9,
          new kakao.maps.LatLng(35.83491559340961, 128.58213935896225),
          dispatch
        );
        break;
      case 'Daejeon':
        draggable = true;
        map.setDraggable(draggable);
        // level = 9;
        // map.setLevel(level, {
        //   anchor: new kakao.maps.LatLng(36.32269483677606, 127.38968701671737),
        //   animate: {
        //     duration: 50, //확대 애니메이션 시간
        //   },
        // });
        setPositionCenter(
          9,
          new kakao.maps.LatLng(36.32269483677606, 127.38968701671737),
          dispatch
        );
        break;
      case 'Busan':
        draggable = true;
        map.setDraggable(draggable);
        // level = 9;
        // map.setLevel(level, {
        //   anchor: new kakao.maps.LatLng(35.10473378247192, 129.13575706970252),
        //   animate: {
        //     duration: 50, //확대 애니메이션 시간
        //   },
        // });
        setPositionCenter(
          9,
          new kakao.maps.LatLng(35.20262044191565, 129.0195029126348),
          dispatch
        );
        break;
      case 'Seoul':
        draggable = true;
        map.setDraggable(draggable);
        // level = 9;
        // map.setLevel(level, {
        //   anchor: new kakao.maps.LatLng(37.621448900403365, 126.92732383244997),
        //   animate: {
        //     duration: 50, //확대 애니메이션 시간
        //   },
        // });
        setPositionCenter(
          9,
          new kakao.maps.LatLng(37.55300422304861, 127.01206388620648),
          dispatch
        );
        break;
      case 'Sejong-si':
        draggable = true;
        map.setDraggable(draggable);
        setPositionCenter(
          9,
          new kakao.maps.LatLng(36.584391383316586, 127.2207973037805),
          dispatch
        );
        break;
      case 'Ulsan':
        draggable = true;
        map.setDraggable(draggable);
        setPositionCenter(
          9,
          new kakao.maps.LatLng(35.54565177650688, 129.23870238065314),
          dispatch
        );
        break;
      case 'Incheon':
        draggable = true;
        map.setDraggable(draggable);
        // level = 10;
        // map.setLevel(level, {
        //   anchor: new kakao.maps.LatLng(37.62640916105082, 126.31615026089418),
        //   animate: {
        //     duration: 50, //확대 애니메이션 시간
        //   },
        // });
        setPositionCenter(
          10,
          new kakao.maps.LatLng(37.50133410083853, 126.5321865078648),
          dispatch
        );
        break;
      case 'Jellanam-do':
        draggable = true;
        map.setDraggable(draggable);
        // level = 11;
        // map.setLevel(level, {
        //   anchor: new kakao.maps.LatLng(34.366497179766974, 126.5781986935538),
        //   animate: {
        //     duration: 50, //확대 애니메이션 시간
        //   },
        // });
        setPositionCenter(
          11,
          new kakao.maps.LatLng(34.914873311403966, 127.01096488698131),
          dispatch
        );
        break;
      case 'Jeollabuk-do':
        draggable = true;
        map.setDraggable(draggable);
        // level = 11;
        // map.setLevel(level, {
        //   anchor: new kakao.maps.LatLng(35.52331241984572, 126.9927676176542),
        //   animate: {
        //     duration: 50, //확대 애니메이션 시간
        //   },
        // });
        setPositionCenter(
          11,
          new kakao.maps.LatLng(35.68316104761558, 127.14398551596905),
          dispatch
        );
        break;
      case 'Jeju-do':
        draggable = true;
        map.setDraggable(draggable);
        // level = 10;
        // map.setLevel(level, {
        //   anchor: new kakao.maps.LatLng(32.91098930285348, 126.2650617764628),
        //   animate: {
        //     duration: 50, //확대 애니메이션 시간
        //   },
        // });
        setPositionCenter(
          10,
          new kakao.maps.LatLng(33.37008097412234, 126.54587022000568),
          dispatch
        );
        break;
      case 'Chungcheongnam-do':
        draggable = true;
        map.setDraggable(draggable);
        // level = 11;
        // map.setLevel(level, {
        //   anchor: new kakao.maps.LatLng(36.44795538766189, 126.64431035997173),
        //   animate: {
        //     duration: 50, //확대 애니메이션 시간
        //   },
        // });
        setPositionCenter(
          11,
          new kakao.maps.LatLng(36.53450947749846, 126.87683044222051),
          dispatch
        );
        break;
      case 'Chungcheongbuk-do':
        draggable = true;
        map.setDraggable(draggable);
        // level = 11;
        // map.setLevel(level, {
        //   anchor: new kakao.maps.LatLng(36.75755940408185, 127.74952230420188),
        //   animate: {
        //     duration: 50, //확대 애니메이션 시간
        //   },
        // });
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
    let selectCity = siData.filter((city) => city.properties.State === name);
    let cityCoordinates;
    let cityName;
    selectCity.forEach((city) => {
      cityCoordinates = city.geometry.coordinates;
      cityName = city.properties.SIG_KOR_NM;

      cityDisplayArea(
        cityCoordinates,
        cityName,
        name,
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
  });
}

export function cityDisplayArea(
  coordinates,
  name,
  state,
  polygons,
  map,
  customOverlay,
  draggable,
  liPolygons,
  dispatch,
  selectedState,
  markers,
  info
) {
  let path = [];
  let points = [];
  console.log('name: ', name, ' state: ', state);

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

  //   // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다
  //   // 지역명을 표시하는 커스텀오버레이를 지도위에 표시합니다
  kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
    polygon.setOptions({ fillColor: '#09f' });
    draggable = false;
    map.setDraggable(draggable);
  });

  //   // 다각형에 mousemove 이벤트를 등록하고 이벤트가 발생하면 커스텀 오버레이의 위치를 변경합니다
  kakao.maps.event.addListener(polygon, 'mousemove', function (mouseEvent) {
    customOverlay.setPosition(mouseEvent.latLng);
  });

  //   // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
  //   // 커스텀 오버레이를 지도에서 제거합니다
  kakao.maps.event.addListener(polygon, 'mouseout', function () {
    draggable = true;
    map.setDraggable(draggable);

    polygon.setOptions({ fillColor: '#fff' });
    customOverlay.setMap(null);
  });

  const centerCoor = pointCentroid(points);

  kakao.maps.event.addListener(polygon, 'click', async function (mouseEvent) {
    draggable = true;
    map.setDraggable(draggable);

    let HjdData = HJD.features;

    let HjdCoordinates = [];
    let HjdName = '';

    console.log('displayArea', typeof liPolygons);
    deletePolygon(liPolygons);

    // center
    setPositionCenter(10, centerCoor, dispatch);

    HjdData.forEach((val) => {
      if (val.properties['sggnm'] === name) {
        HjdCoordinates = val.geometry.coordinates[0];
        HjdName = val.properties['sggnm'];
        townDisplayArea(
          HjdCoordinates,
          HjdName,
          liPolygons,
          map,
          customOverlay,
          draggable
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
    });

    try {
      let region = code;
      const result = await axios.get(
        `http://localhost:3066/data/loadwk/${region}`,
        region
      );
      console.log(result);
      deleteMarker(markers);
      if (result.data.length > 0) {
        createMarker(result.data, map, markers, name, info);
      }
    } catch (err) {
      console.log(err);
    }
  });
}

export function townDisplayArea(
  coordinates,
  name,
  liPolygons,
  map,
  customOverlay,
  draggable
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
