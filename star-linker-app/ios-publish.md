# 🤖 Claude 자동 iOS 빌드 및 App Store Connect 업로드

> **주의**: Claude Code가 이 파일을 읽으면 자동으로 iOS 앱을 빌드하고 App Store Connect에 업로드합니다.

## ⚡ 빠른 시작

Claude에게 다음과 같이 요청하세요:
```
"ios-publish.md 읽고 앱 빌드해서 올려줘"
```

Claude가 자동으로:
1. ✅ 웹 파일 동기화 (최신 HTML/JS/CSS)
2. ✅ Capacitor iOS 동기화
3. ✅ ExportOptions.plist 생성
4. ✅ xcodebuild로 Archive 빌드
5. ✅ App Store Connect 자동 업로드
6. ✅ Git 커밋 및 푸시

---

## 📋 프로젝트 설정 (Star Linker)

```bash
# 프로젝트 경로
PROJECT_ROOT="/Users/jeongseophan/game/orapa-space/star-linker-app"
PROJECT_PATH="$PROJECT_ROOT/ios/App/App.xcodeproj"

# 앱 정보
BUNDLE_ID="com.starlinker.app"
SCHEME_NAME="App"
PROJECT_NAME="StarLinker"
APP_NAME="Star Linker"

# 빌드 설정
ARCHIVE_PATH="/tmp/StarLinker.xcarchive"
EXPORT_PATH="/tmp/StarLinkerExport"
EXPORT_OPTIONS="/tmp/ExportOptions.plist"
```

---

## 🚀 Claude 자동 실행 프로세스

### 1단계: 환경 확인 및 준비

```bash
# 현재 작업 디렉토리 확인
cd /Users/jeongseophan/game/orapa-space/star-linker-app

# Xcode 설치 확인
xcodebuild -version

# 인증서 확인 (자동 signing 사용 시 생략 가능)
security find-identity -v -p codesigning

# 빌드 설정 확인
xcodebuild -project "ios/App/App.xcodeproj" -showBuildSettings | grep -E "(CODE_SIGN|PROVISIONING|MARKETING_VERSION|CURRENT_PROJECT_VERSION)"
```

### 2단계: 웹 파일 동기화

```bash
# 최신 웹 파일을 www 폴더로 복사
npm run copy-web

# Capacitor iOS 동기화
npx cap sync ios
```

**출력 예상**:
```
✔ Copying web assets from www to ios/App/App/public in 123.45ms
✔ Updating iOS plugins
✔ Updating iOS native dependencies with "pod install"
✔ Syncing finished in 12.34s
```

### 3단계: ExportOptions.plist 생성

```bash
cat > /tmp/ExportOptions.plist << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>app-store-connect</string>
    <key>uploadBitcode</key>
    <false/>
    <key>uploadSymbols</key>
    <true/>
    <key>compileBitcode</key>
    <false/>
    <key>destination</key>
    <string>upload</string>
</dict>
</plist>
EOF
```

**참고**: Team ID와 Provisioning Profile은 Automatic Signing을 사용하면 자동으로 처리됩니다.

### 4단계: Archive 빌드

```bash
echo "📦 iOS Archive 빌드 시작..."

xcodebuild -project "/Users/jeongseophan/game/orapa-space/star-linker-app/ios/App/App.xcodeproj" \
  -scheme App \
  -configuration Release \
  -sdk iphoneos \
  -archivePath "/tmp/StarLinker.xcarchive" \
  archive \
  CODE_SIGN_IDENTITY="Apple Distribution" \
  -allowProvisioningUpdates
```

**성공 시 출력**:
```
** ARCHIVE SUCCEEDED **
```

**소요 시간**: 약 2-5분

### 5단계: App Store Connect 업로드

```bash
echo "🚀 App Store Connect 업로드 시작..."

xcodebuild -exportArchive \
  -archivePath "/tmp/StarLinker.xcarchive" \
  -exportPath "/tmp/StarLinkerExport" \
  -exportOptionsPlist "/tmp/ExportOptions.plist" \
  -allowProvisioningUpdates
```

**성공 시 출력**:
```
** EXPORT SUCCEEDED **
Upload succeeded
```

**소요 시간**: 약 3-10분

### 6단계: 정리 및 확인

```bash
# 빌드 산출물 크기 확인
du -sh /tmp/StarLinker.xcarchive
du -sh /tmp/StarLinkerExport/*.ipa

# App Store Connect 확인 안내
echo "✅ 업로드 완료!"
echo "📱 10-15분 후 App Store Connect에서 빌드를 확인하세요."
echo "🔗 https://appstoreconnect.apple.com/"
```

---

## 🔧 전체 자동화 스크립트 (복사해서 실행 가능)

```bash
#!/bin/bash
set -e  # 오류 발생 시 즉시 중단

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 프로젝트 설정
PROJECT_ROOT="/Users/jeongseophan/game/orapa-space/star-linker-app"
PROJECT_PATH="$PROJECT_ROOT/ios/App/App.xcodeproj"
SCHEME_NAME="App"
ARCHIVE_PATH="/tmp/StarLinker.xcarchive"
EXPORT_PATH="/tmp/StarLinkerExport"
EXPORT_OPTIONS="/tmp/ExportOptions.plist"

echo -e "${BLUE}🚀 Star Linker iOS 앱 빌드 및 App Store Connect 업로드 시작${NC}"
echo ""

# 1. 작업 디렉토리 이동
echo -e "${YELLOW}📂 작업 디렉토리 이동...${NC}"
cd "$PROJECT_ROOT"

# 2. 버전 정보 확인
VERSION=$(xcodebuild -project "$PROJECT_PATH" -showBuildSettings 2>/dev/null | grep "MARKETING_VERSION = " | head -1 | sed 's/.*= //')
BUILD=$(xcodebuild -project "$PROJECT_PATH" -showBuildSettings 2>/dev/null | grep "CURRENT_PROJECT_VERSION = " | head -1 | sed 's/.*= //')
echo -e "${GREEN}📱 앱 버전: $VERSION (빌드 $BUILD)${NC}"
echo ""

# 3. 웹 파일 동기화
echo -e "${YELLOW}🔄 웹 파일 동기화 중...${NC}"
npm run copy-web

echo -e "${YELLOW}🔄 Capacitor iOS 동기화 중...${NC}"
npx cap sync ios
echo ""

# 4. ExportOptions.plist 생성
echo -e "${YELLOW}📝 ExportOptions.plist 생성 중...${NC}"
cat > "$EXPORT_OPTIONS" << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>app-store-connect</string>
    <key>uploadBitcode</key>
    <false/>
    <key>uploadSymbols</key>
    <true/>
    <key>compileBitcode</key>
    <false/>
    <key>destination</key>
    <string>upload</string>
</dict>
</plist>
EOF
echo ""

# 5. 이전 빌드 정리
if [ -d "$ARCHIVE_PATH" ]; then
    echo -e "${YELLOW}🗑️  이전 Archive 삭제 중...${NC}"
    rm -rf "$ARCHIVE_PATH"
fi
if [ -d "$EXPORT_PATH" ]; then
    echo -e "${YELLOW}🗑️  이전 Export 삭제 중...${NC}"
    rm -rf "$EXPORT_PATH"
fi
echo ""

# 6. Archive 빌드
echo -e "${BLUE}📦 Archive 빌드 시작... (약 2-5분 소요)${NC}"
xcodebuild -project "$PROJECT_PATH" \
  -scheme "$SCHEME_NAME" \
  -configuration Release \
  -sdk iphoneos \
  -archivePath "$ARCHIVE_PATH" \
  archive \
  CODE_SIGN_IDENTITY="Apple Distribution" \
  -allowProvisioningUpdates \
  | grep -E "(Archive Succeeded|ARCHIVE SUCCEEDED|error:|warning:)" || true

if [ $? -eq 0 ] && [ -d "$ARCHIVE_PATH" ]; then
    echo -e "${GREEN}✅ Archive 빌드 성공!${NC}"
    du -sh "$ARCHIVE_PATH"
    echo ""
else
    echo -e "${RED}❌ Archive 빌드 실패${NC}"
    exit 1
fi

# 7. App Store Connect 업로드
echo -e "${BLUE}🚀 App Store Connect 업로드 시작... (약 3-10분 소요)${NC}"
xcodebuild -exportArchive \
  -archivePath "$ARCHIVE_PATH" \
  -exportPath "$EXPORT_PATH" \
  -exportOptionsPlist "$EXPORT_OPTIONS" \
  -allowProvisioningUpdates \
  | grep -E "(Export Succeeded|EXPORT SUCCEEDED|Upload succeeded|error:|warning:)" || true

if [ $? -eq 0 ] && [ -d "$EXPORT_PATH" ]; then
    echo ""
    echo -e "${GREEN}✅ App Store Connect 업로드 성공!${NC}"

    # IPA 파일 크기 확인
    IPA_FILE=$(find "$EXPORT_PATH" -name "*.ipa" | head -1)
    if [ -f "$IPA_FILE" ]; then
        echo -e "${GREEN}📦 IPA 파일: $(basename $IPA_FILE)${NC}"
        du -sh "$IPA_FILE"
    fi

    echo ""
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}🎉 업로드 완료!${NC}"
    echo -e "${YELLOW}📱 버전: $VERSION (빌드 $BUILD)${NC}"
    echo -e "${YELLOW}⏰ 10-15분 후 App Store Connect에서 빌드를 확인하세요.${NC}"
    echo -e "${BLUE}🔗 https://appstoreconnect.apple.com/${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
else
    echo -e "${RED}❌ App Store Connect 업로드 실패${NC}"
    exit 1
fi

# 8. 정리 (옵션)
# rm -rf "$ARCHIVE_PATH" "$EXPORT_PATH" "$EXPORT_OPTIONS"
```

---

## 📊 빌드 체크리스트

Claude가 자동으로 확인하는 항목:

- ✅ **Xcode 설치 확인**: `xcodebuild -version`
- ✅ **프로젝트 경로 확인**: iOS 프로젝트 존재 여부
- ✅ **버전 번호 확인**: Marketing Version과 Build 번호
- ✅ **웹 파일 동기화**: 최신 HTML/CSS/JS 반영
- ✅ **Capacitor 동기화**: iOS 네이티브 코드 업데이트
- ✅ **Archive 빌드**: Release 빌드 성공
- ✅ **Export 및 업로드**: App Store Connect 업로드 완료

---

## 🔍 문제 해결

### 문제 1: "No signing certificate found"

**증상**:
```
error: No signing certificate "Apple Distribution" found
```

**해결 방법**:
```bash
# 1. 인증서 확인
security find-identity -v -p codesigning

# 2. Xcode에서 자동 서명 활성화
# Xcode → 프로젝트 → Signing & Capabilities → Automatically manage signing 체크

# 3. 또는 Distribution 인증서 설치
# Apple Developer → Certificates → iOS Distribution → Download → 더블클릭
```

### 문제 2: "Archive failed" (빌드 오류)

**증상**:
```
** ARCHIVE FAILED **
```

**해결 방법**:
```bash
# 1. 빌드 로그 확인
xcodebuild -project "$PROJECT_PATH" \
  -scheme App \
  -configuration Release \
  archive \
  -archivePath "/tmp/StarLinker.xcarchive" 2>&1 | tee build.log

# 2. Xcode에서 직접 빌드 테스트
npx cap open ios
# Xcode → Product → Archive

# 3. 의존성 재설치
cd ios/App
pod install
cd ../..
```

### 문제 3: "Upload to App Store failed"

**증상**:
```
Error uploading to App Store Connect
```

**해결 방법**:
```bash
# 1. Apple ID 로그인 상태 확인
# Xcode → Preferences → Accounts → Apple ID 로그인

# 2. App-specific password 사용 (2단계 인증 활성화 시)
# https://appleid.apple.com/ → App-Specific Passwords 생성

# 3. 수동 업로드 시도
# Xcode → Window → Organizer → Archives → Distribute App
```

### 문제 4: "Version already exists"

**증상**:
```
This bundle is invalid. The value for key CFBundleVersion already exists.
```

**해결 방법**:
```bash
# 빌드 번호 증가 필요 (이미 1.0.1(2)로 설정됨)
# 다음 업로드 시 빌드 번호를 3으로 증가시켜야 함
```

### 문제 5: "provisioning profile doesn't match"

**증상**:
```
Provisioning profile doesn't include the currently selected device
```

**해결 방법**:
```bash
# Automatic Signing 사용 권장
# project.pbxproj에서 CODE_SIGN_STYLE = Automatic; 설정
# -allowProvisioningUpdates 플래그 사용 (이미 스크립트에 포함됨)
```

---

## 📱 App Store Connect 확인

업로드 후 10-15분 정도 기다린 후:

1. **App Store Connect 접속**
   - https://appstoreconnect.apple.com/

2. **빌드 확인**
   - My Apps → Star Linker 선택
   - TestFlight 탭 → iOS Builds
   - 새 빌드 1.0.1 (2) 확인

3. **처리 상태**
   - ⏳ Processing (처리 중)
   - ✅ Ready to Submit (제출 준비 완료)
   - ❌ Invalid Binary (오류 발생)

4. **TestFlight 배포**
   - Internal Testing 또는 External Testing 그룹에 추가
   - 테스터에게 자동 알림 전송

---

## 🎯 요약: Claude에게 요청하기

```
"ios-publish.md 읽고 Star Linker 앱 빌드해서 App Store Connect에 올려줘"
```

Claude가 자동으로:
1. ✅ npm run copy-web
2. ✅ npx cap sync ios
3. ✅ ExportOptions.plist 생성
4. ✅ xcodebuild archive (2-5분)
5. ✅ xcodebuild exportArchive (3-10분)
6. ✅ App Store Connect 자동 업로드

총 소요 시간: **약 5-15분**

---

## 📌 중요 참고사항

### 버전 관리
- **현재 버전**: 1.0.1 (Marketing Version)
- **현재 빌드**: 2 (Build Number)
- **다음 업로드**: 빌드 번호를 3으로 증가 필요

### 보안 주의사항
- ⚠️ **절대 커밋하지 말 것**:
  - `.p12` 인증서 파일
  - `.mobileprovision` 프로파일 파일
  - Apple ID 비밀번호
  - App-specific password

### Signing 설정
- **권장**: Automatic Signing 사용
- **Bundle ID**: com.starlinker.app (변경 불가)
- **Team**: Apple Developer 계정의 Team 자동 선택

---

**이 파일을 읽으면 Claude가 자동으로 위 프로세스를 실행합니다! 🚀**
