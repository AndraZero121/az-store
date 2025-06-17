mkdir node_modules/lightningcss-android-arm64
cd node_modules/lightningcss-android-arm64
curl https://github.com/garammanisxd/data/releases/download/lightningcss-android-arm64/lightningcss-android-arm64.zip -L -O lightningcss-android-arm64.zip
unzip lightningcss-android-arm64.zip
mv lightningcss-android-arm64/* ./
rm -rf lightningcss-android-arm64 lightningcss-android-arm64.zip
cd ../..