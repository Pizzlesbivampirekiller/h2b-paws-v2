FROM nginx:alpine

# Copy static files
COPY dist /usr/share/nginx/html

# Override default config (copy to both possible locations)
RUN rm -f /etc/nginx/conf.d/default.conf /etc/nginx/http.d/default.conf 2>/dev/null; \
    printf 'server {\n  listen 80;\n  server_name _;\n  root /usr/share/nginx/html;\n  index index.html;\n  location / {\n    try_files \$uri \$uri/ /index.html;\n  }\n}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
