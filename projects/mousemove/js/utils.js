// from http://www.quirksmode.org/js/events_properties.html#position
function getMousePos(e) {
    var posx = 0;
    var posy = 0;
    if (!e) e = window.event;
    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
    } else if (e.clientX || e.clientY) {
        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    return { x: posx, y: posy };
}



function setRange(obj) {
    for (var k in obj) {
        if (obj[k] === undefined) {
            obj[k] = [0, 0];
        } else if (typeof obj[k] === 'number') {
            obj[k] = [-1 * obj[k], obj[k]];
        }
    }
}