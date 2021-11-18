# Deez Rupt API 

# Getting Started

You would need to have nodejs to run this API. 

Before running the API you would need to run the following command 

Install all node modules:
```
npm install
```

Create Environment Variables (Make sure you fill in the content with valid data):
```
cp .env.example .env
```

Initiate Database:
```
npx prisma migrate dev --name init
```

Run API service
```
npm run dev
```