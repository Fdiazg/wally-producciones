document.addEventListener( 'DOMContentLoaded', function () {
    new Splide( '#image-carousel', {
          perPage    : 4,
          cover   : true,
          height  : '10rem',
          lazyLoad: 'nearby',
          gap: 8,
          arrows: false,
          
          breakpoints: {
              640: {
                  perPage: 1,
                  height  : '24rem',
                  type: "loop",
                  arrows: true,
              },
          },
    } ).mount();
  } );