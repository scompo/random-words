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

const editSentence = (stuff, stuff2, sectionEdit, sectionCmd) => {
  return (e) => {
    setVisibile(sectionCmd, false)

    const text = stuff.innerText
    stuff2.value = text

    setVisibile(sectionEdit, true)
  }
}

const setVisibile = (section, visibile) => {
  if (visibile) {
    section.classList.remove('nascosto')
  } else {
    section.classList.add('nascosto')
  }
}

const closeEdit = (stuff, stuff2, sectionEdit, sectionCmd) => {
  return (e) => {
    setVisibile(sectionEdit, false)

    const text = stuff2.value.replace('\n', '')
    stuff.innerText = text

    setVisibile(sectionCmd, true)
  }
}

const setup = async () => {
  return setupWords()
    .then(words => {
      const sectionCmd = document.getElementById('cmd-section')
      setVisibile(sectionCmd, true)

      const sectionEdit = document.getElementById('edit-section')

      const stuff = document.getElementById('stuff')
      const stuff2 = document.getElementById('stuff2')

      const buttonAdd = document.querySelector('#add')
      buttonAdd.onclick = addWord(stuff, words)

      const buttonChange = document.getElementById('change')
      buttonChange.onclick = changeWord(stuff, words)

      const buttonRemove = document.getElementById('remove')
      buttonRemove.onclick = removeWord(stuff)

      const buttonEdit = document.getElementById('edit')
      buttonEdit.onclick = editSentence(stuff, stuff2, sectionEdit, sectionCmd)

      const buttonSave = document.getElementById('save')
      buttonSave.onclick = closeEdit(stuff, stuff2, sectionEdit, sectionCmd)
    })
}

window.onload = () => setup()
