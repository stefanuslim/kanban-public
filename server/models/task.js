'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Task.init({
    title: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg:"Title is required"
        }
      }
    },
    category: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg:"Title is required"
        }
      }
    },
    UserId:DataTypes.INTEGER,
    UserEmail:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};
