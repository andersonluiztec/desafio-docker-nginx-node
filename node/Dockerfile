FROM node

WORKDIR /usr/src/app

COPY app .

EXPOSE 3000

#ENTRYPOINT [ "node", "index.js" ]
RUN npm install express --save
RUN npm install mysql --save
RUN chmod +x wait-for-it.sh

CMD ["./wait-for-it.sh" , "db:3306" , "--strict" , "--timeout=50" , "--" , "node", "index.js"]
