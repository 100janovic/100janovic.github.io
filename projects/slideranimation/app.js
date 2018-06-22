function initSlider() {

    var $slides = $('.swiper-container').find('.swiper-slide');

    var mySwiper = new Swiper('.swiper-container', {
        slidesPerView: 4,
        spaceBetween: 20,
        slidesPerGroup: 3,
        speed: 600,
        grabCursor: true,
        on: {
            slideChangeTransitionStart: function() {

                $slides.each(function(i, slide) {
                    TweenMax.to(slide, 0.3, {
                        x: (40 * i),
                        onComplete: function() {
                            TweenMax.to(slide, 0.3, { x: 0 });
                        }
                    });
                });

            }
        },
        navigation: {
            nextEl: '.btn-next',
            prevEl: '.btn-prev',
        }
    });

}


$(document).ready(initSlider);