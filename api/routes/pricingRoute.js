'use strict';

// load modules
require('dotenv').config();
const express = require('express');
const router = express.Router();
const MW = require('../middleware');
const { validationResult } = require('express-validator');
// import sequelize models
const Admin = require('../models').Admin;
const Pricing = require('../models').Pricing;

// PACKAGE ROUTES
// TESTED - NO
// GET - /api/pricing (200) - Returns a list of pricing (including the admin that owns the list item)
router.get('/pricing', MW.authenticateAdmin, MW.asyncHandler(async(req, res) => {
  const currentAdmin = req.currentAdmin;
  const priceList = await Pricing.findAll({
    attributes: [
      'id', 
      'adminId', 
      'vehicleSize', 
      'fullDetailPlus', 
      'fullDetail',
      'interiorDetail',
      'theBlitz',
      'exteriorDetail',
      'basicWash'
    ],
    include: [{
      model: Admin,
      attributes: ['id', 'firstName', 'lastName', 'emailAddress']
    }]
  });

  // if an admin is signed in
  if (currentAdmin) {
    // return (200) - with the package list to the currently logged in admin
    res.status(200).json(priceList);
  } else {
    // return (401) - unauthorized to the user letting them know they must log in first
    res.status(401).json({ errors: "Please log in to view protected resources" });
  }


}));

// TESTED - NO
// GET - /api/pricing/:id (200) - returns the list item (including the admin that owns the list item)
router.get('/pricing/:id', MW.authenticateAdmin, MW.asyncHandler(async(req, res) => {
  const currentAdmin = req.currentAdmin;

}));

// TESTED - NO
// POST - /api/pricing (201) - creates a new list item, sets the location header for the list item and returns no content to the user
router.post('/pricing', MW.authenticateAdmin, MW.asyncHandler(async(req, res, next) => {
  const currentAdmin = req.currentAdmin;

}));

// TESTED - NO
// PUT - /api/pricing/:id (204) - Updates a list item and returns no content
router.put('/pricing/:id', MW.authenticateAdmin, MW.asyncHandler(async(req, res, next) => {
  const currentAdmin = req.currentAdmin;

}));

// TESTED - NO
// DELETE - /api/pricing/:id (204) - Deletes a list item and returns no content
router.delete('/pricing/:id', MW.authenticateAdmin, MW.asyncHandler(async(req, res, next) => {
  const currentAdmin = req.currentAdmin;

}));

module.exports = router;