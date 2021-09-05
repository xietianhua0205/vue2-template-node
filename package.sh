node ./build/createToken.js
npm config set sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
npm install --registry http://192.168.4.3:7001  --unsafe-perm=true --allow-root
npm run build

mkdir app-name
mv ./dist/* ./app-name/
