var Site = (function() {

    var tl = new TimelineLite();


    function init() {

        var $header = $('header');
        var $footer = $('footer');
        var $content = $('.content-wrapp');

        tl.set($header, {
            y: -30
        });

        tl.set($footer, {
            y: 30
        });


        tl.staggerTo($header, 0.3, {
            autoAlpha: 1,
            y: 0
        }, '-=0.15').to($footer, 0.3, {
            autoAlpha: 1,
            y: 0
        }, '-=0.15');





        Slider.init('.content-wrapp .slider', {
            mousewheel: '.content-wrapp'
        });

    }


    return {
        init: init
    };

})();





$(document).ready(function() {
    setTimeout(function() {
        Site.init();
    }, 1000);
});