const router = require('koa-router')()

const user = require('./user')

module.exports = (app) => {
  router.get('/', require('./home').index)
  router.get('/signup', user.signup)
  router.post('/signup', user.signup)
  router.get('/signin', user.signin)
  router.post('/signin', user.signin)
  router.get('/signout', user.signout)

  app
    .use(router.routes())
    .use(router.allowedMethods())
}