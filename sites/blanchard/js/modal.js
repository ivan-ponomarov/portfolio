
document.querySelectorAll('.gallery__slide-btn').forEach(function(tabsBtn) {
    tabsBtn.addEventListener('click', function(event) {
      const path = event.currentTarget.dataset.path


      document.querySelectorAll('.modal').forEach(function(btn) {
        btn.classList.remove('modal__open')
      });
 
     

      document.querySelector(`[data-target="${path}"]`).classList.add('modal__open');
      document.body.style.overflow = 'hidden';
      window.addEventListener('click', e => { // при клике в любом месте окна браузера
        const target = e.target // находим элемент, на котором был клик
        if (!target.closest('.modal__img') && !target.closest('.modal__text') && !target.closest('.gallery__slide-btn')) { // если этот элемент или его родительские элементы не кнопка
          document.querySelectorAll('.modal').forEach(function(btn) {
            btn.classList.remove('modal__open');
            document.body.removeAttribute('style');
          }) // то закрываем окно навигации, удаляя активный класс
        }
      })

      
    });
  });