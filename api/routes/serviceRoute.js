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
router.get('/services', MW.asyncHandler(async(req, res) => {
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

    // return (200) - with the service list to the currently logged in admin
    res.status(200).json(serviceList);

}));

// TESTED - YES
// GET - /api/services/:id (200) - returns the service item (including the admin that owns the service)
router.get('/services/:id', MW.asyncHandler(async(req, res) => {
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


    // if the service item does not exist
    if (serviceListItem === null) {
      res.status(404).json({errors: "The service item you are looking for could not be found"});
    } else {
      // return (200) - with the service list item to the currently logged in admin
      res.status(200).json(serviceListItem);
    }

}));

// TESTED - YES
// POST - /api/services (201) - creates a new service item, sets the location header for the service item and returns no content to the user
router.post('/services', MW.authenticateAdmin, MW.checkServices, MW.asyncHandler(async(req, res, next) => {
  const currentAdmin = req.currentAdmin;
  const errors = validationResult(req);
  const errorMessages = errors.array().map(error => error.msg);
  const createService = await Service.create(req.body);

    // if an admin is signed in
    if (currentAdmin) {
      try {
        
        // if there are validation errors
        if (!errors.isEmpty()) {
          // send (400) - status back to user letting them know it was a bad request
          res.status(400).json({ errors: errorMessages });
        } else {
          // add the service to the database
          createService;

          // set the location header for the URI
          res.location(`/services/${createService.id}`);

          // send a (201) - status for newly created review item
          res.status(201).end();        
        }

      } catch (err) {
        console.error("Error posting new service item to the database: ", err);
        next(err);
      }

    } else {
      // return (401) - unauthorized to the user letting them know they must log in first
      res.status(401).json({ errors: "Please log in to view protected resources" });
    }

}));

// TESTED - YES
// PUT - /api/services/:id (204) - Updates a service item and returns no content
router.put('/services/:id', MW.authenticateAdmin, MW.checkServices, MW.asyncHandler(async(req, res, next) => {
  const currentAdmin = req.currentAdmin;
  const serviceListItem = await Service.findByPk(req.params.id);
  const request = req.body;
  const errors = validationResult(req);
  const errorMessages = errors.array().map(error => error.msg);

    // if an admin is signed in
    if (currentAdmin) {  
      try {

        if (serviceListItem !== null) {

          // there is missing information for the update send (400) status code back to user
          if (!errors.isEmpty()){          
            res.status(400).json({ errors: errorMessages})
          } else {

            // if all the required information is present to update
            if (
              request.serviceName !== null && 
              request.pricing !== null
              ) {
                // update the service list item with the requested data
                await serviceListItem.update(request);
                res.status(204).end();
              } else {
                res.status(400).json({ errors: ['Please ensure all fields are updated'] });
              }

          }

        } else {
          // if the service list item does not exist send (404) - status code back to user
          res.status(404).json({errors: ["The service item you are looking for could not be found"]});
        }

      } catch (err) {    
        console.error("Error updating the service list item in the database: ", err);
        next(err);
      }
    } else {
      // return (401) - unauthorized to the user letting them know they must log in first
      res.status(401).json({ errors: "Please log in to view protected resources" });
    }


}));

// TESTED - NO
// DELETE - /api/services/:id (204) - Deletes a service item and returns no content
router.delete('/services/:id', MW.authenticateAdmin, MW.asyncHandler(async(req, res, next) => {
  const currentAdmin = req.currentAdmin;
  const serviceListItem = await Service.findByPk(req.params.id);

  // if an admin is signed in
  if (currentAdmin) {
    
    try {
      // if the review list item exists
      if (serviceListItem !== null) {
        // if the review list item adminId === current Admin Id
        if (currentAdmin.id === serviceListItem.adminId) {
          // DELETE the review list item and end the cycle
          await serviceListItem.destroy();
          res.status(204).end();
        } else {
          // the current admin is not authorized to delete review send (403) - status to client
          res.status(403).json({
            errors: `The user administrator ${currentAdmin.firstName}, ${currentAdmin.lastName.slice(0,1)} that you are logged is as is not the owner of this information.`
          });
        }
      } else {
        // if the service list item does not exist send (404) - status back to client
        res.status(404).json({  errors: "The service list item your are looking for could not be found" });
      }
    } catch (err) {
      console.error("Error deleting the service list item in the database: ", err);
      next(err);      
    }      

  } else {
    // return (401) - unauthorized to the user letting them know they must log in first
    res.status(401).json({ errors: "Please log in to view protected resources" });
  }

}));

module.exports = router;