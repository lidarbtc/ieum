# 검색과 공유 설정

대표 주소는 https://ieum.lidar.blog/ 입니다. 제목, 설명, 대표 주소는 `site.config.js`에서 관리합니다.

## Cloudflare Pages

빌드 명령은 `npm run build`, 배포 디렉터리는 `dist/`입니다. 빌드할 때 메타태그와 WebSite 구조화 데이터를 HTML에 넣고 `public/` 파일을 복사합니다. `robots.txt`와 `sitemap.xml`도 이때 생성합니다.

`/index.html`은 `/`로 이동합니다. 현재 도메인의 HTTP→HTTPS 이동은 Cloudflare에서 처리합니다. 존재하지 않는 주소는 `404.html` 내용과 404 상태로 응답합니다.

Cloudflare Pages의 캐시 기본값을 사용합니다. 미리보기 배포의 `X-Robots-Tag: noindex`는 Pages에서 관리합니다.

## 파비콘과 공유 이미지

- `public/favicon.svg`: 브라우저용 벡터 아이콘
- `public/favicon.ico`: 16, 32, 48픽셀 아이콘
- `public/favicon-96x96.png`: 96픽셀 PNG 아이콘
- `public/apple-touch-icon.png`: 180픽셀 홈 화면 아이콘
- `public/og-image.png`: 1200×630 공유 이미지
- `assets/og-image.svg`: 공유 이미지 원본. 글꼴은 Noto Sans CJK KR입니다.

Pages 빌드는 저장소에 포함한 PNG와 ICO를 복사합니다. 개발 서버는 `public/` 변경도 감지합니다. 메타 설정이나 빌드 스크립트를 수정했다면 개발 서버를 다시 실행합니다.

## Google Search Console

사이트 소유 확인은 기존 DNS 인증을 사용합니다.

Search Console에서 인증한 속성을 선택하고 사이트맵 메뉴에 아래 주소를 제출합니다.

https://ieum.lidar.blog/sitemap.xml

홈페이지 URL 검사에서 색인 상태와 Google이 읽은 HTML을 확인할 수 있습니다. 사이트맵 공개나 제출만으로 검색 노출이 보장되지는 않습니다.

네이버 등록은 진행하지 않습니다.
