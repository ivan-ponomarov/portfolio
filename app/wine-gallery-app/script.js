const slides = document.querySelectorAll('.slide')

slides.forEach(slide => {
    slide.addEventListener('click', () => {
        clear(slides)
        slide.classList.add('active')
    })
})

function clear (arr) {
    arr.forEach(el => {
        el.classList.remove('active')
    }) 
}