FROM node:20.13.1-bullseye

ARG LOGGER_LEVEL_ARG
ARG DB_IP_ARG
ARG DB_PORT_ARG
ARG DB_NAME_ARG
ARG DB_PASSWORD_ARG
ARG DB_USERNAME_ARG
ARG PORT_ARG
ARG FRONTEND_IP_ARG
ARG FRONTEND_PORT_ARG
ARG JWT_SECRET_KEY_ARG

ENV LOGGER_LEVEL=$LOGGER_LEVEL_ARG
ENV DB_IP=$DB_IP_ARG
ENV DB_PORT=$DB_PORT_ARG
ENV DB_NAME=$DB_NAME_ARG
ENV DB_PASSWORD=$DB_PASSWORD_ARG
ENV DB_USERNAME=$DB_USERNAME_ARG
ENV PORT=$PORT_ARG
ENV FRONTEND_IP=$FRONTEND_IP_ARG
ENV FRONTEND_PORT=$FRONTEND_PORT_ARG
ENV JWT_SECRET_KEY=$JWT_SECRET_KEY_ARG

WORKDIR /

COPY src src
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY configs configs
COPY tsconfig.json tsconfig.json

RUN npm clean-install
RUN npm run build

EXPOSE $PORT

ENTRYPOINT ["npm", "start"]
