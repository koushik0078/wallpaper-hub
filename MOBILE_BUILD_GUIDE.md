# Mobile App Build Guide (Android & iOS)

This project has been configured with **Capacitor** to run as a native mobile app on Android and iOS. 
It wraps the existing "Wallpaper Hub" web application into a high-performance native container.

## Prerequisites

- **Node.js** (Installed)
- **Android Studio** (For building Android APK)
- **Xcode** (For building iOS App - macOS only)

## ✨ Quick Start

The project is already initialized. The native projects are located in:
- `/android`
- `/ios`

### 1. Sync Changes
Whenever you make changes to the React code (`src/`), run:

```bash
npm run build
npx cap sync
```

This updates the `dist/` folder and copies it to the native Android/iOS projects.

---

## 🤖 Building for Android

1. **Open in Android Studio**:
   ```bash
   npx cap open android
   ```
   *Or manually open the `android/` folder in Android Studio.*

2. **Run/Build**:
   - Connect your Android device or use an Emulator.
   - Click the green **"Run"** (Play) button in Android Studio.
   - To build an APK for sharing: `Build > Build Bundle(s) / APK(s) > Build APK(s)`.

   The APK will be generated in `android/app/build/outputs/apk/debug/app-debug.apk`.

---

## 🍎 Building for iOS (macOS Only)

1. **Open in Xcode**:
   ```bash
   npx cap open ios
   ```
   *Or manually open `ios/App/App.xcworkspace`.*

2. **Run/Build**:
   - Select your target simulator (e.g., iPhone 15) or connected device.
   - Click the **"Run"** (Play) button.
   - To archive for App Store: `Product > Archive`.

---

## 📱 Mobile-Specific Features
- **Touch Optimization**: The 3D buttons and cards function on tap.
- **Responsive Layout**: The grid layout adapts automatically to mobile portrait/landscape modes.
- **Glassmorphism**: Optimized for mobile screens via CSS `backdrop-filter`.

## Troubleshooting
- **Gradle Errors?** Ensure your Android Studio has the latest Android SDK installed.
- **CocoaPods Errors?** On Mac, run `sudo gem install cocoapods` if `pod install` fails.
