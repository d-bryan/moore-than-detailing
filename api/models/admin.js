'use strict';

const Sequelize = require('sequelize');

// Create the Admin Model
module.exports = ( sequelize ) => {
  class Admin extends Sequelize.Model{}

  Admin.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "First Name is required"
        },
        notNull: {
          msg:  "First Name requires a value"
        }
      }
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Last Name is required"
        },
        notNull: {
          msg: "Last Name requires a value"
        },
      },
    },
    emailAddress: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Email address is required"
        },
        notNull: {
          msg: "Email address requires a value"
        },
        isEmail: {
          msg: "Must be a valid email address"
        },
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is required"
        },
        notNull: {
          msg: "Password requires a value"
        },
        min: {
          args: 8,
          msg: "Please enter a password that is at least 8 characters long"
        },
        max: {
          args: 20,
          msg: "Please ensure that your password is not longer than 20 characters long"
        },
      },
    },
    confirmPassword: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Confirm Password is required"
        },
        notNull: {
          msg: "Confirm Password requires a value"
        },
        min: {
          args: 8,
          msg: "Please enter a password that is at least 8 characters long"
        },
        max: {
          args: 20,
          msg: "Please ensure that your password is not longer than 20 characters long"
        },
      },
    }, 
  }, { sequelize });

  // Associate Id with other tables
  Admin.associate = ( models ) => {
    Admin.hasMany(models.Gallery, {
      foreignKey: {
        fieldName: 'adminId',
        allowNull: false,
      }
    });
    Admin.hasMany(models.Package, {
      foreignKey: {
        fieldName: 'adminId',
        allowNull: false,
      }
    });
    Admin.hasMany(models.Pricing, {
      foreignKey: {
        fieldName: 'adminId',
        allowNull: false,
      }      
    });
    Admin.hasMany(models.Review, {
      foreignKey: {
        fieldName: 'adminId',
        allowNull: false,
      }      
    });
    Admin.hasMany(models.Service, {
      foreignKey: {
        fieldName: 'adminId',
        allowNull: false,
      }      
    });
  };

  return Admin;

}
