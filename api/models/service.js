'use strict';

const Sequelize = require('sequelize');

// Create the Pricing Model
module.exports = ( sequelize ) => {
  class Service extends Sequelize.Model{}

  Service.init({
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
    serviceName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Sevice Name cannot be empty"
        },
        notNull: {
          msg: "Service Name is required"
        },
      },
    },
    price: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Price cannot be empty"
        },
        notNull: {
          msg: "Price is required"
        },
      },
    },
  }, { sequelize });

  // associate the pricing with admin
  Service.associate = ( models ) => {
    Service.belongsTo(models.Admin, {
      foreignKey: {
        fieldName: 'adminId',
        allowNull: false,
      }
    });
  };

  return Service;
}