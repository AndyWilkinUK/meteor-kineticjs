if (Pictures.find().count() === 0) {

	var now = new Date().getTime();

	Pictures.insert({
		title: 'Darth Vada',
		x: 100,
		y: 30,
		width: 200,
		height: 137,
		url: 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg',
		submitted: now - 7 * 3600 * 1000
	});

}