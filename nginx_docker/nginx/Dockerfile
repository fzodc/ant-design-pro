FROM nginx:latest
COPY conf.d /etc/nginx/conf.d/
COPY nginx.conf /etc/nginx/
COPY ./www/ /usr/share/nginx/html/
COPY ./logs/ /var/log/nginx/
