# Specify the Node.js image with version 18.18.1
FROM node:18.18.1

# Set the working directory in the Docker container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application's code
COPY . .

# Build your Next.js application
RUN npm run build

# Command to run your app
CMD ["npm", "start"]