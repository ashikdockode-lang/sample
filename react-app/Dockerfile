FROM node:16 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
ARG REACT_APP_BACKEND_PORT
ENV REACT_APP_BACKEND_PORT=$REACT_APP_BACKEND_PORT
COPY . ./
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
