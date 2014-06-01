/* View Change
 * 
 * By Jamie Kowalski
 * github.com/jamiekowalski
 * 
 * This code provides the mechanism for loading a set of pages with AJAX.
 * It adds the constructor function ViewChange to the global scope.
 * 
 * Dependencies:
 * jQuery, jquery.com
 * jQuery Hash-change plugin, github.com/cowboy/jquery-hashchange
 * 
 * Usage:
 * 
 * var vc = ViewChange({
 *   linkURLs: [
 *     'about',
 *     'work',
 *     'contact'
 *   ],
 *   defaultExtension: '.htm'
 * })
 * 
 * The only required option is linkURLs (an array of filenames, optionally with 
 * extension). See code below for further options.
 * 
 */

var ViewChange = function (opts) {
  
  var v = this;

  v.options = {
    currentLinkClass: 'current',
    linkURLpath: 'views/',
    linkSelector: '#nav li a',
    contentSelector: '#content',
    linkURLs: [],
    defaultExtension: 'html'
  }
  
  // copy options from arguments to ViewChange object
  for ( var op in opts ) {
    if (v.options[op] !== undefined) {
      v.options[op] = opts[op];
    }
  }
  
  // add trailing slash to directory name, if necessary
  if (v.options.linkURLpath && ! v.options.linkURLpath.match(/\/$/)) {
    v.options.linkURLpath += '/';
  }
  
  // add leading dot to file extension, if necessary
  if (v.options.defaultExtension && v.options.defaultExtension.charAt(0) !== '.') {
    v.options.defaultExtension = '.' + v.options.defaultExtension;
  }
  
  // add extensions to filenames, if necessary
  for ( var i = 0; i < v.options.linkURLs.length; i++ ) {
    var URL = v.options.linkURLs[i]
    v.options.linkURLs[i] = URL.match(/^[^\.]*$/) ? URL + 
      v.options.defaultExtension : URL;
  }
  
  var hashChangeEvent = 'hashchange';
  v.hashes = [];
  v.links = null;
  v.currentIndex = null;
  
  
  $(function () { // On page load, add page elements as object properties and bind hashchange event to window
    v.links = $(v.options.linkSelector);
    
    v.links.each(function(i){
      v.hashes[i] = $(this).attr('href');
    });
    
    $(window).bind( hashChangeEvent, function (e) {
      var hash = location.hash;
      if ( hash == '' | hash == '#' ) {
        hash = v.hashes[0];
      }
      for ( i = 0; i < v.hashes.length; i++ ) {
        if ( hash == v.hashes[i] ) {
          var link = v.options.linkURLpath + v.options.linkURLs[i]
          var ii = i;
        }
      }
      
      $.get( link, function (data) {
        v.currentIndex = ii;
        $(v.options.contentSelector).html(data);
        $(window).scrollTop(0);
        v.links.each(function () {
          $(this).removeClass(v.options.currentLinkClass);
        })
        v.links.eq(v.currentIndex).addClass(v.options.currentLinkClass);
      });
    });
    
    $(window).trigger(hashChangeEvent);
  });
  
};
