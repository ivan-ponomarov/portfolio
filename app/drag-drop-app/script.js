const item = document.querySelector('.item')
const placeholders = document.querySelectorAll('.placeholder')


item.addEventListener('dragstart', dragStart)
item.addEventListener('dragend', dragEnd)

function dragStart(event) {
    event.target.classList.add('hold')
    setTimeout(() => {event.target.classList.add('hidden')}, 0)
}

function dragEnd(event) {
    event.target.classList.remove('hold', 'hidden')
}

placeholders.forEach(el => {
    el.addEventListener('dragover', dragover)
    el.addEventListener('dragenter', dragenter)
    el.addEventListener('dragleave', dragoleave)
    el.addEventListener('drop', dragdrop)
})

function dragover (event) {
    event.preventDefault()
}

function dragenter (event) {
    event.target.classList.add('hovered')
}

function dragoleave (event) {
    event.target.classList.remove('hovered')
}

function dragdrop(event) {
    event.target.append(item)
}





