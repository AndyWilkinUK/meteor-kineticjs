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
      console.log('Added Called');
      console.log(doc);
      imageObj = new Image();
      //console.log(doc.url);
      //console.log(imageObj.src + ' hello');
      imageObj.src = doc.url;
      $('#container').append(imageObj);
      imageObj.onload = function() {
      darth = new Kinetic.Image({
        x: doc.x,
        y: doc.y,
        image: imageObj,
        width: doc.width,
        height: doc.height,
        draggable: true
      })
        .on('dragmove', function() {
          var newXY = {
            x: darth.getAttr('x'),
            y: darth.getAttr('y')
          };
          Puzzle.update(doc._id, {
            $set: newXY
          });
        })
        .on('dragend', function() {
          var newXY = {
            x: darth.getAttr('x'),
            y: darth.getAttr('y')
          };
          Puzzle.update(doc._id, {
            $set: newXY
          });
        });


      layer.draw();
      };
    },
    changed: function(doc) {
      console.log('changed');
      //square.setContent(clickCounter.number);
    }
  });

  layer.draw();



};

Template.Canvas.destroyed = function() {};