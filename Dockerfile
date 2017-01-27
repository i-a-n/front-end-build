FROM node:6.7.0

# Install Global Dependencies
RUN npm install -g npm-cache bower

# Create and set working directory
RUN mkdir /app
WORKDIR /app/

# Install npm& Bower Dependencies
COPY package.json package.json
COPY bower.json bower.json
COPY .bowerrc .bowerrc
RUN npm-cache install npm bower --allow-root

# Copy Project Folder
COPY . /app/

# Run Build
RUN npm run build:production -s

# Expose Port
EXPOSE 80

# Start Server
CMD ["npm", "start"]
