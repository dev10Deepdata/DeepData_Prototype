import createContent from './createContent';

const { kakao } = window;

export const createMarker = (city, map, markers, name, info) => {
  city.map((v) => {
    // , 제거
    let address = v.coAddr._text;
    if (address.indexOf(',')) {
      let cutstr = address.split(',');
      address = cutstr[0];
    }
    // 유효성 검사
    if (address.indexOf(name) === -1) {
      return;
    }
    let geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        /**
         * - 클릭한 기업을 DB에 저장 및 인적사항 연계
         * - 열려있는 infoWindow를 close한다.
         */
        // const onSaveLike = () => {
        //   if (info) {
        //     for (let i = 0; i < info.length; i++) {
        //       info[i].close();
        //     }
        //   }
        //   // console.log('me: ', me);
        //   dispatch({
        //     type: SAVE_DATA_REQUEST,
        //     data: {
        //       meId: me.id,
        //       do: '충청남도',
        //       si: v['소재지'].slice(0, 3),
        //       name: v['업체명'],
        //       address: v['소재지'],
        //       product: v['주생산품'],
        //     },
        //   });
        // };

        // 결과값으로 받은 위치를 마커로 표시합니다
        var marker = new kakao.maps.Marker({
          map: map,
          position: coords,
        });
        markers.push(marker);
        // map.setCenter(coords);

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', async (event) => {
          if (info) {
            // console.log('info: ', info);
            for (let i = 0; i < info.length; i++) {
              info[i].close();
            }
          }
          // 마커 위에 인포윈도우를 표시합니다
          try {
            const data = await createContent(v);
            var iwContent = data,
              iwRemoveable = true;
            // 인포윈도우를 생성합니다
            var infowindow = new kakao.maps.InfoWindow({
              content: iwContent,
              removable: iwRemoveable,
            });
            info.push(infowindow);
            infowindow.open(map, marker);
            // const infoBtn = document.querySelector('#btnClick');
            // infoBtn.onclick = onSaveLike;
            // 목적지 지정 버튼 생성
            // const $infoBtnGroup = document.querySelector('#infoBtnGroup');
            // const endPointBtn = document.createElement('button');
            // endPointBtn.innerHTML = 'endPoint';
            // /**
            //  * 목적지 지정 버튼 클릭시 동작
            //  */
            // function onClickDistance() {
            //   const endPointData = coords;
            //   // 출발지, 목적지 좌표 정의
            //   let linePath = [
            //     new kakao.maps.LatLng(
            //       startPointData['Ma'],
            //       startPointData['La']
            //     ),
            //     new kakao.maps.LatLng(endPointData['Ma'], endPointData['La']),
            //   ];
            //   // 목적지 마커 생성
            //   EPmarker.setPosition(
            //     new kakao.maps.LatLng(endPointData['Ma'], endPointData['La'])
            //   );
            //   EPmarker.setMap(map);
            //   polyline.setPath(linePath);
            //   console.log('길이: ' + Math.round(polyline.getLength()));
            //   const $lineDistance = document.querySelector('#lineDistance');
            //   $lineDistance.textContent = `출발지점 -> 목적지(${
            //     v['업체명']
            //   }): ${Math.round(polyline.getLength())}M`;
            //   polyline.setMap(map);
            //   infowindow.close();
            //   var level = 10;
            //   map.setLevel(level, {
            //     anchor: new kakao.maps.LatLng(
            //       endPointData['Ma'],
            //       endPointData['La']
            //     ),
            //     animate: {
            //       duration: 50, //확대 애니메이션 시간
            //     },
            //   });
            //   deleteMarker();
            //   deletePolygon(polygons);
            // }
            // endPointBtn.onclick = onClickDistance;
            // $infoBtnGroup.append(endPointBtn);
          } catch (err) {
            console.log(err);
          }
        });
      }
    });
  });
};

export const deleteMarker = (markers) => {
  if (!markers) {
    return;
  }
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
};
