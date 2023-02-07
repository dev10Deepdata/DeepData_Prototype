/**
 * 폴리곤을 클릭시 생성된 폴리곤을 모두 지우는 함수.
 * @param {*} polygons
 */
const deletePolygon = (polygons) => {
  for (let i = 0; i < polygons.length; i++) {
    polygons[i].setMap(null);
  }
  polygons = [];
};

export default deletePolygon;
