# 대한민국 걸그룹 공유 멤버 그래프 — 병렬 조사판

기준일: 2026-09-15. 첨부 목록 전체를 토대로 구성한 탐색용 데이터이며, 대한민국 여성 그룹의 완전한 역사적 전수조사로 주장하지 않는다.

## 집계

- 입력 610행 → 바바 중복 1행 통합 → 609개 명칭. 데이드림 2016/2020은 별개 노드.
- 기본 범위: 617개 그룹, 159개 그룹 쌍 연결.
- 연결 성분: 두 그룹 이상 31개, 최대 71개 그룹.
- 연결이 있는 그룹: 159개. 연결 미발견: 458개 (74.2%).
- 관련 이력 조사 대상으로 기록된 기본 그룹 165개. 이것도 멤버 전원의 전체 이력 검증을 뜻하지 않는다.
- 조사된 유닛·해외·혼성까지 확장: 626개 노드, 178개 간선.

## 규칙과 범위

- 노드: 그룹의 활동명. 동일인 정식 데뷔·공연·음원 등 그룹 활동을 확인하면 두 그룹을 무방향 간선으로 연결한다. 동시 소속도 포함한다.
- 동일인이 A, B, C에서 활동했다면 A–B, B–C, A–C 세 간선을 모두 둔다. 이동 순서나 시간 방향을 표현한 계보도와 다르다.
- 활동 당시만 반영하므로 나중에 탈퇴·해체해도 간선은 유지한다.
- 프로젝트 그룹, 방송에서 실제 곡을 낸 그룹, 여성 보컬 듀오·밴드·키즈 그룹은 포함한다. 첨부 목록의 폭넓은 범위를 따른다.
- 단독 그룹의 내부 유닛, 해외 그룹, 혼성 그룹은 기본 집계에서 제외하고 선택 확장한다. 프로젝트 슈퍼그룹 GOT the beat는 기본 포함한다.
- 퓨리티는 한국 DSP 그룹의 일본 데뷔이므로 기본 포함한다. PRIKIL·AKB48은 해외 확장이다. 써니힐은 여성 그룹 시기 때문에 첨부대로 기본에 남긴다.
- 개명·재편도 별도 활동명 노드로 유지하고 rebrand로 표시한다. 따라서 개명 전후를 하나로 합치는 정의와 수치가 다르다.
- 같은 소속사, 연습생, 서바이벌 출연, 멤버 후보 공개만으로는 연결하지 않는다. 같은 이름의 다른 사람도 합치지 않는다.
- 내부 유닛과 1997년 이전 그룹은 일부만 보강했다. 국가·시대별 완전 목록은 아니다. 날짜는 주로 제공 목록의 연도이며 모든 데뷔일을 검증하지 않았다.
- GP Basic–디유닛 제이니는 정식 앨범·방송에 참가한 게스트 멤버를 포함하는 해석이다. 상설 멤버 한정시 해당 연결을 제외해야 한다.

## 중요한 발견

- Feverse가 IZ*ONE, 예아, Apink, 우주소녀, 이달의 소녀/ARTMS를 묶는다. 따라서 IZ*ONE 계보를 독립 군집이라고 부를 수 없다. [데뷔·멤버 근거](https://www.soompi.com/article/1585859wpp/watch-girls-reverse-virtual-girl-group-feverse-drops-dreamy-debut-mv-for-cho)
- 옆집소녀·언니쓰·환불원정대를 통해 마마무, Red Velvet, 소녀시대, 2NE1, 핑클까지 최대 연결 성분으로 합쳐진다. [옆집소녀](https://www.soompi.com/article/1006443wpp/watch-girls-next-door-shares-drama-version-deep-blue-eyes-mv)
- LATENCY 현진은 2026년 3월 18일 데뷔 무대에 실제 참가했다. GOOD DAY–cignature–LATENCY–이달의 소녀 연결을 유지한다. [현장 보도](https://enews.imbc.com/News/RetrieveNewsInfo/498453)
- 베이비복스–베이비복스 리브는 이름 계승만으로 직접 연결되지 않는다. 더 빨강–캣츠도 동일 인물 공유가 없어 제외한다.
- 연결 미발견의 비율은 조사 범위에 의존한다. 미조사 그룹의 숨은 경력이 발견되면 줄어들 수 있다. 현재 수치로 확정 고립 비율을 추정하면 안 된다.

## 연결 성분 전체

### 1. 71개 그룹

2NE1 · APRIL · ARTMS · Apink · C.I.V.A · CLASSy · CLC · DIA · EL7Z UP · Feverse · GOT the beat · H1-KEY · HINAPIA · I.B.I · IRRIS · IVE · IZ*ONE · KEEMBO · Kep1er · LATENCY · LE SSERAFIM · LIMELIGHT · Loossemble · MADEIN · NATURE · REDSQUARE · Red Velvet · SAY MY NAME · UNI.T · UNIS · WOOAH · WSG 워너비 · aespa · cignature · tripleS · 구구단 · 굿데이 · 달샤벳 · 더 씨야 · 디아크 · 라붐 · 러블리즈 · 로켓펀치 · 리얼걸 프로젝트 · 마마무 · 버스터즈 · 베이비복스 · 소나무 · 소녀시대 · 스완 · 스피카 · 써니힐 · 씨야 · 아이오아이 · 언니쓰 · 옆집소녀 · 예아 · 오마이걸 · 우주소녀 · 위키미키 · 이달의 소녀 · 칸 · 큐티엘 · 타이니지 · 파이브돌스 · 퍼플키스 · 퓨리티 · 프리스틴 · 핑클 · 헬로비너스 · 환불원정대

### 2. 8개 그룹

4minute · 마마돌 · 베이비복스 리브 · 벨라마피아 · 애프터스쿨 · 원더걸스 · 쥬얼리 · 투야

### 3. 5개 그룹

AWU · PIXY · SUPA · 소녀주의보 · 체리블렛

### 4. 5개 그룹

EXID · 베스티 · 블레이디 · 코코소리 · 투앤비

### 5. 5개 그룹

데스티니 · 마틸다 · 벨라 · 브이엔티 · 키스&크라이

### 6. 4개 그룹

A.De · 마이달링 · 투란 · 힌트

### 7. 4개 그룹

AB 에비뉴 · BGH4 · H7미인 · 가비엔제이

### 8. 4개 그룹

API · Bunny.T · 밤비노 · 위걸스

### 9. 4개 그룹

걸스데이 · 뉴에프오 · 비밥 · 샤플라

### 10. 4개 그룹

어썸베이비 · 키로츠 · 피기돌스 · 핑크판타지

### 11. 3개 그룹

1CHU · 블랙퀸 · 헤이걸스

### 12. 3개 그룹

bugAboo · 프림로즈 · 핫이슈

### 13. 3개 그룹

불독 · 스칼렛 · 아이시어

### 14. 2개 그룹

3YE · 애플비

### 15. 2개 그룹

ANS · MAJORS

### 16. 2개 그룹

FIFTY FIFTY · ablume

### 17. 2개 그룹

GP Basic · 디유닛

### 18. 2개 그룹

JQT · i-13

### 19. 2개 그룹

S.E.T · 루나솔라

### 20. 2개 그룹

SECRET NUMBER · 스카프

### 21. 2개 그룹

VIVIZ · 여자친구

### 22. 2개 그룹

XUM · 네온펀치

### 23. 2개 그룹

단발머리 · 러브어스

### 24. 2개 그룹

드림캐쳐 · 밍스

### 25. 2개 그룹

라니아 · 블랙스완

### 26. 2개 그룹

립버블 · 마카마카

### 27. 2개 그룹

마이비 · 보너스베이비

### 28. 2개 그룹

모아 · 포엘

### 29. 2개 그룹

배드키즈 · 핫플레이스

### 30. 2개 그룹

브레이브걸스 · 브브걸

### 31. 2개 그룹

이삭 N 지연 · 천상지희 더 그레이스

## 연결 미발견 목록

아래 그룹은 이 데이터에서 차수가 0이다. ‘관련 이력 조사’ 표시는 정밀 전수검증 완료를 뜻하지 않는다.

### 1953

김시스터즈 [관련 이력 조사]

### 1997

S.E.S. · 디바 · 이뉴 · 줄리엣

### 1998

써클 · 유투 · 쿠키

### 1999

Aida · O-24 · See U · 두리안 · 애즈원 · 클레오 · 타샤니 · 티티마 · 폭스 · 허쉬 · 히트

### 2000

SZ · 롤리팝 · 샤크라 · 티니 · 파파야 · 하니비

### 2001

C.O.C · M.I.L.K. · 가이 · 걸프렌드 · 나스카 · 데이지 · 버튼 · 보이스코 · 슈가 · 알 · 에스 · 키스

### 2002

LUV · SWi.T · 데자부 · 버디 · 신비 · 피버

### 2003

Wid · 더 에스 · 더 칼라 · 모닝 · 버블시스터즈 · 빅마마 · 컬러링 베이비 7공주 · 헵시바

### 2004

샤인 · 엘프 · 제이하트

### 2005

L.P.G. · 다미앤주니어 · 더 빨강 [관련 이력 조사] · 레드삭스 · 레이디 · 맥시붐 · 미쓰리 · 스윙 · 아이리스 · 오렌지 · 카사앤노바 · 키스파이브 · 퍼퓸

### 2006

걸프렌즈 · 마로니에 걸즈 · 브라운아이드걸스 · 에이시아 · 폭시

### 2007

블랙펄 · 스톰 · 카라 · 캣츠 [관련 이력 조사]

### 2008

다비치 · 미스에스 · 쎈

### 2009

HAM · f(x) · 레이디 컬렉션 · 레인보우 · 브랜뉴데이 · 시크릿 · 티아라

### 2010

BeBe Mignon · 걸스토리 · 나인뮤지스 · 미쓰에이 · 비돌스 · 씨스타 · 에바스 · 초콜릿 · 프리스타

### 2011

Kassia · 리더스 · 메이퀸 · 쇼콜라 · 스윙걸즈 · 스윙클 · 스텔라 · 스피넬 · 씨리얼 · 아이니 · 에이프릴키스 · 치치 · 코인잭슨

### 2012

15& · AOA · E2RE · EvoL · GLAM · Nep · 갱키즈 · 레이티 · 비비드걸 · 쉬즈 · 식스밤 · 써니데이즈 [관련 이력 조사] · 에잇폴리 · 주비스 · 크레용팝 · 타히티 · 투엑스 · 티너스 · 플래쉬 · 피에스타

### 2013

2EYES · 더 러쉬 · 듀오플로 · 딜라잇 [관련 이력 조사] · 러버소울 · 레이디스 코드 · 벨로체 · 별스토리 · 비피팝 · 앤화이트 · 에이딘 · 옐로우 · 오드아이 · 와썹 · 지아이 · 케이걸즈 · 퀸비즈 · 트랜디 · 틴트 · 파스칼 · 퍼플레이 · 피치걸 · 하트래빗걸스

### 2014

1PS · A.I.N · Bay.B · Vetty L · 디홀릭 [관련 이력 조사] · 러브큐빅 · 리틀뮤즈 · 립서비스 · 멜로디데이 · 바니걸 · 베리굿 · 빌리언 [관련 이력 조사] · 소녀시절 · 스마일지 · 아는동생 · 아일라 · 에이데일리 · 에이코어 · 윙스 · 칠학년일반 · 퍼펄즈 · 포텐 · 풍뎅이 · 프리츠

### 2015

ATT · PPL · Sixth Sence · TWICE · 다이아걸스 · 다임피스 · 더스타즈 · 레이샤 · 루루즈 · 리치걸 · 바바 [관련 이력 조사] · 베이비부 · 브랜뉴걸 · 비비디바 · 비타민 · 비타민엔젤 · 써스포 · 아샤 · 아이스 · 에이스 · 여자여자 · 워너비 · 유니콘 · 지지베스트 · 짜리몽땅 · 큐피트 · 키위밴드 M · 텐텐 · 포켓걸스 · 플레이백 · 하디 · 헤쎄

### 2016

BLACKPINK · O21 · 뉴에이 · 데이드림 (2016) [관련 이력 조사] · 도로시 · 로즈베리 · 머큐리 · 메리트 · 모모랜드 [관련 이력 조사] · 믹스 · 베리어스 · 블루미 · 블리티 · 솔티 · 스위치 베리 · 아이렌 · 오블리스 · 판타스티 · 하이틴 · 하트 · 헤이미스

### 2017

ABRY · FAVORITE · H.U.B · H2L · HOLICS · LIVE HIGH · P.O.P · S.I.S · S2 · 그레이시 · 라미슈 · 라임소다 · 마르멜로 · 멜로디핑크 · 베리츄 · 블라블라 · 비바 · 시크엔젤 · 써니플레이 · 아모르 · 앨리스 · 에스투유 · 에이시드 · 엘라도 · 오마주 · 원앤비 · 지구 · 퀸덤 · 클로리스 · 피터패트 · 해시태그

### 2018

(여자)아이들 · AiRiSU · DIAWINGS · GBB · MUSKY · SHASHA · ii · 가을로 가는 기차 · 걸카인드 · 공원소녀 · 드림노트 · 디팝프렌즈 · 레드민트 · 로즈핑거 · 메이위시 · 비걸스 · 뿌렉터 · 세러데이 · 셀럽파이브 · 슈가틴트 · 씨에스티 · 아쿠아 · 얼라이크 · 에이지엠 · 여주인공 · 열두달 · 옐로비 · 체리온탑 · 카밀라 · 키튼걸스 · 탈리아 · 트로피칼 · 트위티 · 틴즈엘 · 파란여우들 · 프로미스나인 · 프리즘 · 플라이위드미 · 플로어스 · 피어스 · 하이큐티 · 허니팝콘

### 2019

4CARAT · ARIAZ · BVNDIT · EVERGLOW · FANATICS · ITZY · PEACE · RENDEZVOUS · ViOLET · Z-GIRLS · 걸크러쉬 · 그로우비 · 네키루 · 듀자매 · 락킷걸 · 러스티 · 미드나잇 · 비너스 · 스카이걸스 · 아이러브 · 여고생_HighSchool · 치스비치 · 코코 · 퍼플백 · 핑크레이디 · 화이트데이

### 2020

2NYNE · BOTOPASS · CRAXY · EPISODE · STAYC · Weeekly · 데이드림 (2020) [관련 이력 조사] · 라벨업 · 별찌 · 블레스타 · 블링블링 · 소코노키미니 · 시크한아이들 · 아이씨유 · 에이리얼 · 큐빅스 · 프레셔스 · 프리즈마 · 플로리아

### 2021

Azer · Billlie · CooKie · Hi-L · ICHILLIN' · IITERNITI · LIGHTSUM · Rocking doll · lilli lilli · 럼블지 · 미니마니 · 미스티 · 뷰티박스 · 스카이리 · 쏘아 · 쏠리아 · 트라이비 · 티파티 · 파스텔걸스 · 파시걸스 · 페리블루 · 프리티지

### 2022

ARTBEAT v · Lapillus · MIMIIROSE · MuuTive · NMIXX · NewJeans · Queenz Eye · We;Na · 소녀세상 · 솔레어 디아망 · 솔레어 코메트 · 아일리원 · 에이리드 · 첫사랑 · 페이니티

### 2023

ADYA · KISS OF LIFE · MAVE: · MayLiz · PUZZLE · QWER · X:IN [관련 이력 조사] · YOUNG POSSE · eite · 골든걸스 · 베이비스 · 스타데이즈 · 제니웨리 · 주주 시크릿 · 프리아

### 2024

3piece [관련 이력 조사] · B-OURS · BABYMONSTER · BADVILLAIN · BEWAVE · Candy Shop · Geenius · I:MOND · ILLIT · KELT9b · LOVEONE · MEOVV · New-L · ODD YOUTH · RESCENE · SPIA · VVUP [관련 이력 조사] · ViV · W!TCHX · izna · 아스텔 · 유니코드 · 클리어리 · 트레이서 · 트리플아이즈

### 2025

4X4 · AtHeart · BURVEY · Baby DONT Cry · CrazAngel · DIVA-X · E11iVYN · HITGS · Hearts2Hearts · KIIRAS · Kandis · KiiiKiii · MEPC [관련 이력 조사] · NWH:I · UDTT · USPEER · VVS · ifeye · iii · m.prism

### 2026

H//PE Princess · HEART OF WOMAN · I.MET.U · IRION · Keyveatz · NAVILLERA · OURBIRTHDAY · OWIS · SAVVVY · TUIDE · UNCHILD · dodree · 앨리스신드롬 · 에스투잇 · 에이퓨처

## 간선 출처 전체

보도·공식 자료와 프로필·위키를 구분했다. 이 구분은 출처 종류이며 자동으로 정확성을 보장하지 않는다. `이력 투영`은 확인된 동일인의 활동 이력으로 계산한 직접 공통멤버 연결이다.

### 1CHU ↔ 헤이걸스

- 공통 멤버: 설희, 채린
- 범위: core; 유형: unit; 근거: report; 이력 투영: False
- 메모: 2022-07-12 오아시스 발매 당시 인터뷰.
- 출처: [자료 1](https://news.nate.com/view/20220712n25631)

### 2NE1 ↔ 언니쓰

- 공통 멤버: 공민지
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 출처: [자료 1](https://static.kpopping.com/profiles/group/Unnies)

### 3YE ↔ 애플비

- 공통 멤버: 유지, 유림, 하은
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 3인 전원 애플비 출신
- 출처: [자료 1](https://en.wikipedia.org/wiki/3YE) · [자료 2](https://www.scmp.com/magazines/style/people-events/article/3013390/who-are-faces-behind-new-k-pop-girl-group-3ye) · [자료 3](https://www.allkpop.com/article/2022/12/girl-groups-with-only-three-members)

### 4minute ↔ 원더걸스

- 공통 멤버: 현아
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 현아 본인 인터뷰에서 2007 원더걸스 데뷔 후 포미닛 재활동 확인
- 출처: [자료 1](https://www.starnewskorea.com/music/2016/08/02/2016072913131255988)

### A.De ↔ 투란

- 공통 멤버: 채은(수연)
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 메모: 웹 프로필·위키의 활동 이력 확인; 2차 자료
- 출처: [자료 1](https://zh.wikipedia.org/wiki/TURAN)

### AB 에비뉴 ↔ BGH4

- 공통 멤버: 한보라(은혜)
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: BGH4 멤버 한보라가 한옥이와 여성 듀오 결성
- 출처: [자료 1](https://sports.donga.com/article/all/20100204/25948571/3) · [자료 2](https://www.maniadb.com/artist/144232?d=s&o=d)

### AB 에비뉴 ↔ H7미인

- 공통 멤버: 한보라(은혜)
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: BGH4 시절 프로젝트 및 후속 듀오
- 출처: [자료 1](https://enews.imbc.com/News/ViewAmp/1501) · [자료 2](https://sports.donga.com/article/all/20100204/25948571/3)

### ANS ↔ MAJORS

- 공통 멤버: 비안
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 공식 MAJORS 비안 프로필 및 데뷔 앨범 확인. MIDNIGHT는 pre-debut여서 제외
- 출처: [자료 1](https://ansent.co.kr/artist/majors/bian.html) · [자료 2](https://kpop.fandom.com/wiki/Bian)

### API ↔ Bunny.T

- 공통 멤버: 청음
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 출처: [자료 1](https://kpopping.com/profiles/idol/Cheong-Eum) · [자료 2](https://kprofiles.com/bunny-t-members-profile/)

### APRIL ↔ C.I.V.A

- 공통 멤버: 윤채경
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://www.soompi.com/article/988781wpp/aprils-chaekyung-reveals-hardest-part-competing-produce-101)

### APRIL ↔ I.B.I

- 공통 멤버: 윤채경
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://www.soompi.com/article/988781wpp/aprils-chaekyung-reveals-hardest-part-competing-produce-101)

### APRIL ↔ UNI.T

- 공통 멤버: 이현주
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 출처: [자료 1](https://en.wikipedia.org/wiki/Uni.T)

### APRIL ↔ 퓨리티

- 공통 멤버: 윤채경
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://www.soompi.com/article/988781wpp/aprils-chaekyung-reveals-hardest-part-competing-produce-101)

### ARTMS ↔ Feverse

- 공통 멤버: 희진
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://www.soompi.com/article/1585859wpp/watch-girls-reverse-virtual-girl-group-feverse-drops-dreamy-debut-mv-for-cho) · [자료 2](https://kpopping.com/profiles/group/feverse) · [자료 3](https://en.wikipedia.org/wiki/Artms)

### ARTMS ↔ 이달의 소녀

- 공통 멤버: 희진, 하슬, 김립, 진솔, 최리
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 2024년5월31일 정식 앨범 데뷔.
- 출처: [자료 1](https://www.soompi.com/article/1645497wpp/artms-announces-release-dates-for-full-length-album-and-multiple-singles) · [자료 2](https://www.koreajoongangdaily.com/entertainment/girl-group-artms-debuts-as-virtual-angels-with-album-dall/12108439)

### AWU ↔ PIXY

- 공통 멤버: 디아, 로라, 정다정(유채)
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 직접 인터뷰: 2026-04-09 Re:frame 정식 데뷔
- 출처: [자료 1](https://www.hellokpop.com/interview/exclusive-interview-guess-whos-back-dia-lola-and-u_chae-on-their-new-chapter-as-awu/)

### AWU ↔ SUPA

- 공통 멤버: 정다정(유채)
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 동일 인물 이력의 직접 공유멤버 엣지
- 출처: [자료 1](https://world.kbs.co.kr/service/contents_view.htm?board_seq=404571&id=&lang=f&menu_cate=artist&page=68) · [자료 2](https://www.hellokpop.com/interview/exclusive-interview-guess-whos-back-dia-lola-and-u_chae-on-their-new-chapter-as-awu/)

### Apink ↔ Feverse

- 공통 멤버: 오하영
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://www.soompi.com/article/1585859wpp/watch-girls-reverse-virtual-girl-group-feverse-drops-dreamy-debut-mv-for-cho) · [자료 2](https://kpopping.com/profiles/group/feverse)

### BGH4 ↔ H7미인

- 공통 멤버: 도희선(해선), 미스티(혜나), 유의주(라희), 한보라(은혜)
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 가비엔제이와 BGH4 멤버가 프로젝트 앨범 발표
- 출처: [자료 1](https://enews.imbc.com/News/ViewAmp/1501) · [자료 2](https://www.maniadb.com/artist/144229)

### BGH4 ↔ 가비엔제이

- 공통 멤버: 미스티(혜나)
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: BGH4 혜나가 가비엔제이 미스티로 영입
- 출처: [자료 1](https://www.nocutnews.co.kr/news/640245) · [자료 2](https://www.starnewskorea.com/music/2009/09/24/2009092316325624449)

### Bunny.T ↔ 밤비노

- 공통 멤버: 니나, 은아
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 메모: 무대 정식활동 포함.
- 출처: [자료 1](https://kprofiles.com/bunny-t-members-profile/) · [자료 2](https://kpop.fandom.com/wiki/Nina_(Bunny.T))

### Bunny.T ↔ 위걸스

- 공통 멤버: 니나, 은아
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 출처: [자료 1](https://kprofiles.com/bunny-t-members-profile/)

### C.I.V.A ↔ I.B.I

- 공통 멤버: 김소희, 윤채경
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://www.chosun.com/site/data/html_dir/2019/11/12/2019111201968.html) · [자료 2](https://www.soompi.com/article/988781wpp/aprils-chaekyung-reveals-hardest-part-competing-produce-101)

### C.I.V.A ↔ NATURE

- 공통 멤버: 김소희
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://www.chosun.com/site/data/html_dir/2019/11/12/2019111201968.html)

### C.I.V.A ↔ 옆집소녀

- 공통 멤버: 김소희
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://www.chosun.com/site/data/html_dir/2019/11/12/2019111201968.html)

### C.I.V.A ↔ 퓨리티

- 공통 멤버: 윤채경
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://www.soompi.com/article/988781wpp/aprils-chaekyung-reveals-hardest-part-competing-produce-101)

### CLASSy ↔ 버스터즈

- 공통 멤버: 명형서
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 메모: 2022-05-05 Class Is Over 데뷔
- 출처: [자료 1](https://www.namu.moe/w/%EB%AA%85%ED%98%95%EC%84%9C) · [자료 2](https://en.wikipedia.org/wiki/Classy_(group))

### CLC ↔ EL7Z UP

- 공통 멤버: 장예은
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://whoop-japan.com/artists/el7zup)

### CLC ↔ Kep1er

- 공통 멤버: 최유진
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://music.bugs.co.kr/artist/80223875)

### DIA ↔ UNI.T

- 공통 멤버: 예빈
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 출처: [자료 1](https://en.wikipedia.org/wiki/Uni.T)

### DIA ↔ 아이오아이

- 공통 멤버: 정채연
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://www.soompi.com/article/1306438wpp/agencies-deny-reports-of-potential-i-o-i-reunion)

### DIA ↔ 파이브돌스

- 공통 멤버: 조승희
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 당사자 인터뷰로 양쪽 활동 확인 / 현 조이현. 인터뷰에서 양 그룹 활동 직접 확인
- 출처: [자료 1](https://www.soompi.com/article/1130431wpp/jo-seung-hee-explains-left-dia-opens-slump)

### EL7Z UP ↔ H1-KEY

- 공통 멤버: 휘서
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://whoop-japan.com/artists/el7zup)

### EL7Z UP ↔ WOOAH

- 공통 멤버: 나나
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://whoop-japan.com/artists/el7zup)

### EL7Z UP ↔ 러블리즈

- 공통 멤버: 케이
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://whoop-japan.com/artists/el7zup)

### EL7Z UP ↔ 로켓펀치

- 공통 멤버: 연희
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://whoop-japan.com/artists/el7zup)

### EL7Z UP ↔ 우주소녀

- 공통 멤버: 여름
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://whoop-japan.com/artists/el7zup)

### EL7Z UP ↔ 퍼플키스

- 공통 멤버: 유키
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://whoop-japan.com/artists/el7zup)

### EXID ↔ 베스티

- 공통 멤버: 유지, 혜연(다미), 해령
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: EXID 데뷔 활동 후 탈퇴한 3인 재데뷔. 혜연은 EXID 당시 다미.
- 출처: [자료 1](https://en.wikipedia.org/wiki/Bestie_(group)) · [자료 2](https://www.kpopstarz.com/articles/306464/20220508/where-bestie-now-current-status-former-exid-members.htm)

### EXID ↔ 투앤비

- 공통 멤버: 솔지(허솔지)
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 2NB로 함께 활동한 솔지와 가빈이 각각 EXID와 블레이디로 재데뷔
- 출처: [자료 1](https://m.nocutnews.co.kr/news/4395621)

### FIFTY FIFTY ↔ ablume

- 공통 멤버: 새나, 시오, 아란
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 2025-05-09 Echo 정식 발매 확인
- 출처: [자료 1](https://www.teenvogue.com/story/former-fifty-fifty-members-return-as-ablume-interview) · [자료 2](https://www.fox13seattle.com/news/aran-sio-saena-ablume-echo.amp)

### Feverse ↔ IZ*ONE

- 공통 멤버: 권은비
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://www.soompi.com/article/1585859wpp/watch-girls-reverse-virtual-girl-group-feverse-drops-dreamy-debut-mv-for-cho) · [자료 2](https://kpopping.com/profiles/group/feverse)

### Feverse ↔ 예아

- 공통 멤버: 권은비
- 범위: core; 유형: membership; 근거: report; 이력 투영: True
- 메모: 동일 멤버의 출처 확인 이력을 모든 그룹 쌍으로 투영.
- 출처: [자료 1](https://www.soompi.com/article/1585859wpp/watch-girls-reverse-virtual-girl-group-feverse-drops-dreamy-debut-mv-for-cho) · [자료 2](https://kpopping.com/profiles/group/feverse) · [자료 3](https://en.wikipedia.org/wiki/Kwon_Eun-bi)

### Feverse ↔ 우주소녀

- 공통 멤버: 루다, 수빈
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://www.soompi.com/article/1585859wpp/watch-girls-reverse-virtual-girl-group-feverse-drops-dreamy-debut-mv-for-cho) · [자료 2](https://kpopping.com/profiles/group/feverse)

### Feverse ↔ 이달의 소녀

- 공통 멤버: 희진
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://www.soompi.com/article/1585859wpp/watch-girls-reverse-virtual-girl-group-feverse-drops-dreamy-debut-mv-for-cho) · [자료 2](https://kpopping.com/profiles/group/feverse)

### GOT the beat ↔ Red Velvet

- 공통 멤버: 슬기, 웬디
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://cdn2.smentertainment.com/wp-content/uploads/2024/02/SM-ENTERTAINMENT-INTRODUCTION_2023_%EC%88%98%EC%A0%95.pdf-2023.01.11-1.pdf) · [자료 2](https://world.kbs.co.kr/service/contents_view.htm?board_code=&board_seq=416087&id=&lang=e&menu_cate=enternews&page=62)

### GOT the beat ↔ aespa

- 공통 멤버: 카리나, 윈터
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://cdn2.smentertainment.com/wp-content/uploads/2024/02/SM-ENTERTAINMENT-INTRODUCTION_2023_%EC%88%98%EC%A0%95.pdf-2023.01.11-1.pdf) · [자료 2](https://world.kbs.co.kr/service/contents_view.htm?board_code=&board_seq=416087&id=&lang=e&menu_cate=enternews&page=62)

### GOT the beat ↔ 소녀시대

- 공통 멤버: 태연, 효연
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://cdn2.smentertainment.com/wp-content/uploads/2024/02/SM-ENTERTAINMENT-INTRODUCTION_2023_%EC%88%98%EC%A0%95.pdf-2023.01.11-1.pdf) · [자료 2](https://world.kbs.co.kr/service/contents_view.htm?board_code=&board_seq=416087&id=&lang=e&menu_cate=enternews&page=62)

### GOT the beat ↔ 옆집소녀

- 공통 멤버: 슬기
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 출처: [자료 1](https://en.wikipedia.org/wiki/Got_the_Beat)

### GP Basic ↔ 디유닛

- 공통 멤버: 제이니
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 메모: 2013년 앨범·방송 정식 활동한 게스트 멤버. 상설 멤버만 허용시 제외.
- 출처: [자료 1](https://en.wikipedia.org/wiki/GP_Basic)

### H7미인 ↔ 가비엔제이

- 공통 멤버: 장희영, 노시현, 정혜민, 미스티(혜나)
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 가비엔제이 원년 3명과 BGH4 공동 프로젝트. 미스티는 이후 가비엔제이 가입
- 출처: [자료 1](https://enews.imbc.com/News/ViewAmp/1501) · [자료 2](https://www.nocutnews.co.kr/news/640245)

### HINAPIA ↔ 프리스틴

- 공통 멤버: 김민경, 강경원, 정은우, 강예빈
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 로아→민경, 유하→경원, 은우, 레나→예빈; 2019-11-03 실제 데뷔
- 출처: [자료 1](https://www.soompi.com/article/1363421wpp/watch-hinapia-with-former-pristin-members-makes-debut-with-sophisticated-drip-mv)

### I.B.I ↔ NATURE

- 공통 멤버: 김소희
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://www.chosun.com/site/data/html_dir/2019/11/12/2019111201968.html)

### I.B.I ↔ 옆집소녀

- 공통 멤버: 김소희
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://www.chosun.com/site/data/html_dir/2019/11/12/2019111201968.html)

### I.B.I ↔ 퓨리티

- 공통 멤버: 윤채경
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://www.soompi.com/article/988781wpp/aprils-chaekyung-reveals-hardest-part-competing-produce-101)

### IRRIS ↔ REDSQUARE

- 공통 멤버: 지니(그린·아이엘), 체리(채아·리브), 나윤(아리·윤슬)
- 범위: core; 유형: rebrand; 근거: report; 이력 투영: False
- 메모: 3명 잔류 및 새 멤버 니나 합류 재편.
- 출처: [자료 1](https://www.ytn.co.kr/_ln/0117_202207211657164029) · [자료 2](https://en.wikipedia.org/wiki/Redsquare)

### IRRIS ↔ 굿데이

- 공통 멤버: 지니(그린·아이엘), 체리(채아·리브), 나윤(아리·윤슬)
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 당사자 인터뷰에서 굿데이와 레드스퀘어 활동 확인. 보민은 IRRIS 멤버 아님.
- 출처: [자료 1](https://www.ytn.co.kr/_ln/0117_202207211657164029)

### IVE ↔ IZ*ONE

- 공통 멤버: 안유진, 장원영
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 두 그룹 정식 멤버 명단 대조
- 출처: [자료 1](https://en.wikipedia.org/wiki/Iz*One) · [자료 2](https://www.sonymusic.co.jp/artist/IVE/profile/)

### IZ*ONE ↔ LE SSERAFIM

- 공통 멤버: 김채원, 미야와키 사쿠라
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 메모: 2018~2021 IZ*ONE 활동 후 2022 재데뷔
- 출처: [자료 1](https://en.wikipedia.org/wiki/Le_Sserafim)

### IZ*ONE ↔ SAY MY NAME

- 공통 멤버: 혼다 히토미
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 2024년 10월 정식 데뷔 후 인터뷰
- 출처: [자료 1](https://www.oricon.co.jp/news/2353207/full/)

### IZ*ONE ↔ 예아

- 공통 멤버: 권은비
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 메모: Ye-A에서 Kazoo로 데뷔
- 출처: [자료 1](https://en.wikipedia.org/wiki/Kwon_Eun-bi)

### JQT ↔ i-13

- 공통 멤버: 박민정, 이지은, 박가진
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: JQT 네 멤버 중 세 명이 2005 i-13 출신이라는 인터뷰
- 출처: [자료 1](https://www.nocutnews.co.kr/news/748875)

### KEEMBO ↔ 스피카

- 공통 멤버: 김보아, 김보형
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 메모: 웹 프로필·위키의 활동 이력 확인; 2차 자료 / 2020년 듀오 재데뷔
- 출처: [자료 1](https://en.wikipedia.org/wiki/Kim_Bo-hyung) · [자료 2](https://kpopping.com/profiles/group/KEEMBO)

### Kep1er ↔ MADEIN

- 공통 멤버: 강예서, 마시로
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 출처: [자료 1](https://en.wikipedia.org/wiki/Madein)

### Kep1er ↔ 버스터즈

- 공통 멤버: 강예서
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 출처: [자료 1](https://en.wikipedia.org/wiki/Kang_Ye-seo)

### Kep1er ↔ 큐티엘

- 공통 멤버: 강예서
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 출처: [자료 1](https://en.wikipedia.org/wiki/Kang_Ye-seo)

### LATENCY ↔ Loossemble

- 공통 멤버: 현진
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 현진은 2026년5월22일 LATENCY 탈퇴; 역사적 엣지는 유효.
- 출처: [자료 1](https://enews.imbc.com/News/RetrieveNewsInfo/498453) · [자료 2](https://biz.chosun.com/entertainment/enter_general/2026/05/23/GA4DMMZVMQ4GIMBWGEYTCYZQMY/?outputType=amp)

### LATENCY ↔ cignature

- 공통 멤버: 지원(지지원), 하은(예아), 세미
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 2026년3월18일 데뷔 쇼케이스 확인. 8월 탈퇴했어도 역사적 멤버십 유지.
- 출처: [자료 1](https://enews.imbc.com/News/RetrieveNewsInfo/498453) · [자료 2](https://news.tf.co.kr/read/entertain/2301901.htm)

### LATENCY ↔ 굿데이

- 공통 멤버: 지원(지지원), 하은(예아)
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 세미는 굿데이 출신 아님. 여성 밴드 포함시 엣지.
- 출처: [자료 1](https://en.wikipedia.org/wiki/Good_Day_(group)) · [자료 2](https://enews.imbc.com/News/RetrieveNewsInfo/498453)

### LATENCY ↔ 이달의 소녀

- 공통 멤버: 현진
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 2026년3월18일 현장 데뷔 무대 참여 확인. 데뷔 전 탈퇴 아님.
- 출처: [자료 1](https://enews.imbc.com/News/RetrieveNewsInfo/498453) · [자료 2](https://ent.sbs.co.kr/news/article.do?article_id=E10010314066)

### LIMELIGHT ↔ MADEIN

- 공통 멤버: 미유, 수혜, 가은
- 범위: core; 유형: rebrand; 근거: profile; 이력 투영: False
- 메모: 기존 3인 그룹 재편 및 새 멤버 합류
- 출처: [자료 1](https://en.wikipedia.org/wiki/Madein)

### Loossemble ↔ 이달의 소녀

- 공통 멤버: 현진, 여진, 비비, 고원, 혜주
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 2023년9월15일 데뷔.
- 출처: [자료 1](https://www.koreatimes.co.kr/entertainment/20231011/former-loona-members-reunite-as-loossemble-make-new-start-with-self-titled-album)

### MADEIN ↔ 버스터즈

- 공통 멤버: 강예서
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 출처: [자료 1](https://en.wikipedia.org/wiki/Kang_Ye-seo)

### MADEIN ↔ 큐티엘

- 공통 멤버: 강예서
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 출처: [자료 1](https://en.wikipedia.org/wiki/Kang_Ye-seo)

### NATURE ↔ 옆집소녀

- 공통 멤버: 김소희
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://www.chosun.com/site/data/html_dir/2019/11/12/2019111201968.html)

### PIXY ↔ SUPA

- 공통 멤버: 정다정(유채)
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 팬 위키 근거: SUPA 2016-11-08 음원 데뷔; 추가 1차 검증 권장. / KBS PIXY 소개에서 전 그룹 명시. 아동 그룹 포함 범위
- 출처: [자료 1](https://pixy.fandom.com/wiki/U_Chae) · [자료 2](https://world.kbs.co.kr/service/contents_view.htm?board_seq=404571&id=&lang=f&menu_cate=artist&page=68)

### PIXY ↔ 소녀주의보

- 공통 멤버: 샛별
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: KBS PIXY 소개에서 전 그룹 명시
- 출처: [자료 1](https://www.soompi.com/article/1410706wpp/former-cherry-bullet-member-mirae-and-former-girls-alert-member-saet-byeol-to-debut-in-new-girl-group) · [자료 2](https://en.wikipedia.org/wiki/Pixy_(group)) · [자료 3](https://world.kbs.co.kr/service/contents_view.htm?board_seq=404571&id=&lang=f&menu_cate=artist&page=68)

### PIXY ↔ 체리블렛

- 공통 멤버: 김경주(미래·엘라)
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: KBS PIXY 소개에서 전 그룹 명시
- 출처: [자료 1](https://www.soompi.com/article/1410706wpp/former-cherry-bullet-member-mirae-and-former-girls-alert-member-saet-byeol-to-debut-in-new-girl-group) · [자료 2](https://en.wikipedia.org/wiki/Pixy_(group)) · [자료 3](https://world.kbs.co.kr/service/contents_view.htm?board_seq=404571&id=&lang=f&menu_cate=artist&page=68)

### REDSQUARE ↔ 굿데이

- 공통 멤버: 지니(그린·아이엘), 체리(채아·리브), 나윤(아리·윤슬), 보민
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 보민 포함 네 명.
- 출처: [자료 1](https://www.soompi.com/article/1398304wpp/new-girl-group-redsquare-introduces-1st-members-including-familiar-faces-from-good-day)

### Red Velvet ↔ 옆집소녀

- 공통 멤버: 슬기
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://www.soompi.com/article/1006443wpp/watch-girls-next-door-shares-drama-version-deep-blue-eyes-mv)

### S.E.T ↔ 루나솔라

- 공통 멤버: 태이(지안)
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 메모: S.E.T 태이로 활동 후 루나솔라 지안. 태령의 A-Daily 참여는 공식 멤버 불명이라 제외
- 출처: [자료 1](https://en.wikipedia.org/wiki/Lunarsolar)

### SECRET NUMBER ↔ 스카프

- 공통 멤버: 하나(레아)
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 메모: Léa의 SKarf 예명 Hana
- 출처: [자료 1](https://en.wikipedia.org/wiki/Secret_Number) · [자료 2](https://kprofiles.com/secret-number-members-profile/)

### UNI.T ↔ 달샤벳

- 공통 멤버: 우희
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 출처: [자료 1](https://en.wikipedia.org/wiki/Uni.T)

### UNI.T ↔ 디아크

- 공통 멤버: 이수지
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://en.wikipedia.org/wiki/Uni.T) · [자료 2](https://www.soompi.com/article/1161585wpp/uni-t-shares-admire-talks-preparing-debut)

### UNI.T ↔ 라붐

- 공통 멤버: 지엔
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 출처: [자료 1](https://en.wikipedia.org/wiki/Uni.T)

### UNI.T ↔ 리얼걸 프로젝트

- 공통 멤버: 이수지
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://en.wikipedia.org/wiki/Uni.T) · [자료 2](https://www.soompi.com/article/1161585wpp/uni-t-shares-admire-talks-preparing-debut)

### UNI.T ↔ 소나무

- 공통 멤버: 의진
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 출처: [자료 1](https://en.wikipedia.org/wiki/Uni.T)

### UNI.T ↔ 스피카

- 공통 멤버: 양지원
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 출처: [자료 1](https://en.wikipedia.org/wiki/Uni.T)

### UNI.T ↔ 헬로비너스

- 공통 멤버: 윤조
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 출처: [자료 1](https://en.wikipedia.org/wiki/Uni.T)

### UNIS ↔ cignature

- 공통 멤버: 럭키(벨·진현주)
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 메모: 2024년3월27일 유니스 데뷔.
- 출처: [자료 1](https://kpop.fandom.com/wiki/Hyeonju_(UNIS)) · [자료 2](https://en.wikipedia.org/wiki/Unis_(group))

### UNIS ↔ 굿데이

- 공통 멤버: 럭키(벨·진현주)
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 메모: 동일인 진현주. 간접 경로와 별도로 직접 공통멤버 엣지.
- 출처: [자료 1](https://kpop.fandom.com/wiki/Hyeonju_(UNIS)) · [자료 2](https://en.wikipedia.org/wiki/Good_Day_(group))

### VIVIZ ↔ 여자친구

- 공통 멤버: 은하, 신비, 엄지
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 2022-02-09 BOP BOP 데뷔. 별도 그룹
- 출처: [자료 1](https://www.soompi.com/article/1509630wpp/watch-former-gfriend-members-sinb-eunha-and-umjis-new-group-viviz-announces-debut-date-drops-1st-teaser)

### WSG 워너비 ↔ 라붐

- 공통 멤버: 소연
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://www.soompi.com/article/1529497wpp/watch-how-do-you-play-project-group-wsg-wannabe-covers-momoland-in-1st-performance-as-full-group)

### WSG 워너비 ↔ 베이비복스

- 공통 멤버: 윤은혜
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://www.soompi.com/article/1529497wpp/watch-how-do-you-play-project-group-wsg-wannabe-covers-momoland-in-1st-performance-as-full-group)

### WSG 워너비 ↔ 써니힐

- 공통 멤버: 코타
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://www.soompi.com/article/1529497wpp/watch-how-do-you-play-project-group-wsg-wannabe-covers-momoland-in-1st-performance-as-full-group)

### WSG 워너비 ↔ 씨야

- 공통 멤버: 이보람
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://www.soompi.com/article/1529497wpp/watch-how-do-you-play-project-group-wsg-wannabe-covers-momoland-in-1st-performance-as-full-group)

### XUM ↔ 네온펀치

- 공통 멤버: 다연, 백아, 이안
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: XUM MV 공개 2020-09-22, 음원 발매 09-24. / 2020년 Ddalala 데뷔
- 출처: [자료 1](https://www.soompi.com/article/1418361wpp/neonpunch-announces-official-disbandment-and-plans-for-some-members-to-debut-in-new-group-xum) · [자료 2](https://www.allkpop.com/video/2020/09/xum-drop-daring-mv-for-ddalala) · [자료 3](https://www.allkpop.com/article/2022/12/girl-groups-with-only-three-members)

### bugAboo ↔ 프림로즈

- 공통 멤버: 레이니
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 2023-08-18 4인 체제 Laffy Taffy 정식 활동
- 출처: [자료 1](https://www.koreajoongangdaily.com/entertainment/girl-group-primrose-to-make-comeback-with-four-members/10540593) · [자료 2](https://www.youtube.com/watch?v=mKj0YqnNnog) · [자료 3](https://www.allkpop.com/article/2023/05/former-bugaboo-member-rainie-joins-primrose-as-a-new-member) · [자료 4](https://www.xportsnews.com/article/1760719)

### cignature ↔ 굿데이

- 공통 멤버: 채솔, 지원(지지원), 하은(예아), 비바(선), 럭키(벨·진현주)
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 다섯 멤버 재데뷔. 같은 소속사 그룹 전체 리브랜딩으로 취급하지 않음.
- 출처: [자료 1](https://en.wikipedia.org/wiki/Good_Day_(group)) · [자료 2](https://www.soompi.com/article/1398304wpp/new-girl-group-redsquare-introduces-1st-members-including-familiar-faces-from-good-day)

### tripleS ↔ 버스터즈

- 공통 멤버: 김채연
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 정식 멤버 확인
- 출처: [자료 1](https://dbkpop.com/group/triples/) · [자료 2](https://www.triples-official.jp/profile/)

### 걸스데이 ↔ 뉴에프오

- 공통 멤버: 황지선
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 메모: 웹 프로필·위키의 활동 이력 확인; 2차 자료
- 출처: [자료 1](https://kprofiles.com/girls-day-profile/)

### 걸스데이 ↔ 비밥

- 공통 멤버: 이지인
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 메모: 웹 프로필·위키의 활동 이력 확인; 2차 자료
- 출처: [자료 1](https://kprofiles.com/girls-day-profile/)

### 걸스데이 ↔ 샤플라

- 공통 멤버: 황지선
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 메모: 웹 프로필·위키의 활동 이력 확인; 2차 자료
- 출처: [자료 1](https://kprofiles.com/girls-day-profile/)

### 구구단 ↔ 아이오아이

- 공통 멤버: 김세정, 강미나
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://www.soompi.com/article/1306438wpp/agencies-deny-reports-of-potential-i-o-i-reunion)

### 뉴에프오 ↔ 샤플라

- 공통 멤버: 황지선
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 메모: 웹 프로필·위키의 활동 이력 확인; 2차 자료
- 출처: [자료 1](https://kprofiles.com/girls-day-profile/)

### 단발머리 ↔ 러브어스

- 공통 멤버: 다혜(미교), 나단비
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 메모: 웹 프로필·위키의 활동 이력 확인; 2차 자료
- 출처: [자료 1](https://en.wikipedia.org/wiki/Bob_Girls)

### 더 씨야 ↔ 파이브돌스

- 공통 멤버: 오연경
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 웹 프로필·위키의 활동 이력 확인; 2차 자료 / 2013년 양 그룹 동시 활동
- 출처: [자료 1](https://en.wikipedia.org/wiki/The_SeeYa) · [자료 2](https://www.segye.com/newsView/20130711023259)

### 데스티니 ↔ 벨라

- 공통 멤버: 김보혜
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 메모: 웹 프로필·위키의 활동 이력 확인; 2차 자료
- 출처: [자료 1](https://kprofiles.com/kisscry-members-profile/)

### 데스티니 ↔ 키스&크라이

- 공통 멤버: 김보혜
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 메모: 웹 프로필·위키의 활동 이력 확인; 2차 자료
- 출처: [자료 1](https://kprofiles.com/kisscry-members-profile/)

### 드림캐쳐 ↔ 밍스

- 공통 멤버: 지유, 수아, 시연, 유현, 다미
- 범위: core; 유형: rebrand; 근거: report; 이력 투영: False
- 메모: MINX 5명이 모두 Dreamcatcher로 재데뷔
- 출처: [자료 1](https://en.wikipedia.org/wiki/Dreamcatcher_(group)) · [자료 2](https://7-dreamers.com/trans-201709-him-interview-7-girls-who-bring-sweet-dreams-dreamcatcher/)

### 디아크 ↔ 리얼걸 프로젝트

- 공통 멤버: 이수지
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://en.wikipedia.org/wiki/Uni.T) · [자료 2](https://www.soompi.com/article/1161585wpp/uni-t-shares-admire-talks-preparing-debut)

### 디아크 ↔ 칸

- 공통 멤버: 유나킴, 전민주
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://www.soompi.com/article/1174555wpp/watch-arks-euna-kim-jeon-min-ju-debut-new-duo-khan-im-girl-mv)

### 라니아 ↔ 블랙스완

- 공통 멤버: 혜미, 영흔, 레아(라리사)
- 범위: core; 유형: rebrand; 근거: report; 이력 투영: False
- 메모: 2020 개명. 영흔·라리사는 2019 라니아 정식 활동 라인업, 혜미는 2015부터. 신규 음원 참여만 요구시 영흔·레아 별도 검토
- 출처: [자료 1](https://en.wikipedia.org/wiki/Blackswan) · [자료 2](https://www.allmusic.com/artist/blackswan-mn0004014115)

### 러블리즈 ↔ 옆집소녀

- 공통 멤버: 류수정
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://www.soompi.com/article/1006443wpp/watch-girls-next-door-shares-drama-version-deep-blue-eyes-mv)

### 리얼걸 프로젝트 ↔ 타이니지

- 공통 멤버: 민트
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 메모: 웹 프로필·위키의 활동 이력 확인; 2차 자료
- 출처: [자료 1](https://en.wikipedia.org/wiki/Tiny-G)

### 립버블 ↔ 마카마카

- 공통 멤버: 은별 / 은비
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 팬 DB 근거.
- 출처: [자료 1](https://makamaka.carrd.co/) · [자료 2](https://zh.wikipedia.org/wiki/MAKAMAKA)

### 마마돌 ↔ 베이비복스 리브

- 공통 멤버: 양은지
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 2022 프로젝트 재데뷔
- 출처: [자료 1](https://www.hankyung.com/article/202202228940H)

### 마마돌 ↔ 벨라마피아

- 공통 멤버: 현쥬니
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 여성 록밴드 보컬 이후 프로젝트 걸그룹
- 출처: [자료 1](https://www.hankyung.com/article/202202228940H) · [자료 2](https://www.hankyung.com/article/202202129250H)

### 마마돌 ↔ 애프터스쿨

- 공통 멤버: 가희
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 2022 프로젝트 재데뷔
- 출처: [자료 1](https://www.hankyung.com/article/202202228940H)

### 마마돌 ↔ 원더걸스

- 공통 멤버: 선예
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 정식 우아힙 활동 / 2022 실제 음원 및 음악방송 데뷔한 프로젝트
- 출처: [자료 1](https://www.hankyung.com/article/202202228940H) · [자료 2](https://tvn.cjenm.com/ko/mamatheidol/)

### 마마돌 ↔ 쥬얼리

- 공통 멤버: 박정아
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 2022 프로젝트 재데뷔
- 출처: [자료 1](https://www.hankyung.com/article/202202228940H)

### 마마무 ↔ 옆집소녀

- 공통 멤버: 문별
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://www.soompi.com/article/1006443wpp/watch-girls-next-door-shares-drama-version-deep-blue-eyes-mv)

### 마마무 ↔ 환불원정대

- 공통 멤버: 화사
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 출처: [자료 1](https://en.wikipedia.org/wiki/Refund_Sisters)

### 마이달링 ↔ 투란

- 공통 멤버: 별아(우별/신유비)
- 범위: core; 유형: membership; 근거: profile; 이력 투영: True
- 메모: 동일 멤버의 출처 확인 이력을 모든 그룹 쌍으로 투영.
- 출처: [자료 1](https://kprofiles.com/hint-members-profile/) · [자료 2](https://zh.wikipedia.org/wiki/TURAN)

### 마이달링 ↔ 힌트

- 공통 멤버: 별아(우별/신유비)
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 메모: 웹 프로필·위키의 활동 이력 확인; 2차 자료
- 출처: [자료 1](https://kprofiles.com/hint-members-profile/)

### 마이비 ↔ 보너스베이비

- 공통 멤버: 문희, 하윤
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://www.soompi.com/article/925599wpp/ex-myb-members-join-maroo-entertainments-new-girl-group) · [자료 2](https://kpopping.com/profiles/group/BONUSbaby)

### 마틸다 ↔ 키스&크라이

- 공통 멤버: 이해나
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 메모: 웹 프로필·위키의 활동 이력 확인; 2차 자료
- 출처: [자료 1](https://kprofiles.com/kisscry-members-profile/)

### 모아 ↔ 포엘

- 공통 멤버: 찬이, 자영, 제이나
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 메모: 웹 프로필·위키의 활동 이력 확인; 2차 자료
- 출처: [자료 1](https://en.wikipedia.org/wiki/4L_(group))

### 밤비노 ↔ 위걸스

- 공통 멤버: 니나, 은아
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 메모: 밤비노 무대 정식활동 포함. 은아는 2022 재결성 무대, 니나는 2017/2022 활동.
- 출처: [자료 1](https://kpop.fandom.com/wiki/Nina_(Bunny.T)) · [자료 2](https://kpop.fandom.com/wiki/Eun_A_(Bunny.T))

### 배드키즈 ↔ 핫플레이스

- 공통 멤버: 소민(제제·은유), 한빛
- 범위: core; 유형: rebrand; 근거: report; 이력 투영: False
- 메모: 2019~2020 활동명 변경 후 환원. Jeje는 소민(장은유)이며 두나(한정아)와 다른 인물; 프로필 원문 재확인. / 2019 개명; 태리는 개명 때 새 합류이므로 이전 활동 멤버에 포함하지 않음. / 원문 재확인: Jeje는 소민/장은유. 두나는 한정아로 별개의 인물이며 2017년 배드키즈 탈퇴. middle.json의 기존 두나 표기도 수정 완료.
- 출처: [자료 1](https://kprofiles.com/hot-place-member-profile/) · [자료 2](https://www.soompi.com/article/1304051wpp/girl-group-badkiz-announces-name-change) · [자료 3](https://en.wikipedia.org/wiki/Badkiz)

### 버스터즈 ↔ 큐티엘

- 공통 멤버: 강예서
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 출처: [자료 1](https://en.wikipedia.org/wiki/Kang_Ye-seo)

### 베이비복스 리브 ↔ 투야

- 공통 멤버: 안진경
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 2001 투야, 2007 베이비복스 리브 활동 본인 인터뷰
- 출처: [자료 1](https://www.starnewskorea.com/music/2010/03/22/2010032202170053465)

### 벨라 ↔ 키스&크라이

- 공통 멤버: 김보혜
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 메모: 웹 프로필·위키의 활동 이력 확인; 2차 자료
- 출처: [자료 1](https://kprofiles.com/kisscry-members-profile/)

### 불독 ↔ 스칼렛

- 공통 멤버: 키미
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 메모: 웹 프로필·위키의 활동 이력 확인; 2차 자료
- 출처: [자료 1](https://kprofiles.com/scarlet-members-profile/)

### 브레이브걸스 ↔ 브브걸

- 공통 멤버: 민영, 유정, 은지, 유나
- 범위: core; 유형: rebrand; 근거: profile; 이력 투영: False
- 메모: 2023년 4인 그대로 재결성·개명. 유정은 2024년 탈퇴했지만 양쪽 정식활동 이력 유지
- 출처: [자료 1](https://en.wikipedia.org/wiki/BB_Girls)

### 브이엔티 ↔ 키스&크라이

- 공통 멤버: 소유미
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 메모: 웹 프로필·위키의 활동 이력 확인; 2차 자료
- 출처: [자료 1](https://kprofiles.com/kisscry-members-profile/)

### 블랙퀸 ↔ 헤이걸스

- 공통 멤버: 잔디, 희수, 다은
- 범위: core; 유형: rebrand; 근거: profile; 이력 투영: False
- 출처: [자료 1](https://kpop.fandom.com/wiki/HeyGirls) · [자료 2](https://kprofiles.com/black-queen-members-profile/)

### 블레이디 ↔ 코코소리

- 공통 멤버: 이코코
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 메모: 웹 프로필·위키의 활동 이력 확인; 2차 자료
- 출처: [자료 1](https://kprofiles.com/cocosori-members-profile/)

### 블레이디 ↔ 투앤비

- 공통 멤버: 가빈(김송이, 김가빈)
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 2NB로 함께 활동한 솔지와 가빈이 각각 EXID와 블레이디로 재데뷔
- 출처: [자료 1](https://m.nocutnews.co.kr/news/4395621)

### 소나무 ↔ 옆집소녀

- 공통 멤버: 디애나
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://www.soompi.com/article/1006443wpp/watch-girls-next-door-shares-drama-version-deep-blue-eyes-mv)

### 소녀시대 ↔ 언니쓰

- 공통 멤버: 티파니
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 출처: [자료 1](https://static.kpopping.com/profiles/group/Unnies)

### 스완 ↔ 언니쓰

- 공통 멤버: 홍진영
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 출처: [자료 1](https://static.kpopping.com/profiles/group/Unnies)

### 스칼렛 ↔ 아이시어

- 공통 멤버: 라별(반디/안솔희)
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 메모: 웹 프로필·위키의 활동 이력 확인; 2차 자료
- 출처: [자료 1](https://kprofiles.com/scarlet-members-profile/)

### 씨야 ↔ 파이브돌스

- 공통 멤버: 이수미
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 씨야, 남녀공학, 파이브돌스에서 실제 활동. 혼성 남녀공학은 노드 제외 / 씨야 2009, 남녀공학 2010, 파이브돌스 2011 실제 데뷔; 남녀공학 노드 없이도 두 여성그룹 직접 엣지
- 출처: [자료 1](https://www.xportsnews.com/article/216401) · [자료 2](https://en.wikipedia.org/wiki/Lee_Seo-an) · [자료 3](https://www.soompi.com/article/518739wpp/flashback-friday-the-ballad-queens-seeya)

### 아이오아이 ↔ 언니쓰

- 공통 멤버: 전소미
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 출처: [자료 1](https://static.kpopping.com/profiles/group/Unnies)

### 아이오아이 ↔ 옆집소녀

- 공통 멤버: 전소미
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://www.soompi.com/article/1006443wpp/watch-girls-next-door-shares-drama-version-deep-blue-eyes-mv)

### 아이오아이 ↔ 우주소녀

- 공통 멤버: 유연정
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://www.soompi.com/article/1306438wpp/agencies-deny-reports-of-potential-i-o-i-reunion)

### 아이오아이 ↔ 위키미키

- 공통 멤버: 최유정, 김도연
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://www.soompi.com/article/1306438wpp/agencies-deny-reports-of-potential-i-o-i-reunion)

### 아이오아이 ↔ 프리스틴

- 공통 멤버: 임나영, 주결경
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://www.soompi.com/article/1306438wpp/agencies-deny-reports-of-potential-i-o-i-reunion)

### 어썸베이비 ↔ 핑크판타지

- 공통 멤버: 예찬
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 메모: 팬 위키/백과 근거.
- 출처: [자료 1](https://pinkfantasy.fandom.com/wiki/Pink_Fantasy) · [자료 2](https://en.wikipedia.org/wiki/Pink_Fantasy)

### 언니쓰 ↔ 옆집소녀

- 공통 멤버: 전소미
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 출처: [자료 1](https://static.kpopping.com/profiles/group/Unnies)

### 언니쓰 ↔ 환불원정대

- 공통 멤버: 제시
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 출처: [자료 1](https://en.wikipedia.org/wiki/Refund_Sisters)

### 옆집소녀 ↔ 오마이걸

- 공통 멤버: 유아
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://www.soompi.com/article/1006443wpp/watch-girls-next-door-shares-drama-version-deep-blue-eyes-mv)

### 이삭 N 지연 ↔ 천상지희 더 그레이스

- 공통 멤버: 린아(이지연)
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 2002 이삭 N 지연 데뷔 후 천상지희 활동
- 출처: [자료 1](https://www.fnnews.com/ampNews/202504130832144440)

### 키로츠 ↔ 핑크판타지

- 공통 멤버: 희정 / 아이니
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 메모: 키로츠 활동명 희정; 팬 DB 근거.
- 출처: [자료 1](https://pinkfantasy.fandom.com/wiki/Pink_Fantasy) · [자료 2](https://kpop.fandom.com/wiki/Category:Aini_(PinkFantasy))

### 투란 ↔ 힌트

- 공통 멤버: 혜진, 해솔, 나엘, 체리, 별아(우별/신유비)
- 범위: core; 유형: rebrand; 근거: profile; 이력 투영: False
- 메모: 양 그룹의 역사적 활동 멤버 공유. 별아는 2017년 HINT 합류.
- 출처: [자료 1](https://kprofiles.com/hint-members-profile/) · [자료 2](https://zh.wikipedia.org/wiki/TURAN)

### 프림로즈 ↔ 핫이슈

- 공통 멤버: 나현
- 범위: core; 유형: membership; 근거: report; 이력 투영: False
- 메모: 2023-08-18 4인 체제 Laffy Taffy 정식 활동
- 출처: [자료 1](https://www.koreajoongangdaily.com/entertainment/girl-group-primrose-to-make-comeback-with-four-members/10540593) · [자료 2](https://www.youtube.com/watch?v=mKj0YqnNnog) · [자료 3](https://www.xportsnews.com/article/1760719) · [자료 4](https://en.wikipedia.org/wiki/Primrose_(group))

### 피기돌스 ↔ 핑크판타지

- 공통 멤버: 은영 / 시아
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 메모: 피기돌스 2기 멤버 강은영.
- 출처: [자료 1](https://pinkfantasy.fandom.com/wiki/Pink_Fantasy) · [자료 2](https://en.wikipedia.org/wiki/Pink_Fantasy)

### 핑클 ↔ 환불원정대

- 공통 멤버: 이효리
- 범위: core; 유형: membership; 근거: profile; 이력 투영: False
- 출처: [자료 1](https://en.wikipedia.org/wiki/Refund_Sisters) · [자료 2](https://en.wikipedia.org/wiki/Lee_Hyori)

### AKB48 ↔ IZ*ONE

- 공통 멤버: 혼다 히토미
- 범위: external; 유형: membership; 근거: report; 이력 투영: False
- 메모: external: 일본 그룹. 사쿠라/나코 AKB 겸임 이력은 추가 검증 필요
- 출처: [자료 1](https://www.oricon.co.jp/news/2353207/full/)

### AKB48 ↔ SAY MY NAME

- 공통 멤버: 혼다 히토미
- 범위: external; 유형: membership; 근거: report; 이력 투영: False
- 메모: external: 일본 그룹
- 출처: [자료 1](https://www.oricon.co.jp/news/2353207/full/)

### AKB48 ↔ 로켓펀치

- 공통 멤버: 다카하시 쥬리
- 범위: external; 유형: membership; 근거: report; 이력 투영: False
- 메모: external: 일본 그룹
- 출처: [자료 1](https://en.yna.co.kr/view/AEN20190807008000315) · [자료 2](https://www.oricon.co.jp/news/2202392/full/)

### PRIKIL ↔ UNIS

- 공통 멤버: 나나
- 범위: external; 유형: membership; 근거: profile; 이력 투영: False
- 메모: PRIKIL은 일본 그룹: 해외 확장만.
- 출처: [자료 1](https://kpop.fandom.com/wiki/Nana_(UNIS)) · [자료 2](https://kpopping.com/profiles/idol/Nana4)

### WSG 워너비 ↔ 어반자카파

- 공통 멤버: 조현아
- 범위: external; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://www.soompi.com/article/1529497wpp/watch-how-do-you-play-project-group-wsg-wannabe-covers-momoland-in-1st-performance-as-full-group)

### 남녀공학 ↔ 씨야

- 공통 멤버: 이수미
- 범위: external; 유형: membership; 근거: report; 이력 투영: False
- 출처: [자료 1](https://www.soompi.com/article/518739wpp/flashback-friday-the-ballad-queens-seeya)

### 남녀공학 ↔ 파이브돌스

- 공통 멤버: 이수미, 허찬미, 류효영, 진혜원
- 범위: external; 유형: unit; 근거: report; 이력 투영: False
- 메모: 남녀공학 여성 유닛으로 데뷔 후 독립 그룹
- 출처: [자료 1](https://en.wikipedia.org/wiki/F-ve_Dolls) · [자료 2](https://www.soompi.com/article/363286wpp/5dolls-releases-comeback-teaser)

### ARTMS ↔ ODD EYE CIRCLE

- 공통 멤버: 김립, 진솔, 최리
- 범위: unit; 유형: unit; 근거: report; 이력 투영: False
- 메모: 유닛 확장.
- 출처: [자료 1](https://loonatheworld.jp/profile/) · [자료 2](https://en.wikipedia.org/wiki/Artms)

### ARTMS ↔ 이달의 소녀 1/3

- 공통 멤버: 희진, 하슬
- 범위: unit; 유형: unit; 근거: report; 이력 투영: False
- 메모: 유닛 확장시 모든 동일인 페어.
- 출처: [자료 1](https://loonatheworld.jp/profile/) · [자료 2](https://en.wikipedia.org/wiki/Artms)

### BGH4 ↔ H2가인

- 공통 멤버: 도희선(해선), 미스티(혜나)
- 범위: unit; 유형: unit; 근거: profile; 이력 투영: False
- 메모: BGH4 해선과 혜나의 듀오
- 출처: [자료 1](https://www.maniadb.com/artist/144229)

### Feverse ↔ 이달의 소녀 1/3

- 공통 멤버: 희진
- 범위: unit; 유형: membership; 근거: report; 이력 투영: True
- 메모: 동일 멤버의 출처 확인 이력을 모든 그룹 쌍으로 투영.
- 출처: [자료 1](https://www.soompi.com/article/1585859wpp/watch-girls-reverse-virtual-girl-group-feverse-drops-dreamy-debut-mv-for-cho) · [자료 2](https://kpopping.com/profiles/group/feverse) · [자료 3](https://en.wikipedia.org/wiki/Artms) · [자료 4](https://www.soompi.com/article/1645497wpp/artms-announces-release-dates-for-full-length-album-and-multiple-singles) · [자료 5](https://www.koreajoongangdaily.com/entertainment/girl-group-artms-debuts-as-virtual-angels-with-album-dall/12108439) · [자료 6](https://loonatheworld.jp/profile/)

### H2가인 ↔ H7미인

- 공통 멤버: 도희선(해선), 미스티(혜나)
- 범위: unit; 유형: membership; 근거: report; 이력 투영: False
- 메모: BGH4 멤버의 두 프로젝트/유닛 활동
- 출처: [자료 1](https://enews.imbc.com/News/ViewAmp/1501) · [자료 2](https://www.maniadb.com/artist/144229)

### H2가인 ↔ 가비엔제이

- 공통 멤버: 미스티(혜나)
- 범위: unit; 유형: membership; 근거: report; 이력 투영: False
- 메모: 동일인 혜나의 BGH4 유닛 활동과 가비엔제이 이적 연결
- 출처: [자료 1](https://www.maniadb.com/artist/144229) · [자료 2](https://www.nocutnews.co.kr/news/640245)

### LATENCY ↔ 이달의 소녀 1/3

- 공통 멤버: 현진
- 범위: unit; 유형: unit; 근거: report; 이력 투영: False
- 메모: 유닛·밴드 확장.
- 출처: [자료 1](https://loonatheworld.jp/profile/) · [자료 2](https://enews.imbc.com/News/RetrieveNewsInfo/498453)

### Loossemble ↔ 이달의 소녀 1/3

- 공통 멤버: 현진, 비비
- 범위: unit; 유형: unit; 근거: report; 이력 투영: False
- 메모: 유닛 확장.
- 출처: [자료 1](https://loonatheworld.jp/profile/) · [자료 2](https://en.wikipedia.org/wiki/Loossemble)

### Loossemble ↔ 이달의 소녀 yyxy

- 공통 멤버: 고원, 혜주
- 범위: unit; 유형: unit; 근거: report; 이력 투영: False
- 메모: 유닛 확장.
- 출처: [자료 1](https://loonatheworld.jp/profile/) · [자료 2](https://en.wikipedia.org/wiki/Loossemble)

### ODD EYE CIRCLE ↔ 이달의 소녀

- 공통 멤버: 김립, 진솔, 최리
- 범위: unit; 유형: unit; 근거: report; 이력 투영: False
- 메모: 원 유닛과 MODHAUS 재활동은 동일 노드.
- 출처: [자료 1](https://loonatheworld.jp/profile/)

### 이달의 소녀 ↔ 이달의 소녀 1/3

- 공통 멤버: 희진, 현진, 하슬, 비비
- 범위: unit; 유형: unit; 근거: report; 이력 투영: False
- 메모: 공식 일본 프로필. 여진은 1/3 멤버 아님.
- 출처: [자료 1](https://loonatheworld.jp/profile/)

### 이달의 소녀 ↔ 이달의 소녀 yyxy

- 공통 멤버: 이브, 츄, 고원, 혜주
- 범위: unit; 유형: unit; 근거: report; 이력 투영: False
- 메모: 정식 발매 유닛.
- 출처: [자료 1](https://loonatheworld.jp/profile/)

## 제외·검증 대기 메모

각 병렬 조사자의 원기록이다. 일부 항목은 다른 조사에서 보강되었다. 예: SUPA–AWU, ARTMS–Feverse는 최종 간선에 포함되었다.

- {"a": "더 빨강", "b": "캣츠", "status": "excluded", "note": "2기로 홍보됐으나 공통 멤버 없음. 더 빨강은 오승은 추소영 배슬기, 캣츠는 박수정 한소유 순심 김지혜", "sources": ["https://www.starnewskorea.com/music/2007/01/24/2007012414034785765"]}
- {"a": "베이비복스", "b": "베이비복스 리브", "status": "excluded", "note": "이름 계승일 뿐 shared member 없음"}
- {"a": "스완", "b": "씨야", "status": "excluded", "note": "김연지 이름이 같아도 다른 인물. 자동 이름 합치기 금지", "sources": ["https://www.genie.co.kr/detail/artistInfo?xxnm=50688539"]}
- {"a": "JQT", "b": "S the One", "status": "unverified_debut", "note": "재데뷔 계획/프로필은 있으나 정식 발매 활동 검증 필요", "sources": ["https://en.wikipedia.org/wiki/JQT_(group)"]}
- {"a": "소녀시대", "b": "Route 0", "status": "out_of_country_scope", "note": "수영의 일본 데뷔 듀오. 대한민국 그룹 한정이면 제외", "sources": ["https://v.daum.net/v/p7eyzqkP2K"]}
- {"a": "저고리 시스터즈", "b": "김시스터즈", "status": "excluded", "note": "이난영은 김시스터즈 제작자/가족이지 멤버 아님. 가족 edge 불가", "sources": ["https://www.ktv.go.kr/program/home/PG2230044D/content/689497"]}
- {"a": "투란", "b": "디홀릭", "members": ["추화정"], "reason": "Fandom 후일담에 투란 이력 있으나 실제 투란 활동 여부 재확인 필요", "sources": ["https://kpop.fandom.com/wiki/File%3ATURAN_July_2014_profile_photo.png"]}
- {"a": "빌리언", "b": "4X", "members": ["레이(성보라)"], "reason": "Kprofiles 4X 멤버 이력은 있으나 4X의 정식 음원/활동 범위 재확인", "sources": ["https://kprofiles.com/billion-members-profile/"]}
- {"a": "배드키즈", "b": "파란여우들", "members": ["유시(지연)"], "reason": "2019년 가입 이력; 실제 활동범위 미검증", "sources": ["https://kprofiles.com/hot-place-member-profile/"]}
- {"a": "배드키즈", "b": "그레이시", "members": ["혜지(별)"], "reason": "2024~25 정식 멤버 이력과 공연 출처 프로필에 존재; 부모 agent 중복 조사 조율", "sources": ["https://kprofiles.com/hot-place-member-profile/"]}
- {"a": "MOMOLAND", "b": "우주소녀", "reason": "태하는 스타쉽 연습생 및 데뷔조 이력만 있고 우주소녀 정식활동 없음. 연결 제외."}
- {"a": "UNIZ", "b": "핑크판타지", "reason": "아이니 공유는 여러 팬 DB에 있으나 UNIZ 정식 음원/공연 활동 검증 미완료. 보류."}
- {"a": "미드나잇", "b": "ANS", "reason": "비안 미드나잇 활동은 pre-debut group으로 분류되어 제외."}
- {"a": "Weather Girls", "b": "핑크판타지", "reason": "라이/신디가 핑크판타지 데뷔 이전 탈퇴하여 제외."}
- {"a": "SUPA", "b": "AWU", "reason": "다정/유채 AWU 이력 fan wiki 발견, 2026 AWU 실제 데뷔 별도 검증 필요."}
- ARTMS-FE:VERSE 희진 링크는 ARTMS 멤버 출처 보강 필요
- 써니힐은 혼성 시기 포함: 현재 여성그룹이나 분류 선택 필요
- 명형서 링크는 위키 기반 교차검증 권장
- WSG 유닛 가야G 사파이어 오아시소 별도 유닛 확장 미수록
- 유닛 전수는 범위상 미완
- ALDL은 하은·비바·보민 등이 공개된 댄스 프로젝트로 검색되지만 정식 음악 그룹 데뷔를 검증하지 못해 제외. 따라서 cignature-REDSQUARE 직접 엣지 생성 금지.
- LATENCY 1월8일 싱글과 3월18일 정식 미니앨범 데뷔를 구별. 3월 현진 현장 활동은 확정.
- UNIS 오윤아의 놀아줘클럽 이력은 있으나 혼성 유튜브 집단의 정식 음악 그룹 활동 검증을 완료하지 않아 제외.
- GOOD DAY의 굿모닝·굿나잇·미드나잇은 내부 유닛; 이번 별도 정식 발매 검증 범위에서 제외.
- {"a": "타히티", "b": "3piece", "members": ["제리(수)"], "sources": ["https://kpop.fandom.com/wiki/3piece"], "note": "팬위키만 확보. 3piece 2024-08-05 데뷔 확인되나 멤버 이전 그룹 공식 출처 보강 필요"}
- {"a": "카밀라", "b": "3piece", "members": ["비키"], "sources": ["https://kpop.fandom.com/wiki/3piece"], "note": "팬위키. 일부 저품질 사이트가 동명이인 달샤벳 비키와 혼동, 주의"}
- {"a": "레이샤", "b": "3piece", "members": ["비키"], "sources": ["https://kpop.fandom.com/wiki/3piece"], "note": "팬위키 경력 출처 보강 필요"}
- {"a": "위걸스", "b": "Bunny.T", "members": ["은아"], "sources": ["https://zh.wikipedia.org/wiki/Bunny.T", "https://kprofiles.com/bunny-t-members-profile/"], "note": "전 그룹 이력 팬위키만 확보"}
- {"a": "X:IN", "b": "MEPC", "members": ["로아", "치유", "이샤", "노바", "아리아"], "sources": ["https://yesmagazine.ru/music/russkiy-akcent-v-koreyskom-gerlz-bende-chto-izvestno-o-gruppe-xin"], "note": "제외: X:IN 합류 멤버들의 MEP-C 이력은 데뷔 전. 2025 실제 데뷔 MEPC와 연결하면 안 됨"}
- {"a": "3piece", "b": "불독", "members": ["키미"], "sources": ["https://kpop.fandom.com/wiki/3piece"], "note": "제외: 키미는 3piece 정식 데뷔 전 탈퇴"}
- 씨야와 더 씨야는 이름 계승만으로 직접 연결하지 않음
- 파이브돌스 다니 피처링은 정식 멤버가 아니므로 티아라 연결에 쓰지 않음
- {"a": "스칼렛", "b": "포켓걸스", "members": ["라별(준희/안솔희)"], "sources": ["https://kprofiles.com/scarlet-members-profile/"], "type": "membership", "note": "2016년 정식 멤버 프로필 이력. 음원참여 엄격기준이면 추가검증", "status": "provisional", "reason": "정식 멤버 프로필은 있으나 실제 활동 증거 추가 필요"}
- {"a": "스칼렛", "b": "큐피트", "members": ["라별(도희/안솔희)"], "sources": ["https://kprofiles.com/scarlet-members-profile/"], "type": "membership", "note": "2016년 정식 멤버 프로필 이력. 음원참여 엄격기준이면 추가검증", "status": "provisional", "reason": "정식 멤버 프로필은 있으나 실제 활동 증거 추가 필요"}
- {"a": "포켓걸스", "b": "큐피트", "members": ["준희(도희/안솔희)"], "sources": ["https://kprofiles.com/scarlet-members-profile/"], "type": "membership", "note": "웹 프로필·위키의 활동 이력 확인; 2차 자료", "status": "provisional", "reason": "정식 멤버 프로필은 있으나 실제 활동 증거 추가 필요"}
- {"a": "포켓걸스", "b": "아이시어", "members": ["준희(반디/안솔희)"], "sources": ["https://kprofiles.com/scarlet-members-profile/"], "type": "membership", "note": "웹 프로필·위키의 활동 이력 확인; 2차 자료", "status": "provisional", "reason": "정식 멤버 프로필은 있으나 실제 활동 증거 추가 필요"}
- {"a": "큐피트", "b": "아이시어", "members": ["도희(반디/안솔희)"], "sources": ["https://kprofiles.com/scarlet-members-profile/"], "type": "membership", "note": "웹 프로필·위키의 활동 이력 확인; 2차 자료", "status": "provisional", "reason": "정식 멤버 프로필은 있으나 실제 활동 증거 추가 필요"}