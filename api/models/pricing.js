'use strict';

const Sequelize = require('sequelize');

// Create the Pricing Model
module.exports = ( sequelize ) => {
  class Pricing extends Sequelize.Model{}

  Pricing.init({
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
    vehicleSize: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Vehicle Size requires a name"
        },
        notNull: {
          msg: "Vehicle Size requires a value"
        },
      },      
    },
    fullDetailPlus: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Full Detail Plus cannot be empty"
        },
        notNull: {
          msg: "Full Detail Plus requires a value"
        },
        min: {
          args: [0],
          msg: "Price cannot be less than 0",
        },
        max: {
          args: [999],
          msg: "Price cannot be higher than 999"
        },
      },
    },
    fullDetail: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Full Detail cannot be empty"
        },
        notNull: {
          msg: "Full Detail requires a value"
        },
        min: {
          args: [0],
          msg: "Price cannot be less than 0",
        },
        max: {
          args: [999],
          msg: "Price cannot be higher than 999"
        },
      },      
    },
    interiorDetail: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Interior Detail cannot be empty"
        },
        notNull: {
          msg: "Interior Detail requires a value"
        },
        min: {
          args: [0],
          msg: "Price cannot be less than 0",
        },
        max: {
          args: [999],
          msg: "Price cannot be higher than 999"
        },
      },      
    },
    theBlitz: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "The Blitz cannot be empty"
        },
        notNull: {
          msg: "The Blitz requires a value"
        },
        min: {
          args: [0],
          msg: "Price cannot be less than 0",
        },
        max: {
          args: [999],
          msg: "Price cannot be higher than 999"
        },
      },      
    },
    exteriorDetail: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Exterior Detail cannot be empty"
        },
        notNull: {
          msg: "Exterior Detail requires a value"
        },
        min: {
          args: [0],
          msg: "Price cannot be less than 0",
        },
        max: {
          args: [999],
          msg: "Price cannot be higher than 999"
        },
      },      
    },
    basicWash: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Basic Wash cannot be empty"
        },
        notNull: {
          msg: "Basic Wash requires a value"
        },
        min: {
          args: [0],
          msg: "Price cannot be less than 0",
        },
        max: {
          args: [999],
          msg: "Price cannot be higher than 999"
        },
      },      
    },

  }, { modelName: 'Pricing', tableName: 'Pricing', sequelize });

  // associate the pricing with admin
  Pricing.associate = ( models ) => {
    Pricing.belongsTo(models.Admin, {
      foreignKey: {
        fieldName: 'adminId',
        allowNull: false,
      }
    });
  };

  return Pricing;
}