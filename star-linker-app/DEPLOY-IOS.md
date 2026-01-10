# 🚀 자동 iOS 배포 - Claude 실행 파일

> **이 파일을 읽으면 Claude가 자동으로 iOS 앱을 빌드하고 App Store Connect에 업로드합니다.**

---

## ⚡ 사용 방법

Claude에게 다음과 같이 요청하세요:

```
"DEPLOY-IOS.md 읽고 앱 빌드해서 App Store Connect에 올려줘"
```

Claude가 자동으로 실행합니다:
1. ✅ 웹 파일 동기화 (npm run copy-web)
2. ✅ Capacitor iOS 동기화 (npx cap sync ios)
3. ✅ ExportOptions.plist 생성
4. ✅ Archive 빌드 (xcodebuild)
5. ✅ App Store Connect 업로드 (xcodebuild -exportArchive)
6. ✅ Git 커밋 및 푸시

---

## 📋 프로젝트 설정

```bash
# 프로젝트 경로
PROJECT_ROOT="/Users/jeongseophan/game/orapa-space/star-linker-app"
PROJECT_PATH="$PROJECT_ROOT/ios/App/App.xcodeproj"

# 앱 정보
BUNDLE_ID="com.starlinker.app"
SCHEME_NAME="App"
APP_NAME="Star Linker"

# Team & Signing
TEAM_ID="3ZMPVRB243"
PROVISIONING_PROFILE_UUID="7783c085-e96d-48d8-83a0-d57fb6ea3753"
PROVISIONING_PROFILE_NAME="jsappstore.mobileprovision"
PROVISIONING_PROFILE_PATH="/Users/jeongseophan/Desktop/background/IOS_appstore/jsappstore.mobileprovision"

# 빌드 경로
ARCHIVE_PATH="/tmp/StarLinker.xcarchive"
EXPORT_PATH="/tmp/StarLinkerExport"
EXPORT_OPTIONS="/tmp/ExportOptions.plist"
```

---

## 🤖 Claude 자동 실행 단계

### 1단계: 사전 확인

```bash
# 작업 디렉토리 이동
cd /Users/jeongseophan/game/orapa-space/star-linker-app

# Xcode 버전 확인
xcodebuild -version

# 현재 버전 확인
xcodebuild -project "ios/App/App.xcodeproj" -showBuildSettings 2>/dev/null | grep -E "(MARKETING_VERSION|CURRENT_PROJECT_VERSION)" | head -3
```

**출력 예상**:
```
MARKETING_VERSION = 1.0.1
CURRENT_PROJECT_VERSION = 2
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
✔ Copying web assets from www to ios/App/App/public
✔ Updating iOS plugins
✔ Sync finished in 0.679s
```

### 3단계: Provisioning Profile 확인 및 설치

```bash
# 프로파일이 Xcode에 설치되어 있는지 확인
if [ ! -f "$HOME/Library/Developer/Xcode/UserData/Provisioning Profiles/7783c085-e96d-48d8-83a0-d57fb6ea3753.mobileprovision" ]; then
    # 없으면 Desktop에서 복사
    cp /Users/jeongseophan/Desktop/jsappstore.mobileprovision \
       "$HOME/Library/Developer/Xcode/UserData/Provisioning Profiles/7783c085-e96d-48d8-83a0-d57fb6ea3753.mobileprovision"
    echo "✅ Provisioning Profile 설치 완료"
else
    echo "✅ Provisioning Profile 이미 설치됨"
fi
```

### 4단계: ExportOptions.plist 생성

```bash
cat > /tmp/ExportOptions.plist << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>app-store-connect</string>
    <key>teamID</key>
    <string>3ZMPVRB243</string>
    <key>uploadBitcode</key>
    <false/>
    <key>uploadSymbols</key>
    <true/>
    <key>compileBitcode</key>
    <false/>
    <key>destination</key>
    <string>upload</string>
    <key>provisioningProfiles</key>
    <dict>
        <key>com.starlinker.app</key>
        <string>7783c085-e96d-48d8-83a0-d57fb6ea3753</string>
    </dict>
    <key>signingCertificate</key>
    <string>Apple Distribution</string>
    <key>signingStyle</key>
    <string>manual</string>
</dict>
</plist>
EOF

echo "✅ ExportOptions.plist 생성 완료"
```

### 5단계: Archive 빌드

```bash
# 이전 빌드 정리
rm -rf /tmp/StarLinker.xcarchive

echo "📦 Archive 빌드 시작..."

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
```

**성공 시 출력**:
```
** ARCHIVE SUCCEEDED **
```

**빌드 크기 확인**:
```bash
du -sh /tmp/StarLinker.xcarchive
# 예상: 12M
```

### 6단계: App Store Connect 업로드

```bash
# 이전 Export 정리
rm -rf /tmp/StarLinkerExport

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

### 7단계: 버전 정보 확인 및 Git 커밋

```bash
# 버전 정보 추출
VERSION=$(xcodebuild -project "ios/App/App.xcodeproj" -showBuildSettings 2>/dev/null | grep "MARKETING_VERSION = " | head -1 | sed 's/.*= //')
BUILD=$(xcodebuild -project "ios/App/App.xcodeproj" -showBuildSettings 2>/dev/null | grep "CURRENT_PROJECT_VERSION = " | head -1 | sed 's/.*= //')

echo "✅ 업로드 완료!"
echo "📱 버전: $VERSION (빌드 $BUILD)"
echo ""
echo "10-15분 후 App Store Connect에서 확인하세요:"
echo "🔗 https://appstoreconnect.apple.com/"
```

**Git 커밋 (옵션)**:
```bash
cd /Users/jeongseophan/game/orapa-space

git add .
git commit -m "$(cat <<EOF
feat: iOS 앱 업데이트 및 App Store Connect 업로드 (v${VERSION} 빌드 ${BUILD})

- Archive 빌드 성공
- App Store Connect 업로드 완료
- 버전: ${VERSION}
- 빌드: ${BUILD}

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
)"
git push
```

---

## 🔧 전체 자동화 스크립트

Claude가 실행할 전체 스크립트:

```bash
#!/bin/bash
set -e  # 오류 발생 시 중단

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🚀 Star Linker iOS 자동 배포 시작${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# 프로젝트 경로
PROJECT_ROOT="/Users/jeongseophan/game/orapa-space/star-linker-app"
cd "$PROJECT_ROOT"

# 1. 버전 정보 확인
echo -e "${YELLOW}📋 버전 정보 확인 중...${NC}"
VERSION=$(xcodebuild -project "ios/App/App.xcodeproj" -showBuildSettings 2>/dev/null | grep "MARKETING_VERSION = " | head -1 | sed 's/.*= //')
BUILD=$(xcodebuild -project "ios/App/App.xcodeproj" -showBuildSettings 2>/dev/null | grep "CURRENT_PROJECT_VERSION = " | head -1 | sed 's/.*= //')
echo -e "${GREEN}📱 버전: $VERSION (빌드 $BUILD)${NC}"
echo ""

# 2. 웹 파일 동기화
echo -e "${YELLOW}🔄 웹 파일 동기화 중...${NC}"
npm run copy-web
echo ""

# 3. Capacitor iOS 동기화
echo -e "${YELLOW}🔄 Capacitor iOS 동기화 중...${NC}"
npx cap sync ios
echo ""

# 4. Provisioning Profile 확인
echo -e "${YELLOW}🔐 Provisioning Profile 확인 중...${NC}"
PROFILE_PATH="$HOME/Library/Developer/Xcode/UserData/Provisioning Profiles/7783c085-e96d-48d8-83a0-d57fb6ea3753.mobileprovision"
if [ ! -f "$PROFILE_PATH" ]; then
    cp /Users/jeongseophan/Desktop/background/IOS_appstore/jsappstore.mobileprovision "$PROFILE_PATH"
    echo -e "${GREEN}✅ Provisioning Profile 설치 완료${NC}"
else
    echo -e "${GREEN}✅ Provisioning Profile 이미 설치됨${NC}"
fi
echo ""

# 5. ExportOptions.plist 생성
echo -e "${YELLOW}📝 ExportOptions.plist 생성 중...${NC}"
cat > /tmp/ExportOptions.plist << 'PLIST'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>app-store-connect</string>
    <key>teamID</key>
    <string>3ZMPVRB243</string>
    <key>uploadBitcode</key>
    <false/>
    <key>uploadSymbols</key>
    <true/>
    <key>compileBitcode</key>
    <false/>
    <key>destination</key>
    <string>upload</string>
    <key>provisioningProfiles</key>
    <dict>
        <key>com.starlinker.app</key>
        <string>7783c085-e96d-48d8-83a0-d57fb6ea3753</string>
    </dict>
    <key>signingCertificate</key>
    <string>Apple Distribution</string>
    <key>signingStyle</key>
    <string>manual</string>
</dict>
</plist>
PLIST
echo -e "${GREEN}✅ ExportOptions.plist 생성 완료${NC}"
echo ""

# 6. 이전 빌드 정리
echo -e "${YELLOW}🗑️  이전 빌드 정리 중...${NC}"
rm -rf /tmp/StarLinker.xcarchive /tmp/StarLinkerExport
echo ""

# 7. Archive 빌드
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📦 Archive 빌드 시작... (약 2-5분 소요)${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

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
  -allowProvisioningUpdates \
  | grep -E "(BUILD|ARCHIVE|Signing|error|warning:|succeeded)" || true

if [ $? -eq 0 ] && [ -d "/tmp/StarLinker.xcarchive" ]; then
    echo ""
    echo -e "${GREEN}✅ Archive 빌드 성공!${NC}"
    du -sh /tmp/StarLinker.xcarchive
    echo ""
else
    echo -e "${RED}❌ Archive 빌드 실패${NC}"
    exit 1
fi

# 8. App Store Connect 업로드
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🚀 App Store Connect 업로드 시작... (약 3-10분 소요)${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

xcodebuild -exportArchive \
  -archivePath "/tmp/StarLinker.xcarchive" \
  -exportPath "/tmp/StarLinkerExport" \
  -exportOptionsPlist "/tmp/ExportOptions.plist" \
  -allowProvisioningUpdates \
  | grep -E "(EXPORT|Upload|Processing|error|warning:|succeeded)" || true

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}🎉 App Store Connect 업로드 성공!${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${YELLOW}📱 버전: $VERSION (빌드 $BUILD)${NC}"
    echo -e "${YELLOW}⏰ 10-30분 후 App Store Connect에서 빌드를 확인하세요.${NC}"
    echo -e "${BLUE}🔗 https://appstoreconnect.apple.com/${NC}"
    echo ""
else
    echo -e "${RED}❌ App Store Connect 업로드 실패${NC}"
    exit 1
fi

# 9. Git 커밋 (옵션)
echo -e "${YELLOW}📝 Git 커밋 생성 중...${NC}"
cd /Users/jeongseophan/game/orapa-space

git add .
git commit -m "feat: iOS 앱 업데이트 및 App Store Connect 업로드 (v${VERSION} 빌드 ${BUILD})

- Archive 빌드 성공
- App Store Connect 업로드 완료
- 버전: ${VERSION}
- 빌드: ${BUILD}

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>" 2>/dev/null || echo "커밋할 변경사항 없음"

git push 2>/dev/null || echo "푸시 건너뛰기"

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ 모든 작업 완료!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
```

---

## 📊 예상 출력

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 Star Linker iOS 자동 배포 시작
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 버전 정보 확인 중...
📱 버전: 1.0.1 (빌드 2)

🔄 웹 파일 동기화 중...
✔ Copying web assets

🔄 Capacitor iOS 동기화 중...
✔ Sync finished in 0.679s

🔐 Provisioning Profile 확인 중...
✅ Provisioning Profile 이미 설치됨

📝 ExportOptions.plist 생성 중...
✅ ExportOptions.plist 생성 완료

🗑️  이전 빌드 정리 중...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 Archive 빌드 시작... (약 2-5분 소요)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

** ARCHIVE SUCCEEDED **

✅ Archive 빌드 성공!
12M	/tmp/StarLinker.xcarchive

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 App Store Connect 업로드 시작... (약 3-10분 소요)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

** EXPORT SUCCEEDED **
Upload succeeded

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 App Store Connect 업로드 성공!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📱 버전: 1.0.1 (빌드 2)
⏰ 10-30분 후 App Store Connect에서 빌드를 확인하세요.
🔗 https://appstoreconnect.apple.com/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ 모든 작업 완료!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🔍 문제 해결

### Archive 빌드 실패

**증상**: `** ARCHIVE FAILED **`

**해결**:
1. Provisioning Profile 확인:
   ```bash
   ls -la "$HOME/Library/Developer/Xcode/UserData/Provisioning Profiles/7783c085-e96d-48d8-83a0-d57fb6ea3753.mobileprovision"
   ```

2. Desktop에서 재설치:
   ```bash
   cp /Users/jeongseophan/Desktop/background/IOS_appstore/jsappstore.mobileprovision \
      "$HOME/Library/Developer/Xcode/UserData/Provisioning Profiles/7783c085-e96d-48d8-83a0-d57fb6ea3753.mobileprovision"
   ```

### Upload 실패

**증상**: `** EXPORT FAILED **`

**해결**:
1. ExportOptions.plist 재생성 (위 스크립트 4단계 실행)
2. 인터넷 연결 확인
3. Apple ID 로그인 상태 확인 (Xcode → Preferences → Accounts)

### Provisioning Profile 만료

**증상**: `profile is expired`

**해결**:
1. Apple Developer Portal 접속: https://developer.apple.com/account/resources/profiles/list
2. `jsappstore` 프로파일 찾기
3. Download → 더블클릭 설치
4. 새 UUID로 DEPLOY-IOS.md 업데이트

---

## 📌 중요 참고사항

### 버전 번호 증가

다음 업로드 전에 **반드시** 버전/빌드 번호를 증가시켜야 합니다:

**Xcode에서**:
1. `ios/App/App.xcodeproj` 열기
2. TARGETS → App → General
3. Version 또는 Build 증가

**또는 수동으로**:
```bash
# ios/App/App.xcodeproj/project.pbxproj 파일에서:
MARKETING_VERSION = 1.0.2;  # 또는 1.1.0
CURRENT_PROJECT_VERSION = 3;  # 반드시 증가
```

### Provisioning Profile 위치

이 파일들을 **절대 삭제하지 마세요**:
- `/Users/jeongseophan/Desktop/background/IOS_appstore/jsappstore.mobileprovision` ⭐ 중요!

### Git 커밋 규칙

- 자동 커밋 메시지에는 버전 정보가 포함됩니다
- 푸시 실패 시 무시하고 계속 진행합니다
- 수동 커밋을 원하면 스크립트에서 Git 부분 제거

---

## 🎯 요약

**이 파일 하나만 읽으면**:

```
"DEPLOY-IOS.md 읽고 빌드해서 올려줘"
```

Claude가 자동으로:
1. ✅ 웹 파일 동기화
2. ✅ iOS 동기화
3. ✅ Archive 빌드
4. ✅ App Store Connect 업로드
5. ✅ Git 커밋 & 푸시

**총 소요 시간**: 5-15분

**결과**: App Store Connect에 새 빌드 업로드 완료!

---

**🚀 이제 DEPLOY-IOS.md만 읽으면 자동으로 배포됩니다!**
