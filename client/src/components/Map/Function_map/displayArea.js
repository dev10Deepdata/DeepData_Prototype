import koreaSi from '../../../api/korea_si.json';
import { deletePolygon, pointCentroid } from './kakaoMapApi';
import HJD from '../../../api/HJDL.json';
const { kakao } = window;

export function stateDisplayArea(
  coordinates,
  name,
  polygons,
  map,
  customOverlay,
  draggable,
  liPolygons
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
  // console.log(name);
  // // console.log('point: ', points);
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
        level = 11;
        map.setLevel(level, {
          anchor: new kakao.maps.LatLng(38.0529076353974, 128.366277430163),
          animate: {
            duration: 50, //확대 애니메이션 시간
          },
        });
        break;
      case 'Gyeonggi-do':
        draggable = true;
        map.setDraggable(draggable);
        level = 11;
        map.setLevel(level, {
          anchor: new kakao.maps.LatLng(37.871721918984896, 126.97654151910734),
          animate: {
            duration: 50, //확대 애니메이션 시간
          },
        });
        break;
      case 'Gyeongsangnam-do':
        draggable = true;
        map.setDraggable(draggable);
        level = 11;
        map.setLevel(level, {
          anchor: new kakao.maps.LatLng(34.93804553521694, 128.42889339624926),
          animate: {
            duration: 50, //확대 애니메이션 시간
          },
        });
        break;
      case 'Gyeongsangbuk-do':
        draggable = true;
        map.setDraggable(draggable);
        level = 11;
        map.setLevel(level, {
          anchor: new kakao.maps.LatLng(36.25873330451512, 128.85702005272682),
          animate: {
            duration: 50, //확대 애니메이션 시간
          },
        });
        break;
      case 'Gwangju':
        draggable = true;
        map.setDraggable(draggable);
        level = 9;
        map.setLevel(level, {
          anchor: new kakao.maps.LatLng(35.08466390322525, 126.75980911015365),
          animate: {
            duration: 50, //확대 애니메이션 시간
          },
        });
        break;
      case 'Daegu':
        draggable = true;
        map.setDraggable(draggable);
        level = 9;
        map.setLevel(level, {
          anchor: new kakao.maps.LatLng(35.754541179239794, 128.5862731412402),
          animate: {
            duration: 50, //확대 애니메이션 시간
          },
        });
        break;
      case 'Daejeon':
        draggable = true;
        map.setDraggable(draggable);
        level = 9;
        map.setLevel(level, {
          anchor: new kakao.maps.LatLng(36.32269483677606, 127.38968701671737),
          animate: {
            duration: 50, //확대 애니메이션 시간
          },
        });
        break;
      case 'Busan':
        draggable = true;
        map.setDraggable(draggable);
        level = 9;
        map.setLevel(level, {
          anchor: new kakao.maps.LatLng(35.10473378247192, 129.13575706970252),
          animate: {
            duration: 50, //확대 애니메이션 시간
          },
        });
        break;
      case 'Seoul':
        draggable = true;
        map.setDraggable(draggable);
        level = 9;
        map.setLevel(level, {
          anchor: new kakao.maps.LatLng(37.621448900403365, 126.92732383244997),
          animate: {
            duration: 50, //확대 애니메이션 시간
          },
        });
        break;
      case 'Sejong-si':
        draggable = true;
        map.setDraggable(draggable);
        level = 9;
        map.setLevel(level, {
          anchor: new kakao.maps.LatLng(36.584391383316586, 127.2207973037805),
          animate: {
            duration: 50, //확대 애니메이션 시간
          },
        });
        break;
      case 'Ulsan':
        draggable = true;
        map.setDraggable(draggable);
        level = 9;
        map.setLevel(level, {
          anchor: new kakao.maps.LatLng(35.46313999599253, 129.3094347594351),
          animate: {
            duration: 50, //확대 애니메이션 시간
          },
        });
        break;
      case 'Incheon':
        draggable = true;
        map.setDraggable(draggable);
        level = 10;
        map.setLevel(level, {
          anchor: new kakao.maps.LatLng(37.62640916105082, 126.31615026089418),
          animate: {
            duration: 50, //확대 애니메이션 시간
          },
        });
        break;
      case 'Jellanam-do':
        draggable = true;
        map.setDraggable(draggable);
        level = 11;
        map.setLevel(level, {
          anchor: new kakao.maps.LatLng(34.366497179766974, 126.5781986935538),
          animate: {
            duration: 50, //확대 애니메이션 시간
          },
        });
        break;
      case 'Jeollabuk-do':
        draggable = true;
        map.setDraggable(draggable);
        level = 11;
        map.setLevel(level, {
          anchor: new kakao.maps.LatLng(35.52331241984572, 126.9927676176542),
          animate: {
            duration: 50, //확대 애니메이션 시간
          },
        });
        break;
      case 'Jeju-do':
        draggable = true;
        map.setDraggable(draggable);
        level = 10;
        map.setLevel(level, {
          anchor: new kakao.maps.LatLng(32.91098930285348, 126.2650617764628),
          animate: {
            duration: 50, //확대 애니메이션 시간
          },
        });
        break;
      case 'Chungcheongnam-do':
        draggable = true;
        map.setDraggable(draggable);
        level = 11;
        map.setLevel(level, {
          anchor: new kakao.maps.LatLng(36.44795538766189, 126.64431035997173),
          animate: {
            duration: 50, //확대 애니메이션 시간
          },
        });
        break;
      case 'Chungcheongbuk-do':
        draggable = true;
        map.setDraggable(draggable);
        level = 11;
        map.setLevel(level, {
          anchor: new kakao.maps.LatLng(36.75755940408185, 127.74952230420188),
          animate: {
            duration: 50, //확대 애니메이션 시간
          },
        });
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
        liPolygons
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
  liPolygons
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

  kakao.maps.event.addListener(polygon, 'click', function (mouseEvent) {
    draggable = true;
    map.setDraggable(draggable);

    setCenter(map, centerCoor);
    setCenter(map, centerCoor);
    let HjdData = HJD.features;

    // console.log(HjdData[0].properties.sggnm);
    let HjdCoordinates = [];
    let HjdName = '';

    console.log('displayArea', typeof liPolygons);
    deletePolygon(liPolygons);

    HjdData.forEach((val) => {
      // console.log(val.properties['sggnm']);
      if (val.properties['sggnm'] === name) {
        // console.log('ok');
        HjdCoordinates = val.geometry.coordinates[0];
        // console.log(HjdCoordinates);
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
      v.setOptions({ fillOpacity: 0.1 });
      // v.Eb[0]['strokeWeight'] = 1;
      // v.Eb[0]['fillOpacity'] = 0.1;
    });
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

  // console.log(path);

  polygon = new kakao.maps.Polygon({
    map: map,
    path: path, // 그려질 다각형의 좌표 배열입니다
    strokeWeight: 1, // 선의 두께입니다
    strokeColor: '#808080', // 선의 색깔입니다
    strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: 'solid', // 선의 스타일입니다
    fillColor: '#39B5E0', // 채우기 색깔입니다
    fillOpacity: 0.2, // 채우기 불투명도 입니다
  });

  liPolygons.push(polygon);
}

function setCenter(map, coor) {
  map.setLevel(10, {
    animate: {
      duration: 50, //확대 애니메이션 시간
    },
  });
  map.setCenter(coor);
}
