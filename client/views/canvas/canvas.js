/*****************************************************************************/
/* Canvas: Event Handlers and Helpers */
/*****************************************************************************/
Template.Canvas.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.Canvas.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
  Pictures: function() {
    return Pictures.find();
  }
});


/*****************************************************************************/
/* Canvas: Lifecycle Hooks */
/*****************************************************************************/

Template.Canvas.created = function() {

};

Template.Canvas.rendered = function() {

  console.log('In Template Rndered');
  /* Canvas: Kinetic Playing... */
  stage = new Kinetic.Stage({
    container: "container",
    width: (window.innerWidth / 100) * 100,
    height: (window.innerHeight / 100) * 100
  });

  layer = new Kinetic.Layer();
  // add the layer to the stage

  stage.add(layer);

  Pictures.find().observe({
    added: function(doc) {
      kineticImage = {};
      kineticImageObj = new Image();
      kineticImageObj.src = doc.url;
      //$('body').append(kineticImageObj);
      kineticImageObj.onload = function() {
        console.log('here mum Im loading');
        kineticImage[doc._id] = new Kinetic.Image({
          x: doc.x,
          y: doc.y,
          image: kineticImageObj,
          width: doc.width,
          height: doc.height,
          draggable: true
        })
          .on('dragmove', function() {
            var newXY = {
              x: kineticImage[doc._id].getAttr('x'),
              y: kineticImage[doc._id].getAttr('y')
            };
            Pictures.update(doc._id, {
              $set: newXY
            });
          })
          .on('dragend', function() {
            var newXY = {
              x: kineticImage[doc._id].getAttr('x'),
              y: kineticImage[doc._id].getAttr('y')
            };
            Pictures.update(doc._id, {
              $set: newXY
            });
          });

        layer.add(kineticImage[doc._id]);
        layer.draw();
      };
    },
    changed: function(doc) {
      kineticImage[doc._id].setAttr('x', doc.x);
      kineticImage[doc._id].setAttr('y', doc.y);
      layer.draw();
    }
  });

  layer.draw();



};

Template.Canvas.destroyed = function() {};