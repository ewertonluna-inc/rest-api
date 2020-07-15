const { check } = require('express-validator');

module.exports = (fieldName) => {
  return (
    check(fieldName)
      .exists({checkNull: true, checkFalsy: true})
      .withMessage(`${fieldName} not valid`)
  );
}