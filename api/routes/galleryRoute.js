'use strict';

// load modules
require('dotenv').config();
const express = require('express');
const router = express.Router();
const MW = require('../middleware');
// multer for saving images
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + '-' + req.body.vehicleType + '-' + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  // only allow jpeg and png image types
  if (file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg') {
        // store the file
        cb(null, true);
      } else {
        // reject the file
        cb( new Error('The file type must follow these guidelines: JPEG, PNG or JPG and be less than 5 MGB'), 
          false)
      }
};
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});
// import sequelize models
const Admin = require('../models').Admin;
const Gallery = require('../models').Gallery;

// GALLERY ROUTES
// TESTED - YES
// GET - /api/gallery (200) - Returns a list of images (including the admin that owns the image)
router.get('/gallery', MW.authenticateAdmin, MW.asyncHandler(async(req, res) => {
  const currentAdmin = req.currentAdmin;
  const galleryList = await Gallery.findAll({
    attributes: [
      'id', 
      'adminId', 
      'vehicleType', 
      'imageLocation'
    ],
    include: [{
      model: Admin,
      attributes: ['id', 'firstName', 'lastName', 'emailAddress']
    }]
  });

    // if an admin is signed in
    if (currentAdmin) {
      // return (200) - with the image list to the currently logged in admin
      res.status(200).json(galleryList);
    } else {
      // return (401) - unauthorized to the user letting them know they must log in first
      res.status(401).json({ errors: "Please log in to view protected resources" });
    }

}));

// TESTED - YES
// GET - /api/gallery/:id (200) - returns the image item (including the admin that owns the image)
router.get('/gallery/:id', MW.authenticateAdmin, MW.asyncHandler(async(req, res) => {
  const currentAdmin = req.currentAdmin;
  const galleryListItem = await Gallery.findOne({
    attributes: [
      'id', 
      'adminId', 
      'vehicleType', 
      'imageLocation'
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
      // if the image item does not exist
      if (galleryListItem === null) {
        res.status(404).json({errors: "The image item you are looking for could not be found"});
      } else {
        // return (200) - with the image list item to the currently logged in admin
        res.status(200).json(galleryListItem);
      }
    } else {
      // return (401) - unauthorized to the user letting them know they must log in first
      res.status(401).json({ errors: "Please log in to view protected resources" });
    }

}));

// TESTED - YES
// POST - /api/gallery (201) - creates a new image item, sets the location header for the image item and returns no content to the user
router.post('/gallery', MW.authenticateAdmin, upload.single('imageLocation'), MW.asyncHandler(async(req, res, next) => {
  const currentAdmin = req.currentAdmin;
  const createGalleryItem = await Gallery.create({
    adminId: req.currentAdmin.id,
    vehicleType: req.body.vehicleType,
    imageLocation: req.file.path
  });

    // if an admin is signed in
    if (currentAdmin) {
      try {
        // add the image to the database
        await createGalleryItem;

        // set the location header for the URI
        await res.location(`/gallery/${createGalleryItem.id}`);

        // send a (201) - status for newly created image item
        await res.status(201).end();

      } catch (err) {
        console.error("Error posting new image item to the database: ", err);
        next(err);
      }

    } else {
      // return (401) - unauthorized to the user letting them know they must log in first
      res.status(401).json({ errors: "Please log in to view protected resources" });
    }

}));

// TESTED - YES
// DELETE - /api/gallery/:id (204) - Deletes a image item and returns no content
router.delete('/gallery/:id', MW.authenticateAdmin, MW.asyncHandler(async(req, res, next) => {
  const currentAdmin = req.currentAdmin;
  const galleryListItem = await Gallery.findByPk(req.params.id);

  // if an admin is signed in
  if (currentAdmin) {
    
    try {
      // if the image list item exists
      if (galleryListItem !== null) {
        // if the image list item adminId === current Admin Id
        if (currentAdmin.id === galleryListItem.adminId) {
          // DELETE the image list item and end the cycle
          await galleryListItem.destroy();
          await res.status(204).end();
        } else {
          // the current admin is not authorized to delete image send (403) - status to client
          res.status(403).json({
            errors: `The user administrator ${currentAdmin.firstName}, ${currentAdmin.lastName.slice(0,1)} that you are logged is as is not the owner of this information.`
          });
        }
      } else {
        // if the image list item does not exist send (404) - status back to client
        res.status(404).json({  errors: "The image list item your are looking for could not be found" });
      }
    } catch (err) {
      console.error("Error deleting the image list item in the database: ", err);
      next(err);      
    }      

  } else {
    // return (401) - unauthorized to the user letting them know they must log in first
    res.status(401).json({ errors: "Please log in to view protected resources" });
  }

}));


module.exports = router;