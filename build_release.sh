mkdir -p android/app/src/main/assets
react-native bundle --platform android --dev false --entry-file index.android.js \
  --bundle-output android/app/src/main/assets/index.android.bundle \
  --assets-dest android/app/src/main/res/
cd android && ./gradlew assembleRelease
cp ./app/build/outputs/apk/app-release.apk ../
cd ../
