const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const SessionController = require('./app/controllers/SessionController')
const UserController = require('./app/controllers/UserController')

routes.get('/app/dashboard', (req, res) => {
  console.log(req.session)
  return res.render('dashboard')
})

routes.get('/', SessionController.create)
routes.post('/signin', SessionController.store)

routes.get('/signup', UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

module.exports = routes
