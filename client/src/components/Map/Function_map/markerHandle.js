import createContent from './createContent';

const { kakao } = window;

export const createMarker = (
  city,
  map,
  companyMarkers,
  setCompanyMarker,
  companyInfo,
  setCompanyInfo,
  startPoint
) => {
  const temp = [];
  let info = [];
  let EpPoint = [];
  let line = [];

  city.map((v) => {
    if (!v.coAddr) {
      return;
    }
    // , 제거
    let address = v.coAddr._text;
    if (address.indexOf(',')) {
      let cutstr = address.split(',');
      address = cutstr[0];
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
        temp.push(marker);

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', async (event) => {
          if (info) {
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

            // 목적지 동작
            // -----------------------------<ing
            // const infoBtn = document.querySelector('#btnClick');
            // infoBtn.onclick = onSaveLike;

            // // 목적지 지정 버튼 생성
            const $infoBtnGroup = document.querySelector('#infoBtnGroup');
            const endPointBtn = document.createElement('button');
            endPointBtn.innerHTML = 'endPoint';
            // /**
            //  * 목적지 지정 버튼 클릭시 동작
            //  */
            function onClickDistance() {
              if (EpPoint || line) {
                for (let i = 0; i < EpPoint.length; i++) {
                  EpPoint[i].setMap(null);
                }
                for (let i = 0; i < line.length; i++) {
                  line[i].setMap(null);
                }
              }
              const endPointData = coords;
              // 출발지, 목적지 좌표 정의
              let linePath = [
                new kakao.maps.LatLng(startPoint.Ma, startPoint.La),
                new kakao.maps.LatLng(endPointData['Ma'], endPointData['La']),
              ];

              var imageSrc = './img/SPmarker.png', // 마커이미지의 주소입니다
                imageSize = new kakao.maps.Size(22, 36), // 마커이미지의 크기입니다
                imageOption = { offset: new kakao.maps.Point(10, 39) };
              var markerImage = new kakao.maps.MarkerImage(
                imageSrc,
                imageSize,
                imageOption
              );
              let EPmarker = new kakao.maps.Marker({
                map: map,
                image: markerImage,
              });
              // 목적지 마커 생성
              EPmarker.setPosition(
                new kakao.maps.LatLng(endPointData['Ma'], endPointData['La'])
              );
              EPmarker.setMap(map);
              let polyline = new kakao.maps.Polyline({
                map: map,
                strokeWeight: 5,
                strokeColor: '#FF00FF',
                strokeOpacity: 0.8,
                strokeStyle: 'solid',
              });

              polyline.setPath(linePath);

              // 거리 표시
              console.log('길이: ' + Math.round(polyline.getLength()));
              const $distance = document.querySelector('.distance');
              $distance.value = `출발지점 -> 목적지(${
                v.coNm._text
              }): ${Math.round(polyline.getLength())}M`;
              infowindow.close();
              var level = 8;
              map.setLevel(level, {
                anchor: new kakao.maps.LatLng(
                  endPointData['Ma'],
                  endPointData['La']
                ),
              });
              // 시간 표시
              const $walk = document.querySelector('#walk');
              const $cycling = document.querySelector('#cycling');
              const $car = document.querySelector('#car');
              // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
              $walk.textContent = `${Math.round(
                Math.round(polyline.getLength()) / 67
              )}분`;
              // 자전거의 평균 시속은 16km/h 이고 이것을 기준으로 자전거의 분속은 267m/min입니다
              $cycling.textContent = `${Math.round(
                Math.round(polyline.getLength()) / 227
              )}분`;
              // 자동차의 평균 시속은 60km/h 이고 이것을 기준으로 자동차의 분속은 996m/min입니다.
              $car.textContent = `${Math.round(
                Math.round(polyline.getLength()) / 996
              )}분`;

              EpPoint.push(EPmarker);
              line.push(polyline);

              const $removePoint = document.querySelector('#removePoint');
              $removePoint.addEventListener('click', onRemovePoint);
              function onRemovePoint() {
                polyline.setMap(null);
                EPmarker.setMap(null);
              }
            }
            endPointBtn.onclick = onClickDistance;
            $infoBtnGroup.append(endPointBtn);
          } catch (err) {
            console.log(err);
          }
        });
      }
    });
  });
  console.log(info);
  setCompanyInfo(info);
  setCompanyMarker(temp);
};

export const deleteMarker = (companyMarkers, setCompanyMarker) => {
  if (!(companyMarkers.length > 0)) {
    return;
  }
  for (let i = 0; i < companyMarkers.length; i++) {
    companyMarkers[i].setMap(null);
  }
  setCompanyMarker([]);
};
export const deleteInfo = (companyInfo, setCompanyInfo) => {
  if (!(companyInfo.length > 0)) {
    return;
  }
  console.log(companyInfo);
  for (let i = 0; i < companyInfo.length; i++) {
    companyInfo[i].close();
  }
  setCompanyInfo([]);
};
