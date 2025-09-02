## 백엔드 원격 레포지토리 (최하단으로 이동 예정)
### API 백엔드 레포지토리 : https://github.com/koreait1/chulfudoc-api
### AI 백엔드 레포지토리 : https://github.com/koreait1/chulfudoc-detection

## 환경변수 (삭제 예정)
NEXT_PUBLIC_DOMAIN=http://localhost:3000
NEXT_PUBLIC_AI_API_URL=http://127.0.0.1:5000/
NEXT_PUBLIC_API_URL=https://api.chulfudoc.xyz/api/v1
API_URL=https://api.chulfudoc.xyz/api/v1
NEXT_PUBLIC_KAKAO_API_KEY=7ce8ab10624f37de367ba371f1cbbb64
NEXT_PUBLIC_GAPID=5560860040510064
NEXT_PUBLIC_NAVER_API_KEY=zOO0YFons6SoSf762rxU
NEXT_PUBLIC_NAVER_API_SECRET=nObxHaBpoE
NEXT_PUBLIC_TMAP_API_KEY=dF7fZsugeb1ubM2N0WCb02arxtDbMcXH4KEtXlV2

# 프로젝트 : [철푸닥](https://chulfudoc.xyz)
<div align="center">
  <a href="https://chulfudoc.xyz">
    <img src="https://raw.githubusercontent.com/koreait1/chulfudoc-front/master/img/resources/logo.png" alt="철푸닥" width="500"/>
  </a><br />
</div>

- 주소 : https://chulfudoc.xyz
- 관리자 아이디 : 
- 관리자 비밀번호 : 

## 💡 개요
길을 걷다 갑자기 쓰러졌는데 주변에 아무도 없다면?<br />
근처 병원은 알지만, 응급실이 있는지 알 수 없다면?<br />
철푸닥 프로젝트는 이러한 긴급 상황을 미연에 방지하고, 신속한 대응을 돕기 위해 만들어졌습니다.<br />

### 🔹 주요 기능
- AI 쓰러짐 감지<br />
YOLO API를 활용해 사람이 쓰러진 상황을 자동으로 인식합니다.<br />

- 응급실 정보 제공<br />
Tmap API를 통해 응급실 보유 병원을 지도와 목록으로 확인할 수 있습니다.<br />
- 커뮤니티 게시판<br />
실제 경험한 위급 상황이나 병원 정보를 공유하고 소통할 수 있습니다.

---
## 👥 역할 분담
- 주용현 : 쓰러진 사람 감지 후 응급 상황 처리 기능, Tmap API 기반 응급의료기관 위치 안내 서비스
- 최상준 : 
- 김문수 : 회원 인증/관리 서비스 | 메인페이지 전체 기능
- 김용준 : 모달(LayerPopup), Alert(알림), 스타일(styled-components), 파일 업로드 UI
- 주예성 : 관리자 멤버, 게시판 작성 및 관리 
---
## 👤 주용현

### ⚙️ 기능 설명
- 낙상 감지 서비스
	- 웹캠 연결
	- 사용자가 버튼을 눌러 웹캠 On/Off 전환 가능
	- AI 서버로 영상 전송 & 객체 감지
	- 권한 거부 시 사용자 친화적 UX 제공
	- 이미지 예시(허용 / 비허용)를 통해 브라우저 권한 허용 안내
	- 쓰러짐이 감지되면 감지 영역에 빨간 박스를 표시
	- 웹캠 사용 가능 여부(webcamAble)에 따라 DetectBox 표시 여부 결정
	- DetectBox에서 감지된 이벤트를 받아 일정 횟수 이상이면 낙상으로 판단
	- 낙상 감지 시 /tmap 페이지로 라우팅 -> 가까운 응급의료기관 자동 조회 서비스

**응급의료기관 정보 제공 서비스**
- 응급의료기관 지도 서비스 : 마커 클릭
	- 사용자의 현재 위치를 기반으로 Tmap 지도 초기화
 	- CSV(`ERPlusPlus.csv`)에서 응급의료기관 데이터 파싱 후 지도에 마커 표시
	- 병원 마커 클릭 시:
		- Tmap API를 통해 현재 위치 → 병원까지의 경로 탐색
 		- Polyline으로 경로를 지도에 표시
		- 병원 상세 정보(주소, 연락처, 거리, 예상 소요 시간)를 InfoWindow로 제공
		- API 호출 제한(429) 또는 오류 발생 시 AlertDialog로 안내

- 응급의료기관 지도 및 목록 조회 서비스 : 가까운 응급의료기관 자동 조회
	- 내 주변 응급의료기관 정보 테이블 표시
		- 사용자 현재 위치 기준 직선 거리(Haversine 공식) 계산
		- 직선거리가 가까운 20개 후보 병원 선정 후 Tmap Routes API로 실제 도로 거리 계산 -> 호출 최소화
		- 실제 거리 기준 상위 5개 병원을 테이블로 표시
		- 거리 계산 중 로딩 표시
	- 사용자의 현재 위치를 기반으로 Tmap 지도 초기화
	- CSV(ERPlusPlus.csv)에서 응급의료기관 데이터를 파싱
	- 현재 위치와 가장 가까운 5개 병원 표시
	- 병원별 Polyline 경로 표시 및 InfoWindow를 통한 상세 정보 제공
	- API 호출 제한(429) 또는 오류 발생 시 SweetAlert2를 이용한 안내
	- 지도 초기 로딩 시 로딩 컴포넌트 표시
	- 토글 버튼(지도 보기, 목록 보기)을 클릭하여 응급의료기관의 지도, 목록 검색 서비스를 전환
	- 패널 전환 시 페이드 + 슬라이드(오른쪽 → 왼쪽) 애니메이션 적용.


- 응급의료기관 검색 서비스
	- 사용자로부터 병원 검색 키워드를 입력받고, 검색 옵션을 선택할 수 있는 폼 제공.
	- Enter 키 또는 버튼 클릭으로 검색 동작 실행.
	- 검색 옵션:
		- ALL: 통합검색
		- NAME: 병원명 검색
		- ADDR: 주소 검색
	- 사용자의 위치를 기반으로 지도(Tmapv3)를 표시하고, 병원 마커 및 도로 경로를 시각화.
	- 검색 폼(ERSearchForm)을 통해 병원명, 주소, 통합검색 가능.
	- 검색 결과에 따라 지도에 마커, InfoWindow, 경로선(Polyline)을 동적으로 표시.
	- Tmap API 호출 시 제한(429)을 처리하고, 오류 발생 시 사용자 알림을 표시.
	- 응급의료기관 목록을 표 형태로 렌더링.
	- 응급 의료 기관의 이름, 주소, 전화번호를 테이블로 표시.
	- 검색 결과가 없으면 “검색 결과가 없습니다.” 메시지 출력.

### 📝 코드 리뷰
### detect
- /_components/DetectBox.tsx
	- navigator.mediaDevices.getUserMedia() API를 사용해 웹캠 스트림을 가져옴
	- 스트림을 <video>에 연결하고, <canvas>를 통해 사용자 화면에 출력
	- monitor() 함수가 주기적으로 실행되어 감지 동작 수행
		- <canvas>를 Blob으로 변환 후 서버에 전송
		- 서버 응답(JSON 배열)에서 감지 좌표를 꺼내 ctx.strokeRect로 박스 표시
		- 감지 결과 중 "쓰러짐"(cls === 1)일 경우만 그려짐
		- 감지 시 callback 호출 → 상위 컴포넌트에서 후속 처리 가능
	- 웹캠 권한이 없거나 거부된 경우:
		- alertDialog로 안내 메시지 출력
		- LayerPopup을 열어 권한 허용 방법을 이미지와 함께 제공

- /_containers/DetectContainer.tsx
	- webcamAble 상태에 따라 두 가지 UI 제공
		- true → <DetectBox> 렌더링 + "WebCam Off" 버튼
 		- false → "GET START" 버튼
	- detectCallback
		- 감지 이벤트 발생 시 호출
		- 최근 10초 이내 감지 횟수를 카운트
		- 5회 이상이면 fallDetect 상태를 true로 변경
	- useEffect
		- fallDetect가 true일 때 /tmap 페이지로 이동
	- onDetectChange
		- 현재 webcamAble 상태를 반전시켜 상위 컴포넌트(onChange)에 전달
	- WebcamButton
		- 스타일이 적용된 버튼으로 WebCam On/Off 토글 역할 수행

### tmap
- @/app/layout.tsx  
	- <head> 영역에 <script src={tmapApiUrl}>를 통해 Tmap appkey를 정적으로 추가
	- 컴포넌트 내부에서 동적으로 삽입하려 하면 Next.js에서 document.write가 허용되지 않으므로, 해당 방식으로 처리

- @/app/_global/components/Map.tsx : 다른 Tmap 컴포넌트들의 참고용 컴포넌트 역할 및 마커 서비스 제공
	- 전역 선언
		- window.Tmapv3 타입 선언으로 Tmap API 사용 가능하게 설정
	- 데이터 로드
		- Papa.parse 사용해 CSV 파일(/ERPlusPlus.csv)을 파싱
		- 위도, 경도 값이 없는 병원은 스킵
	- 지도 초기화
		- navigator.geolocation으로 현재 위치를 받아 지도 중심 좌표 설정
		- 현재 위치에 마커 및 InfoWindow(현위치) 추가
	- 병원 마커
		- CSV 데이터를 순회하며 병원 위치에 마커 표시
		- 마커 클릭 이벤트 처리:
			- 기존 Polyline과 InfoWindow 제거
			- Tmap Routes API 호출
			- 응답 데이터를 파싱하여 경로(Polyline) 표시
			- 병원 상세 정보 InfoWindow 렌더링
				- (병원 정보 닫기) 텍스트를 클릭하면 InfoWindow 제거
	- 오류 처리
		- API 호출 제한(429) → 에러 다이얼로그 + 홈 리다이렉트
		- 기타 API 오류 → 에러 다이얼로그 + 새로고침 옵션 제공
	- 스타일링
		- Wrapper 컴포넌트: 지도 영역 크기 및 border 스타일 지정
		- width, height를 prop으로 받아 동적으로 적용 가능

- /_components/NearERMap.tsx
	- 지도 초기화
		- window.Tmapv3가 로드될 때까지 setInterval로 대기 후 초기화
		- initMap에서 CSV 데이터를 파싱하고 병원 정보를 준비
	- 사용자 위치
		- navigator.geolocation.getCurrentPosition으로 현재 위치 확인
		- 위치 확인 실패 시 AlertDialog 호출 및 로딩 종료
		- 병원 표시
		- 위도/경도 값이 있는 병원만 필터링
		- 현재 위치와 병원 좌표 간 거리 계산 후 가까운 5개 병원 선택
		- 각 병원 마커 생성 및 InfoWindow 표시
	- Tmap Routes API 호출 후 Polyline으로 경로 표시
		- 각 경로별 색상 지정 (colors 배열)
	- 오류 처리
		- API 호출 제한(429) → AlertDialog 호출, 메인 페이지 이동, onBlocked 콜백 호출
		- 기타 API 오류 → AlertDialog 호출 + 새로고침 옵션 제공
		- 다중 알람 방지를 위해 errorRef 사용
	- 상태 관리
		- loading 상태로 초기 지도 로딩 표시
		- 병원 경로 표시 완료 시 setLoading(false) 처리


- /_components/NearERInfo.tsx
	- 데이터 로드
		- Papa.parse를 사용하여 CSV를 다운로드하고, 위도/경도가 있는 데이터만 필터링
	- 사용자 위치 확인
		- navigator.geolocation.getCurrentPosition으로 위치 확인
		- 위치 확인 후 거리 계산 및 후보 병원 선정
	- 거리 계산
		- Haversine 공식을 사용하여 직선 거리 계산 → 후보 20개 추림
		- 후보 병원 20개만 Tmap Routes API 호출 → 실제 거리 계산
		- 각 호출마다 200ms 텀을 두어 API 과부하 방지
	- 병원 선정
		- 실제 거리 기준 상위 5개 병원을 nearestHospitals 상태에 저장
	- UI 표시
		- TableWrap 스타일로 테이블 구성
		- 열: 순위, 기관명, 소재지, 거리, 연락처
		- 로딩 중 LocalLoadingWrapper와 Loading 컴포넌트 표시
		- 거리 값은 km 단위로 표시, 값이 없으면 '-' 표시

- /_components/ERSearchForm.tsx
	- 컴포넌트 구조
		- SearchFormWrapper로 스타일링된 div 내에 select, input, button 배치.
		- Flex 레이아웃이 아닌 text-align: center 중심 정렬로 구성.
		- 버튼과 입력창, 선택창 모두 일관된 높이와 border-radius 적용.
	- 상태 관리
		- keyword, option 값을 props로 받아 상위 컴포넌트와 상태 동기화.
		- onSearch 콜백으로 검색 실행.
	- 이벤트 처리
		- input에서 Enter 키 이벤트를 감지하여 onSearch 호출.
		- select 변경 시 setOption 호출.
		- 버튼 클릭 시 onSearch 호출.
	- 스타일링
		- styled-components 사용, primary와 dark 컬러를 적용.
		- 버튼 hover 시 반투명 배경 색상 적용 (${primary}aa).
		- select와 input에 공통 높이와 padding 적용, 일관된 UX 제공.
		- React.memo 또는 useCallback 사용은 없음, 상태 변경 시 전체 렌더링 발생 가능.
	- 접근성 고려:
		- input에 placeholder 제공.
		- 버튼에 type 명시 (type="button")으로 form 제출 방지.
	- 전반적
		- 상위 상태와 완전히 동기화되도록 props 기반 설계.

- /_components/SearchERMap.tsx
	- 상태 관리
		- hospitals, keyword, search, option 등 핵심 상태를 useState로 관리.
		- mapRef, markersRef, linesRef, infosRef를 useRef로 관리하여 지도 요소 재사용 및 초기화 방지.
		- errorRef로 다중 알람 방지.
	- 지도 초기화
		- 최초 1회만 navigator.geolocation.getCurrentPosition 호출 후 지도 생성.
		- 현위치 마커와 InfoWindow 추가.
		- mapRef.current 존재 여부로 중복 생성 방지.
	- 검색 및 렌더링
		- useEffect로 search와 hospitals 변경 시 renderHospitals 호출.
		- 기존 마커, 라인, InfoWindow 제거 후 새로운 검색 결과 표시.
	- Tmap API 호출
		- 각 병원에 대해 두 번 API 호출:
		- 거리 계산 및 Polyline 그리기
		- API 제한(429) 체크 및 추가 경로 Polyline
		- distanceKm 계산 후 InfoWindow에 표시.
		- Polyline 색상은 lineColors 배열을 순환하며 지정.

	- 예외 처리
		- API 실패, 위치 불가, 검색 결과 없음 등 상황에서 useAPIAlertDialog와 useAlertDialog를 이용해 사용자 안내.
		- errorRef를 활용하여 중복 알람 방지.
		- API 호출 제한(429) 발생 시 메인 페이지 이동 또는 새로고침 안내.
		- 로딩 처리
		- loading 상태를 통해 검색/렌더링 진행 시 전체 화면 Loading 표시.
		- React Portal을 사용해 body에 Loading overlay 렌더링.

- /_components/SearchERInfo.tsx
	- props 처리
		- hospitals 배열을 받아 map으로 렌더링.
		- 검색 결과가 없을 경우 단일 row로 안내 메시지 출력.
	- 성능 최적화
		- React.memo 적용으로 props 변경 없으면 불필요한 리렌더 방지.

- /_containers/ERLContainer.tsx
		- useState로 blocked 상태 관리.
		- false일 때: 병원 목록 표시.
		- true일 때: API 호출 제한으로 인해 병원 목록 렌더링 방지.
		- NearERMap의 onBlocked prop을 통해 호출 제한 발생 시 blocked 상태 업데이트.

- /_containers/SearchMapContainer.tsx
	- 컴포넌트 구조
		- 단순히 SearchERMap을 감싸는 래퍼 컴포넌트.
		- 부모에서 전달받은 initialKeyword와 initialOption을 그대로 하위 컴포넌트로 전달.
	- props 처리
		- initialKeyword?: string과 initialOption?: 'ALL' | 'NAME' | 'ADDR' 타입 지정으로 선택적 초기값 처리.
		- 기본값이 없는 경우 SearchERMap에서 자체 초기값 사용.
	- 성능 및 유지보수
		- 단일 책임 원칙 준수: 검색 지도 컨테이너 역할만 수행.
		- 향후 검색 컨테이너에 다른 UI나 상태를 추가하기 용이.

- /_containers/SearchInfoContainer.tsx
	- CSV 데이터 로드
		- useEffect로 컴포넌트 최초 렌더링 시 /ERPlusPlus.csv를 Papa.parse로 다운로드 및 파싱.
	- 상태 관리
		- hospitals, filteredHospitals : CSV 데이터와 검색 후 필터링된 데이터를 useState로 관리.
		- keyword, option : 검색 키워드와 검색 옵션(ALL | NAME | ADDR)을 useState로 관리.
		- pagination, currentPage : 페이지네이션 상태와 현재 페이지를 useState로 관리.
		- itemsPerPage : 한 페이지당 표시할 아이템 수를 상수로 지정.
	- 검색 기능
		- handleSearch를 useCallback으로 정의:
		- hospitals 배열에서 keyword와 option 기준으로 필터링.
		- 검색 후 filteredHospitals 상태 갱신.
		- 현재 페이지를 1로 초기화하고 setupPagination 호출.
	- 페이지네이션
		- setupPagination 함수:
			- 전체 데이터와 현재 페이지를 기반으로 총 페이지 계산.
			- 10페이지 단위 그룹으로 페이지 버튼 생성.
			- 이전/다음 페이지 그룹 이동 가능하도록 prevRangePage와 nextRangePage 계산.
		- handlePageClick 함수:
			- 페이지 버튼 클릭 시 currentPage 갱신 후 해당 페이지 데이터와 페이지네이션 재계산.


- /_containers/SearchPageContainer.tsx
	- MemberPageWrapper
		- 멤버 전용 페이지 공통 레이아웃/스타일 주입.
	- ToggleButton
		- 상단 중앙에 위치한 전환 버튼.
		- 현재 화면에 따라 아이콘과 라벨이 바뀜:
			- 지도 화면일 때: 아이콘 MdList, 라벨 “목록 보기”
			- 목록 화면일 때: 아이콘 MdMap, 라벨 “지도 보기”
		- z-index: 10으로 패널 위에 떠 있어 항상 클릭 가능.
	- Panel (슬라이드 패널)
		- 지도/목록 각각을 감싸는 두 개의 절대 배치 패널.
		- active prop으로 보임/숨김과 인터랙션 가능 여부를 제어:
			- 보임: opacity: 1, transform: translateX(0), pointer-events: auto
			- 숨김: opacity: 0, transform: translateX(20px), pointer-events: none
		- 슬라이드/페이드 전환(transition: all 0.5s)으로 자연스러운 화면 교체.
		- margin-top: 100px으로 상단 토글 버튼 영역과 시각적으로 분리.
	- SearchMapContainer
		- 지도 기반 검색 화면을 담당하는 하위 컨테이너.
		- initialKeyword, initialOption을 받아 내부에서 지도/경로/마커 렌더링 등 제공.
	- SearchERInfoContainer
		- 목록(테이블) 기반 검색 화면을 담당하는 하위 컨테이너.
		- initialKeyword, initialOption을 받아 내부에서 필터링/페이지네이션 등 제공.

- /api/mapRoute/route.ts
	- 쿼리 파라미터 검증
		- startX, startY, endX, endY 중 하나라도 없으면 400 Bad Request 반환
	- Tmap API 호출
		- URL 구성 시 NEXT_PUBLIC_TMAP_API_KEY 사용
		- 요청 옵션:
			- version=1, format=json
			- 좌표 타입: WGS84GEO
			- searchOption=1, trafficInfo=Y
	- 응답 처리
		- HTTP 429 → 클라이언트에 API 호출 제한 초과 메시지 + 429 상태 코드 반환
		- 기타 HTTP 오류 → 상태 코드와 에러 메시지 전달
		- 정상 응답 → JSON 데이터 그대로 반환
	- 예외 처리
		- 네트워크 또는 기타 예외 발생 시 500 Internal Server Error 반환
		- 콘솔에 에러 로그 기록

- /hooks/useAPIAlertDialog.tsx
	- 핵심 기능
		- SweetAlert2(Swal.fire)를 활용한 재사용 가능한 알림 훅
		- mainCallback과 reloadCallback에 따라 Confirm / Cancel 버튼 동적으로 표시
		- 버튼 텍스트(mainText, reloadText) 기본값 제공 → 재사용성 높음
	- global에 `useAlertDialog.tsx`가 있지만, 추가 구현한 이유:  
		- Tmap 지도를 렌더링할 때 폴리라인이 먼저 렌더링되면, **처음 렌더링된 폴리라인이 표시되지 않는 오류**를 방지하기 위함
- /types/SearchERInfoTypes.ts
	- 병원 정보 관련 타입 공통화


### 🖼️ 구현 이미지
<a href="https://chulfudoc.xyz">
  <img src="https://raw.githubusercontent.com/koreait1/chulfudoc-front/master/img/jyh/1.png" alt="철푸닥" width="300"/>
</a><br />

---
## 👤 최상준

### ⚙️ 기능 설명

### 📝 코드 리뷰

### 🖼️ 구현 이미지
<a href="https://chulfudoc.xyz">
  <img src="https://raw.githubusercontent.com/koreait1/chulfudoc-front/master/img/sang/1.png" alt="철푸닥" width="300"/>
</a><br />

---
## 👤 김문수

### ⚙️ 기능 설명
**회원 인증/관리 서비스**
✅ 회원 가입
	- 회원 가입 시 필수 입력 항목 체크
	- 중복(아이디, 이메일), 패스워드 보안 레벨, 이메일 형식, 휴대전화 번호 형식 검증
	- REST API를 활용한 소셜 연동 회원 가입
- 로그인
	- 로그인 필수 항목 정보 전달 -> BE에서 회원 존재 여부 체크 -> JWT 토큰 발급
	- 소셜 계정 : 소셜 토큰 체크 -> JWT 토큰 발급
- 본인 인증(이메일)
	- 이메일 형식 체크 후 이메일 발송(템플릿 형태) 요청
	- Redis 내 인증번호 임시 저장(BE) -> 입력한 인증번호와 일치 여부 체크
✅ 메인페이지
- 홈페이지 컨셉에 맞는 스타일링
- UI 기획 및 제작

### 📝 코드 리뷰
- AuthNumButton.tsx : CSR 방식 이메일 인증에 사용되는 공통 버튼 컴포넌트(메일 발송, 이메일 인증 등 어떤 목적에도 대응할 수 있도록 설계)
- member/_services/actions.ts : 회원 가입, 로그인, 회원정보 조회를 위한 메서드 통합 정의
- member/_component : 회원 가입, 로그인 등에 필요한 폼 정의
- main/ 메인페이지 UI 구현

### 🖼️ 구현 이미지
<p align="center">
  <img src="https://raw.githubusercontent.com/koreait1/chulfudoc-front/master/img/jys/1.png" alt="철푸닥" width="800"/>
  <img src="https://raw.githubusercontent.com/koreait1/chulfudoc-front/master/img/jys/2.png" alt="철푸닥" width="800"/>
  <img src="https://raw.githubusercontent.com/koreait1/chulfudoc-front/master/img/jys/3.png" alt="철푸닥" width="800"/>
  <img src="https://raw.githubusercontent.com/koreait1/chulfudoc-front/master/img/jys/4.png" alt="철푸닥" width="800"/>
  <img src="https://raw.githubusercontent.com/koreait1/chulfudoc-front/master/img/jys/5.png" alt="철푸닥" width="800"/>
  <img src="https://raw.githubusercontent.com/koreait1/chulfudoc-front/master/img/jys/6.png" alt="철푸닥" width="800"/>
  <img src="https://raw.githubusercontent.com/koreait1/chulfudoc-front/master/img/jys/7.png" alt="철푸닥" width="800"/>
  <img src="https://raw.githubusercontent.com/koreait1/chulfudoc-front/master/img/jys/8.png" alt="철푸닥" width="800"/>
  <img src="https://raw.githubusercontent.com/koreait1/chulfudoc-front/master/img/jys/9.png" alt="철푸닥" width="800"/>
</p>

---
## 👤 김용준

### ⚙️ 기능 설명
- **모달 (LayerPopup)**
  - `react-modal`을 래핑한 공통 팝업 컴포넌트
  - `isOpen`, `onClose`, `title`, `width`, `height` 등 props로 다양한 화면에서 재사용 가능
  - 닫기 버튼과 헤더 스타일을 포함해 일관된 UX 제공
  - 로그인, 권한 안내, 마이페이지 등 다양한 화면에서 활용
- **Alert (알림)**
  - 기존 `window.alert()`의 투박하고 제각각인 UI 문제 해결
  - 공통 디자인을 적용한 `AlertDialog` 컴포넌트 제작
  - `alertDialog("메시지")` 한 줄로 호출 가능
  - 프로젝트 전반에 걸쳐 같은 모양과 UX로 알림 제공
- **스타일 시스템**
  - `styled-components` 기반 디자인 시스템 적용
  - `_global/styles/color.ts`, `fontsize.ts` 등 전역 상수 관리
  - 색상, 폰트, 레이아웃을 통일해 모든 화면에서 동일한 느낌 제공
  - 반응형 고려 → 320px ~ 1150px까지 대응
- **파일 업로드 UI**
  - `FileUpload.tsx`, `FileUploadBox.tsx`, `ImageUploadBox.tsx` 구현
  - 클릭 업로드 + Drag & Drop 지원
  - 업로드된 파일/이미지 미리보기를 `FileImages.tsx`로 제공
  - 어디서든 같은 방식으로 작동해 UX의 일관성을 유지
  - 서버 연동을 고려해 업로드/다운로드/썸네일 처리와 연결됨
  
### 📝 코드 리뷰
- _global/components/LayerPopup.tsx
	- react-modal 래핑 공통 모달
	- isOpen/onClose/title/width/height로 재사용
	- 닫기 버튼 포함, 전역 색/폰트로 일관 UX
- _global/hooks/useAlertDialog.tsx
	- SweetAlert2 기반 공통 알림 훅
	- alertDialog({ title, text, icon, callback }) 한 줄 호출
	- 확인 시 callback 실행(선택)
- _global/components/FileUpload.tsx
	- 버튼 클릭 → 동적 <input type="file"> 생성
	- single, imageOnly 옵션 지원
	- useFetchCSR로 업로드, 결과는 onUploaded로 전달
	- 실패 시 useAlertDialog로 안내
- _global/components/FileImages.tsx
	- 업로드 이미지 리스트/미리보기
	- next/image 사용, 썸네일 그리드
	- 클릭 시 LayerPopup으로 확대 보기
	- viewOnly/viewOrgImage로 동작 제어
- _global/styles/color.ts, fontsize.ts
	- 전역 팔레트/폰트 크기 토큰
	- 화면 전반 색·모양 일관성 유지
	- 직접 값 대신 토큰 사용 권장

### 🖼️ 구현 이미지
<a href="https://chulfudoc.xyz">
  <img src="https://raw.githubusercontent.com/koreait1/chulfudoc-front/master/img/kyj/1.png" alt="철푸닥" width="300"/>
</a><br />

---
## 👤 주예성

### ⚙️ 기능 설명
회원 관리
- 관리자(admin)에서 회원목록 조회(어드민, 멤버 권한 분기)
- 키워드 검색 : 이메일, 이름, 휴대폰, 아이디로 조회가능
- PUUID, 회원, 이름, ID, E-mail, 연락처, 소셜 연동(카테고리)들 조회 가능
게시판 관리
- 키워드 검색 : 게시판 ID, 게시판 이름으로 조회가능
- 생성되어있는 게시판 조회기능 아래에 목록으로 구현
- 게시판 등록 : 게시판 기본 설정 및 분류, 스킨, 권한 등으로 게시판을 만들 수 있음
게시판
- 비회원, 회원, 관리자 등 권한을 통해 글쓰기 및 글보기, 글삭제, 글수정 가능
- 비회원 일 시 비밀번호 검증을 통해 재확인 후 삭제 및 수정 가능
- 회원은 본인 검증을 통해 삭제 및 수정 가능함
- 관리자는 검증 없이 삭제 및 수정 가능
- 검색 기능을 통해 게시판 내의 게시글 검색 가능함
- 분류 설정 시에 메인타이틀 아래에 분류별 필터 가능
- 생성된 게시판들을 메인타이틀 위에 리스트로 띄워놓음

### 📝 코드 리뷰
- 게시판쪽 
- 컴포넌트
- BoardCategory.tsx
    - 게시판 카테고리 필터 UI 제공
        - useSearchParams로 URL 쿼리(?category=) 확인
        - 전체 버튼과 카테고리별 버튼을 렌더링
- BoardForm.tsx
    - 게시글 작성/수정 폼 컴포넌트. 게시판 설정(에디터/파일/카테고리/공지)과 사용자 상태(관리자/게스트)에 따라 입력 항목과 업로드 기능을 동적으로 제공.
        - board: 게시판 설정(에디터 사용, 이미지 업로드, 첨부파일, 카테고리 등) 제어
        - data: 폼 값 및 모드(register/update), 파일 그룹 gid, 공지 여부 notice, 게스트 여부 guest 등
        - errors: 필드별 검증 메시지 출력
        - pending: 제출 중 로딩/버튼 비활성화 제어
        - action: 서버 액션(폼 action으로 전달)
        - onChange, onToggle, editorCallback, fileUploadCallback, fileDeleteCallback: 상위 컨테이너 로직과 연동되는 이벤트 핸들러
- BoardListItems.tsx
    - 게시판 목록 컴포넌트. 게시글 리스트를 화면에 출력하고, 공지/카테고리 뱃지·제목·작성자·작성일·조회수를 함께 표시.
        - items: BoardDataType[] 형태의 게시글 배열 전달
        - BoardItem: 개별 게시글 항목 렌더링, 상세 페이지(/board/view/{seq})로 이동 링크 포함
        - createdAt 기준으로 방금전/몇 분 전/몇 시간 전 → 일정 시간이 지나면 yyyy.MM.dd HH:mm 포맷으로 표시
        - 게시글이 없을 경우 “조회된 게시글이 없습니다.” 메시지 출력
- BoardSearchForm.tsx
    - 게시판 검색 폼과 글작성 진입 링크 제공.
        - GET /board/list/{bid}로 검색 요청 전송(쿼리 파라미터 유지)
        - category가 있으면 hidden 필드로 분류 필터 유지
        - 검색 옵션(sopt: 통합/제목/내용/제목+내용/이름) + 검색어(skey) 입력
        - 게시판이 writable이면 글작성 링크(/board/write/{bid}) 노출
    - 입력
        - search?: BoardSearchType – 초기 검색 상태(카테고리/옵션/키워드)
        - board?: BoardConfigType – 게시판 식별자(bid), 작성 가능 여부(writable)
- BoardView.tsx
    - 게시글 상세 화면 컴포넌트. 
    - 제목/공지·카테고리 뱃지, 작성자·작성일·조회수, 본문(에디터/텍스트 지원), 첨부파일 목록을 표시하고, 목록/수정/삭제/작성 이동·액션 링크를 제공.
- BoardList.tsx
    - 게시판 목록 페이지의 컨테이너 컴포넌트.
    - BoardCategory: 카테고리 필터 표시
    - BoardListItems: 게시글 리스트 출력
    - BoardSearchForm: 검색 폼 및 글쓰기 버튼 제공
    - 특징: 전달받은 board, items, search를 하위 컴포넌트에 연결하여 목록 화면 전체를 조립하는 역할.
- CommentForm.tsx
    - 댓글 작성/수정 폼 컴포넌트.
    - 폼 hidden 값: guest, mode(comment_write/comment_update), seq, boardDataSeq 관리
    - 입력 항목: 작성자(commenter), 게스트일 경우 비밀번호(guestPw), 댓글 내용(content)
    - 상태 표시: errors 객체를 통해 각 필드별 검증 메시지 출력
- CommentItems.tsx
    - 댓글 목록 컴포넌트. 각 댓글의 작성자/이메일, 작성일, 본문을 표시하고 권한에 따라 수정/삭제 액션을 제공.
    - CommentItem: 개별 댓글 렌더링
    - 본문은 nl2br로 줄바꿈 반영
    - editable일 때만 버튼 노출:
    - 삭제: 확인 다이얼로그 후 router.push('/board/comment/delete/{seq}')
    - 수정: /board/comment/{seq} 이동
    - items가 없거나 비어 있으면 렌더링 생략 (빈 상태 UI는 별도 처리 전제)
- BoardTabs.tsx
    - 여러 게시판 간을 전환할 수 있는 탭 내비게이션 컴포넌트.
    - boards: 게시판 설정 배열(BoardConfigType[]) → 각각 탭으로 렌더링
    - activeBid: 현재 활성화된 게시판 식별자, 해당 탭에 on 클래스 적용
    - 각 탭은 /board/list/{bid} 경로로 이동
- PasswordForm.tsx
    - 비회원 게시글/댓글 수정·삭제 시 비밀번호 확인을 위한 폼 컴포넌트.
    - mode, seq: hidden 필드로 동작 모드 및 대상 글/댓글 식별자 전달
    - password: 비회원 비밀번호 입력 필드
    - errors: 각 필드 및 전역 에러 메시지 출력
    - pending: 제출 중 로딩 처리 및 버튼 비활성화
- BoardForm.tsx / BoardList.tsx / BoardView.tsx
    - 게시판의 스킨(skin) 설정에 따라 다른 UI 컴포넌트를 로드하는 래퍼 컴포넌트.
    - board.skin 값이 gallery면 GallerySkin, 그 외는 DefaultSkin 사용
    - BoardForm: 글 작성/수정 화면용 스킨 로더
    - BoardList: 게시글 목록 화면용 스킨 로더
    - 공통적으로 board가 존재해야만 렌더링 수행
- Comment.tsx
    - 게시판의 댓글 영역을 스킨별로 나누어 렌더링하는 래퍼 컴포넌트.
    - board.skin 값이 gallery면 GalleryFormSkin + GalleryItemsSkin, 그 외는 DefaultFormSkin + DefaultItemsSkin 로드
    - FormSkin: 댓글 작성/수정 폼
    - ItemsSkin: 댓글 목록
- 컨테이너
- CommentContainer.tsx
    - 댓글 폼/목록을 제어하는 컨테이너 컴포넌트. 상태 초기화, 입력 변경, 서버 액션 연동을 담당하고, 표시 자체는 Comment(스킨 로더)에 위임.
    - 초기 폼 상태 구성: 로그인 여부 기준으로 guest 설정, loggedMember.name을 기본 작성자로 세팅, 대상 글(boardDataSeq) 연결.
    - 입력 핸들링: onChange로 로컬 폼 상태 병합 업데이트.
    - 제출 처리: useActionState(processComment)로 서버 액션 바인딩 → [errors, action, pending] 관리.
    - 렌더링: Comment에 board, data, items, 폼/에러/액션/로딩 전달(스킨에 따라 폼·목록 출력).
- UpdateContainer.tsx
    - 게시글 작성/수정 컨테이너. 폼 상태/검증/파일업로드 후속처리/에디터 연동을 담당하고 화면은 BoardForm에 위임.
    - 초기화: data.mode === 'write'이면 로그인 여부로 guest 설정, 로그인 시 poster = loggedMember.name.
    - 서버 액션: useActionState(processUpdate) → [errors, action, pending] 관리.
    - 입력 처리: onChange(일반 필드 병합), onToggle(불리언·토글 값 반영).
    - 에디터 참조: editorCallback로 에디터 인스턴스 보관(useRef).
    - 파일 업로드 후속처리: fileUploadCallback
    - 업로드 항목을 location 기준으로 에디터 이미지(editorImages) / 일반 첨부(attachFiles) 분류, immer(produce)로 배열에 push.
    - 에디터 이미지가 있으면 editorRef.current.execute('insertImage', { source: urls })로 본문에 삽입.
    - 파일 삭제 후속처리: fileDeleteCallback
    - location에 따라 대상 배열 선택 후 seq 기준으로 필터링.
    - 렌더링: CommonContainer로 래핑 후 BoardForm에 모든 핸들러/상태 전달.
- ViewContainer.tsx
    - 게시글 상세 화면 컨테이너. 제목 세팅, 삭제 액션 처리, 화면 렌더링을 조립.
    - 페이지 타이틀 세팅: useLayoutEffect로 CommonContext.setMainTitle(${data.subject}|${board.name}) 호출.
    - 삭제 처리: 확인 다이얼로그 후 /board/delete/{seq}로 라우팅(router.push).
    - 렌더링: CommonContainer로 래핑하고 BoardView에 onDelete 전달.
- 훅
- useBoardConfig.ts
    - 게시판 설정 정보 조회용 커스텀 훅. 기본값을 초기화하고, 특정 bid가 주어지면 서버에서 설정을 불러와 상태로 관리.
    - 기본 상태: mode = 'register', 페이징/권한/스킨/파일옵션 등 초기값 세팅.
    - bid 존재 시 /board/config/{bid} 호출(fetchSSR).
    - 응답이 정상(200)일 경우 mode = 'update'로 전환 후 데이터 갱신.
    - 반환값: 현재 게시판 설정 객체.
- 서비스
- action.ts
    - processUpdate(errors, formData)
    - 게시글 등록/수정 처리.
    - getBoardConfig(bid)로 게시판 설정 확인(없으면 오류 반환).
    - 필수값 검증: bid, gid, poster, subject, content (+ mode==='update'면 seq).
    - API 호출: POST/PATCH /board/update (JSON).
    - 성공 시 리다이렉트: board.afterWritingRedirect === true → /board/view/{seq} 그 외 → /board/list/{bid}
    - 실패 시: 응답 messages를 그대로 에러로 반환.
    - processPassword(errors, formData)
    - 비회원 비밀번호 검증 후 다음 액션으로 라우팅.
    - 파라미터 검증: seq, mode(허용: update|delete|comment_update|comment_delete), password.
    - API 호출:
    - 댓글: POST /board/password/comment/{seq}
    - 글: POST /board/password/{seq}
    - 성공(204) 시 리다이렉트: 
    - delete → /board/delete/{seq}
    - comment_delete → /board/comment/delete/{seq}
    - comment_update → /board/comment/{seq}
    - 그 외 → /board/update/{seq}
    - 실패 시: { password: messages } 형태로 에러 반환.
    - processComment(errors, formData)
    - 댓글 등록/수정 처리.
    - 필수값 검증: boardDataSeq, mode(수정이면 seq), commenter, content, (게스트면 guestPw).
    - API 호출: POST/PATCH /board/comment (JSON).
    - 성공 시: /board/view/{boardDataSeq}#comment_{seq}로 리다이렉트(해시로 해당 댓글 위치 이동).
    - 실패 시: 응답 messages를 에러로 반환.
- boardConfig.ts
    - 게시판 설정/목록을 서버에서 조회해 전달하는 서비스 유틸.
    - getBoardConfig(bid?: string): Promise<BoardConfigType>
    - GET /board/config/{bid} 조회 성공 시 mode='update'로 반환
    - bid 없거나 실패 시 defaultData 반환
    - getBoardList(searchParams: CommonSearchType): Promise<{ items?, pagination? }>
    - 쿼리스트링(toQueryString) 구성 → GET /board/configs/all 호출
    - 성공 시 목록/페이지네이션 객체 반환, 실패 시 빈 객체 {} 반환
- boardData.ts
    - 게시글 단건 조회 및 게시판별 목록 조회 서비스.
    - get(seq?: number): Promise<BoardDataType>
    - seq 없을 때: 새 글 작성용 기본 데이터 반환 (mode='write', gid=uuid(), 빈 필드 초기화).
    - seq 있을 때: GET /board/info/{seq} 호출.
    - 성공 시: 게시글 데이터 반환 (mode='update, bid 매핑, createdAt/modifiedAt/deletedAt → Date 변환, guestPw 제거).
    - 실패 시: 빈 값이지만 mode='update'로 반환.
    - getList(bid: string, search: BoardSearchType): Promise<BoardListType>
    - GET /board/list/{bid}{qs} 호출 (검색 조건 포함).
    - 성공 시: items 배열의 createdAt/modifiedAt/deletedAt를 Date 객체로 변환 후 목록 반환.
    - 실패 시: 빈 객체 {} 반환.
- comment.ts
    - 댓글 단건/목록 조회 및 삭제 기능 제공.
    - get(seq: number)
    - GET /board/comment/{seq} 호출.
    - 성공 시: 단일 댓글 반환 (createdAt/modifiedAt/deletedAt → Date 변환, guestPw 제거).
    - 실패 시: 빈 객체 반환.
    - getList(seq: number)
    - GET /board/comments/{seq} 호출 → 해당 게시글의 댓글 목록 조회.
    - 성공 시: 각 항목에 processData 적용 후 반환.
    - 실패 시: 빈 배열 반환.
    - deleteComment(seq: number)
    - DELETE /board/comment/{seq} 호출.
    - 성공 시: 응답 JSON 반환.
    - processData(item: CommentDataType)
    - 날짜 필드를 Date 객체로 변환.
    - guestPw를 빈 문자열로 초기화(보안 목적).
- 래퍼컨테이너
- CommonContainer.tsx
    - 게시판 화면 공통 접근 제어/예외 처리 래퍼. 하위 UI를 감싸서 권한·에러·비회원 비밀번호 인증 흐름을 통합 관리.
    - 리소스 검사: mode in ['update','view']인데 data.seq 없거나, board 없으면 알림 후 이전 페이지로 이동.
    - 권한 체크(목록/보기/작성): board.active와 listable/viewable/writable 조합으로 접근 허용 여부 판단(관리자면 우회).
    - 작성자 권한 체크(수정/삭제/댓글 수정·삭제):
    - 대상이 비회원 글이고 본인 인증 안 됨 → 비밀번호 확인 화면으로 전환(PasswordContainer).
    - 대상이 회원 글인데 비로그인 → 로그인 페이지로 리다이렉트(redirectUrl 포함).
    - 대상이 회원 글인데 다른 회원 → 권한 없음 알림 후 이전 페이지.
    - 렌더링 분기: 에러/인증 요구 시 전용 화면, 그 외에는 children 그대로 렌더.
- 어드민쪽
- 멤버
- 컴포넌트
- MemberItems.tsx
    - 역할: 회원 목록 테이블 렌더링 및 체크박스 선택/전체 선택 토글 제공.
    - 컬럼: PUUID / 회원 이름 / ID / E-mail / 연락처 / 소셜 연동
    - onToggle(memberId?, mode?): 행 선택 토글 및 헤더 클릭 시 전체 선택/해제
    - isCheckAll: 헤더 체크박스 상태 반영
    - 소셜 연동 표기: socialChannel 또는 socialProviders 배열을 문자열로 표시
    - 데이터 없을 때 “조회된 회원이 없습니다.” 출력
- MemberSearchForm.tsx
    - 회원 검색 폼. 키워드/권한 조건으로 회원 목록을 필터링하는 기능 제공.
    - sopt: 검색 옵션 (ALL, EMAIL, NAME, MOBILE, ID)
    - skey: 검색 키워드 입력
    - authorities: 권한 필터 (체크박스 ADMIN, MEMBER)
    - 다중 권한 체크를 Set으로 관리하여 초기 상태 반영 (defaultChecked).
    - GET 방식으로 요청, 검색 버튼(SubmitButton) 클릭 시 서버에 전달.
- 컨테이너
- ListContainer.tsx
    - 회원 목록 화면의 검색/목록/페이지네이션을 조립하고, 행 선택/전체 선택 상태를 관리.
    - 초기 상태: items를 받아 로컬 상태 _items로 관리(chk 필드 추가).
    - onToggle:
    - mode=check|uncheck → 전체 선택/해제 처리.
    - 특정 memberId 클릭 → 개별 선택 토글 후 전체 선택 여부 재계산.
    - MemberSearchForm(검색 조건 입력)
    - MemberItems(목록 테이블, 선택 상태 전달)
    - Pagination(페이지 이동)
- 관리자
- 컴포넌트 
- BoardConfigForm.tsx
    - 게시판 설정 폼. 게시판 기본정보·기능 옵션·스킨·권한을 입력/토글하여 저장.
    - 기본정보: bid(수정 시 고정), name, rowsForPage, pageCount
    - 기능 토글: active, editor, imageUpload, attachFile, comment, afterWritingRedirect, showViewList (라디오 UI → onKeyValue로 상태 반영, hidden으로 전송)
    - 분류(category): 여러 줄 입력 → 엔터로 구분
    - 스킨(skin): default / gallery
    - 권한: listAuthority, viewAuthority, writeAuthority, commentAuthority → ALL / MEMBER / ADMIN
- BoardItems.tsx 
    - 관리자 화면에서 게시판 리스트 테이블 표시 및 체크박스 선택/전체 선택, 일괄 삭제 트리거 제공.
    - 헤더 체크박스로 전체 선택/해제 (onToggle(undefined, 'check'|'uncheck'))
    - 행 클릭으로 개별 선택 토글 (onToggle(bid))
    - 액션 링크:
    - 설정수정: /admin/board/update/{bid}
    - 미리보기: /board/list/{bid} (새 탭)
    - 하단 액션바: 선택한 게시판 삭제하기 버튼 (onRemove)
- BoardSearchForm.tsx 
    - 관리자 화면에서 게시판 목록 검색 폼 제공.
    - 검색 조건
    - sopt: 검색옵션 (ALL, BID, NAME)
    - skey: 검색 키워드
- 컨테이너
- ListContainer.tsx (관리자용 게시판 목록 컨테이너)
    - 관리자 게시판 목록 페이지 조립 및 상태 관리.
    - 검색: BoardSearchForm 렌더링
    - 목록: BoardItems에 데이터/선택 상태 전달
    - 페이지네이션: Pagination 연결
    - 선택 관리: 전체/개별 체크 토글(onToggle), isCheckAll 동기화
    - 삭제: 선택 여부 확인 후 확인 다이얼로그로 일괄 삭제 트리거(onRemove)
- UpdateContainer.tsx
    - 관리자 게시판 설정 등록/수정 화면의 상태·검증·제출을 관리하고, 표시/입력은 BoardConfigForm에 위임.
    - 폼 상태 로컬 관리: useState(data)로 초기화
    - 서버 액션 바인딩: useActionState(processBoardConfig) → [errors, action, pending]

### 🖼️ 구현 이미지
<a href="https://chulfudoc.xyz">
  <img src="https://raw.githubusercontent.com/koreait1/chulfudoc-front/master/img/jys/1.png" alt="철푸닥" width="300"/>
</a><br />
