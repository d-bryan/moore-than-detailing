'use strict';

// load modules
require('dotenv').config();
const express = require('express');
const router = express.Router();
const fs = require('fs');
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
router.get('/gallery', MW.asyncHandler(async(req, res) => {
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

  // return (200) - with the image list
  res.status(200).json(galleryList);

}));

// TESTED - YES
// GET - /api/gallery/:id (200) - returns the image item (including the admin that owns the image)
router.get('/gallery/:id', MW.asyncHandler(async(req, res) => {
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

    // if the image item does not exist
    if (galleryListItem === null) {
      res.status(404).json({errors: "The image item you are looking for could not be found"});
    } else {
      // return (200) - with the image list item to the currently logged in admin
      res.status(200).json(galleryListItem);
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
  const imageLocation = await galleryListItem.dataValues.imageLocation;

  // if an admin is signed in
  if (currentAdmin) {
    
    try {
      // if the image list item exists
      if (galleryListItem !== null) {
        // if the image list item adminId === current Admin Id
        if (currentAdmin.id === galleryListItem.adminId) {
          // DELETE the image list item and end the cycle
          await galleryListItem.destroy();

          // DELETE the image from the uploads folder
          fs.unlink(await imageLocation, (err) => {
            if (err) {
              throw new Error("There was an issue when attempting to delete the image from the uploads folder.", err);
            } else {
              console.log(`Sucessfully deleted ${imageLocation} from the uploads folder.`);
            }
          });

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

// Gallery {
//   dataValues: {
//     id: 8,
//     adminId: 1,
//     vehicleType: 'Coupe',
//     imageLocation: 'uploads/2019-12-25T18:05:20.039Z-Coupe-368.jpg',
//     createdAt: 2019-12-25T18:05:20.047Z,
//     updatedAt: 2019-12-25T18:05:20.047Z
//   },
//   _previousDataValues: {
//     id: 8,
//     adminId: 1,
//     vehicleType: 'Coupe',
//     imageLocation: 'uploads/2019-12-25T18:05:20.039Z-Coupe-368.jpg',
//     createdAt: 2019-12-25T18:05:20.047Z,
//     updatedAt: 2019-12-25T18:05:20.047Z
//   },
//   _changed: {},
//   _modelOptions: {
//     timestamps: true,
//     validate: {},
//     freezeTableName: false,
//     underscored: false,
//     paranoid: false,
//     rejectOnEmpty: false,
//     whereCollection: { id: '8' },
//     schema: null,
//     schemaDelimiter: '',
//     defaultScope: {},
//     scopes: {},
//     indexes: [],
//     name: { plural: 'Galleries', singular: 'Gallery' },
//     omitNull: false,
//     tableName: 'Gallery',
//     sequelize: Sequelize {
//       options: [Object],
//       config: [Object],
//       dialect: [SqliteDialect],
//       queryInterface: [QueryInterface],
//       models: [Object],
//       modelManager: [ModelManager],
//       connectionManager: [ConnectionManager],
//       importCache: [Object]
//     },
//     hooks: {}
//   },
//   _options: {
//     isNewRecord: false,
//     _schema: null,
//     _schemaDelimiter: '',
//     raw: true,
//     attributes: [
//       'id',
//       'adminId',
//       'vehicleType',
//       'imageLocation',
//       'createdAt',
//       'updatedAt'
//     ]
//   },
//   isNewRecord: false
// }


module.exports = router;