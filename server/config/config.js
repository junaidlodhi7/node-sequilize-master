require('dotenv').config();
module.exports = {
    "development": {
        "username": "database username",
        "password": "database password",
        "database": "development_database",
        "host":     "localhost",
        "port": 5432,
        "dialect": "postgres" // mysql , postgres , mariadb , sqlite
    },
    "test": {
        "username": "database username",
        "password": "database password",
        "database": "test_database",
        "host":     "localhost",
        "port": 5432,
        "dialect": "postgres" // mysql , postgres , mariadb , sqlite
    },
    "production": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASS,
        "database": process.env.DB_NAME,
        "host":     process.env.DB_HOST,
        "port": 5432,
        "dialect": "postgres" // mysql , postgres , mariadb , sqlite
    }
};