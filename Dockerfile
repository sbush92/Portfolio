FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy your portfolio files into nginx's default webroot
COPY . /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80