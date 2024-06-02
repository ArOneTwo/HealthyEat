const express = require("express")
const port = process.env.PORT || 3000
const app = express()

const foods = [
    {
        id: 1,
        food: "Pisang",
        desc: "Makanan berwarna kuning, ya warna kuning",
        isIncreased: true,
    },
    {
        id: 2,
        food: "Apel",
        desc: "Apple pie!",
        isIncreased: false,
    },
]
//GET All IDs(test)
// app.get('/', (req, res, next) => {
//     res.send("<h1>Hello stranger</h1>");
// })

// GET All IDs
app.get('/food', (req, res) => {
    res.send(foods);
})

// GET Single IDs
app.get('/food/:id', (req, res) => {
    let fruit = foods.filter((fruit) => fruit.id == req.params.id);
    res.json(fruit);
});

app.listen(port, () => {
    console.log(`Server berjalan pada port ${port}`);
})