# ⭐ Star Linker

**우주 탐험 퍼즐 게임** - 레이저로 숨겨진 행성을 찾아라!

## 🎮 게임 소개

Star Linker는 논리와 추리력을 필요로 하는 우주 테마의 퍼즐 게임입니다. 
레이저를 발사하여 격자 안에 숨겨진 행성들의 위치를 찾아내는 것이 목표입니다.

## 🚀 게임 모드

- **싱글 쉬움**: 기본 행성들로 구성된 퍼즐
- **싱글 어려움 (블랙홀)**: 블랙홀이 포함된 고난도 퍼즐
- **연습 모드**: 자유롭게 행성을 배치하고 테스트

## 🌟 주요 특징

- 📱 **반응형 디자인**: 모바일과 데스크톱 모두 지원
- 🎯 **다양한 행성**: 6가지 타입의 행성과 블랙홀
- 🔄 **회전 가능**: 일부 행성은 방향을 조정할 수 있음
- 🕳️ **블랙홀 메커니즘**: 레이저 굴절과 소멸 효과
- 📊 **색상 혼합**: 복잡한 색상 조합 시스템
- 🎨 **직관적 UI**: 깔끔하고 사용하기 쉬운 인터페이스

## 🎯 행성 종류

1. **작은 빨강** (1×1) - 원형
2. **중간 빨강** (2×2) - 마름모
3. **중간 파랑** (2×2) - 마름모  
4. **중간 노랑** (3×3) - 팔각형
5. **큰 흰색** (4×2) - 사다리꼴, 회전 가능
6. **큰 링 흰색** (4×2) - 링 모양, 회전 가능
7. **블랙홀** (1×1) - 특수 효과

## 🎮 플레이 방법

1. **게임 모드 선택**: 원하는 난이도를 선택
2. **게임 시작**: 랜덤 퍼즐이 생성됩니다
3. **레이저 발사**: 36개 위치 중 선택하여 레이저 발사
4. **색상 확인**: 발사 결과로 나오는 색상을 분석
5. **행성 추론**: 색상 정보를 바탕으로 행성 위치 추론
6. **솔루션 제출**: 모든 행성을 올바르게 배치하면 승리!

## 🛠️ 설치 및 실행

### 로컬 실행
```bash
# 저장소 클론
git clone https://github.com/wjdtjq1121/orapa-space.git

# 프로젝트 폴더 이동
cd orapa-space/star-linker-app

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 브라우저에서 직접 플레이
[Live Demo](https://wjdtjq1121.github.io/orapa-space/)

## 🔧 기술 스택

- **Frontend**: Vanilla HTML5, CSS3, JavaScript
- **Styling**: CSS Grid, Flexbox, CSS Variables
- **Animation**: CSS Transitions, Transform
- **Build**: No build process (Pure vanilla)
- **Deployment**: GitHub Pages

## 📱 브라우저 지원

- ✅ Chrome (권장)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ 모바일 브라우저

## 🎨 색상 혼합 규칙

### 2색 혼합
- 빨강 + 노랑 = 주황
- 빨강 + 파랑 = 보라
- 노랑 + 파랑 = 초록
- 빨강 + 흰색 = 분홍
- 노랑 + 흰색 = 레몬
- 파랑 + 흰색 = 하늘색

### 3색 혼합
- 빨강 + 노랑 + 흰색 = 연주황
- 빨강 + 파랑 + 흰색 = 연보라
- 노랑 + 파랑 + 흰색 = 연초록
- 빨강 + 노랑 + 파랑 = 검정

## 🕳️ 블랙홀 메커니즘

- **직접 충돌**: 레이저 소멸 (disappeared)
- **대각선 근처 통과**: 90도 굴절 (1회 한정)
- **무한 루프**: 레이저 포획 (trapped)

## 📄 라이선스

MIT License - 자유롭게 사용하고 수정할 수 있습니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

프로젝트 링크: [https://github.com/wjdtjq1121/orapa-space](https://github.com/wjdtjq1121/orapa-space)

---

⭐ **Star Linker**로 우주 탐험을 시작해보세요! ⭐