#! /bin/bash
## This is o2p lite fore-end
$MS_NAME=o2p_nginx_aws
IMAGE_NAME=138387084100.dkr.ecr.cn-northwest-1.amazonaws.com.cn/o2p_nginx_aws
cd ..
#npm run build
#find ./dist/ -type d -exec chmod 777 {} \;
#find ./dist/ -type f -exec chmod 777 {} \;
#cp -rf ./dist/* ./nginx_docker/nginx/www/
cd ./nginx_docker/nginx/
echo "mv 1..."

mv aws_conf.d conf.d
docker stop $MS_NAME || true
docker rm $MS_NAME || true
docker rmi $IMAGE_NAME || true
docker build -t $IMAGE_NAME .

echo "mv 2..."
mv conf.d aws_conf.d
echo "Docker Run ..."
docker run -d -p 8001:8000 --restart=always --name $MS_NAME $IMAGE_NAME

