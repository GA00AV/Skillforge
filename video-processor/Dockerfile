FROM node:22-alpine
RUN apk add --no-cache ffmpeg
WORKDIR /app
COPY . .
RUN npm install
RUN npx prisma generate
RUN npm run build
RUN chmod +x start.sh
CMD [ "./start.sh" ]