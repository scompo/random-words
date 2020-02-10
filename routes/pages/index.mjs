'use strict'

import sentences from './sentences.mjs'
import main from './main.mjs'

export default function (fastify, options, done) {
  fastify.register(sentences, { prefix: '/sentences' })
  fastify.register(main, { prefix: '/' })
  done()
}
