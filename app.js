(() => {
  const header = document.getElementById('header')
  const title = 'Software Thoughts'
  const time = 120
  let titleChars = title.split('').reverse()
  const typeNext = (nextChar) => {
    header.textContent = header.textContent + nextChar;
    const nextTime = time + (Math.random() * 120)
    if (titleChars.length) {
      setTimeout(() => typeNext(titleChars.pop()), nextTime)
    }
  }
  setTimeout(() => typeNext(titleChars.pop()), 2000)
})()
