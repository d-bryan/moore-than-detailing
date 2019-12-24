'use strict';

const Sequelize = require('sequelize');

// Create the Pricing Model
module.exports = ( sequelize ) => {
  class Gallery extends Sequelize.Model{}

  Gallery.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    adminId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      foreignKey: true,
    },
    vehicleType: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Vehicle type cannot be empty",
        },
        notNull: {
          msg: "Vehicle Type is required"
        },
      }
    },
    imageLocation: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Image Location cannot be empty",
        },
        notNull: {
          msg: "Image Location is required"
        },
      },
    },
  }, { modelName: 'Gallery', tableName: 'Gallery', sequelize });

  // associate the pricing with admin
  Gallery.associate = ( models ) => {
    Gallery.belongsTo(models.Admin, {
      foreignKey: {
        fieldName: 'adminId',
        allowNull: false,
      }
    });
  };

  return Gallery;
}