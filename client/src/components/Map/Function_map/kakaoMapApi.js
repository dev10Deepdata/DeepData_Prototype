const { kakao } = window;

/**
 * 클릭한 폴리곤의 중심값을 구하는 함수
 * @param {*} points
 * @returns
 */
export const centroid = (points) => {
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
