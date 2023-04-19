const burger = document.querySelector('.burger'),
      menu = document.querySelector('.menu'),
      closeMenu = document.querySelector('.menu__btn-close'),
      searchBtn = document.querySelector('.search-btn'),
      search = document.querySelector('.search'),
      closeSearch = document.querySelector('.search__close-btn'),
      menuLink = document.querySelectorAll('.nav__link'),
      searchCloseBtn = document.querySelector('.search__close-btn'),
      searchInput = document.querySelector('.search__input'),
      submenuBtn1 = document.querySelector('.submenu__btn--1'),
      submenuBtn2 = document.querySelector('.submenu__btn--2'),
      submenuBtn3 = document.querySelector('.submenu__btn--3'),
      submenuBtn4 = document.querySelector('.submenu__btn--4'),
      submenuBtn5 = document.querySelector('.submenu__btn--5'),
      scroll1 = document.querySelector('.scroll--1'),
      scroll2 = document.querySelector('.scroll--2'),
      scroll3 = document.querySelector('.scroll--3'),
      scroll4 = document.querySelector('.scroll--4'),
      scroll5 = document.querySelector('.scroll--5');


      burger.addEventListener('click', function () {
        menu.classList.add('menu--active')
    });

    closeMenu.addEventListener('click', function () {
        menu.classList.remove('menu--active')
    });

    menuLink.forEach(function (menuLink) {
        menuLink.addEventListener('click', function () {
          menu.classList.remove('menu--active')
        });
    });

    searchBtn.addEventListener('click', function () {
        search.classList.add('search--active'),
        searchCloseBtn.classList.add('search__close-btn--active'),
        searchInput.classList.add('search__input--active');
    });

    closeSearch.addEventListener('click', function () {
        search.classList.remove('search--active')
        searchCloseBtn.classList.remove('search__close-btn--active'),
        searchInput.classList.remove('search__input--active');
    });

    submenuBtn1.addEventListener('click', function () {
        submenuBtn1.classList.toggle('submenu__btn--active')
        scroll1.classList.toggle('scroll--active')
        scroll2.classList.remove('scroll--active')
        scroll3.classList.remove('scroll--active')
        scroll4.classList.remove('scroll--active')
        scroll5.classList.remove('scroll--active')
        submenuBtn2.classList.remove('submenu__btn--active')
        submenuBtn3.classList.remove('submenu__btn--active')
        submenuBtn4.classList.remove('submenu__btn--active')
        submenuBtn5.classList.remove('submenu__btn--active')
    });

    submenuBtn2.addEventListener('click', function () {
        submenuBtn2.classList.toggle('submenu__btn--active')
        scroll2.classList.toggle('scroll--active')
        scroll1.classList.remove('scroll--active')
        scroll3.classList.remove('scroll--active')
        scroll4.classList.remove('scroll--active')
        scroll5.classList.remove('scroll--active')
        submenuBtn1.classList.remove('submenu__btn--active')
        submenuBtn3.classList.remove('submenu__btn--active')
        submenuBtn4.classList.remove('submenu__btn--active')
        submenuBtn5.classList.remove('submenu__btn--active')
    });

    submenuBtn3.addEventListener('click', function () {
        submenuBtn3.classList.toggle('submenu__btn--active')
        scroll3.classList.toggle('scroll--active')
        scroll1.classList.remove('scroll--active')
        scroll2.classList.remove('scroll--active')
        scroll4.classList.remove('scroll--active')
        scroll5.classList.remove('scroll--active')
        submenuBtn1.classList.remove('submenu__btn--active')
        submenuBtn2.classList.remove('submenu__btn--active')
        submenuBtn4.classList.remove('submenu__btn--active')
        submenuBtn5.classList.remove('submenu__btn--active')
    });

    submenuBtn4.addEventListener('click', function () {
        submenuBtn4.classList.toggle('submenu__btn--active')
        scroll4.classList.toggle('scroll--active')
        scroll1.classList.remove('scroll--active')
        scroll2.classList.remove('scroll--active')
        scroll3.classList.remove('scroll--active')
        scroll5.classList.remove('scroll--active')
        submenuBtn1.classList.remove('submenu__btn--active')
        submenuBtn2.classList.remove('submenu__btn--active')
        submenuBtn3.classList.remove('submenu__btn--active')
        submenuBtn5.classList.remove('submenu__btn--active')
    });

    submenuBtn5.addEventListener('click', function () {
        submenuBtn5.classList.toggle('submenu__btn--active')
        scroll5.classList.toggle('scroll--active')
        scroll1.classList.remove('scroll--active')
        scroll2.classList.remove('scroll--active')
        scroll3.classList.remove('scroll--active')
        scroll4.classList.remove('scroll--active')
        submenuBtn1.classList.remove('submenu__btn--active')
        submenuBtn2.classList.remove('submenu__btn--active')
        submenuBtn3.classList.remove('submenu__btn--active')
        submenuBtn4.classList.remove('submenu__btn--active')
    });


