CanvasController = RouteController.extend({
	waitOn: function() {
		return Meteor.subscribe('pictures');
	},

	data: function() {

	},

	action: function() {
		this.render();
		//	console.log('Here again....');
	}
});