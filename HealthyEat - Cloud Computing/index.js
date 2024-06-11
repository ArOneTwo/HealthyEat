const express = require("express")
require('dotenv').config();
const port = process.env.PORT || 3000
const app = express();
const cors = require('cors');
const route = require('./src/routes/user.route')
const bodyParser = require("body-parser");

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//Routes test
app.get('/', function(req, res){
     res.send('hello world')
})

//Routes
app.use('/signup', route)

app.listen(port, () => console.log(`server is running at http://localhost:${port}`));