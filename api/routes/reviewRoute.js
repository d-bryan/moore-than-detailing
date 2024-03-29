'use strict';

// load modules
require('dotenv').config();
const express = require('express');
const router = express.Router();
const MW = require('../middleware');
const { validationResult } = require('express-validator');
// import sequelize models
const Admin = require('../models').Admin;
const Review = require('../models').Review;

// REVIEW ROUTES
// TESTED - YES
// GET - /api/reviews (200) - Returns a list of reviews (including the admin that owns the review)
router.get('/reviews', MW.asyncHandler(async(req, res) => {
  const reviewList = await Review.findAll({
    attributes: [
      'id', 
      'adminId', 
      'customerFirstName', 
      'customerLastName', 
      'customerReview',
      'customerRating'
    ],
    include: [{
      model: Admin,
      attributes: ['id', 'firstName', 'lastName', 'emailAddress']
    }]
  });

    // return (200) - with the review list to the currently logged in admin
    res.status(200).json(reviewList);

}));

// TESTED - YES
// GET - /api/reviews/:id (200) - returns the review item (including the admin that owns the review)
router.get('/reviews/:id', MW.asyncHandler(async(req, res) => {
  const reviewListItem = await Review.findOne({
    attributes: [
      'id', 
      'adminId', 
      'customerFirstName', 
      'customerLastName', 
      'customerReview',
      'customerRating'
    ],
    where: {
      id: req.params.id,
    },
    include: [{
      model: Admin,
      attributes: ['id', 'firstName', 'lastName', 'emailAddress']
    }]
  });

    // if the review item does not exist
    if (reviewListItem === null) {
      res.status(404).json({errors: "The review item you are looking for could not be found"});
    } else {
      // return (200) - with the review list item to the currently logged in admin
      res.status(200).json(reviewListItem);
    }
    
}));

// TESTED - YES
// POST - /api/reviews (201) - creates a new review item, sets the location header for the review item and returns no content to the user
router.post('/reviews', MW.authenticateAdmin, MW.checkReviews, MW.asyncHandler(async(req, res, next) => {
  const currentAdmin = req.currentAdmin;
  const errors = validationResult(req);
  const errorMessages = errors.array().map(error => error.msg);
  const createReview = await Review.create(req.body);

    // if an admin is signed in
    if (currentAdmin) {
      try {

        // if there are validation errors
        if (!errors.isEmpty()) {
          // send (400) - status back to user letting them know it was a bad request
          res.status(400).json({ errors: errorMessages });
        } else {
          // add the review to the database
          createReview;

          // set the location header for the URI
          res.location(`/reviews/${createReview.id}`);

          // send a (201) - status for newly created review item
          res.status(201).end();        
        }

      } catch (err) {
        console.error("Error posting new review item to the database: ", err);
        next(err);
      }

    } else {
      // return (401) - unauthorized to the user letting them know they must log in first
      res.status(401).json({ errors: "Please log in to view protected resources" });
    }

}));

// TESTED - YES
// PUT - /api/reviews/:id (204) - Updates a review item and returns no content
router.put('/reviews/:id', MW.authenticateAdmin, MW.checkReviews, MW.asyncHandler(async(req, res, next) => {
  const currentAdmin = req.currentAdmin;
  const reviewListItem = await Review.findByPk(req.params.id);
  const request = req.body;
  const errors = validationResult(req);
  const errorMessages = errors.array().map(error => error.msg);

    // if an admin is signed in
    if (currentAdmin) {
      try {

        if (reviewListItem !== null) {
          // there is missing information for the update send (400) status code back to user
          if (!errors.isEmpty()) {
            res.status(400).json({ errors: errorMessages });
          } else {

            // if all the required information is present to update
            if (
              request.customerFirstName !== null  && 
              request.customerLastName !== null  && 
              request.customerReview !== null  &&
              request.customerRating !== null 
              ) {
                // update the review list item with the requested data
                await reviewListItem.update(request);
                
                res.status(204).end();

              } else {
                res.status(400).json({ errors: ['Please ensure all fields are updated'] });
              }

          }

        } else {
          // if the review list item does not exist send (404) - status code back to user
          res.status(404).json({errors: ["The review item you are looking for could not be found"]});
        }

      } catch (err) {
        console.error("Error updating the review list item in the database: ", err);
        next(err);
      }
    } else {
      // return (401) - unauthorized to the user letting them know they must log in first
      res.status(401).json({ errors: "Please log in to view protected resources" });
    }
}));

// TESTED - YES
// DELETE - /api/reviews/:id (204) - Deletes a review item and returns no content
router.delete('/reviews/:id', MW.authenticateAdmin, MW.asyncHandler(async(req, res, next) => {
  const currentAdmin = req.currentAdmin;
  const reviewListItem = await Review.findByPk(req.params.id);

    // if an admin is signed in
    if (currentAdmin) {
      
      try {
        // if the review list item exists
        if (reviewListItem !== null) {
          
          // DELETE the review list item and end the cycle
          await reviewListItem.destroy();
          res.status(204).end();
          
        } else {
          // if the price list item does not exist send (404) - status back to client
          res.status(404).json({  errors: "The review list item your are looking for could not be found" });
        }
      } catch (err) {
        console.error("Error deleting the review list item in the database: ", err);
        next(err);      
      }      

    } else {
      // return (401) - unauthorized to the user letting them know they must log in first
      res.status(401).json({ errors: "Please log in to view protected resources" });
    }
}));


module.exports = router;