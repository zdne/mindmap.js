/*
 Copyright (c) 2014 Holger Reinhardt http://de.linkedin.com/in/hrreinhardt (MIT Licensed)
 */

var mindmap_html = {
  // find root node in body
  render: function(elem) {
    for (var $el = $(elem).children(":first"); $el.length>0; $el = $el.next()) {
      switch($el[0].tagName) {
        case 'UL':
          if($('>li', $el).length>0) {
            mindmap_html.add_root($('>li', $el).get(0), mindmap_html.recurse);
          }
          return;
        case 'H1':
          mindmap_html.add_root($el, mindmap_html.iterate);
          return;
      }
    }    
  },

  // heading weight
  h_weight: function(elem) {
    switch(elem[0].tagName) {
      case 'H1': return 1;
      case 'H2': return 2;
      case 'H3': return 3;
      case 'H4': return 4;
      case 'H5': return 5;
      case 'H6': return 6;
      default: return 0;
    }
  },

  // next heading
  h_next: function(elem) {
    switch(elem[0].tagName) {
      case 'H1': return 'H2';
      case 'H2': return 'H3';
      case 'H3': return 'H4';
      case 'H4': return 'H5';
      case 'H5': return 'H6';
    }
  },

  // find next node
  iterate: function(elem) {
    // content included in current heading
    var $included = true;

    // next level down
    var $next_level = mindmap_html.h_next(elem);

    // search for next level among siblings
    for (var $el = $(elem).nextAll(":first"); $el.length>0; $el = $el.next()) {

      switch($el[0].tagName) {
        case 'P':
          if($included) {
            // add as content of current node
            elem.mynode.content.push($el);
            $el.hide();
          }
          break;

        case 'UL':
          if($included) {
            // recurse into list underneath
            $('>li', $el).each(function() {
              mindmap_html.add_node(elem, this, mindmap_html.recurse);
            });
          }
          break;

        case $next_level:
          // add new node under current node
          mindmap_html.add_node(elem, $el, mindmap_html.iterate);
          $included = false;
          break;

        default:
          // same or higher heading
          var $next_weight = mindmap_html.h_weight($el);
          var $current_weight = mindmap_html.h_weight(elem);

          if($next_weight == 0) {
            // ignore element
          }
          else if($next_weight <= $current_weight) {
            // normalize content and stop iterating
            elem.mynode.content.reverse();
            return;
          }
      }
    }

    // normalize content
    elem.mynode.content.reverse();
  },

  // recurse in depth
  recurse: function(elem) {
    $('>ul>li', elem).each(function() {
      mindmap_html.add_node(elem, this, mindmap_html.recurse);
    });
  },

  // add root note to the mindmap
  add_root: function(elem, find_next) {
    // add root node
    elem.mynode = $('body').addRootNode(
      mindmap_html.get_text(elem), 
      {
        href:'/',
        onclick:mindmap_html.on_click
      });

    // add node content
    mindmap_html.add_content(elem);
    $(elem).hide();

    // find next node
    find_next(elem);
  },

  // add elem underneath p_elem
  add_node: function(p_elem, elem, find_next) {
    // add subnode below parent 
    elem.mynode = $('body').addNode(
      p_elem.mynode, 
      mindmap_html.get_text(elem), 
      {
        href:mindmap_html.get_href(elem),
        onclick:mindmap_html.on_click
      });

    // add node content
    mindmap_html.add_content(elem);
    $(elem).hide();

    // find next node
    find_next(elem);
  },

  // show content on click
  on_click: function(node) {
    $(node.obj.activeNode.content).each(function() {
      this.hide();
    });
    $(node.content).each(function() {
      this.show(); 
      node.el.after(this);
    });
  },

  // add paragraphs underneath as node content
  add_content: function(elem) {
    for (var $el = $(elem).children(":first"); $el.length>0; $el = $el.next()) {
      if($el[0].tagName == 'P') {
        elem.mynode.content.push($el);
        $el.hide();
      }
    }
    // revert the order
    elem.mynode.content.reverse();    
  },

  get_text: function(elem) {
    if($(elem).children('a').length>0) {
      return $(elem).children('a').first().text();
    } else {
      return $(elem).contents().eq(0).text();
    }
  },

  get_href: function(elem) {
    if($(elem).children('a').length>0) {
      return $(elem).children('a').first().attr('href');
    } else {
      return $(elem).contents().eq(0).text().toLowerCase();
    }
  },
}
