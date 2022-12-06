# 🐥Wuri-Duri-Backend🐥

<br>

![logo_mini](https://user-images.githubusercontent.com/55133871/205550376-3fee300c-1fb9-4007-9fe2-bb6039949815.png)

![bedge](https://img.shields.io/badge/WuriDuri_Server-Kim&Jang-fed041)
![bedge](https://img.shields.io/badge/version-1.0.0-143e68)

### <b>우리 둘이 만들어가는 이야기, "우리두리"</b>

> 우리두리의 서버 코드 저장소입니다.
> <br>v 1.0.0 배포 : 12.06.22 <br>

<br/>
<br/>

## 📖 테스트 유의사항

1. 테스트는 'postman' 사용을 권장합니다.<br/>
2. [API 위키](https://github.com/Wuri-Duri/Wuri-Duri-Backend/wiki)를 참고하여 base_url에 각 API에 맞는 세부 url, request body/params를 갖춰 API를 호출하면 response를 받아볼 수 있습니다.
3. user_idx나 book_idx가 필요한 API들이 있습니다. 정상적인 테스트를 위해서 아래의 순서대로 API를 호출하는 것을 추천합니다.
   > 1. [POST] 회원가입/로그인
   > 2. [POST] 첫 문장 생성
   > 3. [POST] 문장 생성 반복
   > 4. [POST] 책 생성 완료
   > 5. [GET] 전체 책 리스트 불러오기
   > 6. [GET] 특정 책 내용 불러오기

<br/>

![image](https://user-images.githubusercontent.com/55133871/205956200-6cd2316a-da55-42b6-800b-5c06c651c58c.png)
![image](https://user-images.githubusercontent.com/55133871/205956232-55371639-560d-4c3e-b4d5-c126f0ad8b1e.png)

<br/>
