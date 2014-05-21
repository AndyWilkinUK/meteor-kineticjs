/*****************************************************************************/
/* Canvas Publish Functions
/*****************************************************************************/

Meteor.publish('pictures', function () {
  // you can remove this if you return a cursor
  //this.ready();
  return Pictures.find();
});
