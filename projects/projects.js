var initNav = function() {

    var title = {
        'label': '100janovic.github.io',
        'url': 'https://100janovic.github.io',
        'hash': '100janovic.github.io'
    };

    var mainTitle = 'Explore';

    var navItems = [{
        'label': 'Slider animation',
        'url': 'https://100janovic.github.io/projects/slideranimation/',
        'hash': 'slideranimation'
    }, {
        'label': 'Grid Layout',
        'url': 'https://100janovic.github.io/projects/grid/',
        'hash': 'grid'
    }, {
        'label': 'Mouse move',
        'url': 'https://100janovic.github.io/projects/mousemove/',
        'hash': 'mousemove'
    }, {
        'label': 'eWallet',
        'url': 'https://100janovic.github.io/projects/ewallet/',
        'hash': 'ewallet'
    }];




    // helpers
    function _forEach(arr, fn) {
        var i = 0;
        var total = arr.length;
        for (i = 0; i < total; i++) {
            fn(i, arr[i]);
        }
    }


    var navEl = document.querySelector('.projects-nav');
    var html = '';
    var isActive = '';
    var active = document.body.getAttribute('data-project');


    html += '<a href="' + title.url + '" class="active"><span>' + title.label + '</span></a>';
    html += '<div class="projects-title">' + mainTitle + '</div>';


    _forEach(navItems, function(_, item) {
        if (item.hash == active) {
            isActive = 'active';
        } else {
            isActive = '';
        }
        html += '<a href="' + item.url + '" class="' + isActive + '">- <span>' + item.label + '</span></a>';
    });

    navEl.innerHTML = html;

};



window.onload = function() {
    initNav();
};