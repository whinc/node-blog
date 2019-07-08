const _ = require('lodash')
const UserModel = require('../models/user')

module.exports = {
  async signup (ctx) {
    if (ctx.method === 'GET') {
      await ctx.render('signup', {
        title: '用户注册'
      })
      return
    }
    const {username, password, email} = ctx.request.body
    console.log('body:', ctx.request.body)
    await UserModel.create({username, password, email})
    ctx.flash = {warning: '注册成功'}
    ctx.redirect('/')
  },
  async signin (ctx) {
    if (ctx.method === 'GET') {
      await ctx.render('signin', {
        title: '用户登录'
      })
      return
    }
    const {username, password} = ctx.request.body
    const user = await UserModel.findOne({username})
    if (user && user.password === password) {
      ctx.session.user = _.pick(user, ['_id', 'username', 'isAdmin', 'email'])
      ctx.flash = {warning: '登录成功'}
      ctx.redirect('/')
    } else {
      ctx.flash = {warning: '用户名或密码错误'}
      ctx.redirect('/')
    }
  },
  async signout (ctx) {
    ctx.session.user = null
    ctx.flash = {warning: '退出登录'}
    ctx.redirect('/')
  }
}