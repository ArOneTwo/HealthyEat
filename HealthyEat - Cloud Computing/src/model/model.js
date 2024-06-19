// model.js
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
    },
    confPassword: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    logging: false,
    timeStamps: false
});

const fruit = db.define("fruit-test", {
    fruit_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    buah: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    tujuan: {
        type: Sequelize.ENUM('Menurunkan Berat Badan', 'Menaikkan Berat Badan'),
        allowNull: false,
    },
    urutan: {
        type: Sequelize.ENUM('S', 'A', 'B', 'C', 'D'),
        allowNull: false,
    },
    deskripsi: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    logging: true,
    timeStamps: false
});

const Classes = db.define('classes', {
    id_classes: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    fruit_classes: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    id_fruit: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: fruit,
        key: 'fruit_Id',
      },
    },
  }, {
    logging: false,
    timestamps: false,
  });

const FruitClasses = db.define('FruitClasses', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_fruit: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: fruit,
            key: 'fruit_Id',
        },
    },
    id_classes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Classes,
            key: 'id_classes',
        },
    },
}, {
    timestamps: false,
    logging: false,
});

fruit.sync({ force: false }).then((data) => {
    console.log('Tabel dan model fruit sudah tersinkron!');
  }).catch((err) => {
    console.log('Error saat sinkronisasi');
  })
  

User.sync({ force: false}).then((data) => {
    console.log('Tabel dan model User sudah tersinkron!');
}).catch((err) => {
    console.log('Error saat sinkronisasi');
})

Classes.sync({ force: false }).then(() => {
    console.log('Tabel dan model Class sudah tersinkron!');
}).catch((err) => {
    console.log('Error saat sinkronisasi Classes:', err);
});

FruitClasses.sync({ force: false }).then(() => {
    console.log('Tabel dan model FruitClasses sudah tersinkron!');
}).catch((err) => {
    console.log('Error saat sinkronisasi FruitClasses:', err);
});

fruit.belongsToMany(Classes, { through: FruitClasses, foreignKey: 'id_fruit' });
Classes.belongsToMany(fruit, { through: FruitClasses, foreignKey: 'id_classes' });

module.exports = {User, fruit, Classes, FruitClasses};
