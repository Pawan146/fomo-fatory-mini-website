This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# Project Setup Instructions

## Cloning the Repository

1. Clone the repository to your local machine using the following command:

```bash
git clone <repository-url>

2. Go to Project Directory

    cd <project-directory-name>

3. Dockerize the Application

    docker-compose up --build

4. Access the Application

    The application is lifted on the URL:

        Homepage: http://localhost:3000

5. Check the Stock Page

    To check the stock page, visit the URL:

        Stock Page: http://localhost:3000/stock

    
6. Update/Add the Data

    To update or add the data, call the API using:

        curl --location --request POST 'http://localhost:3000/api/updateData'

    
7. Fetch the Data

    To fetch the data, call the API using:

        curl --location 'http://localhost:3000/api/fetchData?symbol=bitcoin'









