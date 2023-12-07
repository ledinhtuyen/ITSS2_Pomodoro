#!/bin/bash

# Cài đặt Docker Engine
echo "Đang cài đặt Docker Engine..."
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
sudo systemctl enable docker
sudo systemctl start docker

# Cài đặt Docker Compose
echo "Đang cài đặt Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

echo "Hoàn thành cài đặt Docker Engine và Docker Compose."
echo "Vui lòng đăng nhập lại để áp dụng các thay đổi về quyền truy cập vào Docker."