'use strict'

import uuid from 'uuid'
import randomWord from './words.mjs'

const data = {}

async function newUUID () {
  const res = uuid()
  console.log('uuid:', res)
  return res
}

async function newSentence (id) {
  if (id) {
    return Promise.resolve({
      _id: id,
      sentence: ''
    })
  } else {
    return newUUID()
      .then(async generatedId => {
        return {
          _id: generatedId,
          sentence: ''
        }
      })
  }
}

async function byId (id) {
  const requested = data[id]
  if (requested) {
    return Promise.resolve(requested)
  } else {
    return newSentence(id)
      .then(s => {
        return randomWord()
          .then(w => {
            s.sentence = w
            return s
          })
          .then(ss => save(ss))
      })
  }
}

async function removeLastWord (id) {
  return byId(id)
    .then(s => {
      const removed = s.sentence.split(' ')
      removed.reverse()
      removed.shift()
      s.sentence = removed.join(' ')
      return s
    })
    .then(s => save(s))
}

async function addNewWord (id) {
  return Promise.all([
    byId(id),
    randomWord()
  ])
    .then(([s, w]) => {
      s.sentence += ' ' + w
      return s
    })
    .then(s => save(s))
}

async function save (s) {
  data[s._id] = s
  return data[s._id]
}

async function getRandom (num = 5) {
  return Object.values(data).slice(0, num)
}

export default {
  byId,
  newUUID,
  removeLastWord,
  save,
  addNewWord,
  getRandom
}
