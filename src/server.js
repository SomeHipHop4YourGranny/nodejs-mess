import express from 'express'
import session from 'express-session'
import Socket from 'socket.io'
import mongoose from 'mongoose'
import connectMongo from 'connect-mongo'
import { createServer } from 'http'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import { server, passport } from './config'
import { ApiRouter } from './routes'
// Initialize Express
const app = express()
const MongoStore = connectMongo(session) // store session
// DB
mongoose.connection
  .on('error', error => console.log(error))
  .on('close', () => console.log('Database connection closed.'))
  .once('open', () => {
    const info = mongoose.connections[0]
    console.log(`Connected to db ${info.host}:${info.port}/${info.name}`)
  })

mongoose.connect(
  server.mongoose,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
)

// Set and use
app.use(bodyParser.json()) // define body parser for json
app.use(morgan('combined')) // define morgan logging request
app.use(helmet()) // define helmet headers
app.use(cookieParser()) // read cookies (needed for auth)
app.use(cors({ credentials: true, origin: 'http://192.168.0.105:3001' }))
// For passport
app.use(
  session({
    secret: server.secret,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { httpOnly: false, maxAge: 12 * 60 * 1000 }
  })
)
app.use(passport.initialize())
app.use(passport.session())

// Routing
app.use('/api', ApiRouter)

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  error.message = 'Not Found'
  next(error)
})

// Error handler
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error)
  }

  return res
    .status(error.status || 500)
    .send({ error: error.message } || 'Something went wrong')
})

// socket

const http = createServer(app)
const io = Socket(http)

io.on('connection', socket => {
  socket.broadcast.emit('connection')
  console.log(`Socket connection open`)
  socket.on('disconnect', () => {
    console.log('Socket connection closed')
  })
  socket.on('messageSend', () => {
    console.log('----------------SOCKET SEND MESS--------------')
    socket.emit('messageSend')
  })
})

// Start Server
http.listen(server.port, server.listen, () => {
  console.log(`Server started on ${server.listen}:${server.port}`)
})
