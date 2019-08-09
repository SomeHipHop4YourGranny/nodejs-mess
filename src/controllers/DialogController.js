/* eslint-disable no-underscore-dangle */

import mongoose from 'mongoose'
import { User, Dialog } from '../models'
import { httpErrorCreater } from '../utils'

const index = (req, res, next) => {
  User.findOne({
    _id: req.params.userId
  })
    .then(user => {
      if (user && user !== null) {
        Dialog.find({ members: { $elemMatch: { _member: user._id } } })
          .populate('_owner', '_id login')
          .populate('members._member', '_id login avatar')
          .then(dialog => {
            res.status(200).send(dialog)
          })
          .catch(error => {
            console.log(error)
            next(httpErrorCreater({}))
          })
      } else {
        next(
          httpErrorCreater({
            status: 404,
            additionalData: `user: ${req.params.userId}`
          })
        )
      }
    })
    .catch(error => {
      console.log(error)
      next(httpErrorCreater({}))
    })
}

const read = (req, res, next) => {
  User.findOne({
    _id: req.params.userId
  })
    .then(user => {
      if (user && user !== null) {
        Dialog.findOne({
          $and: [
            { _id: req.params.dialogId },
            { members: { $elemMatch: { _member: user._id } } }
          ]
        })
          .populate('_owner', '_id login')
          .populate('members._member', '_id login avatar')
          .then(dialog => {
            if (dialog && dialog !== null) {
              res.status(200).send(dialog)
            } else {
              next(
                httpErrorCreater({
                  status: 404,
                  additionalData: `dialog: ${req.params.dialogId}`
                })
              )
            }
          })
          .catch(error => {
            console.log(error)
            next(httpErrorCreater({}))
          })
      } else {
        next(
          httpErrorCreater({
            status: 404,
            additionalData: `user: ${req.params.userId}`
          })
        )
      }
    })
    .catch(error => {
      console.log(error)
      next(httpErrorCreater({}))
    })
}

const create = (req, res, next) => {
  User.findOne({
    _id: req.params.userId
  })
    .then(user => {
      if (user && user !== null) {
        const data = new Dialog({
          _id: mongoose.Types.ObjectId(),
          _owner: user._id,
          members: [{ _member: user._id }]
        })
        data
          .save()
          .then(dialog => {
            res.status(201).send(dialog)
          })
          .catch(error => {
            console.log(error)
            next(httpErrorCreater({}))
          })
      } else {
        next(
          httpErrorCreater({
            status: 404,
            additionalData: `user: ${req.params.userId}`
          })
        )
      }
    })
    .catch(error => {
      console.log(error)
      next(httpErrorCreater({}))
    })
}

const deleteOne = (req, res, next) => {
  User.findOne({
    _id: req.params.userId
  })
    .then(user => {
      if (user && user !== null) {
        Dialog.findOneAndDelete({
          $and: [
            { _id: req.params.dialogId },
            { members: { $elemMatch: { _member: user._id } } }
          ]
        })
          .then(dialog => {
            if (dialog && dialog !== null) {
              res.status(200).send(dialog)
            } else {
              next(
                httpErrorCreater({
                  status: 404,
                  additionalData: `dialog: ${req.params.dialogId}`
                })
              )
            }
          })
          .catch(error => {
            console.log(error)
            next(httpErrorCreater({}))
          })
      } else {
        next(
          httpErrorCreater({
            status: 404,
            additionalData: `user: ${req.params.userId}`
          })
        )
      }
    })
    .catch(error => {
      console.log(error)
      next(httpErrorCreater({}))
    })
}

export default { index, read, create, deleteOne }
