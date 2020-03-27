'use strict'

import fast from 'fastify'
import fyStatic from 'fastify-static'
import pov from 'point-of-view'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import pug from 'pug'
import pages from './routes/pages/index.mjs'

const PORT = process.env.PORT || 3000

// workaround to get the current directory name in ejs
const __dirname = path.dirname(fileURLToPath(import.meta.url))
console.log(__dirname)

const version = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'))).version
console.log(version)

const name = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'))).name
console.log(name)

const fastify = fast({ logger: true })

fastify.register(fyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/static'
})

fastify.register(pov, {
  engine: {
    pug: pug
  },
  defaultContext: {
    app: {
      name: name,
      version: version
    }
  }
})

fastify.register(pages, { prefix: '/' })

fastify.listen(PORT, '::', (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
