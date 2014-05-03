/*
 Copyright (c) 2014 Holger Reinhardt http://de.linkedin.com/in/hrreinhardt (MIT Licensed)
 */
var mindmapjs = {

  // loading components
  setup: function() {
    // Hide body until we're done fiddling with the DOM
    document.body.style.display = 'none';

    // enable the mindmap
    $('body').mindmap();

    // if xmp element exists, trigger mardown
    if(document.getElementsByTagName('xmp')[0]) {
      // render markdown to html
      mindmap_md.render();

      // render html to mindmap
      mindmap_html.render($('#content'));
    } 
    else {
      // render html to mindmap
      mindmap_html.render($('body'));
    }

    // all done - show body
    document.body.style.display = '';
  }
}
$(mindmapjs.setup);