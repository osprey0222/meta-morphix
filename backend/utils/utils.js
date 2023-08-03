const moment = require("moment");

const isDateValid = (date) => moment(date, "YYYY-MM-DD", true).isValid();

module.exports = {
  isDateValid,
};
