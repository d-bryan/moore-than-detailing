'use strict';

// load modules
require('dotenv').config();
const express = require('express');
const router = express.Router();
const MW = require('../middleware');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
// Sequelize models
const Admin = require('../models').Admin;

// ADMIN ROUTES
// GET /api/admins (200) - returns currently authenticated admin
router.get('/admins', MW.authenticateAdmin, MW.asyncHandler(async(req, res) => {
  const admin = req.currentAdmin;

  await res.status(200).json({
    id: admin.id,
    firstName: admin.firstName,
    lastName: admin.lastName,
    email: admin.emailAddress
  });
}));

// POST /api/admins (201) - creates a new admin, adds the data to the database and returns the location header to "/" with no content
router.post('/admins', MW.authenticateAdmin, MW.createAdminCheck, MW.asyncHandler(async(req, res) => {
  const admin = req.currentAdmin;

  // if there is an admin currently logged in then allow the creation of a new admin
  if (admin) {

    try {
      
      // GET the new admin information from the request body
      const reg = /^[A-Za-z0-9!$#]{8,20}$/;
      const newAdmin = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        // map over the errors to get a list of error messages
        const errorMessages = errors.array().map(error => error.msg);

        res.status(400).json({ errors: errorMessages });
      } else {

        // if the password does not match the regex pattern
        if (reg.test(newAdmin.password) !== true) {    
          // return with a status (400) - let the user know what password requirements are
          res.status(400).json({ errors: "Please enter a password between 8 and 20 characters. The only special characters allowed are: ! $ # " });

        } else {

          // if passwords do not match
          if (newAdmin.password !== newAdmin.confirmPassword) {      
            // return with a status (400) - let user know passwords do not match
            res.status(400).json({ errors: "Passwords do not match" });
          } else {      

            // hash the new admins passwords
            newAdmin.password = bcrypt.hashSync(newAdmin.password, 10);
            newAdmin.confirmPassword = bcrypt.hashSync(newAdmin.confirmPassword, 10);

            // add the new admin to the database
            await Admin.create({
              firstName: newAdmin.firstName,
              lastName: newAdmin.lastName,
              emailAddress: newAdmin.emailAddress,
              password: newAdmin.password,
              confirmPassword: newAdmin.confirmPassword,
            });

            // set the location header to '/'
            res.location('/');

            // send the status of (201) - for the newly created admin
            res.status(201).end();          

          }
        }
      }
    } catch (err) {
      // catch the sequelize unique email error
      if (err.name === "SequelizeUniqueConstraintError") {
        // send error status of (400) - bad request back to client
        res.status(400).json({ 
          errors: [ 
            `Username must be unique, please enter another "email address" (${err.errors[0].instance.emailAddress}) is already taken.`
          ]
        });
      } else {    
        // send a (500) - status error
        console.log(err);
        res.status(500).send(err);
      }
    }
  } else {
    // else send a (401) - Unauthorize status code back telling the user that an admin must be logged in to create another administrative user
    res.status(401).json({ message: "Unauthorized, you must first be logged in to create an administrative user" });
  }
}));

module.exports = router;