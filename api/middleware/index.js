'use strict';
// module imports
const bcrypt = require('bcryptjs');
const auth = require('basic-auth');
const { check } = require('express-validator');
// other imports
const Admin = require('../models').Admin;

// const sequelizeErrors = (e) => {
//   const error = e.array().map(err => err.errors.message);
//   return error;
// };

/**
 * Asyncronous callback function to pass as middleware
 * @param {Callback} cb - request, response, next try catch 
 */
function asyncHandler(cb) {
  return async(req, res, next) => {
      try {
        await cb(req, res, next);
      } catch (err) {
        if (err.name === "SequelizeValidationError") {
          // send (400) - status back to client
          // const error = err.map(err => err.errors.message);
          console.error(err);
          res.status(400).json({ errors: err.errors.map(e => e.message) });
        } else {
          console.error(err);
          res.status(500).send(err);
      }
    } 
  }
}

/**
 * Function to authenticate Admin login
 * @param {Request} req - request object
 * @param {Response} res - response object
 * @param {Next Middleware} next - next function
 */
const authenticateAdmin = async(req, res, next) => {
  let message = null;

  // parse the admin credentials
  const credentials = auth(req);

  // if the admins credentials are available, attempt to get the admin by username
  if (credentials) {
    const admin = await Admin.findOne({
      where: {
        emailAddress: credentials.name,
      }
    });

    // If an Admin was successfully retrieved from the database
    if (admin) {
      // Compare the entered password with the stored hashed password
      const authenticated = bcrypt.compareSync(credentials.pass, admin.password);

      // If the passwords match
      if (authenticated) {
        console.log(`Authentication successful for username: ${admin.emailAddress}`);

        // Store the retrieved user object so that future middleware functions can access it
        req.currentAdmin = admin;
      } else {
        message = `Authentication failure for username: ${admin.emailAddress}`;
      }
    } else {
      message = `Admin not found for ${credentials.name}`
    }
  } else {
    message = `Please log in to view protected resources`;
  }

  if (message) {
    console.warn(message);

    // Return with a status of 401 unauthorized
    res.status(401).json({ errors: message });
  } else {
    next();
  }

};

const createAdminCheck = [
  check('firstName')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Please provide a value for first name"),
  check('lastName')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Please provide a value for last name"),
  check('emailAddress')
    .exists({ checkNull: true, checkFalsy: true })
    .isEmail()
    .withMessage("Please enter a valid email address"),
  check('password')
    .exists({ checkNull: true, checkFalsy: true })
    .isLength({ min: 8, max: 20 })
    .withMessage("Please enter a password between 8 and 20 characters. The only special characters allowed are: ! $ # "),
  check('confirmPassword')
    .exists({ checkNull: true, checkFalsy: true })
    .isLength({ min: 8, max: 20 })
    .withMessage("Please enter a password between 8 and 20 characters. The only special characters allowed are: ! $ # "),
];

const packageCheck = [
  check('title')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Please provide a value for Title"),
  check('description')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Please provide a value for Description"),
  check('estimatedTime')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Please provide a value for Estimated Time"),
  check('adminId')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Please provide a value for Admin ID"),
];

const checkPricing = [
  check('vehicleSize')
    .exists({ checkNull: true, checkFalsy: true })
    .isString()
    .withMessage("Please provide a value for vehicle size"),
  check('fullDetailPlus')
    .exists({ checkNull: true, checkFalsy: true })
    .isInt()
    .withMessage("Please provide a numeric value for Full Detail Plus"),
  check('fullDetail')
    .exists({ checkFalsy: true, checkNull: true })
    .isInt()
    .withMessage("Please provide a numeric value for Full Detail"),
  check('interiorDetail')
    .exists({ checkNull: true, checkFalsy: true })
    .isInt()
    .withMessage("Please provide a numeric value for Interior Detail"),
  check('theBlitz')
    .exists({ checkNull: true, checkFalsy: true })
    .isInt()
    .withMessage("Please provide a numeric value for The Blitz"),
  check('exteriorDetail')
    .exists({ checkNull: true, checkFalsy: true })
    .isInt()
    .withMessage("Please provide a numeric value for Exterior Detail"),
  check('basicWash')
    .exists({ checkNull: true, checkFalsy: true })
    .isInt()
    .withMessage("Please provide a numeric value for Basic Wash"),    
  check('adminId')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Please provide a value for Admin ID"),
];

const checkReviews = [
  check('customerFirstName')
    .exists({ checkNull: true, checkFalsy: true })
    .isString()
    .withMessage("Please provide a value for customer first name"),
  check('customerLastName')
    .exists({ checkNull: true, checkFalsy: true })
    .isString()
    .withMessage("Please provide a value for customer last name"),
  check('customerReview')
    .exists({ checkNull: true, checkFalsy: true })
    .isString()
    .withMessage("Please provide a value for customer review"),
  check('customerRating')
    .exists({ checkNull: true, checkFalsy: true })
    .isInt()
    .withMessage("Please provide a numeric value for customer rating"),   
  check('adminId')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Please provide a value for Admin ID"),  
];

const checkServices = [
  check('serviceName')
    .exists({ checkNull: true, checkFalsy: true })
    .isString()
    .withMessage("Please provide a value for Service Name"),
  check('price')
    .exists({ checkNull: true, checkFalsy: true })
    .isString()
    .withMessage("Please provide a value for Price"),  
  check('adminId')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Please provide a value for Admin ID"),   
];

const checkGallery = [
  check('vehicleType')
    .exists({ checkNull: true, checkFalsy: true })
    .isString()
    .withMessage("Please provide a value for Vehicle Type"),
  check('imageLocation')
    .exists({ checkNull: true, checkFalsy: true })
    .isString()
    .withMessage("Please provide a value for Image Location"),
  check('adminId')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Please provide a value for Admin ID"),    
];


module.exports = {
  asyncHandler,
  createAdminCheck,
  authenticateAdmin,
  packageCheck,
  checkPricing,
  checkReviews,
  checkServices,
  checkGallery,
}