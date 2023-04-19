const swiper = new Swiper('.swiper', {

    direction: 'horizontal',
    loop: true,
  
    navigation: {
      nextEl: '.swiper-button-left',
      prevEl: '.swiper-button-right',
    },
    breakpoints: {
      600: {
        slidesPerView: 'auto',
        centeredSlides:true,
        centerInsufficientSlides: true,
        spaceBetween:30,

      },  
      1024: {
        spaceBetween:60,
        slidesPerView: 3,
        centeredSlides:false,
        centerInsufficientSlides: false,
        autoHeight :true
      },  
    },      
  });