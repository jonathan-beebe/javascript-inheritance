



goog.provide('Base');
goog.provide('Child');




/**
 * @constructor
 * 
 */
var Base = function() {

  /**
   * @private
   */
  this.name_ = 'Base';

};

Base.prototype = {

  get name() {
    return this.name_;
  },
  set name(val) {
    console.log('     used Base.name setter to ' + val);
    this.name_ = val;
  }

};

Base.prototype.toString = function() {
  return this.name_;
};




////////////////////////////////////////////////////////////////////////////////




/**
 * @constructor
 * @extends Base
 */
var Child = function(n) {

  /**
   * @private
   */
  this.x_ = 0;
  
  /**
   * @private
   */
  this.y_ = 0;
  
  this.name = n || 'Child';

};

goog.inherits(Child, Base);

/**
 * @return {string} Human-readable representation of object
 * @override
 */
Child.prototype.toString = function() {
  return 'Child {name: ' + this.name +
  ', x: ' + this.x +
  ', y: ' + this.y +
  ', length: ' + this.length + '}';
};

// Define our getters and setters
Object.defineProperties(Child.prototype, {
  x: {
    get: function() {
      return this.x_;
    },
    set: function(val) {
      // console.log('     used Child.x setter to ' + val);
      this.x_ = val;
    }
  },
  y: {
    get: function() {
      return this.y_;
    },
    set: function(val) {
      // console.log('     used Child.y setter to ' + val);
      this.y_ = val;
    }
  },
  length: {
    get: function() {
      return this.x + this.y;
    }
  }
});



