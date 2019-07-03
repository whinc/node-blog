module.exports = {
  async index (ctx) {
    await ctx.render('index', {
      title: 'node-blog',
    })
  }
}