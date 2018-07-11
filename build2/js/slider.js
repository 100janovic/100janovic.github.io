var Slider = (function() {

    var el = {};
    var $slides = {};
    var $pagination = {};

    var $current = {};
    var active = 0;

    var tl = new TimelineLite();

    var inprogress = false;




    var Utility = {
        getNext: function(index, array) {
            var total = array.length;
            if (index >= total - 1) {
                return array[0];
            } else {
                return array[index + 1];
            }
        },
        getPrev: function(index, array) {
            var total = array.length;
            if (index === 0) {
                return array[total - 1];
            } else {
                return array[index - 1];
            }
        },
        getNextIndex: function(index, array) {
            var total = array.length;
            if (index >= total - 1) {
                return 0;
            } else {
                return index + 1;
            }
        },
        getPrevIndex: function(index, array) {
            var total = array.length;
            if (index === 0) {
                return total - 1;
            } else {
                return index - 1;
            }
        },
    };






    var exp = {
        init: function(el, options) {
            $el = $(el);
            $slides = $el.find('.slide');

            exp.reset($el.find('.anim'));

            $current = $(el).find('.slide.active');
            exp.buildPagination();

            exp.animIn();

            if (options) {
                if (options.mousewheel) {
                    exp.onMousewheel(options.mousewheel);
                }
            }
        },

        buildPagination: function() {

            var html = '';
            $slides.each(function(i, slide) {
                html += '<a href="#' + i + '"><span></span></a>';
            });

            $pagination = $el.find('.pagination');
            $pagination.html(html);

            $paginationLinks = $pagination.find('a');
            $paginationLinks.on('click', function(e) {
                e.preventDefault();
                var index = $(this).attr('href').substring(1);
                exp.goTo(index);
            });

            exp.setPagination();

        },

        goTo: function(_index) {

            if (inprogress) return;

            var index = _index;

            if (typeof index == 'string') {
                index = parseInt(_index);
            }

            exp.animOut(function() {

                $current = $slides.eq(index);
                active = index;

                $slides.removeClass('active');
                $current.addClass('active');

                exp.animIn(exp.setPagination);

            });

        },

        reset: function($items) {
            TweenMax.set($items, {
                y: 30,
                autoAlpha: 0
            });
        },

        animOut: function(callback) {

            inprogress = true;

            $anim = $current.find('.anim');
            TweenMax.staggerTo($anim, 0.4, {
                autoAlpha: 0,
                y: 30,
                ease: Power3.easeIn
            }, 0.15, function() {
                if (callback) callback();
            });
        },

        animIn: function(callback) {

            inprogress = true;

            $anim = $current.find('.anim');
            TweenMax.staggerTo($anim, 0.4, {
                autoAlpha: 1,
                y: 0,
                ease: Power3.easeOut
            }, 0.15, function() {
                inprogress = false;
                if (callback) callback();
            });
        },

        setPagination: function() {

            $paginationLinks.removeClass('active');
            $paginationLinks.eq(active).addClass('active');
        },

        onMousewheel: function(el) {


            $(el).on('mousewheel DOMMouseScroll', function(event) {
                event.preventDefault();
                var delta = event.originalEvent.wheelDelta / 120 || -event.originalEvent.detail / 3;
                if (inprogress) return;
                if (delta < 0) {

                	exp.goTo(Utility.getNextIndex(active, $slides));

                } else {

                    exp.goTo(Utility.getPrevIndex(active, $slides));
                }
            });
        }
    };

    return exp;

})();