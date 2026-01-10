# iOS 앱 App Store Connect 업로드 가이드

## 개요
Xcode에서 iOS 앱을 빌드하고 App Store Connect에 업로드하는 전체 과정을 단계별로 정리한 가이드입니다.

## 필수 준비사항
- Apple Developer 계정 (유료, $99/년)
- macOS + Xcode 설치
- iOS 프로젝트 (.xcodeproj 또는 .xcworkspace)

---

## 1. Apple Developer 계정 설정

### 1.1 Distribution 인증서 생성

#### CSR 파일 생성
```bash
mkdir -p ~/Desktop/certificates
openssl req -new -newkey rsa:2048 -nodes \
  -keyout ~/Desktop/certificates/DistributionKey.key \
  -out ~/Desktop/certificates/Distribution.csr \
  -subj "/C=KR/ST=Seoul/L=Seoul/O=YourCompany/OU=Development/CN=your.email@gmail.com"
```

#### Apple Developer에서 인증서 생성
1. https://developer.apple.com/account/resources/certificates/add 접속
2. **"iOS Distribution (App Store and Ad Hoc)"** 선택 → Continue
3. **Choose File**에서 `~/Desktop/certificates/Distribution.csr` 업로드
4. **Continue** → **Download** 클릭하여 `.cer` 파일 다운로드
5. 다운로드한 `.cer` 파일을 **더블클릭**하여 키체인에 설치

#### 인증서 설치 확인
```bash
security find-identity -v -p codesigning | grep Distribution
```
출력 예시: `Apple Distribution: Your Name (TEAM_ID)`

---

## 2. App ID 및 프로비저닝 프로파일 생성

### 2.1 App Store Distribution 프로파일 생성
1. https://developer.apple.com/account/resources/profiles/add 접속
2. **"App Store"** 선택 → Continue
3. **App ID**: 해당 앱의 Bundle ID 선택 (예: `com.yourcompany.appname`)
4. **Certificates**: 방금 생성한 Distribution 인증서 선택 → Continue
5. **Profile Name**: `YourApp AppStore` 입력 → Generate
6. **Download** 후 `.mobileprovision` 파일을 **더블클릭**하여 설치

### 2.2 프로파일 UUID 확인
```bash
find ~/Library/Developer/Xcode/UserData/Provisioning\ Profiles/ -name "*.mobileprovision" -exec security cms -D -i {} \; | grep -A1 UUID
```

---

## 3. Xcode 프로젝트 설정

### 3.1 Manual Signing 설정
```bash
# project.pbxproj 파일에서 다음 설정 변경
CODE_SIGN_STYLE = Manual;
CODE_SIGN_IDENTITY = "Apple Distribution";
PROVISIONING_PROFILE_SPECIFIER = "UUID값"; # 위에서 확인한 UUID
```

### 3.2 설정 자동화 스크립트
```bash
# 프로젝트 경로 설정
PROJECT_PATH="/path/to/your/App.xcodeproj/project.pbxproj"

# Manual signing으로 변경
sed -i '' 's/CODE_SIGN_STYLE = Automatic;/CODE_SIGN_STYLE = Manual;/g' "$PROJECT_PATH"

# Distribution 인증서 사용
sed -i '' 's/CODE_SIGN_IDENTITY = "Apple Development";/CODE_SIGN_IDENTITY = "Apple Distribution";/g' "$PROJECT_PATH"

# 프로비저닝 프로파일 UUID 설정 (실제 UUID로 교체 필요)
sed -i '' 's/PROVISIONING_PROFILE_SPECIFIER = "";/PROVISIONING_PROFILE_SPECIFIER = "YOUR_PROFILE_UUID";/g' "$PROJECT_PATH"
```

---

## 4. Archive 빌드 및 업로드

### 4.1 Archive 빌드
```bash
xcodebuild -project "/path/to/your/App.xcodeproj" \
  -scheme YourAppScheme \
  -configuration Release \
  archive \
  -archivePath "/tmp/YourApp.xcarchive"
```

### 4.2 ExportOptions.plist 생성
```bash
cat > /tmp/ExportOptions.plist << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>app-store-connect</string>
    <key>teamID</key>
    <string>YOUR_TEAM_ID</string>
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
        <key>com.yourcompany.appname</key>
        <string>YOUR_PROFILE_UUID</string>
    </dict>
</dict>
</plist>
EOF
```

### 4.3 App Store Connect 업로드
```bash
xcodebuild -exportArchive \
  -archivePath "/tmp/YourApp.xcarchive" \
  -exportPath "/tmp/" \
  -exportOptionsPlist "/tmp/ExportOptions.plist"
```

성공 시 출력: `** EXPORT SUCCEEDED **` + `Upload succeeded`

---

## 5. 문제 해결

### 5.1 자주 발생하는 오류들

#### "Communication with Apple failed: Your team has no devices"
**원인**: 개발용 기기가 등록되지 않음  
**해결**: App Store Distribution 프로파일 사용 (기기 등록 불필요)

#### "No profiles for 'com.yourapp' were found"
**원인**: Bundle ID에 맞는 프로비저닝 프로파일이 없음  
**해결**: 정확한 Bundle ID로 App Store Distribution 프로파일 재생성

#### "Provisioning profile doesn't include signing certificate"
**원인**: 프로파일에 Distribution 인증서가 포함되지 않음  
**해결**: Apple Developer에서 프로파일 편집 → Distribution 인증서 선택 → 재생성

#### "No signing certificate found"
**원인**: Distribution 인증서가 키체인에 설치되지 않음  
**해결**: `.cer` 파일 더블클릭하여 키체인에 설치

### 5.2 디버깅 명령어
```bash
# 설치된 인증서 확인
security find-identity -v -p codesigning

# 프로비저닝 프로파일 확인
ls -la ~/Library/Developer/Xcode/UserData/Provisioning\ Profiles/

# 빌드 설정 확인
xcodebuild -project "App.xcodeproj" -showBuildSettings | grep -E "(CODE_SIGN|PROVISIONING)"
```

---

## 6. 전체 프로세스 자동화 스크립트

```bash
#!/bin/bash

# 설정값들
PROJECT_NAME="YourApp"
BUNDLE_ID="com.yourcompany.appname"
TEAM_ID="YOUR_TEAM_ID"
SCHEME_NAME="YourApp"
PROJECT_PATH="/path/to/your/App.xcodeproj"

echo "🚀 iOS 앱 App Store Connect 업로드 시작"

# 1. Archive 빌드
echo "📦 Archive 빌드 중..."
xcodebuild -project "$PROJECT_PATH" \
  -scheme "$SCHEME_NAME" \
  -configuration Release \
  archive \
  -archivePath "/tmp/${PROJECT_NAME}.xcarchive"

if [ $? -ne 0 ]; then
  echo "❌ Archive 빌드 실패"
  exit 1
fi

# 2. ExportOptions.plist 생성
echo "📝 ExportOptions.plist 생성 중..."
cat > /tmp/ExportOptions.plist << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>app-store-connect</string>
    <key>teamID</key>
    <string>$TEAM_ID</string>
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

# 3. App Store Connect 업로드
echo "🚀 App Store Connect 업로드 중..."
xcodebuild -exportArchive \
  -archivePath "/tmp/${PROJECT_NAME}.xcarchive" \
  -exportPath "/tmp/" \
  -exportOptionsPlist "/tmp/ExportOptions.plist"

if [ $? -eq 0 ]; then
  echo "✅ App Store Connect 업로드 성공!"
  echo "📱 App Store Connect에서 빌드를 확인해주세요."
else
  echo "❌ 업로드 실패"
  exit 1
fi
```

---

## 7. App Store Connect 확인

업로드 후 10-15분 정도 기다린 후:
1. https://appstoreconnect.apple.com 접속
2. **My Apps** → 해당 앱 선택
3. **TestFlight** 탭 또는 **빌드** 탭에서 업로드된 빌드 확인

---

## 8. 중요 참고사항

### 8.1 버전 관리
- **CFBundleShortVersionString**: 마케팅 버전 (1.0, 1.1 등)
- **CFBundleVersion**: 빌드 번호 (1, 2, 3 등)
- 재업로드 시 빌드 번호는 반드시 증가해야 함

### 8.2 보안 주의사항
- **절대 public 저장소에 커밋하지 말 것**:
  - `.p12` 인증서 파일
  - `.mobileprovision` 파일
  - Apple ID 비밀번호

### 8.3 Team ID 확인 방법
```bash
# 인증서에서 Team ID 확인
security find-identity -v -p codesigning | grep Distribution
```
또는 Apple Developer 계정 → **Membership** 탭에서 확인

---

## 9. 체크리스트

업로드 전 반드시 확인할 사항들:

- [ ] Apple Developer 계정 활성화 확인
- [ ] Distribution 인증서 키체인 설치 확인
- [ ] App Store Distribution 프로파일 설치 확인
- [ ] Bundle ID 정확성 확인
- [ ] 프로젝트 Manual Signing 설정 확인
- [ ] Archive 빌드 성공 확인
- [ ] ExportOptions.plist Team ID/Bundle ID 정확성 확인
- [ ] App Store Connect 업로드 성공 메시지 확인

---

이 가이드를 따라하면 iOS 앱을 성공적으로 App Store Connect에 업로드할 수 있습니다. 문제가 발생하면 "문제 해결" 섹션을 참고하세요.