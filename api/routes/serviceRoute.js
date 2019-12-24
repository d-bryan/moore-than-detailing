'use strict';

// load modules
require('dotenv').config();
const express = require('express');
const router = express.Router();
const MW = require('../middleware');
const { validationResult } = require('express-validator');
// import sequelize models
const Admin = require('../models').Admin;
const Service = require('../models').Service;

// SERVICE ROUTES
// TESTED - YES
// GET - /api/services (200) - Returns a list of services (including the admin that owns the service)
router.get('/services', MW.authenticateAdmin, MW.asyncHandler(async(req, res) => {
  const currentAdmin = req.currentAdmin;
  const serviceList = await Service.findAll({
    attributes: [
      'id', 
      'adminId', 
      'serviceName', 
      'price'
    ],
    include: [{
      model: Admin,
      attributes: ['id', 'firstName', 'lastName', 'emailAddress']
    }]
  });

    // if an admin is signed in
    if (currentAdmin) {
      // return (200) - with the service list to the currently logged in admin
      res.status(200).json(serviceList);
    } else {
      // return (401) - unauthorized to the user letting them know they must log in first
      res.status(401).json({ errors: "Please log in to view protected resources" });
    }

}));

// TESTED - YES
// GET - /api/services/:id (200) - returns the service item (including the admin that owns the service)
router.get('/services/:id', MW.authenticateAdmin, MW.asyncHandler(async(req, res) => {
  const currentAdmin = req.currentAdmin;
  const serviceListItem = await Service.findOne({
    attributes: [
      'id', 
      'adminId', 
      'serviceName', 
      'price'
    ],
    where: {
      id: req.params.id,
    },
    include: [{
      model: Admin,
      attributes: ['id', 'firstName', 'lastName', 'emailAddress']
    }]
  });

    // if an admin is signed in
    if (currentAdmin) {
      // if the service item does not exist
      if (serviceListItem === null) {
        res.status(404).json({errors: "The service item you are looking for could not be found"});
      } else {
        // return (200) - with the service list item to the currently logged in admin
        res.status(200).json(serviceListItem);
      }
    } else {
      // return (401) - unauthorized to the user letting them know they must log in first
      res.status(401).json({ errors: "Please log in to view protected resources" });
    }

}));

// TESTED - NO
// POST - /api/services (201) - creates a new service item, sets the location header for the service item and returns no content to the user
router.post('/services', MW.authenticateAdmin, MW.asyncHandler(async(req, res, next) => {
  const currentAdmin = req.currentAdmin;



}));

// TESTED - NO
// PUT - /api/services/:id (204) - Updates a service item and returns no content
router.put('/services/:id', MW.authenticateAdmin, MW.asyncHandler(async(req, res, next) => {
  const currentAdmin = req.currentAdmin;



}));

// TESTED - NO
// DELETE - /api/services/:id (204) - Deletes a service item and returns no content
router.delete('/services/:id', MW.authenticateAdmin, MW.asyncHandler(async(req, res, next) => {
  const currentAdmin = req.currentAdmin;



}));

module.exports = router;