# Cloud Computing

**How to Use the API**
1.Download the file
2.Run 'npm i'
3.Create .env and add this config

DB_NAME = test-database
DB_USER = root
DB_PASSWORD = ''
DB_HOST = localhost
DB_DIALECT = mysql
DB_PORT= 3306


# API Documentation

| Endpoint | Method | Config | Expected Result |
| ------------- | ------------- | ------------- | ------------- |
| /register  | POST  | { "name": "user5", "email": "testUser8@gmail.com", "password": "test7", "confPassword": "test7" } |   "message": "Registrasi berhasil" |
| /login  | POST  |   { "email": "testUser8@gmail.com", "password": "test7" }    |  { "token": "this is a jwt token", "user": { "name": "user5", "email": "testUser8@gmail.com" } }             |
| /user/:id  | GET  |  { "email": "testUser8@gmail.com", "password": "test7" }   |  { "id": 1, "name": "user5", "email": "testUser8@gmail.com", "password": "this is hashed password" }             |
| /add  | GET  |               |               |
| /classes/add  | POST  |               |               |
| /fruit  | POST  |               |               |
| /fruit/increase  | POST  |               |               |
| /fruit/decrease  | POST  |               |               |
| /fruit/:fruit_id  | POST  |               |               |
| /classes  | POST  |               |               |
