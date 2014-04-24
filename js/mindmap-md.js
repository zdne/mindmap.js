/*
 Markdown support based on  
 https://github.com/arturadib/strapdown 

 Copyright (c) 2012 Artur B. Adib (MIT Licensed)
 Copyright (c) 2014 Holger Reinhardt http://de.linkedin.com/in/hrreinhardt (MIT Licensed) 
 */

var mindmap_md = {
  // render markdown to html
  render: function() {

    //////////////////////////////////////////////////////////////////////
    //
    // Shims for IE < 9
    //

    document.head = document.getElementsByTagName('head')[0];

    if (!('getElementsByClassName' in document)) {
      document.getElementsByClassName = function(name) {
        function getElementsByClassName(node, classname) {
          var a = [];
          var re = new RegExp('(^| )'+classname+'( |$)');
          var els = node.getElementsByTagName("*");
          for(var i=0,j=els.length; i<j; i++)
              if(re.test(els[i].className))a.push(els[i]);
          return a;
        }
        return getElementsByClassName(document.body, name);
      }
    }

    //////////////////////////////////////////////////////////////////////
    //
    // Get user elements we need
    //

    var markdownEl = document.getElementsByTagName('xmp')[0] || document.getElementsByTagName('textarea')[0],
        titleEl = document.getElementsByTagName('title')[0],
        scriptEls = document.getElementsByTagName('script'),
        linkEls = document.getElementsByTagName('link'),
        navbarEl = document.getElementsByClassName('navbar')[0];

    //////////////////////////////////////////////////////////////////////
    //
    // <head> stuff
    //

    // Use <meta> viewport so that Bootstrap is actually responsive on mobile
    var metaEl = document.createElement('meta');
    metaEl.name = 'viewport';
    metaEl.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0';
    if (document.head.firstChild)
      document.head.insertBefore(metaEl, document.head.firstChild);
    else
      document.head.appendChild(metaEl);

    // Get origin of script
    var origin = '';
    for (var i = 0; i < linkEls.length; i++) {
      if (linkEls[i].href.match('mindmap')) {
        origin = linkEls[i].href;
        break;
      }
    }
    var originBase = origin.substr(0, origin.lastIndexOf('/'));

    // Get theme
    var theme = markdownEl.getAttribute('theme') || 'bootstrap';
    theme = theme.toLowerCase();

    // Stylesheets
    var linkEl = document.createElement('link');
    linkEl.href = originBase + '/themes/'+theme+'.min.css';
    linkEl.rel = 'stylesheet';
    document.head.appendChild(linkEl);

    var linkEl = document.createElement('link');
    linkEl.href = originBase + '/themes/bootstrap-responsive.min.css';
    linkEl.rel = 'stylesheet';
    document.head.appendChild(linkEl);

    //////////////////////////////////////////////////////////////////////
    //
    // <body> stuff
    //

    var markdown = markdownEl.textContent || markdownEl.innerText;

    var newNode = document.createElement('div');
    newNode.className = 'container';
    newNode.id = 'content';
    document.body.replaceChild(newNode, markdownEl);

    // Insert navbar if there's none
    var newNode = document.createElement('div');
    newNode.className = 'navbar navbar-fixed-top';
    if (!navbarEl && titleEl) {
      newNode.innerHTML = '<div class="navbar-inner"> <div class="container"> <div id="headline" class="brand"> </div> </div> </div>';
      document.body.insertBefore(newNode, document.body.firstChild);
      var title = titleEl.innerHTML;
      var headlineEl = document.getElementById('headline');
      if (headlineEl)
        headlineEl.innerHTML = title;
    }

    //////////////////////////////////////////////////////////////////////
    //
    // Markdown!
    //

    // Generate Markdown
    var html = marked(markdown);
    document.getElementById('content').innerHTML = html;
  }
}

// notify that we are loaded
mindmapjs.componentAvailable('mindmap_md');

