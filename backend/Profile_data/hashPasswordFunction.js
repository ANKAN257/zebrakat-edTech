// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Hash Password Function
async function hashPasswordFunction(password) {
    const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password
    return hashedPassword;
  }

  module.exports=hashPasswordFunction