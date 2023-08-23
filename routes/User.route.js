const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {users}=require("../models")
const userroute = express.Router();

userroute.post('/adduser', async(req, res) => {
    const { username, email, password } = req.body;
  
    try {
      // Hash the password
      bcrypt.hash(password, 5, async (err, secure_password) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            isError: true,
            error: 'Error hashing password',
          });
        } else {
          try {
            const data = await users.create({ username, email, password: secure_password });
            return res.status(201).json({
              isError: false,
              data,
            });
          } catch (error) {
            console.error(error);
            return res.status(500).json({
              isError: true,
              error,
            });
          }
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        isError: true,
        error,
      });
    }
});

userroute.post('/loginuser', async(req, res) => {
    const { email, password } = req.body;
    try {
      const user = await users.findOne({ where: { email } });
  
      if (!user) {
        res.status(401).json({
          isError: true,
          message: 'Invalid credentials',
        });
        return;
      }
  
      bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
          res.status(401).json({
            isError: true,
            message: 'Invalid credentials',
          });
        } else {
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                'masai',
               
              );
          res.status(200).json({
            isError: false,
            message: 'Login successful',
            user: user,
            token
          });
        }
      });
    } catch (error) {
      res.status(400).json({
        isError: true,
        error,
      });
    }
});

userroute.get('/getusers', async (req, res) => {
   
   try {
     const data = await users.findAll();
     res.status(200).json({
       isError: false,
       data,
     });
   } catch (error) {
    console.log(error)
     res.status(500).json({
       isError: true,
       error,
     });
   }
  });

module.exports={
    userroute
}