const startBtn = document.getElementById('start')

const screens = document.querySelectorAll('.screen')

const timeeList = document.getElementById('time-list')

const timeEl = document.getElementById('time')

const board = document.getElementById('board')

let time = 0
let score = 0


startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})



function startGame() {
    setTime(time)
    createRandomCircle()
    setInterval(decraseTime, 1000)
}

function decraseTime() {
    if (time === 0) {
        finishGame()
    }else {
        let curent = --time
        if(curent <10) {
            curent = '0'+curent
        }
        setTime(curent)
    }
  
}

function setTime(val) {
    timeEl.textContent = `00:${val}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Cчет :${score}</h1>`

}

function createRandomCircle() {
    const circle = document.createElement('div')
    circle.classList.add('circle')
    const size = getRandomNumber(10,60)
    const {width, height} = board.getBoundingClientRect()

    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${x}px`
    circle.style.left = `${y}px`
    circle.style.background = `${generateRandomColors()}`
    
    board.append(circle)
}

function getRandomNumber(min, max) {
   return Math.round(Math.random() * (max-min) + min)
}

function generateRandomColors() {
    const hexCodes = '012345678ABCDEF'
    let color = ''
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color
}




