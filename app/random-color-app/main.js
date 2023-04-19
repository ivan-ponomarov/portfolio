const cols = document.querySelectorAll('.col')

document.addEventListener('keydown', (event) => {
    event.preventDefault()
    if (event.code === 'Space') {
        setRandomColors()
    }
})

document.addEventListener('click', (event) => {
        const type = event.target.dataset.type
        if (type === 'lock') {
            const node = event.target.tagName.toLowerCase() === 'i' ? event.target : event.target.children[0]
            node.classList.toggle('fa-lock-open')
            node.classList.toggle('fa-lock')
        }else if (type === 'copy') {
            copyToClickboard(event.target.textContent)
        }
})

function generateRandomColors() {
    const hexCodes = '012345678ABCDEF'
    let color = ''
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'

}

function copyToClickboard(text) {
    navigator.clipboard.writeText(text)
}

function setRandomColors() {
    cols.forEach((col) => {
        const isLoked = col.querySelector('i').classList.contains('fa-lock')
        if (isLoked) {
            return
        }
        const title  = col.querySelector('h2')
        const button = col.querySelector('button')
        const color = generateRandomColors()
        title.textContent = color
        col.style.background = color
        setTextColor(title, color)
        setTextColor(button, color)
    })
}

setRandomColors()


