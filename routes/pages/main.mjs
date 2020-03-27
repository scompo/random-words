'use strict'

export default function (fastify, options, done) {
  fastify.get('/', options, (request, reply) => {
    reply.view(
      './templates/index.pug',
      {
        page: {
          title: 'index'
        }
      })
  })

  done()
}
