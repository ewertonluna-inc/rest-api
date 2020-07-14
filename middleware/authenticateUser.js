const auth = require('basic-auth');

module.exports = (req, res, next) => {
  const credentials = auth(req);
}