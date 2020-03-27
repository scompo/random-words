'use strict'

import main from './main.mjs'

export default function (fastify, options, done) {
  fastify.register(main, { prefix: '/' })
  done()
}
