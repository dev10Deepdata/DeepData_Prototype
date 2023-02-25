# DeepData_Prototype 1.0.1

<br>

## 😊 프로젝트 소개

### [ 공공데이터포털(OpenAPI) 및 카카오맵 API 활용한 웹어플리케이션 ]

<br>

<p>
공공데이터포털, 워크넷 OpenAPI데이터 활용 및 카카오맵 API를 활용한 웹 어플리케이션으로 공공데이터의 기업PAI를 통해 자신의 회사를 검색하는 기능을 제공하며, 워크넷의 강소기업에 대한 정보를 카카오맵과 제공되는 목록으로 표시 해준다.
</p>

## 👐 기술 스택

<div align=center>

<h1>📚 STACKS</h1>

<div align=center> 
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/Redux-Saga-764ABC?style=for-the-badge&logo=Redux-Saga&logoColor=white">
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white">
  <br>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white">
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">
  <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white">
  <br>
</div>
</div>

<br>

## 🏃 Preview 및 동작

---

<br>

- 기본 인적사항 및 공공데이터 OpenAPI를 활용한 기업검색 및 추가정보 입력

: 기본적인 인적사항을 클릭 후[ Go ] 버튼 클릭 하거나 추가정보를 입력 후 버튼을 클릭시 DataBase에 입력한 인적사항을 저장 한다.

<br>

<div align=center>

<p>Join Page preview</p>

![join](https://user-images.githubusercontent.com/123555721/221360185-f22cdaef-b1c7-4d5f-a91f-ad082840c4ea.gif)

  <p>재직중인 기업을 검색하여 선택할 수 있다.</p>
  <p>공공데이터포털의 '금융위원회_기업기본정보' API를 활용하였다.</p>
  <img src='./readme/join0.png' />

  <p>자신의 회사가 검색결과가 없는 경우 직접 입력하는 공간을 제공한다.</p>
  <img src='./readme/join1.png' />
</div>

---

<br>

- 카카오맵API 및 워크넷 기업정보API를 활용하여 정보 제공

<div align=center>

<p>main Page Preview</p>

![Feb-25-2023 22-23-51](https://user-images.githubusercontent.com/123555721/221360211-a9647473-1488-46ea-a7f4-7acb12706ded.gif)

<p>도 - 시군구 - 읍면동 단위 폴리곤</p>

![Feb-25-2023 22-26-54](https://user-images.githubusercontent.com/123555721/221360199-66b26dfd-54e6-4582-a741-c48bc2e10278.gif)

<p>'도'를 클릭시 '시'별 내에 있는 강소기업의 수를 표시해준다.</p>

<img src='./readme/cluster.png' />

<p>'시'를 클릭시 강소기업의 정보를 담고있는 마커를 제공한다.</p>

<img src='./readme/marker.png' />

<p>마커를 클릭하여 기업의 정보를 확인 할 수 있으며 관심 버튼을 클릭하여 join 페이지에서 입력한 자신의 인적사항과 해당 기업을 DB에 저장할 수 있으며, 구글검색으로 이어주거나, 목적지로 선택 할 수 있다.</p>

<img src='./readme/company.png' />

<p>도, 시 단위 클릭시 해당 단위 내의 회사 기본정보 제공 및 페이지네이션 구현</p>

![Feb-25-2023 22-27-02](https://user-images.githubusercontent.com/123555721/221360193-c7464555-c880-4ada-86fa-ad0c20b5b127.gif)

<p>해당 지역의 기업을 리스트로 제공 및 페이지네이션을 구현 하였다.</p>

<img src='./readme/list.png' />

<p>두 지점간 직선 거리 및 소요시간(도보, 자전거, 차) 제공</p>

![Feb-25-2023 22-30-29](https://user-images.githubusercontent.com/123555721/221360202-a6e29460-8642-4f32-9427-3b2719200816.gif)

<p>출발지 - 목적지 간 거리및 소요시간 제공</p>

<img src='./readme/line.png' />

</div>
