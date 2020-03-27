'use strict'

import sentences from '../../logic/sentences.mjs'

export default function (fastify, options, done) {
  fastify.get('/new', options, (request, reply) => {
    sentences.byId(request.params.id)
      .then(s => {
        reply.redirect('/sentences/view/' + s._id)
      })
  })

  fastify.get('/view/:id', options, (request, reply) => {
    sentences.byId(request.params.id)
      .then(r => {
        console.log('res:', r)
        return r
      })
      .then(r => {
        reply.view('./templates/sentences/view.pug', { page: { title: 'sentence' }, sentence: r })
      })
  })

  fastify.get('/edit/addNew/:id', options, (request, reply) => {
    const id = request.params.id
    sentences.addNewWord(id)
      .then(s => {
        reply.redirect('/sentences/view/' + id)
      })
  })

  fastify.get('/edit/removeLast/:id', options, (request, reply) => {
    const id = request.params.id
    sentences.removeLastWord(id)
      .then(s => {
        reply.redirect('/sentences/view/' + id)
      })
  })

  done()
}
