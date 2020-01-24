'use strict'

export default async () => {
  return window.fetch('/api/v1/version')
    .then(r => r.json())
    .then(v => {
      const versionHolder = document.getElementById('version-txt')
      versionHolder.innerText = v.version
    })
    .catch(e => {
      console.error(e)
    })
}
