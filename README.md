# Grovi
## _A place where growers and consumers meet_

![CodeSize](https://img.shields.io/github/languages/code-size/GrowVirtually/Backend-API?style=flat-square)
![LastCommit](https://img.shields.io/github/last-commit/GrowVirtually/Backend-API?style=flat-square)

'Grovi' is a place for growers who's willing to take an extra income for their extra harvesting from home gardening or cultivations. The main product for 'Grovi' is a mobile application powered by React-native. This is the backend for that mobile application and the administrator web application which is done using React.

## Features

- Mobile application for Growers and Consumers
- Web application for administrators

## Tech

Grovi uses a number of open source projects to work properly:

- [ReactJS] - A JavaScript library for building user interfaces
- [React-native] - Mobile application development tool
- [Material UI] - A popular React UI framework
- [Node.js] - Evented I/O for the backend
- [Express] - Fast node.js network app framework
- [PostgreSQL] - Relational open source DBMS

## Installation

Grovi requires [Node.js](https://nodejs.org/) v14+ to run.

Change the directory

```sh
cd Backend-API
```
Create 'config.env' file in the root folder

Add following details in it

```
NODE_ENV=development
PORT=5000
DATABASE_LOCAL=mongodb://localhost:27017/grovi?poolSize=20&writeConcern=majority
JWT_SECRET=add a secret(random string with 32 characters would be enough)
JWT_EXPIRES_IN=90d
TWILIO_ACCOUNT_SID=your twilio account sid
TWILIO_AUTH_TOKEN=your twilio auth token
TWILIO_PHONE_NUMBER=your twilio phone number
SMS_SECRET_KEY=add a secret(random string with 32 characters would be enough)
USER=postgres
HOST=localhost
PG_DATABASE=grovi
PWD=your db password
PG_PORT=5432
```


Install the dependencies and devDependencies and start the server.

```sh
npm install
npm start
```

For production environments...

```sh
npm install --production
npm run start:prod
```

Open http://localhost:5000 and take a look around.

## License

MIT

**Free Software, Hell Yeah!**

[PostgreSQL]: <https://www.postgresql.org/>
[Material UI]: <https://material-ui.com/>
[React-native]: <http://ace.ajax.org>
[Node.js]: <http://nodejs.com/>
[express]: <http://expressjs.com>
[ReactJS]: <https://reactjs.org/>

