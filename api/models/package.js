'use strict';

const Sequelize = require('sequelize');

// Create the Package Model
module.exports = ( sequelize ) => {
  class Package extends Sequelize.Model{}

  Package.init({
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
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Detail Package requires a title"
        },
        notNull: {
          msg: "Detail Package requires a value"
        },
      },
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Detail Package requires a description"
        },
        notNull: {
          msg: "Detail Package requires a value"
        },
      },
    },
    estimatedTime: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Estimated time is required"
        },
        notNull: {
          msg: "Estimated time requires a value"
        },
      },
    }
  }, { sequelize })

  // Associate with Admin
  Package.associate = ( models ) => {
    Package.belongsTo(models.Admin, {
      foreignKey: {
        fieldName: 'adminId',
        allowNull: false,
      }
    });
  };

  return Package;
}
