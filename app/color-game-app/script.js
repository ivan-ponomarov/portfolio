const board = document.getElementById('board')

const SQUARES_NUMBER = 500

for (let i = 0; i < SQUARES_NUMBER; i++) {
    const square = document.createElement('div')
    square.classList.add('square')
    board.append(square)
    square.addEventListener('mouseover', () => {
        setColor(square)
    })
    square.addEventListener('mouseleave', () => {
        removeColor(square)
    })
}

function setColor(el) {
    let color = getRandomColor()
    el.style.background = color
    el.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

function removeColor(el) {
    el.style.background = '#1d1d1d'
    el.style.boxShadow = `0 0 2px #111, 0 0 10px #111`
}

function getRandomColor() {
    let hex = '123456789ABCDEF'
    let color = ''
    for(let i = 0; i < 6; i++) {
        let randomInndex = Math.floor(Math.random() * hex.length)
        color += hex[randomInndex]
    }
    return '#' + color
}




