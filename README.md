# ssfAdmin

# 🛠️ SSF 쇼핑몰 관리자 페이지

SSF 쇼핑몰의 관리자 전용 웹 애플리케이션입니다.  
관리자는 상품 및 고객 데이터, 주문 내역을 관리하고  
WebSocket을 활용해 상품 등록, 회원 생성, 배송 상태 등의 정보를 고객 페이지와 연동할 수 있습니다.

> 이 프로젝트는 `React` 기반의 관리자 전용 프론트엔드 애플리케이션입니다.

---

## 🖥️ 프로젝트 소개

고객 페이지와 연동되는 관리자 페이지로,  
**쇼핑몰 운영을 위한 실시간 상품/주문/회원 관리**를 목표로 제작되었습니다.

## 🕰️ 개발 기간

2025-02-17 ~ 2025-03-14

---

## ✒️ 프로젝트 목표
 
1. 관리자 페이지의 전반적인 기능 흐름 이해 및 구현  
2. 실시간 데이터 관리 (상품 등록, 배송 상태, 회원 정보 등) 구현  
3. WebSocket을 활용한 양방향 데이터 처리 경험  
4. 상품 및 주문 관리 UI를 효율적으로 구성하고 API 통신 연동

---

## **🗂️ 전체 구조도**

![구조도](./assets/admin_relationship.png)


## 📋 ERD

![ERD](./assets/erd.png)


## 📌 주요 기능

### 🔐 관리자 인증
- JWT 기반 로그인
- 인증 토큰 발급 및 localStorage 저장

### 🛒 상품 관리
- 전체 상품 목록 조회
- 상품 등록 / 목록 조회
- 실시간 등록 시 고객 페이지에 자동 반영 (WebSocket)

### 👤 고객 및 비회원 관리
- 회원 리스트 조회 및 상세 정보 확인
- **비회원 주문자 정보도 포함하여 주문 관리**
- 신규 회원 생성 시 → 실시간 고객 페이지 반영

### 📦 주문 내역 및 배송 관리
- 전체 주문 내역 확인
- 배송 상태 확인 및 상태 변경
- "배송 확인" 버튼 클릭 시 → 고객 페이지에 WebSocket으로 실시간 전송  
  → 고객이 마이페이지에서 배송 완료 확인 및 리뷰 작성 가능

---

## 📡 WebSocket 연동 기능

- 상품 등록 → 고객 페이지에 실시간 반영  
- 회원 가입 → 관리자 페이지에서 실시간 확인  
- 배송 상태 변경 → 고객 페이지 마이페이지에 실시간 알림  
- 리뷰 버튼 노출 트리거 등 양방향 상호작용 가능

---

## 🧑‍💻 기술 스택

- **Frontend**: React, React Router
- **상태 관리**: Context API
- **API 통신**: Axios
- **실시간 통신**: WebSocket
- **스타일링**: CSS
- **배포**: AWS

---

## 📸 화면 구성 예시

(이미지 캡처 파일 경로가 `./assets/`에 있을 경우)

### 🔐 로그인
![login](./assets/adminLogin.png)

### 📋 회원 관리
![user](./assets/user.png)

### 📦 상품 관리
![products](./assets/products.png)

### 📋 주문 및 배송 관리
![orders](./assets/orderList.png)

### 📋 상품 등록
![product_update](./assets/product_update.png)

---
## ✅프로젝트 배포 주소
#### http://ssf-client.s3-website.ap-northeast-2.amazonaws.com/ 고객페이지 배포 주소
#### http://ssf-admin-client.s3-website.ap-northeast-2.amazonaws.com/ 관리자 페이지 배포 주소

관리자 -> 고객페이지 순으로 열어야 합니다.

---
## 🎥 프로젝트 시연 영상
고객페이지와 관리자 페이지의 웹소켓을 이용한 상호작용을 보여주기 위해 동영상을 짧게 생성하여 여러개로 구분지었습니다.

### ✅회원가입_로그인
[![회원가입_로그인](https://img.youtube.com/vi/0yn8tjTnUgE/0.jpg)](https://youtu.be/0yn8tjTnUgE)

### ✅회원로그인_장바구니_구매
[![회원로그인_장바구니_구매](https://img.youtube.com/vi/-pn6iaqh-N0/0.jpg)](https://youtu.be/-pn6iaqh-N0)

### ✅바로구매_리뷰_상품상세페이지
[![바로구매_리뷰_상품상세페이지](https://img.youtube.com/vi/IQORc-w5BfY/0.jpg)](https://youtu.be/IQORc-w5BfY)

### ✅검색
[![검색](https://img.youtube.com/vi/YsOE5wedhVI/0.jpg)](https://youtu.be/YsOE5wedhVI)

### ✅비회원구매
[![비회원구매](https://img.youtube.com/vi/E7vRAQ-BUXY/0.jpg)](https://youtu.be/E7vRAQ-BUXY)

### ✅상품업데이트
[![상품업데이트](https://img.youtube.com/vi/jHye2_Z2KgQ/0.jpg)](https://youtu.be/jHye2_Z2KgQ)

## 🚀 실행 방법

```bash
cd client
npm install
npm start

cd server
node server.js

✅ 배포 링크
고객 페이지: http://ssf-client.s3-website.ap-northeast-2.amazonaws.com/
관리자 페이지: http://ssf-admin-client.s3-website.ap-northeast-2.amazonaws.com/

반드시 관리자 -> 고객페이지 순으로 열어주세요!!!!

✅ 회원 (대표 실험 회원)
ID : zaqzaq123
PWD : zaqzaqzaq123

✅ 관리자
ID : superadmin
PWD : superadmin123

✅ 비회원
- 로그인하지 않고 상품 구매 시 휴대폰 인증 후에 비회원 생성. 
- 구매 시 주문번호 생성
- 비회원 로그인 시 이름, 휴대폰 번호, 주문번호로 주문상태 확인 가능
--



