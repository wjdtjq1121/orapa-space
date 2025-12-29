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

### 📱 Android APK 빌드

Star Linker를 Android 앱으로 빌드하여 모바일 기기에 설치할 수 있습니다.

#### 사전 요구사항
- **Node.js**: v18 이상 (v20 권장)
- **Java Development Kit (JDK)**: JDK 17 (필수!)
  ```bash
  # Ubuntu/Debian
  sudo apt install openjdk-17-jdk

  # macOS
  brew install openjdk@17

  # 버전 확인
  javac -version  # 17.x.x가 나와야 함
  ```
- **Android Studio**: 최신 버전 설치 권장
  - [다운로드](https://developer.android.com/studio)
  - 설치 시 "Android SDK", "Android SDK Platform", "Android Virtual Device" 체크
- **Android SDK**: Android Studio 설치 시 자동 설치됨
  - SDK 경로 (일반적으로):
    - Windows: `C:\Users\<사용자명>\AppData\Local\Android\Sdk`
    - macOS: `~/Library/Android/sdk`
    - Linux: `~/Android/Sdk`
- **Gradle**: Android Studio에 포함됨

#### 빌드 단계

1. **프로젝트 폴더로 이동**
   ```bash
   cd orapa-space/star-linker-app
   ```

2. **의존성 설치**
   ```bash
   npm install
   ```

3. **Android SDK 경로 설정** (첫 빌드 시 한 번만)

   `star-linker-app/android/local.properties` 파일 생성 또는 수정:
   ```properties
   # Linux/macOS 예시
   sdk.dir=/home/<사용자명>/Android/Sdk

   # Windows 예시 (백슬래시를 슬래시로 변경)
   # sdk.dir=C:/Users/<사용자명>/AppData/Local/Android/Sdk
   ```

   또는 환경 변수 설정:
   ```bash
   # Linux/macOS (.bashrc 또는 .zshrc에 추가)
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
   ```

4. **웹 파일 동기화 및 Capacitor 동기화**
   ```bash
   npm run sync-android
   ```
   이 명령은 자동으로:
   - 루트 디렉토리의 최신 파일(index.html, script.js, style.css)을 www 폴더로 복사
   - Capacitor를 통해 Android 프로젝트에 동기화

5. **Android Studio에서 프로젝트 열기**
   ```bash
   npm run open-android
   ```
   또는 수동으로:
   ```bash
   npx cap open android
   ```

6. **APK 빌드**

   **방법 1: Android Studio 사용 (권장)**
   - Android Studio에서 프로젝트가 열리면
   - `Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)` 선택
   - 빌드 완료 후 `android/app/build/outputs/apk/debug/app-debug.apk` 생성됨

   **방법 2: 커맨드 라인 사용**
   ```bash
   # 디버그 APK 빌드
   npm run build-android
   ```
   또는
   ```bash
   cd android
   ./gradlew assembleDebug
   ```

   **릴리즈 APK 빌드 (서명 필요)**
   ```bash
   npm run build-android-release
   ```
   또는
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

7. **APK 설치**
   - 생성된 APK 파일을 Android 기기로 전송
   - 기기에서 APK 파일을 실행하여 설치
   - "알 수 없는 출처" 앱 설치 허용 필요

#### 빌드 결과물 위치
- **디버그 APK**: `android/app/build/outputs/apk/debug/app-debug.apk`
- **릴리즈 APK**: `android/app/build/outputs/apk/release/app-release.apk`

#### 문제 해결

**문제: Capacitor CLI가 Node 버전 오류**
```
해결: Node.js v18 이상을 사용하세요. (현재 Capacitor 6.x 사용 중, Node 18+ 필요)
```

**문제: "SDK location not found" 오류**
```
원인: Android SDK 경로가 설정되지 않음
해결:
1. Android Studio를 설치하고 한 번 실행 (SDK 자동 설치)
2. star-linker-app/android/local.properties 파일 생성:
   sdk.dir=/home/<사용자명>/Android/Sdk  (Linux/macOS)
   sdk.dir=C:/Users/<사용자명>/AppData/Local/Android/Sdk  (Windows)
3. 또는 ANDROID_HOME 환경 변수 설정
```

**문제: "Could not resolve :capacitor-android" 오류**
```
원인: AGP (Android Gradle Plugin) 버전 불일치
해결: 이미 수정됨 - build.gradle에서 AGP 버전 8.2.1 사용
```

**문제: "Toolchain installation does not provide JAVA_COMPILER" 오류**
```
원인: JDK 17이 아닌 다른 Java 버전 사용
해결: 이미 수정됨 - gradle.properties에서 Java 17 명시
```

**문제: Gradle 빌드 실패**
```bash
# android 폴더에서 Gradle 정리 후 재빌드
cd android
./gradlew clean
./gradlew assembleDebug
```

**문제: Android Studio에서 "Plugin with id 'com.android.application' not found" 오류**
```
해결: Android Studio의 File → Sync Project with Gradle Files 실행
```

## 🔧 기술 스택

- **Frontend**: Vanilla HTML5, CSS3, JavaScript
- **Styling**: CSS Grid, Flexbox, CSS Variables
- **Animation**: CSS Transitions, Transform
- **Mobile**: Capacitor 6.x (네이티브 Android/iOS 앱 지원)
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