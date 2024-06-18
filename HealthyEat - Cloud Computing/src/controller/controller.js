const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, fruit} = require('../model/userModel.js');
const mysql = require('mysql2');
const sequelize = require('../config/database.js');

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

module.exports = {
  register,
  login,
  userId,
  getFruitById,
  getFruit,
  addFruit,
  getFruitIncrease,
  getFruitDecrease,
};
