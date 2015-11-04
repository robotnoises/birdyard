var Move = (function () {
  
  // Private stuff
  
  function getOptions(_options) {
    
    var options = {
      top: 0,
      speed: '300ms'
    };
    
    options.top = _options.top || options.top;
    options.speed = _options.speed || options.speed;
    
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
    element.style.top = top + 'px';
    element.style.transition = 'top ' + options.speed + ' ease-in';
    element.style.width = element.clientWidth + 'px';
    element.style.position = 'absolute';
    element.style.left = '50%';
    element.style.transform = 'translateX(-50%)';
    element.style.paddingTop = '0';
    element.style.marginTop = '0';
  }
  
  // Move parent object
  
  var Move = {
    scrolling: false
  }
  
  // Move methods
  
  Move.y = function (selector, _options) {
    
    var element = selectElement(selector);
    var options = getOptions(_options);
    
    if (element) {
      
      // Clean it up in preparation for the move
      prepareElement(element, options);
      
      // Move to... 
      element.style.top = options.top;
      
    } else {
      throw new Error('No element was selected with ' + selector);
    }
  };
  
  return Object.create(Move);
 
})();
