// userModel.js
const { Sequelize } = require('sequelize');
const db = require('../config/database');

const User = db.define("test-register2", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    logging: false,
    timeStamps: false
});

User.sync({ force: false}).then((data) => {
    console.log('Tabel dan model sudah tersinkron!');
}).catch((err) => {
    console.log('Error saat sinkronisasi');
})

module.exports = User;