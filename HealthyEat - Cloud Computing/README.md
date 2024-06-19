# Cloud Computing

**How to Use the API**

1.Download the file

2.Run 'npm i'

3.Create .env and add this config

DB_NAME = <YOUR DATABASE NAME>

DB_USER = root

DB_PASSWORD = ''

DB_HOST = localhost

DB_DIALECT = mysql

DB_PORT= 3306


# API Documentation

| Endpoint | Method | Config | Expected Result |
| ------------- | ------------- | ------------- | ------------- |
| /register  | POST  | { "name": "user5", "email": "testUser8@gmail.com", "password": "test7", "confPassword": "test7" } |  { "message": "Registrasi berhasil" } |
| /login  | POST  |   { "email": "testUser8@gmail.com", "password": "test7" }    |  { "token": "this is a jwt token", "user": { "name": "user5", "email": "testUser8@gmail.com" } }   |
| /user/:id  | GET  |  { "email": "testUser8@gmail.com", "password": "test7" }   |  { "id": 1, "name": "user5", "email": "testUser8@gmail.com", "password": "this is hashed password" }   |
| /add  | GET  |  { "buah": "Mangga", "tujuan": "Menurunkan Berat Badan", "urutan": "B", "deskripsi": "Jenis buah yang mempunyai sumber vitamin dan mineral yang banyak terdapat di indonesia" } |  { "message": "Data buah berhasil disimpan" }  |
| /classes/add  | POST  |  { "classes": ["Apple"] }    |  { "message": "Classes berhasil ditambahkan", "data": [ { "id_classes": 32, "fruit_classes": "Apple Barnbaurn", "id_fruit": 18 }, { "id_classes": 33, "fruit_classes": "Apple Granny Smith", "id_fruit": 19 }, { "id_classes": 34, "fruit_classes": "Apple Golden 1", "id_fruit": 20 } ] }             |
| /fruit  | POST  |  {}  | [ } "fruit_Id": 1, "buah": "Jambu Air", "tujuan": "Menurunkan Berat Badan", "urutan": "S", "deskripsi": "Buah tropis yang dikenal dengan daging buahnya yang renyah dan berair." }, { "fruit_Id": 2, "buah": "Pir", "tujuan": "Menaikkan Berat Badan", "urutan": "A", "deskripsi": "Buah yang tumbuh di daerah beriklim sedang dan dikenal dengan bentuknya yang khas, seperti lonceng terbalik" }, ]              |
| /fruit/increase  | POST  |    {}   | [ { "fruit_Id": 2, "buah": "Pir", "tujuan": "Menaikkan Berat Badan", "urutan": "A", "deskripsi": "Cuman Pir biasa ygy" }, { "fruit_Id": 4, "buah": "Dragonfruit", "tujuan": "Menaikkan Berat Badan", "urutan": "C", "deskripsi": "Buah dari tanaman kaktus Hylocereus. Buah ini memiliki kulit yang berwarna merah muda atau kuning dengan sisik hijau" }, { "fruit_Id": 3, "buah": "Nanas", "tujuan": "Menaikkan Berat Badan", "urutan": "D", "deskripsi": "Buah tropis yang dikenal dengan kulitnya yang keras dan berduri serta mahkota daun di bagian atasnya" } ]      |
| /fruit/decrease  | POST  | {} |  [ { "fruit_Id": 5, "buah": "Paprika", "tujuan": "Menurunkan Berat Badan", "urutan": "S", "deskripsi": "Buah dari keluarga terong-terongan yang biasanya digunakan sebagai sayuran dalam berbagai hidangan" }, { "fruit_Id": 7, "buah": "Jambu", "tujuan": "Menurunkan Berat Badan", "urutan": "A", "deskripsi": "Buah tropis yang dapat merujuk pada dua jenis utama: jambu biji (Psidium guajava) dan jambu air (Syzygium aqueum)" }, { "fruit_Id": 9, "buah": "Mangga", "tujuan": "Menurunkan Berat Badan", "urutan": "B", "deskripsi": "Buah tropis yang dikenal dengan daging buahnya yang manis dan lembut" }, ] |
| /fruit/:fruit_id  | POST  |  {}  |  { "fruit_Id": 5, "buah": "Paprika", "tujuan": "Menurunkan Berat Badan", "urutan": "S", "deskripsi": "Buah dari keluarga terong-terongan yang biasanya digunakan sebagai sayuran dalam berbagai hidangan" }, |
| /classes  | POST  |  {}  | [ { "id_classes": 32, "fruit_classes": "Apple Barnbaurn", "id_fruit": 18, "fruit-tests": [ { "buah": "Apple Barnbaurn", "tujuan": "Menurunkan Berat Badan", "urutan": "S", "deskripsi": "Cuman Apple biasa ygy", "FruitClasses": { "id": 10, "id_fruit": 18, "id_classes": 32 } } ] }, { "id_classes": 33, "fruit_classes": "Apple Granny Smith", "id_fruit": 19, "fruit-tests": [ { "buah": "Apple Granny Smith", "tujuan": "Menurunkan Berat Badan", "urutan": "S", "deskripsi": "Cuman Apple biasa ygy", "FruitClasses": { "id": 11, "id_fruit": 19, "id_classes": 33 } } ] }, ]  |
