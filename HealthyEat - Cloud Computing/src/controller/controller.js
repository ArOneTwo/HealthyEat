const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, fruit, Classes, FruitClasses} = require('../model/model.js');
const mysql = require('mysql2');
const sequelize = require('../config/database.js');
const { Op } = require('sequelize');

// Register
const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Semua field harus diisi' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    return res.status(201).json({ message: 'Registrasi berhasil' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Terjadi kesalahan saat registrasi' });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Semua field harus diisi' });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Email atau password salah' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Email atau password salah' });
    }

    const token = jwt.sign({ userId: user._id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });

    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Terjadi kesalahan saat login' });
  }
};

//Dapatkan userID
const userId = async(req, res) => {
  const { id } = req.params;
  
  try{
    const user = await User.findByPk(id);

    if(!user){
      return res.status(404).json({ message: 'User tidak ditemukan'});
    }

    res.json(user);
  }catch(error){
    console.log(error);
    res.status(500).json( { message: 'Terjadi kesalahan saat mencari id'});
  }
}

//Dapatkan ID buah
const getFruitById = async (req, res) => {
  const { fruit_id } = req.params; 
  try {
    if (!fruit_id) {
      return res.status(400).json({ message: "Parameter fruit_id tidak ditemukan" });
    }

    const buahPilihan = await fruit.findOne({ where: { fruit_Id: fruit_id }, model: 'fruit-tests' });
    if (!buahPilihan) {
      return res.status(404).json({ message: "Buah tidak ditemukan" });
    }
    res.status(200).json(buahPilihan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//Dapatkan buah
const getFruit = async (req, res) => {
  try {
      const fruits = await fruit.findAll();
      res.status(200).json(fruits);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

//Add buah
const addFruit = async (req, res) => {
  const { buah, tujuan, urutan, deskripsi } = req.body;
  const query = 'INSERT INTO `fruit-tests`(`buah`, `tujuan`, `urutan`, `deskripsi`) VALUES (?, ?, ?, ?)';
  sequelize.query(query, { replacements: [buah, tujuan, urutan, deskripsi], type: sequelize.QueryTypes.INSERT })
      .then(() => {
          res.status(201).json({ message: 'Data buah berhasil disimpan' });
      })
      .catch((error) => {
          res.status(400).json({ message: error.message });
      });
}

//Tierlist untuk buah yang menaikkan berat badan
const getFruitIncrease = async (req, res) => {
  try {
    const fruits = await fruit.findAll({
      where: {
        tujuan: 'Menaikkan Berat Badan'
      },
      order: [['urutan', 'ASC']]
    });
    res.status(200).json(fruits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//Tierlist untuk buah yang menurunkan berat badan
const getFruitDecrease = async (req, res) => {
  try {
    const fruits = await fruit.findAll({
      where: {
        tujuan: 'Menurunkan Berat Badan'
      },
      order: [['urutan', 'ASC']]
    });
    res.status(200).json(fruits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//Tambah kelas buah
const findByClasses = async (req, res) => {
  try {
    const classes = await Classes.findAll({
      include: [
        {
          model: fruit,
          through: {
            model: FruitClasses
          },
          attributes: ['buah', 'tujuan', 'urutan', 'deskripsi']
        }
      ]
    });
    res.status(200).json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mencari kelas' });
  }
};

const addClasses = async (req, res) => {
  const classesArray = req.body.classes;

  if (!Array.isArray(classesArray) || classesArray.length === 0) {
    return res.status(400).json({ message: 'Data classes tidak valid' });
  }

  try {
    const addedClasses = [];
    const fruitNames = classesArray.map(className => className.toLowerCase());

    for (const className of fruitNames) {
      // Cari data buah berdasarkan nama buah yang diawali dengan kelas yang dimasukkan
      const fruitDataArray = await fruit.findAll({ where: { buah: { [Op.startsWith]: className } } });

      for (const fruitData of fruitDataArray) {
        const id_fruit = fruitData.fruit_Id;

        const newClass = await Classes.create({
          fruit_classes: fruitData.buah,
          id_fruit: id_fruit
        });

        // Create the relationship in the FruitClasses table
        await FruitClasses.create({
          id_fruit: id_fruit,
          id_classes: newClass.id_classes
        });

        addedClasses.push({
          id_classes: newClass.id_classes,
          fruit_classes: newClass.fruit_classes,
          id_fruit: newClass.id_fruit
        });
      }
    }

    if (addedClasses.length === 0) {
      return res.status(404).json({ message: 'Tidak ada kelas yang berhasil ditambahkan' });
    }

    res.status(201).json({ message: 'Classes berhasil ditambahkan', data: addedClasses });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menambahkan classes' });
  }
};

//Cari Kelas buah
const findByClasses = async (req, res) => {
  try {
    const classes = await Classes.findAll({
      include: [
        {
          model: fruit,
          through: {
            model: FruitClasses
          },
          attributes: ['buah', 'tujuan', 'urutan', 'deskripsi']
        }
      ]
    });
    res.status(200).json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mencari kelas' });
  }
};

module.exports = {
  register,
  login,
  userId,
  getFruitById,
  getFruit,
  addFruit,
  getFruitIncrease,
  getFruitDecrease,
  findByClasses,
  addClasses,
};
