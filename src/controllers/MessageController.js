/* eslint-disable no-underscore-dangle */
import mongoose from "mongoose";
import { Dialog, User, Message } from "../models";
import { httpErrorCreater } from "../utils";

const index = (req, res, next) => {
  User.findOne({
    _id: req.params.userId,
  })
    .then(user => {
      if (user && user !== null) {
        Dialog.findOne({
          $and: [
            { _id: req.params.dialogId },
            { members: { $elemMatch: { _member: user._id } } },
          ],
        })
          .then(dialog => {
            if (dialog && dialog !== null) {
              Message.find({
                $and: [{ _dialog: req.params.dialogId }],
              })
                .populate("_dialog")
                .populate("_sender")
                .then(message => {
                  res.status(200).send(message);
                })
                .catch(error => {
                  console.log(error);
                  next(httpErrorCreater({}));
                });
            } else {
              httpErrorCreater({
                status: 404,
                additionalData: `dialog: ${req.params.dialogId}`,
              });
            }
          })
          .catch(error => {
            console.log(error);
            next(httpErrorCreater({}));
          });
      } else {
        httpErrorCreater({
          status: 404,
          additionalData: `user: ${req.params.userId}`,
        });
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
        Dialog.findOne({
          $and: [
            { _id: req.params.dialogId },
            { members: { $elemMatch: { _member: user._id } } },
          ],
        })
          .then(dialog => {
            if (dialog && dialog !== null) {
              Message.findOne({
                _id: req.params.messageId,
              })
                .populate("_dialog")
                .populate("_sender")
                .then(message => {
                  if (message && message !== null) {
                    res.status(200).send(message);
                  } else {
                    next(
                      httpErrorCreater({
                        status: 404,
                        additionalData: `message: ${req.params.messageId}`,
                      })
                    );
                  }
                })
                .catch(error => {
                  console.log(error);
                  next(httpErrorCreater({}));
                });
            } else {
              httpErrorCreater({
                status: 404,
                additionalData: `dialog: ${req.params.dialogId}`,
              });
            }
          })
          .catch(error => {
            console.log(error);
            next(httpErrorCreater({}));
          });
      } else {
        httpErrorCreater({
          status: 404,
          additionalData: `user: ${req.params.userId}`,
        });
      }
    })
    .catch(error => {
      console.log(error);
      next(httpErrorCreater({}));
    });
};

const create = (req, res, next) => {
  User.findOne({
    _id: req.params.userId,
  })
    .then(user => {
      if (user && user !== null) {
        Dialog.findOne({
          $and: [
            { _id: req.params.dialogId },
            { members: { $elemMatch: { _member: user._id } } },
          ],
        })
          .then(dialog => {
            if (dialog && dialog !== null) {
              const data = new Message({
                _id: mongoose.Types.ObjectId(),
                _dialog: dialog._id,
                _sender: req.body.sender,
                text: req.body.text,
              });
              data
                .save()
                .then(message => {
                  res.status(201).send(message);
                })
                .catch(error => {
                  console.log(error);
                  next(httpErrorCreater({}));
                });
            } else {
              httpErrorCreater({
                status: 404,
                additionalData: `dialog: ${req.params.dialogId}`,
              });
            }
          })
          .catch(error => {
            console.log(error);
            next(httpErrorCreater({}));
          });
      } else {
        httpErrorCreater({
          status: 404,
          additionalData: `user: ${req.params.userId}`,
        });
      }
    })
    .catch(error => {
      console.log(error);
      next(httpErrorCreater({}));
    });
};

const deleteOne = (req, res, next) => {
  User.findOne({
    _id: req.params.userId,
  })
    .then(user => {
      if (user && user !== null) {
        Dialog.findOne({
          $and: [
            { _id: req.params.dialogId },
            { members: { $elemMatch: { _member: user._id } } },
          ],
        })
          .then(dialog => {
            if (dialog && dialog !== null) {
              Message.findOneAndDelete({ _id: req.params.messageId })
                .then(message => {
                  if (message && message !== null) {
                    res.status(200).send(message);
                  } else {
                    next(
                      httpErrorCreater({
                        status: 404,
                        additionalData: `message: ${req.params.messageId}`,
                      })
                    );
                  }
                })
                .catch(error => {
                  console.log(error);
                  next(httpErrorCreater({}));
                });
            } else {
              httpErrorCreater({
                status: 404,
                additionalData: `dialog: ${req.params.dialogId}`,
              });
            }
          })
          .catch(error => {
            console.log(error);
            next(httpErrorCreater({}));
          });
      } else {
        httpErrorCreater({
          status: 404,
          additionalData: `user: ${req.params.userId}`,
        });
      }
    })
    .catch(error => {
      console.log(error);
      next(httpErrorCreater({}));
    });
};

const update = (req, res, next) => {
  User.findOne({
    _id: req.params.userId,
  })
    .then(user => {
      if (user && user !== null) {
        Dialog.findOne({
          $and: [
            { _id: req.params.dialogId },
            { members: { $elemMatch: { _member: user._id } } },
          ],
        })
          .then(dialog => {
            if (dialog && dialog !== null) {
              Message.findOneAndUpdate(
                { _id: req.params.messageId },
                req.body,
                { new: true }
              ).then(message => {
                if (message && message !== null) {
                  res.status(200).send(message);
                } else {
                  next(
                    httpErrorCreater({
                      status: 404,
                      additionalData: `message: ${req.params.messageId}`,
                    })
                  );
                }
              });
            } else {
              next(
                httpErrorCreater({
                  status: 404,
                  additionalData: `dialog: ${req.params.dialogId}`,
                })
              );
            }
          })
          .catch(error => {
            console.log(error);
            next(httpErrorCreater({}));
          });
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

export default { index, read, create, deleteOne, update };
