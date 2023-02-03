const { kakao } = window;

function setCenter(map) {
  // 이동할 위도 경도 위치를 생성합니다
  var moveLatLon = new kakao.maps.LatLng(36.6017606568142, 127.80702241209042);
  map.setLevel(13, {
    animate: {
      duration: 50, //확대 애니메이션 시간
    },
  });
  // 지도 중심을 이동 시킵니다
  map.setCenter(moveLatLon);
}

export default setCenter;

