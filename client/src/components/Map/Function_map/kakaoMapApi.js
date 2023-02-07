/* eslint-disable array-callback-return */
const { kakao } = window;

/**
 * 클릭한 폴리곤의 중심값을 구하는 함수
 * @param {*} points
 * @returns
 */
export const centroid = (points) => {
  let i, j, len, p1, p2, f, area, x, y;

  area = x = y = 0;

  if (points.length === 2) {
    p1 = points[0];
    p2 = points[1];

    f = p1.y * p2.x - p2.y * p1.x;
    x += (p1.x + p2.x) * f;
    y += (p1.y + p2.y) * f;
    area += f * 3;

    let xarea = x / area;
    let yarea = y / area;

    return { x: xarea, y: yarea };
  }
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

  return { x: xarea, y: yarea };
  // return new kakao.maps.LatLng(xarea, yarea);
};

export const pointCentroid = (points) => {
  let center = [];
  points.map((v) => {
    center.push(centroid(v));
  });

  if (center.length > 1) {
    const pointCenter = [];
    pointCenter.push(centroid(center));
    let centerxy = new kakao.maps.LatLng(pointCenter[0].x, pointCenter[0].y);

    return centerxy;
  }

  let centeryx = new kakao.maps.LatLng(center[0].x, center[0].y);

  return centeryx;
};

/**
 * 폴리곤을 클릭시 생성된 폴리곤을 모두 지우는 함수.
 * @param {*} polygons
 */
export const deletePolygon = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    arr[i].setMap(null);
  }
  arr.splice(0, arr.length);
};
