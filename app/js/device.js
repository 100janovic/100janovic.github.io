var Device = (function() {

    var exp = {
        get: function() {
            if (Utility.check.phone()) {
                return 'phone';
            } else if (Utility.check.tablet()) {
                return 'tablet';
            } else {
                return 'desktop';
            }
        },
        check: function() {
            var device = exp.get();
            if (device == 'phone') {
                $('body').removeClass('desktop').addClass('phone');
                exp.adjustViewport(640);
            } else if (device == 'tablet') {
                $('body').removeClass('desktop').addClass('tabket');
                exp.adjustViewport(768);
            }
        },
        adjustViewport: function(width) {
            $('meta[name=viewport]').attr('content', 'width=' + width + ', user-scalable=no');
        }
    }

    return exp;

})();
