mindmap.js
=========

Mindmap.js makes it simple to create elegant Mindmaps from HTML and Markup documents in your browser. **No server-side compilation required**.

This project was borne out of my frustration wanting to summarize papers and books in text form but render them as Mindmaps. I took inspiration from the reveal.js framework allowing the decoupling of content from presentation. 

## Usage

Checkout the [project page](http://hlgr360.github.io/mindmap.js/) for a live example.

### Browser

Here is a complete example or strapdown.js style markup document rendered as Mindmap:

```html
<!DOCTYPE html>
<html>
    <title>My Mindmap</title>

    <!-- jQuery -->
    <script src="js/jquery.min.js" type="text/javascript"></script>
    <script src="js/jquery-ui.min.js" type="text/javascript" ></script>

    <!-- mindmap.js -->
    <link href="css/mindmap.css" rel="stylesheet" type="text/css"/>
    <script src="js/mindmap.js" type="text/javascript"></script>

    <xmp theme="slate" style="display:none;">
# Markdown

Lorem ipsum dolor sit amet

## Chapter 1
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 

## Chapter 2
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 

## Chapter 3
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 

[mindmap.js](https://github.com/hlgr360/mindmap.js)

* bullet 1
* bullet 2
* bullet 3
    </xmp>
</html>
```

Clone the repository and open the sample files in your browser. 

## Credits
This project would have not been possible without the following top-level projects:  
* [js-mindmap](https://github.com/kennethkufluk/js-mindmap) for mindmap rendering
* [strapdown.js](https://github.com/arturadib/strapdown) for markup rendering

### Contributing
Do the usual GitHub fork and pull request dance for contributing.

If you contribute code to this project, you are implicitly allowing your code
to be distributed under the MIT license. 

## License
Released under the MIT License. See LICENSE for more info.
