const allNavLink = document.querySelectorAll('.nav__link')
const allMenuBtn = document.querySelectorAll('.menu__category-btn')
const allMenuList = document.querySelectorAll('.menu__food-list-wrapper')
const allBtnMore = document.querySelectorAll('.menu__btn-more')

let openItem = 6

allBtnMore.forEach(btn => {
    btn.addEventListener('click', () => {
        openItem += 6
        const menuList = btn.parentElement.firstElementChild
        const allMenuItem = menuList.querySelectorAll('.food-item')
        const visItem = Array.from(allMenuItem).slice(0, openItem)
        visItem.forEach(item => item.classList.add('is-visible'))
        if (openItem === allMenuItem.length) {
            btn.classList.add('hidden')
        }
        
    })  
})



allNavLink.forEach(link => 
    link.addEventListener('click', () => {
        removeClass(allNavLink, 'active-link')
        link.classList.add('active-link')
    })
)

allMenuBtn.forEach(btn  => {
    btn.addEventListener('click', () => {
        openItem = 6
        removeClass(allBtnMore, 'hidden')
        allMenuList.forEach(list => {
            const items = list.querySelectorAll('.food-item')
            removeClass(items, 'is-visible')
        })
        removeClass(allMenuBtn, 'actent-btn')
        btn.classList.add('actent-btn')
        const dataVal = btn.dataset.tab
        allMenuList.forEach(menuList => {
            if (menuList.dataset.tab === dataVal) {
                if (menuList.classList.contains('hidden')) {
                    menuList.classList.remove('hidden')
                }
            } else {
                if (!menuList.classList.contains('hidden')) {
                    menuList.classList.add('hidden')
                }
            }
        })
    })
})

function removeClass(arr, className) {
    arr.forEach(el => el.classList.remove(className))
}





