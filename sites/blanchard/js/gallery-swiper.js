const gallerySwiper = new Swiper('.gallery__swiper', {
    direction: 'horizontal',
    loop: false,
    pagination: {
      el: '.gallery__swiper-pagination',
      type: "fraction",
    },
    navigation: {
      nextEl: '.gallery__swiper-button--next',
      prevEl: '.gallery__swiper-button--prev',
    },

    a11y: {
      prevSlideMessage: 'Предыдущий слайд',
    },
    breakpoints: {
        768: {
          slidesPerView: 2,
          slidesPerGroup:2, 
          spaceBetween: 35,
        },
        1400: {
            slidesPerView: 3,
            slidesPerGroup:3, 
            spaceBetween: 50,
          },
      },    
  });