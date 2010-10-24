/**
 * Define our base class, complete with:
 * private properties,
 * priveledged functions,
 * public functions,
 * official getters and setters
 *
 * @this Base
 * @constructor
 * @param {number} x The x.
 * @param {number} y The y.
 * @param {string} name The name.
 */
var Base = function(x, y, name) {

  // Private properties
  var x_,
      y_,
      name_;

  // Define our getters and setters
  // Careful...these will not be copied over using an extends method
  // also, if you create a child be using .prototype = new Base() then
  // all children will share the same base obj, thus same base properties.
  Object.defineProperties(this, {
    x: {
      get: function() {
        return x_;
      },
      set: function(val) {
        //console.log('Base.set x to ' + val);
        x_ = val;
      }
    },
    y: {
      get: function() {
        return y_;
      },
      set: function(val) {
        y_ = val;
      }
    },
    name: {
      get: function() {
        return name_;
      },
      set: function(val) {
        name_ = val;
      }
    },
    length: {
      get: function() {
        return Math.sqrt((x_ * x_) + (y_ + y_));
      }
    }
  });

  // Priveleged method can access the private stuff
  // Notice we override this in one of the child classes
  this.renderProperties = function() {
    console.log('this: ', this);
    console.log('x: ', x_);
    console.log('y: ', y_);
    console.log('name: ', name_);
  };

  // Initialize attributes
  this.init(x, y, name);

};


/**
 * Render this object as a string
 *
 * @return {string} Object rendered as string.
 */
Base.prototype.toString = function() {
  var s = this.name + ' = {x:' + this.x +
          ', y:' + this.y +
          ', length:' + this.length + '}';
  return s;
};

/**
 * Init this object
 * Called by the constructor
 * Notice that children can override this function and call
 * the Base init using the 'uber' method.
 *
 * @param {number} x The x.
 * @param {number} y The y.
 * @param {string} name The name.
 */
Base.prototype.init = function(x, y, name) {
  this.x = x || 0;
  this.y = y || 0;
  this.name = name || 'Base';
};




////////////////////////////////////////////////////////////////////////////////




/**
 * Classical Inheritance using Crawford's sugar functions
 * http://bit.ly/crawford-inheritance.
 *
 * This child adds getters and setters before inheriting from parent
 * The next child example shows adding getters/setters after inheritance
 *
 * @this Child
 * @extends {Base}
 *
 * @param {number} x The x.
 * @param {number} y The y.
 * @param {number} w The w.
 * @param {number} h The h.
 * @param {string} name The name.
 */
function Child(x, y, w, h, name) {

  var width_,
      height_;


  Object.defineProperties(this, {
    width: {
      get: function() {
        return width_;
      },
      set: function(val) {
        width_ = val;
      }
    },
    height: {
      get: function() {
        return height_;
      },
      set: function(val) {
        height_ = val;
      }
    }
  });

  this.init(x, y, w, h, name);

}

// Child.prototype = Base.prototype;
// Inherit from our parent class
// ALL instances of the Child class will share one common
// Base object on their prototype. Thus all child.x properties
// will be the same. Not desired...
Child.inherits(Base);

// Override the toString function
Child.method('toString', function() {
  var s = this.name + ' = {x:' + this.x + ', y:' + this.y +
          ', width:' + this.width +
          ', height:' + this.height +
          ', length:' + this.length + '}';
  return s;
});

// Extend the init function.
// Be sure to call the parent init via uber
Child.method('init', function(x, y, w, h, name) {
  this.uber('init', x, y, name);
  this.height = h || 0;
  this.width = w || 0;
});




////////////////////////////////////////////////////////////////////////////////





/**
 * Classical Inheritance v2 using Crawford's sugar functions
 * http://bit.ly/crawford-inheritance
 *
 * This child adds getters and setters after inheriting from parent
 * The previous child example shows adding getters/setters before inheritance
 *
 * @this Child2
 * @extends {Base}
 *
 * @param {number} x The x.
 * @param {number} y The y.
 * @param {number} w The w.
 * @param {number} h The h.
 * @param {string} name The name.
 */
function Child2(x, y, w, h, name) {

  var width_,
      height_,
      name_; // notice this is never used because we're setting the parent

  // Priveleged method can access the private stuff
  // notice that this was defined in Base class, which
  // we inherit from later. The parent function is
  // accessed via the .uber() method.
  this.renderProperties = function() {

    console.log('------------------\n',
                'parent.renderProperties: ');
    this.uber('renderProperties');
    console.log('------------------');

    console.log('My renderProperties:');
    console.log('this: ', this);
    console.log('Notice that we do not have access to name_ here',
                ' because the setter is defined on the parent class',
                ' and we set it using the parent\'s constructor.',
                ' So we must access it via the getter\n\n',
                'Alternatively, we could redefine the "name" setter/getter',
                ' so we would have access to the private name_ here');
    console.log('name_: ', name_);
    console.log('this.name: ', this.name);
    console.log('width: ', this.width);
    console.log('height: ', this.height);

    console.log('------------------');
  };

  this.init(x, y, w, h, name);

}

// Inherit from our patoStringrent class
Child2.inherits(Base);

// Add all getter/setter properties
Object.defineProperties(Child2, {
  width: {
    get: function() {
      return width_;
    },
    set: function(val) {
      width_ = val;
    }
  },
  height: {
    get: function() {
      return height_;
    },
    set: function(val) {
      height_ = val;
    }
  }
});

// Override the toString function
Child2.method('toString', function() {
  var s = this.name + ' = {x:' + this.x + ', y:' + this.y +
          ', width:' + this.width +
          ', height:' + this.height +
          ', length:' + this.length + '}';
  return s;
});

// Extend the init function.
// Be sure to call the parent init via uber
Child2.method('init', function(x, y, w, h, name) {
  this.uber('init', x, y, name);
  this.height = h || 0;
  this.width = w || 0;
});




////////////////////////////////////////////////////////////////////////////////





/**
 * Kinda like parasite (below) but we return an object for the public interface
 * Pros: Define getters n setters uing object notation. Obvious which properties
 * come from the parent or from this class (this.blah or that.blah).
 * Cons: child instanceof Child3 will not work, can only extend via parasite
 */
var Child3 = function(x, y, w, h, name) {

  var width_ = w || 0,
      height_ = h || 0,

      // Create our 'parent'
      that = new Base(x, y, name);

  // Public interface
  var obj = {

    get width() {
      return width_;
    },
    set width(val) {
      width_ = val;
    },
    get height() {
      return height_;
    },
    set height(val) {
      height_ = val;
    },

    toString: function() {
      var s = that.name + ' = {x:' + that.x + ', y:' + that.y +
          ', width:' + this.width +
          ', height:' + this.height +
          ', length:' + that.length + '}';
      return s;
    }

  };

  // Add in all the base getters and setters
  inherits2(obj, that);

  return obj;

};






////////////////////////////////////////////////////////////////////////////////




/**
 * Parasitic Inheritance
 * http://www.crockford.com/javascript/inheritance.html
 *
 * Pros: all code contained within the Parasite wrapper function
 * Cons: it can only be extended new child clases via parasitic inheritance.
 *       we cannot access that.prototype because it's private to the class
 *
 * @this Parasite
 * @extends {Base}
 *
 * @param {number} x The x.
 * @param {number} y The y.
 * @param {number} w The w.
 * @param {number} h The h.
 * @return {Parasite} A new Parasite object.
 */
function Parasite(x, y, w, h) {

  var width_,
      height_,
      that = new Base(x, y, 'Parasite');

  Object.defineProperties(that, {
    width: {
      get: function() {
        return width_;
      },
      set: function(val) {
        width_ = val;
      }
    },
    height: {
      get: function() {
        return height_;
      },
      set: function(val) {
        height_ = val;
      }
    }
  });

  // Override a function
  that.toString = function() {
    var s = this.name + ' = {x:' + this.x +
            ', y:' + this.y +
            ', width:' + this.width +
            ', height:' + this.height +
            ', length:' + this.length + '}';
    return s;
  };

  // Initialize attributes
  that.height = h || 0;
  that.width = w || 0;

  return that;

};


var Parasite2 = function(x, y, w, h, name, power) {

  var power_,
      that = new Parasite(x, y, w, h),
      name = name || 'Parasite 2';

  that.name = name;

  Object.defineProperties(that, {
    power: {
      get: function() {
        return power_;
      },
      set: function(val) {
        power_ = val;
      }
    }
  });

  return that;

};
