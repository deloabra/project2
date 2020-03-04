module.exports = function(sequelize, DataTypes){
  var messages = sequelize.define("messages", {
    message: DataTypes.TEXT
  }, {});
  messages.associate = function(models) {
    // associations can be defined here
    models;
  };
  return messages;
};