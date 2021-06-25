const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');

const protect = asyncHandler(async (req, res, next) => {
   const auth = req.headers.authorization;
   console.log(auth);
   if (auth) {
      const token = auth.split(' ')[1];
      const user = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (!user) throw new Error("Session Expired");
      req.user = user;
      console.log(`Role: ${Object.keys(user)}`);
      next();
   }
   else {
      res.sendStatus(403);
   }
})
const authorize = () => {
   return (req, res, next) => {
      console.log("Admin:" + Object.keys(req.user));
      if (req.user.isAdmin) {
         next();
      }
      else {
         res.sendStatus(403);
      }
   }
}
module.exports = { protect, authorize };