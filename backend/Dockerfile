FROM node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
RUN chmod +x ./init.sh
EXPOSE 3000
CMD [ "./init.sh" ]