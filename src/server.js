const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path') // middleware nativa do NodeJS responsável pelos caminhos

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production' // var responsável por saber se o ambiente está em desenvolvimento ou não

    this.middlewares()
    this.views()
    this.routes()
  }

  middlewares () {
    this.express.use(express.urlencoded({ extended: false })) // responsável pelos forms
  }

  views () {
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      watch: this.isDev,
      express: this.express,
      autoescape: true
    })

    this.express.use(express.static(path.resolve(__dirname, 'public')))
    this.express.set('view engine', 'njk')
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

module.exports = new App().express
