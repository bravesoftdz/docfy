module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    sid: DataTypes.STRING,
    expires: DataTypes.DATE,
    data: DataTypes.TEXT,
  });

  return Session;
};
