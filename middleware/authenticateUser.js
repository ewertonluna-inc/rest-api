const auth = require('basic-auth');
const bcryptjs = require('bcryptjs');


module.exports = ( model ) => {
  return (
    async (req, res, next) => {
      let message;
      const credentials = auth(req);
      
      if (credentials) {
        const user = await model.findOne({ where: { emailAddress: credentials.name } });
        if (user) {
          const authenticated = bcryptjs.compareSync(credentials.pass, user.password);
          if (authenticated) {
            console.log(`Authentication successful for user ${user.emailAddress}`);
            req.currentUser = user;
          } else {
            message = `Authentication failed for user ${user.emailAddress}`;
          }
        } else {
          message = `User's email '${credentials.name}' not found`;
        }
      } else {
        message = 'Authorization header not found';
      }

      if (message) {
        console.warn(message);
        res.status(401).json({ message: 'Access Denied' });
      } else {
        next();
      }
    }
  );
}
