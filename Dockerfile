# Fetching the latest node image on alpine linux
FROM node:alpine AS development

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /simple_storage_backend

# Installing dependencies
COPY package*.json /simple_storage_backend

RUN npm install

# Copying all the files in our project
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Starting our application
CMD npm start