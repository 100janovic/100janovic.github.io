var Utility = {
    getWidth: function() {
        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    },
    getHeight: function() {
        return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    },
    getBaseUrl: function() {
        return window.location.hostname + window.location.pathname;
    },
    getCurrentUrl: function() {
        return window.location.hostname + window.location.pathname + window.location.search + window.location.hash;
    },
    extend: function(a, b) {
        for (var key in b) {
            if (b.hasOwnProperty(key) && !a.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
        return a;
    },
    template: function(text, values) {
        return text.replace(/\{\{(\w+)\}\}/g, function(_, name) {
            if (!values[name]) return '';
            else return values[name];
        });
    },
    getNext: function(_index, _array) {
        var total = _array.length;
        if (_index >= total - 1) {
            return _array[0];
        } else {
            return _array[_index + 1];
        }
    },
    getPrev: function(_index, _array) {
        var total = _array.length;
        if (_index === 0) {
            return _array[total - 1];
        } else {
            return _array[_index - 1];
        }
    },
    getNextIndex: function(_index, _array) {
        var total = _array.length;
        if (_index >= total - 1) {
            return 0;
        } else {
            return _index + 1;
        }
    },
    getPrevIndex: function(_index, _array) {
        var total = _array.length;
        if (_index === 0) {
            return total - 1;
        } else {
            return _index - 1;
        }
    },
    getRandomIndex: function(min, max) {
        return (Math.floor(Math.random() * (max - min + 1)) + min);
    },
    countObjectProps: function(obj) {
        var count = 0;
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                ++count;
            }
        }
        return count;
    },
    getJson: function(url, callback) {
        $.ajax({
            type: "GET",
            url: url,
            dataType: "jsonp",
            crossDomain: 'true',
            success: function(data) { callback(data); },
            jsonpCallback: 'callback'
        });
    },
    shuffle: function(a) {
        var j, x, i;
        for (i = a.length; i; i -= 1) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
        return a;
    },
    isScrolledIntoView: function(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && (elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    },
    parseURL: function(url) {
        if (!url) url = location.href;
        var at = url.indexOf('?');
        var a = url.substring(at + 1);
        var pairs = a.split('&');
        var i = 0;
        var urlparams = {};
        for (i = 0; i < pairs.length; i++) {
            if (pairs[i].indexOf('=') === -1) continue;
            var params_individual = pairs[i].split('=');
            urlparams[params_individual[0]] = decodeURIComponent(params_individual[1]);
        }
        return urlparams;
    },
    check: {
        mp4: function() {
            return (document.createElement('video').canPlayType('video/mp4')) ? true : false;
        },
        Chrome: function() {
            return (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) ? true : false;
        },
        Safari: function() {
            if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
                return true;
            } else {
                return false;
            }
        },
        FireFox: function() {
            return (navigator.userAgent.indexOf('Firefox') > -1) ? true : false;
        },
        IE: function() {
            return (navigator.userAgent.indexOf('MSIE') > -1) ? true : false;
        },
        IEVersion: function() {
            if (/Edge\/\d./i.test(navigator.userAgent)) {
                // This is Microsoft Edge
                return 12;
            } else {
                var ua = window.navigator.userAgent;

                if (ua.indexOf("Trident/7.0") > 0)
                    return 11;
                else if (ua.indexOf("Trident/6.0") > 0)
                    return 10;
                else if (ua.indexOf("Trident/5.0") > 0)
                    return 9;
                else
                    return false; // not IE9, 10 or 11
            }
        },
        Opera: function() {
            return (navigator.userAgent.toLowerCase().indexOf("op") > -1) ? true : false;
        },
        AndroidPhone: function() {
            if (navigator.userAgent.match(/Android/i) && navigator.userAgent.match(/Mobile/i)) {
                return true;
            } else {
                return false;
            }
        },
        AndroidTablet: function() {
            if (navigator.userAgent.match(/Android/i) && !navigator.userAgent.match(/Mobile/i)) {
                return true;
            } else {
                return false;
            }
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i) ? true : false;
        },
        iPad: function() {
            return navigator.userAgent.match(/iPad/i) ? true : false;
        },
        iPhone: function() {
            return navigator.userAgent.match(/iPhone|iPod/i) ? true : false;
        },
        WindowsTablet: function() {
            return (navigator.userAgent.toLowerCase().indexOf("windows nt") != -1 && navigator.userAgent.toLowerCase().indexOf("touch") != -1);
        },
        WindowsPhone: function() {
            return (navigator.userAgent.toLowerCase().indexOf("windows phone") != -1);
        },
        tablet: function() {
            return (Utility.check.AndroidTablet() || Utility.check.iPad() || Utility.check.WindowsTablet());
        },
        phone: function() {
            return (Utility.check.AndroidPhone() || Utility.check.iPhone() || Utility.check.WindowsPhone());
        },
        touch: function() {
            return (Utility.check.phone() || Utility.check.tablet());
        }
    }
};
