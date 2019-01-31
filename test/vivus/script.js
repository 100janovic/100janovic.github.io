
function createSVGS(sellector, options) {

	var elms = document.body.querySelectorAll(sellector);
	var src = '';
	var duration = 50;
	if(options && options.duration) duration = options.duration;

	var icons = [];

	elms.forEach(function(el) {
		src = el.getAttribute('data-src');
		icons.push(new Vivus(el, {duration: duration, file: src}));
	});

	return icons;

}




var icons = createSVGS('.icon', {duration: 50});

