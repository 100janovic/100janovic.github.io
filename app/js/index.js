var Site = function(Device) {
    var exp = {
        router: function() {
            Hashbang.map('/', function() {
                
            });
        }
    }

    function init() {
        exp.router();
        Device.check();
    }
    init();

    return exp;

}



// init site after dom ready
$(document).ready(function() {
    var site = Site(Device);
});
