var Move = (function () {
  
  // Enums
  
  var CONTEXT = Object.freeze({
    PAGE: 0,
    VIEWPORT: 1
  });
  
  // Private stuff
  
  // http://digitaldreamer.net/blog/2010/5/9/getting-browsers-scroll-position-javascript/
  function getScrollY() {
    
    var y = 0;
    
    if (typeof window.pageYOffset == 'number') {
      // Netscape
      y = window.pageYOffset;
    } else if (document.body && document.body.scrollTop) {
      // DOM
      y = document.body.scrollTop;
    } else if (document.documentElement && document.documentElement.scrollTop) {
      y = document.documentElement.scrollTop;
    }
    
    return y;
  }
  
  function getOptions(_options) {
    
    var options = {
      top: 0,
      speed: '300ms',
      easing: 'linear',
      context: CONTEXT.PAGE
    };
    
    options.top = _options.top || options.top;
    options.speed = _options.speed || options.speed;
    options.easing = _options.easing || options.easing;
    options.context = _options.context || options.context;
    
    return options;
  }
  
  function selectElement(_selector) {
    
    if (_selector) {
      var chars = _selector.split('');
      var firstChar = chars[0];
      var selector = chars.slice(1).join('');
      
      if (firstChar === '.') {
        return document.getElementsByClassName(selector)[0];
      } else if (firstChar === '#') {
        return document.getElementById(selector);
      } else {
        return document.getElementsByTagName(_selector)[0];
      }
    } else {
      throw new Error('Must provide a selector.');
    }
  }
  
  function prepareElement(element, options) {
    
    var top = element.offsetTop || element.clientTop;
    
    if (options.context === CONTEXT.VIEWPORT) {
      top = top - getScrollY();
    }
    
    // Vertical 
    element.style.top = top + 'px';
    element.style.transition = 'top ' + options.speed + ' ' + options.easing;
    element.style.width = element.clientWidth + 'px';
    element.style.height = element.clientHeight + 'px';
    element.style.position = 'absolute';
    
    // Horizontal
    element.style.left = '50%';
    element.style.transform = 'translateX(-50%)';
  }
  
  // Move parent object
  
  var Move = {};
  
  // Public
  
  Move.y = function (selector, _options) {

    var element = selectElement(selector);
    var options = getOptions(_options);
    
    if (element) {
      
      // Clean it up in preparation for the move
      prepareElement(element, options);
      
      // Move to...
      element.style.top = options.top + 'px';      
    } else {
      throw new Error('No element was selected with ' + selector);
    }
  };
  
  Move.CONTEXT = CONTEXT;
  
  return Object.create(Move);
 
})();
