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
- [PostGIS] - Spatial and Geographic objects for PostgreSQL
- [Sequelize] - ORM for node.js

## Installation

* Install [PostgreSQL](https://www.postgresql.org) v13

* Configure [PostGIS](https://www.youtube.com/watch?v=afK8GWpb8RU)

* Grovi requires [Node.js](https://nodejs.org/) v14+ to run.

Change the directory

```sh
cd Backend-API
```
Create '.env' file in the root folder

Add following details in it

```
# server
NODE_ENV=development
PORT=5000
HOST=localhost (if you are in production environment, use 'grovi-backend.herokuapp.com')

# authentication
JWT_SECRET=<add a secret(random string with 32 characters would be enough)>
JWT_EXPIRES_IN=90d
TWILIO_ACCOUNT_SID=<your_twilio_account_sid>
TWILIO_AUTH_TOKEN=<your_twilio_auth_token>
TWILIO_PHONE_NUMBER=<your_twilio_phone_number>
SMS_SECRET_KEY=<add a secret(random string with 32 characters would be enough)>

# database
DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=grovi
DB_PWD=admin
DB_PORT=5432

# email
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USERNAME=<mailtrap_email_username>
EMAIL_PASSWORD=<mailtrap_email_password>

# image upload
IMG_CLOUD_NAME=<cloudinary_cloud_name>
IMG_API_KEY=<cloudinary_api_key>
IMG_API_SECRET=<cloudinary_api_secret>
```


Install the dependencies and devDependencies and start the server.

```shell
npm install
npm start
```

For production environments...

```sh
npm install --production
npm run start:prod
```

For database environments...

#### Execute the functions in the extra/db/functions.sql file in your database

Migrate tables into postgres database
```sh
npm run migrate
```

Undo Migrations for all tables
```sh
npm run undoMigrate
```

Populate all tables with provided data (Seeding)
```sh
npm run seed
```

Undo seeding for all tables
```sh
npm run undoSeed
```

Sequelize documentation for migrations - https://sequelize.org/master/manual/migrations.html

Open http://localhost:5000 and take a look around.

## Deployment

1. Connect Github branch to Heroku
2. Edit config/config.json file with necessary Heroku db credentials
3. Add following code snippet to config/config.json file under 'development', 'test', 'production' objects
```json
"dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
}
```
4. Change cors in app.js as following
```javascript
app.use(
  cors({
    origin: `https://grovi-backend.herokuapp.com:${process.env.PORT}`,
    credentials: true,
  })
);
```
5. Setup configurations as in config.env
6. Setup deployment
7. Setup pgAdmin remotely by giving necessary credentials.
8. Install postgis and postgis_topology extensions from pgAdmin
9. From Heroku dashboard CLI do the migrations

### Heroku migration commands (from Heroku dashboard)
```shell
heroku run sequelize-cli db:migrate
```
```shell
heroku run sequelize-cli db:seed:all
```

## License

MIT


[PostgreSQL]: <https://www.postgresql.org/>
[Material UI]: <https://material-ui.com/>
[React-native]: <http://ace.ajax.org>
[Node.js]: <http://nodejs.com/>
[express]: <http://expressjs.com>
[ReactJS]: <https://reactjs.org/>
[Sequelize]: <https://sequelize.org/master/>
[PostGIS]: <https://postgis.net/>

Group No: 15
Member               | Index No | Github username
-------------------- | ---------| ---------------
J.P.A. Shanaka       | 18001582 | ashanaka
D.D. Liyanaarachch i | 18000932 | DDhanushka
A. H. Dodampe        | 18000462 | anjana-dodampe
A.C.Vidanagamachchi  | 18001769 | asinduvg
G. H. G. M. Madara   | 18020471 | ManulMax
T. M. E. U. De Silva | 18000355 | TMEU
