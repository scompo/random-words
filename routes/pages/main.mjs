'use strict'

import sentences from '../../logic/sentences.mjs'

export default function (fastify, options, done) {
  fastify.get('/', options, (request, reply) => {
    sentences.getRandom(5)
      .then(oldSentences => {
        reply.view('./templates/index.pug', { page: { title: 'index' }, oldSentences: oldSentences })
      })
  })

  done()
}
