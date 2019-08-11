import { passport } from "../config";

const signIn = (req, res, next) => {
  passport.authenticate("signin", (error, user, message) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res.status(401).send({ success: false, message });
    }
    return req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.status(200).send({ success: true, message });
    });
  })(req, res, next);
};

const signUp = (req, res, next) => {
  passport.authenticate("signup", (error, user, message) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res.status(401).send({ success: false, message });
    }
    return req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.status(201).send({ success: true, message });
    });
  })(req, res, next);
};
// const isAuth = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   return res.status(401).send("not auth");
// };

export default { signIn, signUp };
