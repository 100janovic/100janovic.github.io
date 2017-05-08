var Site = function() {
    var exp = {
        router: function() {

            Hashbang.map('/', function() {
                
            });
        }
    }

    function init() {
        exp.router();
    }
    init();

    return exp;

}



// init site after dom ready
$(document).ready(function() {
    var site = Site();
});
