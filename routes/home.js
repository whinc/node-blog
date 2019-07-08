module.exports = {
  async index (ctx) {
    await ctx.render('home', {
      title: 'node-blog',
    })
  }
}