import { User } from "../models";
import { httpErrorCreater } from "../utils";

const index = (req, res, next) => {
  User.find()
    .then(user => {
      res.status(200).send(user);
    })
    .catch(error => {
      console.log(error);
      next(httpErrorCreater({}));
    });
};

const find = (req, res, next) => {
  User.find({ login: { $regex: `.*${req.params.username}.*` } })
    .then(user => {
      if (user && user !== null) {
        res.status(200).send(user);
      } else {
        res.status(200).send({});
      }
    })
    .catch(error => {
      console.log(error);
      next(httpErrorCreater({}));
    });
};

const read = (req, res, next) => {
  User.findOne({
    _id: req.params.userId,
  })
    .then(user => {
      if (user && user !== null) {
        res.status(200).send(user);
      } else {
        next(
          httpErrorCreater({
            status: 404,
            additionalData: `user: ${req.params.userId}`,
          })
        );
      }
    })
    .catch(error => {
      console.log(error);
      next(httpErrorCreater({}));
    });
};

const deleteOne = (req, res, next) => {
  User.findOneAndDelete({ _id: req.params.userId })
    .then(user => {
      if (user && user !== null) {
        res.status(200).send(user);
      } else {
        next(
          httpErrorCreater({
            status: 404,
            additionalData: `user: ${req.params.userId}`,
          })
        );
      }
    })
    .catch(error => {
      console.log(error);
      next(httpErrorCreater({}));
    });
};
const update = (req, res, next) => {
  User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true })
    .then(user => {
      if (user && user !== null) {
        res.status(200).send(user);
      } else {
        next(
          httpErrorCreater({
            status: 404,
            additionalData: `user: ${req.params.userId}`,
          })
        );
      }
    })
    .catch(error => {
      console.log(error);
      next(httpErrorCreater({}));
    });
};

export default { index, read, deleteOne, update, find };
