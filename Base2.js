var Base = function() {

  var privateProperties = {
    name: ''
  };

  this.getProperty = function(n) {
    return privateProperties[n];
  };

  this.setProperty = function(n, val) {
    console.log('setting prop ' + n + ' to ' + val);
    privateProperties[n] = val;
  };

  this.toString = function() {
    return 'Base';
  };

  this.getProps = function() {
    return privateProperties;
  };

  // Init all our properties
  this.name = 'Base';

};

Base.prototype = {

  get name() {
    return this.getProperty('name');
  },
  set name(val) {
    console.log('     used Base.name setter to ' + val);
    this.setProperty('name', val);
  }

};




////////////////////////////////////////////////////////////////////////////////




var Child = function() {

  var privateProperties = {};

  // Copy getters and setters from parent
  // Works in FireFox with g/s in either constructor or prototype
  // works in Chrome only with g/s on prototype
  _.extendGS(this, new Base());

  // Define functions in the constructor
  this.toString = function() {

    return 'Child {name: ' + this.name +
           ', x: ' + this.x +
           ', y: ' + this.y +
           ', length: ' + this.length + '}';

  };

  // Init all our attributes to defaults;
  this.x = 0;
  this.y = 0;
  this.name = 'Child';

};

Child.inherits(Base);

// Define our getters and setters
Object.defineProperties(Child.prototype, {
  x: {
    get: function() {
      return this.getProperty('x');
    },
    set: function(val) {
      // console.log('     used Child.x setter to ' + val);
      this.setProperty('x', val);
    }
  },
  y: {
    get: function() {
      return this.getProperty('y');
    },
    set: function(val) {
      // console.log('     used Child.y setter to ' + val);
      this.setProperty('y', val);
    }
  },
  length: {
    get: function() {
      return this.x + this.y;
    }
  }
});



