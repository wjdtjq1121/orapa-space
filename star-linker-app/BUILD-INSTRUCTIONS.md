# 🚀 Star Linker iOS 빌드 및 업로드 완료 가이드

## ✅ 완료된 작업

1. ✅ **앱 버전 업데이트**: 1.0.1 (빌드 2)
2. ✅ **앱 아이콘 변경**: photo.png 적용
3. ✅ **암호화 설정 추가**: ITSAppUsesNonExemptEncryption = NO
4. ✅ **웹 파일 동기화**: 최신 HTML/JS/CSS 반영
5. ✅ **Capacitor iOS 동기화**: 네이티브 코드 업데이트
6. ✅ **ExportOptions.plist 생성**: App Store Connect 업로드 설정 완료

## 📱 다음 단계: Xcode에서 Archive 빌드 및 업로드

커맨드라인 빌드에서 Provisioning Profile 문제가 발생하므로, **Xcode GUI를 사용하는 것이 가장 확실한 방법**입니다.

### 방법 1: Xcode GUI 사용 (추천) ⭐

```bash
# 1. Xcode 열기
cd /Users/jeongseophan/game/orapa-space/star-linker-app
npx cap open ios
```

**2. Xcode에서 Signing 설정**
- 왼쪽 프로젝트 네비게이터에서 `App` 프로젝트 클릭
- `TARGETS` → `App` 선택
- `Signing & Capabilities` 탭 클릭
- ✅ **"Automatically manage signing"** 체크되어 있는지 확인
- **Team**: `JeongSeop Han (3ZMPVRB243)` 선택
- **Bundle Identifier**: `com.starlinker.app` (자동 설정됨)
- **Provisioning Profile**: Xcode가 자동으로 생성/다운로드

**3. 빌드 장치 선택**
- Xcode 상단 툴바에서 장치 선택 버튼 클릭
- **"Any iOS Device (arm64)"** 선택
  - ⚠️ 시뮬레이터가 아닌 실제 장치용으로 선택해야 Archive 가능

**4. Archive 빌드**
- Xcode 메뉴: `Product` → `Archive`
- 빌드 진행 (약 2-5분 소요)
- 빌드 완료 시 Organizer 창이 자동으로 열림

**5. App Store Connect 업로드**
- Organizer 창에서 방금 빌드한 Archive 선택
- **"Distribute App"** 버튼 클릭
- 배포 방법 선택:
  - ✅ **"App Store Connect"** 선택 → Next
- 업로드 옵션:
  - ✅ **"Upload"** 선택 → Next
- Distribution options:
  - ✅ **"Automatically manage signing"** 선택 → Next
  - Xcode가 자동으로 Distribution 프로파일 생성
- 마지막 확인:
  - App, Signing Certificate, Provisioning Profile 확인
  - **"Upload"** 버튼 클릭

**6. 업로드 완료**
- 업로드 진행 중 (약 3-10분 소요)
- 성공 메시지: "Upload Successful"
- **"Done"** 클릭

### 방법 2: 문제 해결 후 커맨드라인 사용

Provisioning Profile 문제를 해결하려면:

**1. Apple Developer에서 App Store Distribution Profile 생성**
```
1. https://developer.apple.com/account/resources/profiles/add 접속
2. "App Store" 선택 → Continue
3. App ID: "com.starlinker.app" 선택
4. Certificates: "Apple Distribution: JeongSeop Han" 선택
5. Profile Name: "Star Linker AppStore" 입력
6. Generate → Download
7. .mobileprovision 파일 더블클릭하여 설치
```

**2. 커맨드라인 빌드 (Profile 설치 후)**
```bash
cd /Users/jeongseophan/game/orapa-space/star-linker-app

# Archive 빌드
xcodebuild -project "ios/App/App.xcodeproj" \
  -scheme App \
  -configuration Release \
  -sdk iphoneos \
  -archivePath "/tmp/StarLinker.xcarchive" \
  archive \
  DEVELOPMENT_TEAM="3ZMPVRB243" \
  -allowProvisioningUpdates

# App Store Connect 업로드
xcodebuild -exportArchive \
  -archivePath "/tmp/StarLinker.xcarchive" \
  -exportPath "/tmp/StarLinkerExport" \
  -exportOptionsPlist "/tmp/ExportOptions.plist" \
  -allowProvisioningUpdates
```

---

## 🎯 App Store Connect 확인

업로드 후 10-15분 정도 기다린 후:

1. **App Store Connect 접속**
   - https://appstoreconnect.apple.com/

2. **빌드 확인**
   - My Apps → Star Linker 선택
   - TestFlight 탭 클릭
   - iOS Builds 섹션에서 새 빌드 확인:
     - 버전: **1.0.1**
     - 빌드: **2**
     - 상태: Processing → Ready to Submit

3. **빌드 처리 시간**
   - ⏳ Processing: 10-30분 소요
   - ✅ Ready to Submit: 테스트 가능
   - ✅ Ready for Sale: 앱 스토어 배포 가능

---

## 📊 현재 상태 요약

### 완료된 설정
- ✅ 앱 버전: 1.0.1 (Marketing Version)
- ✅ 빌드 번호: 2 (Current Project Version)
- ✅ Bundle ID: com.starlinker.app
- ✅ Team ID: 3ZMPVRB243
- ✅ 앱 아이콘: photo.png (1024x1024)
- ✅ 암호화 설정: ITSAppUsesNonExemptEncryption = NO
- ✅ 웹 파일: 최신 버전 동기화 완료
- ✅ Distribution 인증서: 설치됨

### 다음에 필요한 작업
- ⏳ **Xcode에서 Archive 빌드** (Signing 자동 설정)
- ⏳ **App Store Connect 업로드**
- ⏳ **TestFlight 배포** (옵션)
- ⏳ **App Store 제출** (준비 완료 시)

### 다음 업로드 시 주의사항
- 🔢 **빌드 번호 증가 필수**: 다음은 3, 4, 5... 순서대로
- 📝 **버전 번호**: 기능 추가 시 1.0.2, 1.1.0 등으로 증가
- 🔄 **웹 파일 동기화**: `npm run copy-web` + `npx cap sync ios` 실행

---

## 🔧 문제 해결

### "No signing certificate found"
```bash
# 인증서 확인
security find-identity -v -p codesigning

# 결과:
# ✅ Apple Distribution: JeongSeop Han (3ZMPVRB243) - 설치됨
```

### "Provisioning profile doesn't match"
- **해결**: Xcode GUI 사용 시 자동으로 해결됨
- Xcode → Signing & Capabilities → Automatically manage signing 체크

### "Archive 옵션이 비활성화됨"
- **해결**: Any iOS Device (arm64) 선택 필요
- 시뮬레이터가 아닌 실제 장치용으로 빌드해야 함

---

## 📌 최종 체크리스트

업로드 전 확인:
- [x] Xcode 설치 확인
- [x] 앱 버전 1.0.1로 설정
- [x] 빌드 번호 2로 설정
- [x] Bundle ID com.starlinker.app 확인
- [x] Team 3ZMPVRB243 확인
- [x] Distribution 인증서 설치 확인
- [x] 웹 파일 최신 버전 동기화
- [ ] **Xcode에서 Archive 빌드** ⬅️ 여기부터 진행
- [ ] **App Store Connect 업로드**
- [ ] **빌드 처리 완료 대기 (10-30분)**

---

## 🎉 완료 후

빌드가 App Store Connect에 업로드되고 처리가 완료되면:

1. **TestFlight 테스트**
   - Internal Testing 그룹에 본인 추가
   - 테스트 앱 다운로드 및 테스트

2. **App Store 제출**
   - App 정보 입력 (스크린샷, 설명, 키워드 등)
   - 가격 및 판매 지역 설정
   - 심사 제출

3. **다음 버전 준비**
   - 빌드 번호를 3으로 증가
   - 버전 번호는 필요 시 증가 (1.0.2, 1.1.0 등)

---

**모든 준비가 완료되었습니다! Xcode에서 Archive만 실행하면 됩니다! 🚀**
