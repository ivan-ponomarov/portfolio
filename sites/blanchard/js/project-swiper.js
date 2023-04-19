const projectSwiper = new Swiper('.project__swiper', {
    direction: 'horizontal',
    spaceBetween: 35,
    loop: false,
   
    
    navigation: {
      nextEl: '.project__swiper-btn--next',
      prevEl: '.project__swiper-btn--prev',
    },

    a11y: {
      prevSlideMessage: 'Предыдущий слайд',
      nextSlideMessage: 'Следующий слайд',
    },
    breakpoints: {
      600: {
          slidesPerView: 2,
      
          spaceBetween: 34,
        },
        900: {
          slidesPerView: 2,
          spaceBetween: 50,
        },
        1200: {
          slidesPerView: 3,

          spaceBetween: 50,
        }
      },    
  });