const eventSwiper = new Swiper('.event__swiper', {
    direction: 'horizontal',

    loop: false,
    spaceBetween: 35,
    // keyboard: {
    //   enabled: true,
    //   onlyInViewport: false,
    // },
    pagination: {
      el: '.event__swiper-pagination',
    },
    navigation: {
      nextEl: '.event__swiper-btn--next',
      prevEl: '.event__swiper-btn--prev',
    },
    a11y: {
      prevSlideMessage: 'Предыдущий слайд',
      nextSlideMessage: 'Следующий слайд',

    },
    breakpoints: {
        600: {
          slidesPerView: 2,
          slidesPerGroup:2, 
          spaceBetween: 35,
        },
        1024: {
            slidesPerView: 3,
            slidesPerGroup:3, 
            spaceBetween: 28,
          },
          1920: {
            slidesPerView: 3,
            slidesPerGroup:3, 
            spaceBetween: 50,
          },  
      },    
  });