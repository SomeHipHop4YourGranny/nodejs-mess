import express from 'express'
import { httpErrorCreater } from '../utils'
import {
  DialogController,
  AuthController,
  MessageController,
  UserController
} from '../controllers'

const router = express.Router()

router.get('/session', (req, res, next) =>
  req.session.passport
    ? res.status(200).send(req.session.passport)
    : next(httpErrorCreater({ status: 401 }))
)

// User Routes
router.get('/users', UserController.index)
router.get('/users/:userId', UserController.read)
router.delete('/users/:userId', UserController.deleteOne)

// Dialog Routes
router.get('/users/:userId/dialogs', DialogController.index)
router.get('/users/:userId/dialogs/:dialogId', DialogController.read)
router.delete('/users/:userId/dialogs/:dialogId', DialogController.deleteOne)
router.post('/users/:userId/dialogs', DialogController.create)

// Message Routes
router.get('/users/:userId/dialogs/:dialogId/messages', MessageController.index)
router.get(
  '/users/:userId/dialogs/:dialogId/messages/:messageId',
  MessageController.read
)
router.delete(
  '/users/:userId/dialogs/:dialogId/messages/:messageId',
  MessageController.deleteOne
)
router.post(
  '/users/:userId/dialogs/:dialogId/messages',
  MessageController.create
)

// Login and Register
router.post('/login', AuthController.signIn)
router.post('/register', AuthController.signUp)

export default router
