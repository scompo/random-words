const setupWords = async () => {
  return window.fetch('/static/files/parole.txt')
    .then(r => {
      if (r.ok) {
        return r.text()
      } else {
        return Promise.resolve('')
      }
    })
    .then(r => r.split('\n'))
}

const randomWord = async (words) => {
  return words[Math.floor(Math.random() * words.length)]
}

const addWord = (stuff, words) => {
  return (e) => {
    randomWord(words)
      .then(word => {
        const text = stuff.innerText ? stuff.innerText.split(' ') : []
        text.push(word)
        stuff.innerText = text.join(' ')
      })
  }
}

const changeWord = (stuff, words) => {
  return (e) => {
    removeWord(stuff)()
    addWord(stuff, words)()
  }
}

const removeWord = (stuff) => {
  return (e) => {
    const text = stuff.innerText ? stuff.innerText.split(' ') : []
    if (text.length > 0) {
      text.pop()
    }
    stuff.innerText = text.join(' ')
  }
}

const setup = async () => {
  return setupWords()
    .then(words => {
      const stuff = document.getElementById('stuff')

      const buttonAdd = document.querySelector('#add')
      buttonAdd.classList.remove('nascosto')
      buttonAdd.onclick = addWord(stuff, words)

      const buttonChange = document.getElementById('change')
      buttonChange.classList.remove('nascosto')
      buttonChange.onclick = changeWord(stuff, words)

      const buttonRemove = document.getElementById('remove')
      buttonRemove.classList.remove('nascosto')
      buttonRemove.onclick = removeWord(stuff)
    })
}

window.onload = () => setup()
