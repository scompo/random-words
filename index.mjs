'use strict'

import fast from 'fastify'
import fyStatic from 'fastify-static'
import path from 'path'
import { fileURLToPath } from 'url'

const PORT = process.env.PORT || 3000

// workaround to get the current directory name in ejs
const __dirname = path.dirname(fileURLToPath(import.meta.url))
console.log(__dirname)

const fastify = fast({ logger: true })

fastify.register(fyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/'
})

fastify.get('/api/v1', function (req, reply) {
  reply.type('text/plain').send('hey')
})

fastify.listen(PORT, '::', (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
