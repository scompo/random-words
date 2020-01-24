'use strict'

import fast from 'fastify'
import fyStatic from 'fastify-static'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const PORT = process.env.PORT || 3000

// workaround to get the current directory name in ejs
const __dirname = path.dirname(fileURLToPath(import.meta.url))
console.log(__dirname)

const version = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'))).version
console.log(version)

const fastify = fast({ logger: true })

fastify.register(fyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/'
})

fastify.get('/api/v1/version', function (req, reply) {
  reply.send({ version })
})

fastify.listen(PORT, '::', (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
