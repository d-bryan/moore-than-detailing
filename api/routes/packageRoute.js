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
// GET - /api/packages (200) - Returns a list of packages (including the admin that owns the package)
router.get('/packages', MW.authenticateAdmin, MW.asyncHandler(async(req, res) => {

}));

// GET - /api/packages/:id (200) - returns the package (including the admin that owns the package)
router.get('/packages/:id', MW.authenticateAdmin, MW.asyncHandler(async(req, res) => {

}));

// POST - /api/packages (201) - creates a new package, sets the location header for the package and returns no content to the user
router.post('/packages', MW.authenticateAdmin, MW.asyncHandler(async(req, res) => {

}));

// PUT - /api/packages/:id (204) - Updates a package and returns no content
router.put('/packages/:id', MW.authenticateAdmin, MW.asyncHandler(async(req, res) => {

}));

// DELETE - /api/packages/:id (204) - Deletes a package and returns no content
router.delete('/packages/:id', MW.authenticateAdmin, MW.asyncHandler(async(req, res) => {
  
}));