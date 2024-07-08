echo '------'
echo 'Compilando...'
echo ''
npm run build:prod:app
echo '------'
echo 'Gerando APK...'
echo ''
npm run build:app
echo '------'
echo 'Acessando pasta'
echo ''
cd ./platforms/android/app/build/outputs/apk/debug
start .
cd -