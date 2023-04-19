document.addEventListener('DOMContentLoaded', function () {
    let burger = document.querySelector('.burger')
    let menu = document.querySelector('.burger-menu') 

    burger.addEventListener('click', function (){
        menu.classList.toggle('open')
    })
})