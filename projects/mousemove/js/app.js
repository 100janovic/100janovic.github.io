var GridItem = (function() {

    var $el, elms = {};
    var moveSpeed = 1;


    var options = {
        image: {
            translation: { x: -10, y: 10, z: 0 },
            rotation: { x: 0, y: 0, z: 0 }
        },
        front: {
        	translation: { x: 5, y: -5, z: 0 }
        },
        title: {
            translation: { x: 20, y: -40, z: 0 }
        },
        nr: {
            translation: { x: 20, y: 20, z: 0 }
        },
        shadow: {
            translation: { x: -30, y: -30, z: 0 }
        }
    };



    var exp = {
        init: function(sel) {

            $el = $(sel).find('.item');

            elms.title = $el.find('.title');
            elms.image = $el.find('.thumb');
            elms.front = $el.find('.thumb-front');
            elms.nr = $el.find('.nr');
            elms.shadow = $el.find('.img-shadow');

            exp.initEvents();


        },
        initEvents: function() {
            var onmove = _.debounce(exp.mouseMove, 10);
            $('.full-wrapper').on('mousemove', onmove);
            $('.full-wrapper').on('mouseleave', exp.mouseLeave);
        },
        mouseLeave: function() {

            _.each(elms, function(item, key) {
                exp.resetElement(item);
            });

        },
        resetElement: function(el) {
            TweenMax.to(el, moveSpeed, {
                ease: 'Power2.easeOut',
                x: 0,
                y: 0,
                z: 0,
                rotationX: 0,
                rotationY: 0,
                rotationZ: 0
            });
        },
        mouseMove: function(e) {
            var mousepos = getMousePos(e);

            var docScrolls = {
                left: document.body.scrollLeft + document.documentElement.scrollLeft,
                top: document.body.scrollTop + document.documentElement.scrollTop
            };

            var bounds = $el[0].getBoundingClientRect();

            var relmousepos = {
                x: mousepos.x - bounds.left - docScrolls.left,
                y: mousepos.y - bounds.top - docScrolls.top
            };


            _.each(elms, function(item, key) {


                var t = options[key] !== undefined ? options[key].translation || { x: 0, y: 0, z: 0 } : { x: 0, y: 0, z: 0 };
                var r = options[key] !== undefined ? options[key].rotation || { x: 0, y: 0, z: 0 } : { x: 0, y: 0, z: 0 };



                setRange(t);
                setRange(r);

                var transforms = {
                    translation: {
                        x: (t.x[1] - t.x[0]) / bounds.width * relmousepos.x + t.x[0],
                        y: (t.y[1] - t.y[0]) / bounds.height * relmousepos.y + t.y[0],
                        z: (t.z[1] - t.z[0]) / bounds.height * relmousepos.y + t.z[0],
                    },
                    rotation: {
                        x: (r.x[1] - r.x[0]) / bounds.height * relmousepos.y + r.x[0],
                        y: (r.y[1] - r.y[0]) / bounds.width * relmousepos.x + r.y[0],
                        z: (r.z[1] - r.z[0]) / bounds.width * relmousepos.x + r.z[0]
                    }
                };


                TweenMax.to(item, moveSpeed, {
                       ease: 'Power1.easeOut',
                       x: transforms.translation.x,
                       y: transforms.translation.y,
                       z: transforms.translation.z,
                       rotationX: transforms.rotation.x,
                       rotationY: transforms.rotation.y,
                       rotationZ: transforms.rotation.z
                   });


            });



            
        }
    };

    return exp;


})();




$(document).ready(function() {
    GridItem.init('.container');
});