# EPS REST-API
Hi, mi name is **Deibyd** and this is my project to manage patients, doctors and appointments of an EPS.
## Prerequisite
You have to install these tools
- [NodeJS](https://nodejs.org/en)
- [Git](https://git-scm.com/)

## Features and Functionalities
- Get a list of the appointments, patients and doctors in the database and their information
- Create new appointments, patients and doctors in a NoSQL database

## Tech Stack
- [MongoDB - Cloud](https://www.mongodb.com/products/platform/cloud)
- [Express](https://expressjs.com/)
- [NextJS (React)](https://nextjs.org/)
- [NodeJS](https://nodejs.org/en)
- [TypeScript](https://www.typescriptlang.org/)

## Data model

## Installation and running

**1. Clone this repo by running the following commands**

`git clone https://github.com/DeibydBarragan/eps-rest-api.git`

`cd eps-rest-api`

**2. Go to the server folder and install the dependencies**

`cd server`

`npm install`

**3. Create a .env file and add there the following**

```
PORT = 8000
MONGO_URI = *YOUR MONGODB DATABASE URI*
```
You can change the port but don't use **3000** because that port is used by the client app

**4. Exit the folder and run the following command**

`npm run dev`

now you can test the API with Postman or another client on this url http://localhost:8000/api

**5. Then, in another terminal go to the root folder and run the followind**

`cd client`

`npm install`

**6. Add a .env.local file with the following**

`NEXT_PUBLIC_API_URL=http://localhost:8000/api`

If you changed the PORT in the server, you also have to change it here like this:

`NEXT_PUBLIC_API_URL=http://localhost:*YOUR PORT*/api`

**7. Now run the following command**

`npm run dev`

Then go to http://localhost:3000 and use the client app

## Additionally this project uses:
### For Backend
- [Mongoose](https://mongoosejs.com/)
- [Nodemon](https://nodemon.io/)
- [Express validator](https://express-validator.github.io/docs/)
- [Cors](https://www.npmjs.com/package/cors)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Eslint](https://eslint.org/)
### For frontend
- [NextUI](https://nextui.org/)
- [React Hook Form](https://react-hook-form.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction/)
- [Yup](https://www.npmjs.com/package/yup)
- [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- [ESlint](https://eslint.org/)





