const { kakao } = window;

/**
 * 클릭한 폴리곤의 중심값을 구하는 함수
 * @param {*} points
 * @returns
 */
export const centroid = (points) => {
  // let point = []
  // points.forEach((p)=>{
  //   let tempPoint = [];
  //   p.forEach((t)=>{

  //   })

  // })

  let i, j, len, p1, p2, f, area, x, y;

  area = x = y = 0;

  for (i = 0, len = points.length, j = len - 1; i < len; j = i++) {
    p1 = points[i];
    p2 = points[j];

    f = p1.y * p2.x - p2.y * p1.x;
    x += (p1.x + p2.x) * f;
    y += (p1.y + p2.y) * f;
    area += f * 3;
  }

  let xarea = x / area;
  let yarea = y / area;
  return new kakao.maps.LatLng(xarea, yarea);
};

/**
 * 폴리곤을 클릭시 생성된 폴리곤을 모두 지우는 함수.
 * @param {*} polygons
 */
export const deletePolygon = (polygons, lenSw) => {
  for (let i = 0; i < polygons.length; i++) {
    polygons[i].setMap(null);
  }
  polygons = [];
  lenSw = true;
};

/**
 * 폴리곤 클릭시 해당 지역으로 줌 하며, 생성되어 있는 폴리곤 제거한다.
 * @param {*} map
 * @param {*} draggable
 * @param {*} EmdData
 * @param {*} deleteMarker
 * @param {*} deletePolygon
 * @param {*} polygons
 * @param {*} EmdCoordinates
 * @param {*} EmdName
 * @param {*} displayArea
 * @param {*} createMarker
 * @param {*} CnLocation
 */
export const sideBtnAddEvent = (
  map,
  draggable,
  EmdData,
  deleteMarker,
  deletePolygon,
  polygons,
  EmdCoordinates,
  EmdName,
  displayArea,
  createMarker,
  CnLocation
) => {
  const $cn_0 = document.querySelector('.CN_0');
  $cn_0.addEventListener('click', function () {
    deleteMarker();
    draggable = true;
    map.setDraggable(draggable);

    var level = 10;
    map.setLevel(level, {
      anchor: new kakao.maps.LatLng(36.807980592249244, 126.97807816423754),
      animate: {
        duration: 50, //확대 애니메이션 시간
      },
    });
    deletePolygon(polygons);
    EmdData.forEach((val) => {
      if (val.properties.sggnm === '아산시') {
        EmdCoordinates = val.geometry.coordinates;
        EmdName = val.properties.sggnm;
        displayArea(EmdCoordinates, EmdName, 'type');
      }
    });
    createMarker('아산시');
  });
  const $cn_1 = document.querySelector('.CN_1');
  $cn_1.addEventListener('click', function () {
    deleteMarker();
    draggable = true;
    map.setDraggable(draggable);

    var level = 10;
    map.setLevel(level, {
      anchor: new kakao.maps.LatLng(36.891335879739145, 127.15991121087959),
      animate: {
        duration: 50, //확대 애니메이션 시간
      },
    });
    deletePolygon(polygons);
    EmdData.forEach((val) => {
      if (val.properties.sggnm === '천안시') {
        EmdCoordinates = val.geometry.coordinates;
        EmdName = val.properties.sggnm;
        displayArea(EmdCoordinates, EmdName, 'type');
      }
    });
    createMarker('천안시');
  });
  const $cn_2 = document.querySelector('.CN_2');
  $cn_2.addEventListener('click', function () {
    deleteMarker();
    draggable = true;
    map.setDraggable(draggable);

    var level = 10;
    map.setLevel(level, {
      anchor: new kakao.maps.LatLng(36.671213587359205, 126.78316762176077),
      animate: {
        duration: 50, //확대 애니메이션 시간
      },
    });
    deletePolygon(polygons);
    EmdData.forEach((val) => {
      if (val.properties.sggnm === '예산군') {
        EmdCoordinates = val.geometry.coordinates;
        EmdName = val.properties.sggnm;
        displayArea(EmdCoordinates, EmdName, 'type');
      }
    });
    createMarker('예산군');
  });
  const $cn_3 = document.querySelector('.CN_3');
  $cn_3.addEventListener('click', function () {
    deleteMarker();
    draggable = true;
    map.setDraggable(draggable);

    var level = 10;
    map.setLevel(level, {
      anchor: new kakao.maps.LatLng(36.480131003402946, 127.07526448031712),
      animate: {
        duration: 50, //확대 애니메이션 시간
      },
    });
    deletePolygon(polygons);
    EmdData.forEach((val) => {
      if (val.properties.sggnm === '공주시') {
        EmdCoordinates = val.geometry.coordinates;
        EmdName = val.properties.sggnm;
        displayArea(EmdCoordinates, EmdName, 'type');
      }
    });
    createMarker('공주시');
  });
  const $cn_4 = document.querySelector('.CN_4');
  $cn_4.addEventListener('click', function () {
    deleteMarker();
    draggable = true;
    map.setDraggable(draggable);

    var level = 10;
    map.setLevel(level, {
      anchor: new kakao.maps.LatLng(36.296397333427386, 127.23409744683859),
      animate: {
        duration: 50, //확대 애니메이션 시간
      },
    });
    deletePolygon(polygons);
    EmdData.forEach((val) => {
      if (val.properties.sggnm === '계룡시') {
        EmdCoordinates = val.geometry.coordinates;
        EmdName = val.properties.sggnm;
        displayArea(EmdCoordinates, EmdName, 'type');
      }
    });
    createMarker('계룡시');
  });
  const $cn_5 = document.querySelector('.CN_5');
  $cn_5.addEventListener('click', function () {
    deleteMarker();
    draggable = true;
    map.setDraggable(draggable);

    var level = 10;
    map.setLevel(level, {
      anchor: new kakao.maps.LatLng(36.11949795655726, 127.47742758543411),
      animate: {
        duration: 50, //확대 애니메이션 시간
      },
    });
    deletePolygon(polygons);
    EmdData.forEach((val) => {
      if (val.properties.sggnm === '금산군') {
        EmdCoordinates = val.geometry.coordinates;
        EmdName = val.properties.sggnm;
        displayArea(EmdCoordinates, EmdName, 'type');
      }
    });
    createMarker('금산군');
  });
  const $cn_6 = document.querySelector('.CN_6');
  $cn_6.addEventListener('click', function () {
    deleteMarker();
    draggable = true;
    map.setDraggable(draggable);

    var level = 10;
    map.setLevel(level, {
      anchor: new kakao.maps.LatLng(36.191615069739605, 127.15959200216953),
      animate: {
        duration: 50, //확대 애니메이션 시간
      },
    });
    deletePolygon(polygons);
    EmdData.forEach((val) => {
      if (val.properties.sggnm === '논산시') {
        EmdCoordinates = val.geometry.coordinates;
        EmdName = val.properties.sggnm;
        displayArea(EmdCoordinates, EmdName, 'type');
      }
    });
    createMarker('논산시');
  });
  const $cn_7 = document.querySelector('.CN_7');
  $cn_7.addEventListener('click', function () {
    deleteMarker();
    draggable = true;
    map.setDraggable(draggable);

    var level = 10;
    map.setLevel(level, {
      anchor: new kakao.maps.LatLng(36.244859884660116, 126.85872075272363),
      animate: {
        duration: 50, //확대 애니메이션 시간
      },
    });
    deletePolygon(polygons);
    EmdData.forEach((val) => {
      if (val.properties.sggnm === '부여군') {
        EmdCoordinates = val.geometry.coordinates;
        EmdName = val.properties.sggnm;
        displayArea(EmdCoordinates, EmdName, 'type');
      }
    });
    createMarker('부여군');
  });
  const $cn_8 = document.querySelector('.CN_8');
  $cn_8.addEventListener('click', function () {
    deleteMarker();
    draggable = true;
    map.setDraggable(draggable);

    var level = 10;
    map.setLevel(level, {
      anchor: new kakao.maps.LatLng(36.903428540078245, 126.65288268343298),
      animate: {
        duration: 50, //확대 애니메이션 시간
      },
    });
    deletePolygon(polygons);
    EmdData.forEach((val) => {
      if (val.properties.sggnm === '당진시') {
        EmdCoordinates = val.geometry.coordinates;
        EmdName = val.properties.sggnm;
        displayArea(EmdCoordinates, EmdName, 'type');
      }
    });
    createMarker('당진시');
  });
  const $cn_9 = document.querySelector('.CN_9');
  $cn_9.addEventListener('click', function () {
    deleteMarker();
    draggable = true;
    map.setDraggable(draggable);

    var level = 10;
    map.setLevel(level, {
      anchor: new kakao.maps.LatLng(36.781013069041464, 126.46535097223789),
      animate: {
        duration: 50, //확대 애니메이션 시간
      },
    });
    deletePolygon(polygons);
    EmdData.forEach((val) => {
      if (val.properties.sggnm === '서산시') {
        EmdCoordinates = val.geometry.coordinates;
        EmdName = val.properties.sggnm;
        displayArea(EmdCoordinates, EmdName, 'type');
      }
    });
    createMarker('서산시');
  });
  const $cn_10 = document.querySelector('.CN_10');
  $cn_10.addEventListener('click', function () {
    deleteMarker();
    draggable = true;
    map.setDraggable(draggable);

    var level = 10;
    map.setLevel(level, {
      anchor: new kakao.maps.LatLng(36.76049320146857, 126.25971917973331),
      animate: {
        duration: 50, //확대 애니메이션 시간
      },
    });
    deletePolygon(polygons);
    EmdData.forEach((val) => {
      if (val.properties.sggnm === '태안군') {
        EmdCoordinates = val.geometry.coordinates;
        EmdName = val.properties.sggnm;
        displayArea(EmdCoordinates, EmdName, 'type');
      }
    });
    createMarker('태안군');
  });
  const $cn_11 = document.querySelector('.CN_11');
  $cn_11.addEventListener('click', function () {
    deleteMarker();
    draggable = true;
    map.setDraggable(draggable);

    var level = 10;
    map.setLevel(level, {
      anchor: new kakao.maps.LatLng(36.569773596198964, 126.62416591290733),
      animate: {
        duration: 50, //확대 애니메이션 시간
      },
    });
    deletePolygon(polygons);
    EmdData.forEach((val) => {
      if (val.properties.sggnm === '홍성군') {
        EmdCoordinates = val.geometry.coordinates;
        EmdName = val.properties.sggnm;
        displayArea(EmdCoordinates, EmdName, 'type');
      }
    });
    createMarker('홍성군');
  });
  const $cn_12 = document.querySelector('.CN_12');
  $cn_12.addEventListener('click', function () {
    deleteMarker();
    draggable = true;
    map.setDraggable(draggable);

    var level = 10;
    map.setLevel(level, {
      anchor: new kakao.maps.LatLng(36.4299449897745, 126.85043582326404),
      animate: {
        duration: 50, //확대 애니메이션 시간
      },
    });
    deletePolygon(polygons);
    EmdData.forEach((val) => {
      if (val.properties.sggnm === '청양군') {
        EmdCoordinates = val.geometry.coordinates;
        EmdName = val.properties.sggnm;
        displayArea(EmdCoordinates, EmdName, 'type');
      }
    });
    createMarker('청양군');
  });
  const $cn_13 = document.querySelector('.CN_13');
  $cn_13.addEventListener('click', function () {
    deleteMarker();
    draggable = true;
    map.setDraggable(draggable);

    var level = 10;
    map.setLevel(level, {
      anchor: new kakao.maps.LatLng(36.34376024931412, 126.60358066491877),
      animate: {
        duration: 50, //확대 애니메이션 시간
      },
    });
    deletePolygon(polygons);
    EmdData.forEach((val) => {
      if (val.properties.sggnm === '보령시') {
        EmdCoordinates = val.geometry.coordinates;
        EmdName = val.properties.sggnm;
        displayArea(EmdCoordinates, EmdName, 'type');
      }
    });
    createMarker('보령시');
  });
  const $cn_14 = document.querySelector('.CN_14');
  $cn_14.addEventListener('click', function () {
    deleteMarker();
    draggable = true;
    map.setDraggable(draggable);

    var level = 10;
    map.setLevel(level, {
      // anchor: new kakao.maps.LatLng(36.108670128072674, 126.70587754426815),
      anchor: new kakao.maps.LatLng(CnLocation['서천군']),
      animate: {
        duration: 50, //확대 애니메이션 시간
      },
    });
    deletePolygon(polygons);
    EmdData.forEach((val) => {
      if (val.properties.sggnm === '서천군') {
        EmdCoordinates = val.geometry.coordinates;
        EmdName = val.properties.sggnm;
        displayArea(EmdCoordinates, EmdName, 'type');
      }
    });
    createMarker('서천군');
  });
  // 위 코드와 동일 동작을 원하나 동작 오류 수정 필요.
  // let count = 0;
  // function cn_move(code, i) {
  //   const $code = document.querySelector(`.${code}_${i}`);
  //   $code.addEventListener('click', function () {
  //     deleteMarker();
  //     draggable = true;
  //     map.setDraggable(draggable);

  //     var level = 10;
  //     map.setLevel(level, {
  //       anchor: new kakao.maps.LatLng(CnLocation[Object.keys(CNcity)[i]]),
  //       animate: {
  //         duration: 50, //확대 애니메이션 시간
  //       },
  //     });
  //     let test = Object.keys(CNcity);

  //     console.log('atb', test[i]);

  //     deletePolygon(polygons);
  //     createMarker(Object.keys(CNcity)[i]);
  //   });
  // }

  // if (count < 15) {
  //   for (let i = 0; i < Object.keys(CNcity).length; i++) {
  //     console.log('for: ', i);
  //     cn_move('CN', i);
  //     count++;
  //   }
  // }
  // End
};

export function stateDisplayArea(
  coordinates,
  name,
  polygons,
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
      points.push(point);
    });
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
        return;
    }
  });
} //
