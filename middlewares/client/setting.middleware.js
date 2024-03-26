const SettingGeneral = require("../../models/settings-general.model");

module.exports.settingsGeneral = async (req, res, next) => {
  const settingsGeneral = await SettingGeneral.findOne({});
  console.log(settingsGeneral);
  res.locals.settingsGeneral = settingsGeneral;
  next();
};
