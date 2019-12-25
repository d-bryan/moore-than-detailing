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

// PRICING ROUTES
// TESTED - YES
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

// TESTED - YES
// GET - /api/pricing/:id (200) - returns the list item (including the admin that owns the list item)
router.get('/pricing/:id', MW.authenticateAdmin, MW.asyncHandler(async(req, res) => {
  const currentAdmin = req.currentAdmin;
  const priceListItem = await Pricing.findOne({
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

      if (priceListItem === null) {
        // if the list item does not exist return (404) - let the user know it could not be located
        res.status(404).json({ errors: "Sorry the package item you are looking for could not be found" });
      } else {
        // return (200) - with the package list item to the currently logged in admin
        res.status(200).json(priceListItem);
      }
  
    } else {
      // return (401) - unauthorized to the user letting them know they must log in first
      res.status(401).json({ errors: "Please log in to view protected resources" });
    }

}));

// TESTED - YES
// POST - /api/pricing (201) - creates a new list item, sets the location header for the list item and returns no content to the user
router.post('/pricing', MW.authenticateAdmin, MW.checkPricing, MW.asyncHandler(async(req, res, next) => {
  const currentAdmin = req.currentAdmin;
  const errors = validationResult(req);
  const errorMessages = errors.array().map(error => error.msg);
  const createPricing = await Pricing.create(req.body);

  if (currentAdmin) {

    try {
      // if there are validation errors
      if (!errors.isEmpty()) {
        // send (400) - status back to user letting them know it was a bad request
        res.status(400).json({ errors: errorMessages });
      } else {
        // add the package to the database
        createPricing;

        // set the location header for the URI
        res.location(`/pricing/${createPricing.id}`);

        // send a (201) - status for newly created pricing item
        res.status(201).end();
      }
    } catch (err) {
      console.error("Error posting new pricing item to the database: ", err);
      next(err);
    }

  } else {
    // return (401) - unauthorized to the user letting them know they must log in first
    res.status(401).json({ errors: "Please log in to view protected resources" });    
  }

}));

// TESTED - YES
// PUT - /api/pricing/:id (204) - Updates a list item and returns no content
router.put('/pricing/:id', MW.authenticateAdmin, MW.checkPricing, MW.asyncHandler(async(req, res, next) => {
  const currentAdmin = req.currentAdmin;
  const priceListItem = await Pricing.findByPk(req.params.id);
  const request = req.body;
  const errors = validationResult(req);
  const errorMessages = errors.array().map(error => error.msg);

  if (currentAdmin) {
    try {
      // if the current admin is the owner of the item
      if (currentAdmin.id === priceListItem.adminId) {
        // if all the required information is present to update
        if (
          request.vehicleSize !== null && 
          request.fullDetailPlus !== null && 
          request.fullDetail !== null &&
          request.interiorDetail !== null &&
          request.theBlitz !== null &&
          request.exteriorDetail !== null &&
          request.basicWash !== null
          ) {
          // if the price list item does not exist send (404) - status code back to user
          if (priceListItem === null) {
            res.status(404).json({errors: "The pricing item you are looking for could not be found"});
          } else {
            // update the price list item with the requested data
            await priceListItem.update(request);
            
            res.status(204).end();
          }
        } else {
          // there is missing information for the update send (400) status code back to user
          if (!errors.isEmpty()){
            res.status(400).json({ errors: errorMessages})
          }
        }
      } else {
        // if user does not own the course send (403) - status code back for unauthorized
        res.status(403).json({
          errors: `The user administrator ${currentAdmin.firstName}, ${currentAdmin.lastName.slice(0,1)} that you are logged is as is not the owner of this information.`
        });
      }
    } catch (err) {
      console.error("Error updating the price list item in the database: ", err);
      next(err);
    }
  } else {
    // return (401) - unauthorized to the user letting them know they must log in first
    res.status(401).json({ errors: "Please log in to view protected resources" });    
  }  

}));

// TESTED - YES
// DELETE - /api/pricing/:id (204) - Deletes a list item and returns no content
router.delete('/pricing/:id', MW.authenticateAdmin, MW.asyncHandler(async(req, res, next) => {
  const currentAdmin = req.currentAdmin;
  const priceListItem = await Pricing.findByPk(req.params.id);

  if (currentAdmin) {
    try {
      // if the price list item exists
      if (priceListItem !== null) {
        // if the price list item adminId === current Admin Id
        if (currentAdmin.id === priceListItem.adminId) {
          // DELETE the price list item and end the cycle
          await priceListItem.destroy();
          res.status(204).end();
        } else {
          // the current admin is not authorized to delete pricing item send (403) - status to client
          res.status(403).json({
            errors: `The user administrator ${currentAdmin.firstName}, ${currentAdmin.lastName.slice(0,1)} that you are logged is as is not the owner of this information.`
          });
        }
      } else {
        // if the price list item does not exist send (404) - status back to client
        res.status(404).json({  errors: "The price list item your are looking for could not be found" });
      }
    } catch (err) {
      console.error("Error deleting the price list item in the database: ", err);
      next(err);      
    }
  } else {
    // return (401) - unauthorized to the user letting them know they must log in first
    res.status(401).json({ errors: "Please log in to view protected resources" });    
  }

}));

module.exports = router;