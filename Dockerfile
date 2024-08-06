# 1. Build 단계 - Node.js를 사용하여 Vite 애플리케이션 빌드
FROM node:18-alpine AS build

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. package.json과 package-lock.json 복사 및 의존성 설치
COPY package*.json ./
RUN npm install

# 4. 애플리케이션의 모든 파일을 복사하고 빌드 실행
COPY . .
RUN npm run build

# 5. Production 단계 - Nginx로 정적 파일 서빙
FROM nginx:alpine

# 6. Nginx의 기본 경로에 빌드된 파일 복사
COPY --from=build /app/dist /usr/share/nginx/html

# 7. Nginx 포트 설정
EXPOSE 80

# 8. Nginx 실행 (기본 명령어)
CMD ["nginx", "-g", "daemon off;"]