# ✅ Star Linker iOS 앱 업로드 완료!

## 🎉 성공!

**Star Linker v1.0.1 (빌드 2)** 가 App Store Connect에 성공적으로 업로드되었습니다!

---

## 📊 업로드 정보

- **앱 이름**: Star Linker
- **Bundle ID**: com.starlinker.app
- **버전**: 1.0.1 (Marketing Version)
- **빌드 번호**: 2 (Current Project Version)
- **Team**: JeongSeop Han (3ZMPVRB243)
- **업로드 일시**: 2026-01-10 20:54:50

### 빌드 정보
- **Archive 크기**: 12 MB
- **Provisioning Profile**: js-appstore (7783c085-e96d-48d8-83a0-d57fb6ea3753)
- **Signing Certificate**: Apple Distribution: JeongSeop Han (3ZMPVRB243)
- **Upload 상태**: ✅ Upload succeeded

---

## 📱 다음 단계: App Store Connect 확인

### 1. App Store Connect 접속

10-30분 후 다음 URL에 접속하여 빌드를 확인하세요:

**URL**: https://appstoreconnect.apple.com/

### 2. 빌드 확인

```
1. My Apps → Star Linker 선택
2. TestFlight 탭 클릭
3. "iOS Builds" 섹션에서 새 빌드 확인

빌드 정보:
  - Version: 1.0.1
  - Build: 2
  - Status: Processing → Ready to Submit
```

### 3. 처리 시간

- ⏳ **Processing**: 10-30분 소요
  - Apple 서버에서 빌드를 검증 중
  - 자동 테스트 및 스캔 진행

- ✅ **Ready to Submit**: 테스트 가능
  - TestFlight 배포 가능
  - App Store 제출 가능

### 4. 처리 상태 확인

빌드 상태는 다음 중 하나로 표시됩니다:

- ⏳ **Processing**: 검증 중
- ✅ **Ready to Submit**: 제출 준비 완료
- ⚠️ **Missing Compliance**: 암호화 관련 질문 (자동 건너뛰기 설정됨)
- ❌ **Invalid Binary**: 오류 발생 (재빌드 필요)

---

## 🧪 TestFlight 배포 (옵션)

빌드가 "Ready to Submit" 상태가 되면 TestFlight로 배포할 수 있습니다:

### Internal Testing (즉시 배포 가능)

1. App Store Connect → TestFlight
2. "Internal Testing" 섹션 → "+"버튼 클릭
3. 그룹 생성 또는 기존 그룹 선택
4. 본인 이메일 추가
5. 빌드 1.0.1 (2) 선택 → Submit

**결과**: 즉시 TestFlight 앱에서 다운로드 가능

### External Testing (심사 필요)

1. "External Testing" 섹션 → "+"버튼 클릭
2. 그룹 생성 및 테스터 추가
3. 빌드 선택 → Submit for Review
4. TestFlight 심사 (1-2일 소요)

---

## 📲 App Store 제출

TestFlight 테스트 완료 후 App Store에 제출할 수 있습니다:

### 1. 앱 정보 입력

App Store Connect → My Apps → Star Linker

**필수 항목**:
- ✅ 앱 이름: "Star Linker"
- ✅ 부제: "우주 탐험 퍼즐 게임"
- ✅ 설명: 게임 설명 작성
- ✅ 키워드: "puzzle, space, laser, planets, logic"
- ✅ 카테고리: Games → Puzzle

### 2. 스크린샷 준비

**iPhone 필수**:
- iPhone 6.7" (iPhone 15 Pro Max): 5-10장
- iPhone 6.5" (iPhone 14 Pro Max): 5-10장

**iPad 옵션**:
- iPad Pro 12.9": 5-10장

### 3. 가격 및 판매 지역

- **가격**: $0.00 (무료) 또는 유료
- **판매 지역**: 전 세계 또는 특정 국가 선택

### 4. 빌드 선택

- "Build" 섹션에서 "1.0.1 (2)" 빌드 선택

### 5. 심사 정보

- **이메일**: brian.jeongseop.han@gmail.com
- **전화번호**: 연락 가능한 번호
- **데모 계정**: (필요시) 테스트 계정 정보

### 6. 제출

- "Submit for Review" 버튼 클릭
- 심사 대기 (평균 24-48시간)

---

## 🔧 다음 업데이트 준비

### 버전 및 빌드 번호 관리

다음 업로드 시:

**버그 수정/마이너 업데이트**:
```
Marketing Version: 1.0.1 → 1.0.2
Build: 2 → 3
```

**새 기능 추가**:
```
Marketing Version: 1.0.1 → 1.1.0
Build: 2 → 3
```

**메이저 업데이트**:
```
Marketing Version: 1.0.1 → 2.0.0
Build: 2 → 3
```

### 업데이트 빌드 방법

```bash
cd /Users/jeongseophan/game/orapa-space/star-linker-app

# 1. 버전 번호 증가 (Xcode에서 또는 수동으로)
# ios/App/App.xcodeproj/project.pbxproj 에서:
#   MARKETING_VERSION = 1.0.2;
#   CURRENT_PROJECT_VERSION = 3;

# 2. 웹 파일 동기화
npm run copy-web
npx cap sync ios

# 3. Archive 빌드
xcodebuild -project "ios/App/App.xcodeproj" \
  -scheme App \
  -configuration Release \
  -sdk iphoneos \
  -archivePath "/tmp/StarLinker.xcarchive" \
  archive \
  DEVELOPMENT_TEAM="3ZMPVRB243" \
  PROVISIONING_PROFILE_SPECIFIER="7783c085-e96d-48d8-83a0-d57fb6ea3753" \
  CODE_SIGN_STYLE="Manual" \
  CODE_SIGN_IDENTITY="Apple Distribution" \
  -allowProvisioningUpdates

# 4. App Store Connect 업로드
xcodebuild -exportArchive \
  -archivePath "/tmp/StarLinker.xcarchive" \
  -exportPath "/tmp/StarLinkerExport" \
  -exportOptionsPlist "/tmp/ExportOptions.plist" \
  -allowProvisioningUpdates
```

---

## 📄 사용된 프로파일 및 인증서

### Provisioning Profile
- **파일**: `jsappstore.mobileprovision`
- **위치**: `/Users/jeongseophan/Desktop/jsappstore.mobileprovision`
- **UUID**: `7783c085-e96d-48d8-83a0-d57fb6ea3753`
- **이름**: `js-appstore`
- **타입**: App Store Distribution
- **유효기간**: 2026-01-05 ~ 2027-01-05

### 서명 인증서
- **타입**: Apple Distribution
- **이름**: Apple Distribution: JeongSeop Han (3ZMPVRB243)
- **Team ID**: 3ZMPVRB243
- **유효기간**: 1년

---

## 🎯 체크리스트

### 완료된 항목 ✅
- [x] 앱 버전 1.0.1 설정
- [x] 빌드 번호 2 설정
- [x] 앱 아이콘 변경 (photo.png)
- [x] ITSAppUsesNonExemptEncryption 설정
- [x] 웹 파일 동기화
- [x] Capacitor iOS 동기화
- [x] Provisioning Profile 설치
- [x] Archive 빌드 성공
- [x] App Store Connect 업로드 성공

### 다음 단계 📋
- [ ] App Store Connect에서 빌드 처리 완료 대기 (10-30분)
- [ ] TestFlight Internal Testing 배포 (옵션)
- [ ] 스크린샷 및 앱 정보 준비
- [ ] App Store 심사 제출

---

## 📞 문제 발생 시

### "빌드가 App Store Connect에 나타나지 않음"

**원인**: 처리 중이거나 오류 발생

**확인**:
1. 이메일 확인 (Apple에서 오류 알림)
2. App Store Connect → Activity 탭 확인
3. 30분 이상 대기 후에도 없으면 재업로드

### "Invalid Binary" 오류

**원인**: 빌드 검증 실패

**해결**:
1. 이메일에서 오류 내용 확인
2. 해당 문제 수정
3. 빌드 번호 증가 (예: 2 → 3)
4. 재빌드 및 업로드

### "Missing Compliance" 경고

**해결**: 자동 처리됨 (ITSAppUsesNonExemptEncryption = NO)

---

## 🌟 축하합니다!

Star Linker 앱이 성공적으로 App Store Connect에 업로드되었습니다!

10-30분 후 https://appstoreconnect.apple.com/ 에서 빌드를 확인하세요.

질문이나 문제가 있으면 BUILD-INSTRUCTIONS.md 또는 ios-publish.md 파일을 참조하세요.

---

**🚀 Good luck with your app launch!**
