'use strict';

// load modules
require('dotenv').config();
const express = require('express');
const router = express.Router();
const MW = require('../middleware');
const { validationResult } = require('express-validator');
// import sequelize models
const Admin = require('../models').Admin;
const Package = require('../models').Package;

// PACKAGE ROUTES
// TESTED - YES
// GET - /api/packages (200) - Returns a list of packages (including the admin that owns the package)
router.get('/packages', MW.asyncHandler(async(req, res) => {
  const packages = await Package.findAll({
    attributes: ['id', 'adminId', 'title', 'description', 'estimatedTime'],
    include: [{
      model: Admin,
      attributes: ['id', 'firstName', 'lastName', 'emailAddress']
    }]
  });

  // return (200) - with the package list to the currently logged in admin
  res.status(200).json(packages);

}));

// TESTED - YES
// GET - /api/packages/:id (200) - returns the package (including the admin that owns the package)
router.get('/packages/:id', MW.asyncHandler(async(req, res) => {
  const pkg = await Package.findOne({
    attributes: ['id', 'adminId', 'title', 'description', 'estimatedTime'],
    where: {
      id: req.params.id
    },
    include: [{
      model: Admin,
      attributes: ['id', 'firstName', 'lastName', 'emailAddress']
    }]
  });

    if (pkg === null) {
      // if the package does not exist return (404) - let the user know it could not be located
      res.status(404).json({ errors: ["Sorry the package you are looking for could not be found"] });
    } else {
      // return (200) - with the package list to the currently logged in admin
      res.status(200).json(pkg);
    }
}));

// TESTED - YES
// POST - /api/packages (201) - creates a new package, sets the location header for the package and returns no content to the user
router.post('/packages', MW.authenticateAdmin, MW.packageCheck, MW.asyncHandler(async(req, res, next) => {
  const currentAdmin = req.currentAdmin;
  const errors = validationResult(req);
  const errorMessages = errors.array().map(error => error.msg);
  const createPackage = await Package.create(req.body);

  if (currentAdmin) {

    try {
      // if there are validation errors
      if (!errors.isEmpty()) {
        // send (400) - status back to user letting them know it was a bad request
        res.status(400).json({ errors: errorMessages });
      } else {
        // add the package to the database
        createPackage;

        // set the location header for the URI
        res.location(`/packages/${createPackage.id}`);

        // send a (201) - status for newly created package
        res.status(201).end();
      }
    } catch (err) {
      console.error("Error posting new package to the database: ", err);
      next(err);
    }

  } else {
    // return (401) - unauthorized to the user letting them know they must log in first
    res.status(401).json({ errors: ["Please log in to view protected resources"] });    
  }
}));

// TESTED - YES
// PUT - /api/packages/:id (204) - Updates a package and returns no content
router.put('/packages/:id', MW.authenticateAdmin, MW.packageCheck, MW.asyncHandler(async(req, res, next) => {
  const currentAdmin = req.currentAdmin;
  const pkg = await Package.findByPk(req.params.id);
  const request = req.body;
  const errors = validationResult(req);
  const errorMessages = errors.array().map(error => error.msg);

  if (currentAdmin) {
    try {
      
      if (pkg !== null) {

        if (!errors.isEmpty()) {
          // there is missing information for the update send (400) status code back to user
          res.status(400).json({ errors: errorMessages });
        } else {
           // if all the required information is present to update
          if (request.title !== null && 
            request.description !== null && 
            request.estimatedTime !== null) {
              // update the package with the requested data
              await pkg.update(request);
              
              res.status(204).end();
          } else {
            res.status(400).json({ errors: ['Please ensure all fields are updated'] });
          }

        }

      } else {
        // if the package does not exist send (404) - status code back to user
        res.status(404).json({ errors: ["The package you are looking for could not be found"] });
      }
      
    } catch (err) {
      console.error("Error updating the package in the database: ", err);
      next(err);
    }
  } else {
    // return (401) - unauthorized to the user letting them know they must log in first
    res.status(401).json({ errors: ["Please log in to view protected resources"] });    
  }
}));

// TESTED - YES
// DELETE - /api/packages/:id (204) - Deletes a package and returns no content
router.delete('/packages/:id', MW.authenticateAdmin, MW.asyncHandler(async(req, res, next) => {
  const currentAdmin = req.currentAdmin;
  const pkg = await Package.findByPk(req.params.id);

  if (currentAdmin) {
    try {
      // if the package exists
      if (pkg !== null) {
        // DELETE the package and end the cycle
        await pkg.destroy();
        res.status(204).end();
        
      } else {
        // if the package does not exist send (404) - status back to client
        res.status(404).json({  errors: "The package your are looking for could not be found" });
      }
    } catch (err) {
      console.error("Error deleting the package in the database: ", err);
      next(err);      
    }
  } else {
    // return (401) - unauthorized to the user letting them know they must log in first
    res.status(401).json({ errors: "Please log in to view protected resources" });    
  }
}));

module.exports = router;