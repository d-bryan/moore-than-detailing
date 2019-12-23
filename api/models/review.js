'use strict';

const Sequelize = require('sequelize');

// Create the Pricing Model
module.exports = ( sequelize ) => {
  class Review extends Sequelize.Model{}

  Review.init({
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
    customerFirstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Customer First name cannot be empty"
        },
        notNull: {
          msg: "Customer First name is required"
        },
      },
    },
    customerLastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Customer Last name cannot be empty"
        },
        notNull: {
          msg: "Customer Last name is required"
        },
      },
    },
    customerReview: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Customer Review cannot be empty"
        },
        notNull: {
          msg: "Customer Review is required"
        },
      },
    },
    customerRating: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Customer Rating cannot be empty"
        },
        notNull: {
          msg: "Customer Rating is required"
        },
        min: {
          args: 0,
          msg: "Customer Rating cannot be less than 0",
        },
        max: {
          args: 5,
          msg: "Customer Rating cannot be more than 5"
        },
      },
    },
  }, { sequelize });

  // associate the pricing with admin
  Review.associate = ( models ) => {
    Review.belongsTo(models.Admin, {
      foreignKey: {
        fieldName: 'adminId',
        allowNull: false,
      }
    });
  };

  return Review;
}