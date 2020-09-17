#Build off this base image
FROM node:12

# Set up app directory
WORKDIR /usr/src/app

# Set the port that the app will run on 
ENV PORT=8080

# Install app dependencies
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Expose the server to the host machine
EXPOSE ${PORT}

# Run this command on startup
ENTRYPOINT ["npm", "start"]