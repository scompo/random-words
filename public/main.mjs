'use strict'

import m1 from './modules/m1.mjs'
import version from './modules/version.mjs'

Promise.all([
  m1(),
  version()
])
  .then(console.log)
