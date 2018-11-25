const { User } = require('../models')

class SessionControler {
  async create (req, res) {
    return res.render('auth/signin')
  }

  async store (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      console.log('Usuário não encontrado!')
      return res.redirect('/')
    }

    if (!(await user.checkPassword(password))) {
      console.log('Senha está incorreta!')
      return res.redirect('/')
    }

    return res.redirect('/app/dashboard')
  }
}

module.exports = new SessionControler()
