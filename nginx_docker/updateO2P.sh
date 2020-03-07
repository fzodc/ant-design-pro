#! /bin/bash
## This is o2p lite fore-end
IMAGE_NAME=o2p_nginx
cd ..
#npm run build
#find ./dist/ -type d -exec chmod 777 {} \;
#find ./dist/ -type f -exec chmod 777 {} \;
#cp -rf ./dist/* ./nginx_docker/nginx/www/
cd ./nginx_docker/nginx/
echo "mv 1..."

mv local_conf.d conf.d
docker stop $IMAGE_NAME || true
docker rm $IMAGE_NAME || true
docker rmi $IMAGE_NAME || true
docker build -t $IMAGE_NAME .

echo "mv 2..."
mv conf.d local_conf.d
echo "Docker Run ..."
docker run -d -p 8000:80 --restart=always --name $IMAGE_NAME $IMAGE_NAME
