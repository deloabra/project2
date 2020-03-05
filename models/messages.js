module.exports = function(sequelize, DataTypes){
  var messages = sequelize.define("messages", {
    message: DataTypes.TEXT
  }, {});
  messages.associate = function(models) {
    messages.belongsTo(models.User);
  };
  return messages;
};