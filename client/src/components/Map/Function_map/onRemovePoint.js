/**
 * 포인트 및 측정라인 제거
 */
function onRemovePoint(polyline, SPmarker, EPmarker) {
  console.log('remove Point');
  polyline.setMap(null);
  SPmarker.setMap(null);
  EPmarker.setMap(null);
}

export default onRemovePoint;
