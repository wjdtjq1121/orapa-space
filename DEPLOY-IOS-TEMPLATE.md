# 🚀 iOS 자동 배포 템플릿 - 모든 앱 공통

> **이 파일은 템플릿입니다. 새 앱을 배포할 때 이 파일을 복사하고 설정만 변경하세요.**

---

## 📋 새 앱 배포 설정 방법

### 1단계: 이 파일을 앱 폴더에 복사

```bash
# 예: my-new-app 폴더에 복사
cp DEPLOY-IOS-TEMPLATE.md /path/to/my-new-app/DEPLOY-IOS.md
```

### 2단계: 아래 설정 값들을 수정

**필수 수정 항목** (⭐ 표시):

```bash
# 앱 정보 ⭐
APP_NAME="MyApp"                    # 앱 이름
BUNDLE_ID="com.yourcompany.myapp"   # Bundle ID
SCHEME_NAME="App"                    # 보통 "App"

# 프로젝트 경로 ⭐
PROJECT_ROOT="/path/to/your-app"    # 앱 프로젝트 루트 경로
PROJECT_PATH="$PROJECT_ROOT/ios/App/App.xcodeproj"

# Provisioning Profile ⭐
PROVISIONING_PROFILE_UUID="YOUR_PROFILE_UUID"           # Apple Developer에서 확인
PROVISIONING_PROFILE_NAME="your-profile.mobileprovision"
PROVISIONING_PROFILE_PATH="/Users/jeongseophan/Desktop/background/IOS_appstore/your-profile.mobileprovision"

# Team ID (보통 동일)
TEAM_ID="3ZMPVRB243"                # Apple Developer Team ID
```

### 3단계: Provisioning Profile UUID 확인

**Apple Developer Portal에서**:
1. https://developer.apple.com/account/resources/profiles/list 접속
2. 해당 앱의 App Store Distribution 프로파일 찾기
3. Edit 클릭 → URL에서 UUID 확인
4. 또는 Download 후 다음 명령어로 확인:

```bash
security cms -D -i /path/to/profile.mobileprovision | grep -A1 UUID
```

### 4단계: Claude에게 요청

```
"DEPLOY-IOS.md 읽고 빌드해서 올려줘"
```

---

## 🤖 자동 실행 스크립트 (범용)

아래 설정을 **본인의 앱에 맞게 수정**한 후 사용하세요:

```bash
#!/bin/bash
set -e

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 📋 앱별 설정 (여기만 수정하세요!) ⭐
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# 앱 정보
APP_NAME="MyApp"                              # ⭐ 앱 이름
BUNDLE_ID="com.yourcompany.myapp"             # ⭐ Bundle ID
SCHEME_NAME="App"                             # 보통 "App"

# 프로젝트 경로
PROJECT_ROOT="/path/to/your-app"              # ⭐ 앱 프로젝트 루트 경로
PROJECT_PATH="$PROJECT_ROOT/ios/App/App.xcodeproj"

# Team & Signing
TEAM_ID="3ZMPVRB243"                          # Apple Developer Team ID
PROVISIONING_PROFILE_UUID="YOUR_UUID_HERE"    # ⭐ 프로파일 UUID
PROVISIONING_PROFILE_NAME="your-profile.mobileprovision"  # ⭐ 프로파일 파일명
PROVISIONING_PROFILE_PATH="/Users/jeongseophan/Desktop/background/IOS_appstore/${PROVISIONING_PROFILE_NAME}"  # ⭐ 실제 경로

# 빌드 경로 (보통 수정 불필요)
ARCHIVE_PATH="/tmp/${APP_NAME}.xcarchive"
EXPORT_PATH="/tmp/${APP_NAME}Export"
EXPORT_OPTIONS="/tmp/ExportOptions_${APP_NAME}.plist"

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 🚀 자동 배포 스크립트 (수정 불필요)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🚀 ${APP_NAME} iOS 자동 배포 시작${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# 프로젝트 폴더로 이동
cd "$PROJECT_ROOT"

# 1. 버전 정보 확인
echo -e "${YELLOW}📋 버전 정보 확인 중...${NC}"
VERSION=$(xcodebuild -project "$PROJECT_PATH" -showBuildSettings 2>/dev/null | grep "MARKETING_VERSION = " | head -1 | sed 's/.*= //')
BUILD=$(xcodebuild -project "$PROJECT_PATH" -showBuildSettings 2>/dev/null | grep "CURRENT_PROJECT_VERSION = " | head -1 | sed 's/.*= //')
echo -e "${GREEN}📱 앱: ${APP_NAME}${NC}"
echo -e "${GREEN}📱 Bundle ID: ${BUNDLE_ID}${NC}"
echo -e "${GREEN}📱 버전: $VERSION (빌드 $BUILD)${NC}"
echo ""

# 2. 웹 파일 동기화 (Capacitor 앱인 경우)
if [ -f "$PROJECT_ROOT/package.json" ]; then
    echo -e "${YELLOW}🔄 웹 파일 동기화 중...${NC}"
    npm run copy-web 2>/dev/null || echo "copy-web 스크립트 없음 (건너뛰기)"
    echo ""
fi

# 3. Capacitor iOS 동기화 (Capacitor 앱인 경우)
if [ -f "$PROJECT_ROOT/capacitor.config.json" ] || [ -f "$PROJECT_ROOT/capacitor.config.ts" ]; then
    echo -e "${YELLOW}🔄 Capacitor iOS 동기화 중...${NC}"
    npx cap sync ios 2>/dev/null || echo "Capacitor 동기화 건너뛰기"
    echo ""
fi

# 4. Provisioning Profile 확인
echo -e "${YELLOW}🔐 Provisioning Profile 확인 중...${NC}"
XCODE_PROFILE_PATH="$HOME/Library/Developer/Xcode/UserData/Provisioning Profiles/${PROVISIONING_PROFILE_UUID}.mobileprovision"
if [ ! -f "$XCODE_PROFILE_PATH" ]; then
    if [ -f "$PROVISIONING_PROFILE_PATH" ]; then
        cp "$PROVISIONING_PROFILE_PATH" "$XCODE_PROFILE_PATH"
        echo -e "${GREEN}✅ Provisioning Profile 설치 완료${NC}"
    else
        echo -e "${RED}❌ Provisioning Profile을 찾을 수 없습니다: ${PROVISIONING_PROFILE_PATH}${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ Provisioning Profile 이미 설치됨${NC}"
fi
echo ""

# 5. ExportOptions.plist 생성
echo -e "${YELLOW}📝 ExportOptions.plist 생성 중...${NC}"
cat > "$EXPORT_OPTIONS" << PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>app-store-connect</string>
    <key>teamID</key>
    <string>${TEAM_ID}</string>
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
        <key>${BUNDLE_ID}</key>
        <string>${PROVISIONING_PROFILE_UUID}</string>
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
rm -rf "$ARCHIVE_PATH" "$EXPORT_PATH"
echo ""

# 7. Archive 빌드
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📦 Archive 빌드 시작... (약 2-5분 소요)${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

xcodebuild -project "$PROJECT_PATH" \
  -scheme "$SCHEME_NAME" \
  -configuration Release \
  -sdk iphoneos \
  -archivePath "$ARCHIVE_PATH" \
  archive \
  DEVELOPMENT_TEAM="$TEAM_ID" \
  PROVISIONING_PROFILE_SPECIFIER="$PROVISIONING_PROFILE_UUID" \
  CODE_SIGN_STYLE="Manual" \
  CODE_SIGN_IDENTITY="Apple Distribution" \
  -allowProvisioningUpdates \
  | grep -E "(BUILD|ARCHIVE|Signing|error|warning:|succeeded)" || true

if [ $? -eq 0 ] && [ -d "$ARCHIVE_PATH" ]; then
    echo ""
    echo -e "${GREEN}✅ Archive 빌드 성공!${NC}"
    du -sh "$ARCHIVE_PATH"
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
  -archivePath "$ARCHIVE_PATH" \
  -exportPath "$EXPORT_PATH" \
  -exportOptionsPlist "$EXPORT_OPTIONS" \
  -allowProvisioningUpdates \
  | grep -E "(EXPORT|Upload|Processing|error|warning:|succeeded)" || true

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}🎉 App Store Connect 업로드 성공!${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${YELLOW}📱 앱: ${APP_NAME}${NC}"
    echo -e "${YELLOW}📱 Bundle ID: ${BUNDLE_ID}${NC}"
    echo -e "${YELLOW}📱 버전: $VERSION (빌드 $BUILD)${NC}"
    echo -e "${YELLOW}⏰ 10-30분 후 App Store Connect에서 빌드를 확인하세요.${NC}"
    echo -e "${BLUE}🔗 https://appstoreconnect.apple.com/${NC}"
    echo ""
else
    echo -e "${RED}❌ App Store Connect 업로드 실패${NC}"
    exit 1
fi

# 9. 정리 (옵션)
# rm -rf "$ARCHIVE_PATH" "$EXPORT_PATH" "$EXPORT_OPTIONS"

echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ 모든 작업 완료!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
```

---

## 📝 실제 사용 예제

### Star Linker 앱 (현재)

```bash
APP_NAME="Star Linker"
BUNDLE_ID="com.starlinker.app"
SCHEME_NAME="App"
PROJECT_ROOT="/Users/jeongseophan/game/orapa-space/star-linker-app"
PROJECT_PATH="$PROJECT_ROOT/ios/App/App.xcodeproj"
TEAM_ID="3ZMPVRB243"
PROVISIONING_PROFILE_UUID="7783c085-e96d-48d8-83a0-d57fb6ea3753"
PROVISIONING_PROFILE_NAME="jsappstore.mobileprovision"
PROVISIONING_PROFILE_PATH="/Users/jeongseophan/Desktop/background/IOS_appstore/jsappstore.mobileprovision"
```

### 새 앱 예제 (My Game App)

```bash
APP_NAME="My Game"
BUNDLE_ID="com.mygame.app"                    # ⭐ 새 Bundle ID
SCHEME_NAME="App"
PROJECT_ROOT="/Users/jeongseophan/game/my-game-app"  # ⭐ 새 경로
PROJECT_PATH="$PROJECT_ROOT/ios/App/App.xcodeproj"
TEAM_ID="3ZMPVRB243"                          # 같은 Team ID
PROVISIONING_PROFILE_UUID="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"  # ⭐ 새 UUID
PROVISIONING_PROFILE_NAME="mygame-appstore.mobileprovision"  # ⭐ 새 프로파일
PROVISIONING_PROFILE_PATH="/Users/jeongseophan/Desktop/background/IOS_appstore/mygame-appstore.mobileprovision"
```

---

## 🔧 Provisioning Profile 생성 가이드

새 앱을 위한 Provisioning Profile을 만들려면:

### 1. Apple Developer Portal 접속

https://developer.apple.com/account/resources/profiles/add

### 2. Distribution Profile 생성

1. **Distribution** 섹션에서 **"App Store Connect"** 선택
2. **App ID** 선택 (없으면 먼저 생성)
3. **Certificate** 선택: Apple Distribution: JeongSeop Han
4. **Profile Name** 입력: `[앱이름] AppStore`
5. **Generate** → **Download**

### 3. Profile 저장

다운로드한 `.mobileprovision` 파일을:

```bash
# Desktop의 IOS_appstore 폴더에 저장
cp ~/Downloads/MyApp_AppStore.mobileprovision \
   /Users/jeongseophan/Desktop/background/IOS_appstore/
```

### 4. UUID 확인

```bash
security cms -D -i /Users/jeongseophan/Desktop/background/IOS_appstore/MyApp_AppStore.mobileprovision | grep -A1 UUID
```

출력된 UUID를 복사하여 DEPLOY-IOS.md의 `PROVISIONING_PROFILE_UUID`에 입력

---

## 📂 파일 구조 예제

```
/Users/jeongseophan/Desktop/background/IOS_appstore/
├── jsappstore.mobileprovision          # Star Linker용
├── mygame-appstore.mobileprovision      # My Game용
└── otherapp-appstore.mobileprovision    # 다른 앱용

/Users/jeongseophan/game/
├── orapa-space/
│   └── star-linker-app/
│       └── DEPLOY-IOS.md                # Star Linker 배포 파일
├── my-game-app/
│   └── DEPLOY-IOS.md                    # My Game 배포 파일
└── other-app/
    └── DEPLOY-IOS.md                    # 다른 앱 배포 파일
```

---

## 🎯 요약

### 같은 개발자 계정의 여러 앱을 배포할 때:

1. **공통 사항** (모든 앱 동일):
   - Team ID: `3ZMPVRB243`
   - Signing Certificate: Apple Distribution: JeongSeop Han
   - Profile 저장 위치: `/Users/jeongseophan/Desktop/background/IOS_appstore/`

2. **앱별로 다른 사항**:
   - App Name
   - Bundle ID ⭐
   - Project Path
   - Provisioning Profile UUID ⭐
   - Provisioning Profile 파일명

3. **사용 방법**:
   ```bash
   # 1. 템플릿 복사
   cp DEPLOY-IOS-TEMPLATE.md /path/to/new-app/DEPLOY-IOS.md

   # 2. 설정 수정 (앱별 정보 입력)

   # 3. Claude에게 요청
   "DEPLOY-IOS.md 읽고 빌드해서 올려줘"
   ```

---

**이 템플릿 하나면 모든 iOS 앱을 같은 방식으로 배포할 수 있습니다! 🚀**
