FROM sandrokeil/typescript
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "./"]
RUN yarn
COPY . .
EXPOSE 3000
CMD npm run prod