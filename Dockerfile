FROM nginx:alpine

COPY dist /usr/share/nginx/html

RUN rm -f /etc/nginx/conf.d/default.conf 2>/dev/null; \
    printf 'server {\n  listen 8080;\n  server_name _;\n  root /usr/share/nginx/html;\n  index index.html;\n  location / {\n    try_files \$uri \$uri/ /index.html;\n  }\n}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
