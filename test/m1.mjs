'use strict'

import t from 'tap'
import m1 from '../public/modules/m1'

m1()
  .then(r => t.equal(r, 'hi, from m1'))
