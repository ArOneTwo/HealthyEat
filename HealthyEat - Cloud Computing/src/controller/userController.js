const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel.js');
const mysql = require('mysql2');
const sequelize = require('../config/database.js');

// Register
const register = async (req, res) => {
  const { name, email, password } = req.body;


  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Semua field harus diisi' });
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: 'Email sudah terdaftar' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword
  });

  try {
    const query = `INSERT INTO \`test-register2s\` (name, email, password) VALUES (?, ?, ?)`;
    const values = [name, email, hashedPassword];

    sequelize.query(query, { replacements: values, type: sequelize.QueryTypes.INSERT })
      .then(result => {
        return res.status(201).json({ message: 'Registrasi berhasil' });
      })
      .catch(error => {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan saat registrasi' });
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Terjadi kesalahan saat melakukan registrasi' });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Semua field harus diisi' });
  }

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
};


module.exports = {
  register,
  login,
};
