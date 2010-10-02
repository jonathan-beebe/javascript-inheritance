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

  // Priveleged method can access the private stuff
  // Notice we override this in one of the child classes
  this.renderProperties = function() {
    console.log('this: ', this);
    console.log('x: ', x_);
    console.log('y: ', y_);
    console.log('name: ', name_);
  };

  // Define our getters and setters
  this.addProperties({
    x: {
      get: function() {
        return x_;
      },
      set: function(val) {
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

  this.addProperties({
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

// Inherit from our parent class
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

// Inherit from our parent class
Child2.inherits(Base);

// Add all getter/setter properties
Child2.addProperties({
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

  that.addProperties({
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

}
