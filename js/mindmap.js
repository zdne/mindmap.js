/*
 component Loader design inspired by 
 http://24ways.org/2007/keeping-javascript-dependencies-at-bay/ 

 Copyright (c) 2014 Holger Reinhardt http://de.linkedin.com/in/hrreinhardt (MIT Licensed)

 MIT (X11) license

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

var mindmapjs = {

  // component definitions
  components: {
    raphael_svg: {
      url: 'js/raphael-min.js',
      loaded: false
    },
    js_mindmap: {
      url: 'js/js-mindmap.js',
      loaded: false
    },
    mindmap_html: {
      url: 'js/mindmap-html.js',
      loaded: false
    },
    marked: {
      url: 'js/marked.js',
      loaded: false
    },
    mindmap_md: {
      url: 'js/mindmap-md.js',
      loaded: false
    }
  },

  addComponent: function(component){
    var c = this.components[component];
    if(c && c.loaded === false){
      var s = document.createElement('script');
      s.setAttribute('type', 'text/javascript');
      s.setAttribute('src',c.url);
      document.getElementsByTagName('head')[0].appendChild(s);
    }
  },
  componentAvailable: function(component){
    this.components[component].loaded = true;
    if(this.listener){
      this.listener(component);
    };
  },  

  // loading components
  setup: function() {
    // Hide body until we're done fiddling with the DOM
    document.body.style.display = 'none';

    // start loading dependencies
    if(!mindmapjs.components.raphael_svg.loaded){
      mindmapjs.addComponent('raphael_svg');
    };
    if(!mindmapjs.components.js_mindmap.loaded){
      mindmapjs.addComponent('js_mindmap');
    };

  },

  listener: function(component) {
  	// load html parser after mindmap rendering engine
	  if(component == 'js_mindmap') {
	    if(!mindmapjs.components.mindmap_html.loaded){
	      mindmapjs.addComponent('mindmap_html');
	    };
  	}

  	// html support is loaded
	  if(component == 'mindmap_html') {
      // enable the mindmap
      $('body').mindmap();

      // if xmp element exists, trigger mardown
      if(document.getElementsByTagName('xmp')[0]) {
        // load the markdown support
        if(!mindmapjs.components.marked.loaded){
          mindmapjs.addComponent('marked');
        }
        if(!mindmapjs.components.mindmap_md.loaded){
          mindmapjs.addComponent('mindmap_md');
        }
      } else {
        // render html to mindmap
        mindmap_html.render($('body'));

        // all done - show body
        document.body.style.display = '';
      }
  	}

  	// markdown support is loaded
	  if(component == 'mindmap_md') {
      // render markdown to html
	    mindmap_md.render();
      // render html to mindmap
      mindmap_html.render($('#content'));

      // all done - show body
      document.body.style.display = '';
  	}
  }
}
$(mindmapjs.setup);

