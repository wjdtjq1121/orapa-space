# STAR LINKER - 개발 가이드

## 현재 버전
**Version: 1.10.2** (2025-12-29)

---

## 🤖 Claude Code 자동 워크플로우

**중요: 모든 코드 수정 후 다음 단계를 자동으로 수행해야 합니다!**

### 자동 수행 단계 (필수)

사용자가 코드 수정을 요청하고 수정이 완료되면, **무조건 다음 순서대로 자동 실행**:

1. **버전 번호 결정**
   - MAJOR.MINOR.PATCH 형식
   - 버그 수정/로직 개선: PATCH 증가 (예: 1.9.0 → 1.9.1)
   - 새 기능 추가: MINOR 증가 (예: 1.9.1 → 1.10.0)
   - 호환성 깨지는 변경: MAJOR 증가 (예: 1.10.0 → 2.0.0)

2. **CLAUDE.md 업데이트**
   - 맨 위 "현재 버전" 변경
   - "버전 히스토리"에 새 버전 섹션 추가 (날짜 포함)
   - 주요 변경사항 bullet point로 기록

3. **script.js 업데이트**
   ```javascript
   const GAME_VERSION = "X.Y.Z";  // 새 버전으로 변경
   ```

4. **index.html 업데이트**
   ```html
   <script src="script.js?v=X.Y.Z"></script>  <!-- 캐시 버스팅 버전 변경 -->
   ```

5. **Git Commit & Push (자동)**
   ```bash
   git add CLAUDE.md script.js index.html [수정된 다른 파일들]
   git commit -m "$(cat <<'EOF'
   <type>: <간결한 요약> (vX.Y.Z)

   - 변경사항 1
   - 변경사항 2
   - 변경사항 3

   🤖 Generated with [Claude Code](https://claude.com/claude-code)

   Co-Authored-By: Claude <noreply@anthropic.com>
   EOF
   )"
   git push
   ```

### Commit Type 자동 선택 규칙
- `fix:` - 버그 수정, 로직 개선, 오류 해결
- `feat:` - 새로운 기능 추가
- `refactor:` - 코드 리팩토링 (기능 변경 없음)
- `perf:` - 성능 개선
- `docs:` - 문서만 수정
- `style:` - UI/UX 스타일 변경

### ⚠️ 중요 사항
- 사용자가 코드 수정을 요청하면, 수정 완료 후 **반드시 위 5단계를 모두 자동 실행**
- 사용자가 "git push하지 마" 또는 "버전 업데이트 건너뛰어"라고 명시하지 않는 한, **무조건 실행**
- GitHub Pages는 push해야만 https://wjdtjq1121.github.io/orapa-space/ 에 반영됨
- 우측 상단 버전은 `updateGameVersion()` 함수가 자동으로 표시

---

## 버전 히스토리

### v1.10.2 (2025-12-29)
- 📚 **Android 빌드 설정 완전 가이드 추가**
  - CLAUDE.md에 "Android APK 빌드 설정" 섹션 신규 추가
  - 새 프로젝트 빌드 시 필수 체크리스트 5단계 작성
  - npm install, gradle.properties, build.gradle, capacitor-cordova-android-plugins, Java 버전 통일
  - 빌드 전 체크리스트 및 문제 해결 가이드 추가
  - 기존 성공 프로젝트 참조 정보 포함

### v1.10.1 (2025-12-29)
- 🔧 **Android 빌드 설정 개선**
  - AGP (Android Gradle Plugin) 버전 8.13.0 → 8.2.1로 조정 (Capacitor 6.x 호환)
  - gradle.properties에 Java 17 명시적 설정 추가
  - README에 상세한 Android SDK 설정 가이드 추가
  - 문제 해결 섹션 대폭 강화 (SDK location, AGP 버전, Java 버전 등)

### v1.10.0 (2025-12-29)
- 📱 **Android APK 빌드 지원 완성**
  - Capacitor 6.x로 버전 조정 (Node 20 호환)
  - 루트 index.html에 SEO 메타데이터 추가
  - package.json에 빌드 스크립트 추가 (sync-android, build-android 등)
  - README에 상세한 Android APK 빌드 가이드 추가
  - www 폴더 자동 동기화 시스템 구축
  - 웹 버전과 동일한 화면이 Android 앱에서 표시되도록 설정 완료

### v1.9.4 (2025-12-27)
- 📦 **Star Linker 독립 앱 생성**
  - 기존 orapa-space-app 폴더 삭제 및 star-linker-app 폴더로 재생성
  - package.json, README.md, .gitignore 등 완전한 프로젝트 구조로 개편
  - HTML 메타데이터 강화 (SEO, Open Graph, Twitter Card 지원)
  - 완전히 Star Linker 브랜드로 통일된 독립 앱 완성

### v1.9.3 (2025-12-26)
- 🕳️ **블랙홀 굴절 OUTER EDGE 로직 구현** (중요 수정)
  - Inner edge vs Outer edge 개념 구현
  - Inner edge: 레이저가 블랙홀로 향하면서 지나가는 대각선 → 굴절 안됨
  - Outer edge: 레이저가 블랙홀을 지나친 후 뒤쪽 대각선 → 굴절 발생 ✓
  - `checkDiagonalBlackHole` 함수에 방향 파라미터 추가 및 outer edge 체크 로직 구현
  - D번, K번, 4번 등 모든 블랙홀 굴절 경로 정확도 대폭 개선

---

## 프로젝트 구조

```
star-linker-app/
├── index.html          # 메인 HTML 파일
├── script.js           # 게임 로직 (2500+ 줄)
├── style.css           # 스타일시트
├── package.json        # NPM 패키지 설정
├── README.md           # 프로젝트 설명서
├── .gitignore          # Git 무시 파일 목록
└── CLAUDE.md          # 이 파일 (개발 가이드)
```

---

## 게임 모드

### 1. 싱글 플레이 (기본 모드)
- 자동으로 랜덤 문제 생성
- AI 문제 보드가 물음표로 가려짐
- 포기하기 버튼 제공
- 디버그 패널 숨김
- 모달창으로 게임 종료 및 다시하기

### 2. 연습 모드
- 수동으로 행성 배치
- 랜덤 배치, 초기화, 배치 완료 버튼 제공
- 디버그 패널 표시
- 기존 기능 그대로 유지

---

## 주요 게임 상태 (gameState)

```javascript
{
    phase: 'waiting' | 'setup' | 'playing' | 'finished',
    mode: 'singleEasy' | 'singleHard' | 'practice',
    selectedPlanet: null | string,
    selectedPosition: null | number | string,
    planetRotations: { 'medium-jupiter': 0-270, 'large-saturn': 0-270 },
    pendingPlacement: null | object,
    laserCount: number,  // 시도 횟수
    explorerBoard: Array[7][11],
    questionerBoard: Array[7][11],
    laserHistory: Array,
    questionerBoardHidden: boolean,  // 싱글 플레이에서 정답 숨김
    blackHoles: Array  // 블랙홀 위치 배열
}
```

---

## 핵심 함수

### 게임 초기화
- `initGame()` - 게임 전체 초기화
- `initializeBoards()` - 보드 생성
- `restartGame()` - 게임 재시작

### 게임 플레이
- `randomPlacement()` - 랜덤 행성 배치
- `confirmSetup()` - 배치 완료
- `submitSolution()` - 솔루션 제출
- `giveUp()` - 포기하기
- `fireLaserFromButton()` - 레이저 발사

### UI 관리
- `updateGameModeUI()` - 모드별 UI 업데이트
- `renderBoard(boardId)` - 보드 렌더링
- `updateGameVersion()` - 버전 정보 업데이트

---

## 행성 타입 (PLANETS)

1. **small-red** - 작은 빨강 (1x1, 원형)
2. **small-orange** - 중간 빨강 (2x2, 마름모)
3. **small-blue** - 중간 파랑 (2x2, 마름모)
4. **medium-earth** - 중간 노랑 (3x3, 팔각형)
5. **medium-jupiter** - 큰 흰색 (4x2, 사다리꼴, 회전 가능)
6. **large-saturn** - 큰 링 흰색 (4x2, 링, 회전 가능)
7. **black-hole** - 블랙홀 (1x1, 특수 효과)

---

## 개발 및 배포

### 로컬 개발
```bash
# 의존성 설치
npm install

# 개발 서버 실행 (Live Server)
npm run dev

# 또는 HTTP Server
npm run start
```

### 배포
```bash
# GitHub Pages 자동 배포
npm run deploy
```

### 브라우저 지원
- ✅ Chrome (권장)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ 모바일 브라우저

---

## 📱 Android APK 빌드 설정

### ⚠️ 중요: 새 프로젝트 빌드 시 필수 체크리스트

Android Studio에서 새 프로젝트를 빌드하기 전, **반드시 다음 설정을 확인하세요**:

#### 1️⃣ npm install 실행 (필수!)
```bash
cd star-linker-app
npm install
```
- `node_modules/@capacitor/android` 모듈이 설치되어야 함
- 설치 안 하면 `:capacitor-android` 프로젝트를 찾을 수 없다는 에러 발생

#### 2️⃣ gradle.properties 설정
```properties
# ❌ WSL Linux 경로 사용 금지 (Windows Android Studio에서 인식 불가)
# org.gradle.java.home=/usr/lib/jvm/java-1.17.0-openjdk-amd64

# ✅ 시스템 JAVA_HOME 자동 사용 (권장)
org.gradle.jvmargs=-Xmx1536m
android.useAndroidX=true
```

#### 3️⃣ android/build.gradle (루트)
```gradle
dependencies {
    classpath 'com.android.tools.build:gradle:8.7.2'  // ✅ AGP 8.7.2
    classpath 'com.google.gms:google-services:4.4.2'
    classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:1.8.22"  // ✅ Kotlin 추가
}

allprojects {
    repositories {
        google()
        mavenCentral()
    }
    configurations.all {
        resolutionStrategy {
            // ✅ Kotlin stdlib 강제 버전 설정
            force 'org.jetbrains.kotlin:kotlin-stdlib:1.8.22'
            force 'org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.8.22'
            force 'org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.8.22'
        }
    }
}
```

#### 4️⃣ capacitor-cordova-android-plugins 모듈 생성
프로젝트 최초 빌드 시 다음 파일들이 필요합니다:

```
android/capacitor-cordova-android-plugins/
├── build.gradle
├── cordova.variables.gradle
└── src/main/
    ├── AndroidManifest.xml
    ├── java/
    ├── res/
    └── libs/
```

**build.gradle**:
```gradle
ext {
    androidxAppCompatVersion = project.hasProperty('androidxAppCompatVersion') ? rootProject.ext.androidxAppCompatVersion : '1.7.0'
    cordovaAndroidVersion = project.hasProperty('cordovaAndroidVersion') ? rootProject.ext.cordovaAndroidVersion : '10.1.1'
}

buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:8.7.2'
    }
}

apply plugin: 'com.android.library'

android {
    namespace "capacitor.cordova.android.plugins"
    compileSdk 35
    defaultConfig {
        minSdkVersion 23
        targetSdkVersion 35
        versionCode 1
        versionName "1.0"
    }
    lintOptions {
        abortOnError false
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_21  // ✅ Java 21
        targetCompatibility JavaVersion.VERSION_21
    }
}

repositories {
    google()
    mavenCentral()
    flatDir{
        dirs 'src/main/libs', 'libs'
    }
}

dependencies {
    implementation fileTree(dir: 'src/main/libs', include: ['*.jar'])
    implementation "androidx.appcompat:appcompat:$androidxAppCompatVersion"
    implementation "org.apache.cordova:framework:$cordovaAndroidVersion"
}

apply from: "cordova.variables.gradle"

for (def func : cdvPluginPostBuildExtras) {
    func()
}
```

**cordova.variables.gradle**:
```gradle
// DO NOT EDIT THIS FILE! IT IS GENERATED EACH TIME "capacitor update" IS RUN
ext {
  cdvMinSdkVersion = project.hasProperty('minSdkVersion') ? rootProject.ext.minSdkVersion : 23
  cdvPluginPostBuildExtras = []
  cordovaConfig = [:]
}
```

**AndroidManifest.xml**:
```xml
<?xml version='1.0' encoding='utf-8'?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
xmlns:amazon="http://schemas.amazon.com/apk/res/android">
<application  >

</application>

</manifest>
```

#### 5️⃣ Java 버전 통일 (Java 21)
**android/app/capacitor.build.gradle**:
```gradle
android {
  compileOptions {
      sourceCompatibility JavaVersion.VERSION_21  // ✅ Java 21로 통일
      targetCompatibility JavaVersion.VERSION_21
  }
}
```

### 빌드 전 체크리스트

빌드하기 전 다음 사항을 확인하세요:

- [ ] `npm install` 실행 완료
- [ ] `node_modules/@capacitor/android` 폴더 존재
- [ ] `gradle.properties`에서 WSL Java 경로 제거
- [ ] `build.gradle` AGP 버전 8.7.2
- [ ] Kotlin Gradle Plugin 추가
- [ ] `capacitor-cordova-android-plugins` 폴더 및 파일 존재
- [ ] Java 버전 21로 통일

### Android Studio 빌드 방법

```bash
# 1. 웹 파일 동기화
npm run sync-android

# 2. Android Studio에서 프로젝트 열기
npm run open-android

# 3. Gradle Sync 완료 대기

# 4. 빌드 실행
# - Android Studio: Build > Make Project (Ctrl+F9)
# - 또는 터미널: npm run build-android
```

### 문제 해결

#### "Could not resolve project :capacitor-android"
**원인**: `node_modules/@capacitor/android` 미설치
**해결**: `npm install` 실행

#### "Could not read script 'cordova.variables.gradle'"
**원인**: `capacitor-cordova-android-plugins` 모듈 누락
**해결**: 위 4️⃣ 항목 참조하여 폴더 및 파일 생성

#### "Java home supplied is invalid"
**원인**: gradle.properties에 WSL Java 경로 설정
**해결**: `org.gradle.java.home` 라인 제거 또는 주석 처리

#### Java 버전 불일치 에러
**원인**: 프로젝트 내 Java 버전 혼재
**해결**: 모든 build.gradle에서 Java 21로 통일

### 참고 프로젝트

성공적으로 빌드된 프로젝트:
```
C:\Users\PC\Desktop\playstore\251226_tester-version
```

새 프로젝트 빌드 시 위 프로젝트의 설정 파일들을 참고하세요.

---

## 버전 업데이트 방법

**⚠️ 중요: 버전 업데이트는 자동으로 처리됩니다!**

코드 수정 후 상단의 **"🤖 Claude Code 자동 워크플로우"** 섹션 참조.
Claude가 자동으로 버전 번호 결정, 파일 업데이트, git push까지 수행합니다.

---

## 알려진 이슈 및 해결 방법

### 이슈 1: 초기 로드 시 정답 보임
**해결**:
- `gameState.questionerBoardHidden = true`를 보드 초기화 전에 설정
- `requestAnimationFrame` 사용으로 렌더링 순서 보장

### 이슈 2: 모바일 스크롤 버벅임
**해결**:
- resize 이벤트에서 너비만 체크 (세로 변경 무시)
- debounce 시간 500ms로 증가
- 10px 미만 변경 무시

### 이슈 3: 솔루션 제출 실패 시 게임 종료
**해결**:
- 실패 시 게임 종료하지 않고 계속 진행
- 시도 횟수만 증가
- 1.5초 메시지 표시 후 자동 제거

---

## 개발 팁

### 디버깅
- 연습 모드에서 디버그 패널 확인
- `displayPlanetDebugInfo()` - 행성 배치 정보
- `displayAllLaserTests()` - 전체 레이저 테스트 (36가지)

### 모바일 테스트
- Chrome DevTools 모바일 에뮬레이터 사용
- 실제 기기에서 스크롤 및 터치 테스트 필수

### 성능 최적화
- `requestAnimationFrame` 사용
- debounce/throttle 적용
- 불필요한 리렌더링 방지

---

## Git 커밋 메시지 규칙

```
<type>: <subject>

<body>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

**Type 예시:**
- feat: 새로운 기능
- fix: 버그 수정
- refactor: 리팩토링
- perf: 성능 개선
- docs: 문서 수정

---

## 연락처 및 리소스

- GitHub: https://github.com/wjdtjq1121/orapa-space
- Live Demo: https://wjdtjq1121.github.io/orapa-space/
- 앱 폴더: `/star-linker-app/`

---

## TODO (향후 개선 사항)

- [ ] 난이도 선택 기능 확장
- [ ] 힌트 시스템
- [ ] 사운드 효과
- [ ] 리더보드
- [ ] 문제 공유 기능
- [ ] 다크 모드
- [ ] 다국어 지원 (영어)
- [ ] PWA (Progressive Web App) 지원

---

⭐ **Star Linker** - 우주 탐험 퍼즐 게임 ⭐