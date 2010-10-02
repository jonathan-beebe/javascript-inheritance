/**
 * Sugar methods from Douglas Crawford
 * http://bit.ly/crawford-inheritance
 *
 * @this Function
 * @param {string} name The name of the method to add.
 * @param {function} func The function to add.
 * @return {Function} The function object.
 */
Function.prototype.method = function(name, func) {
  this.prototype[name] = func;
  return this;
};

Function.method('inherits', function(parent) {
  var d = {}, p = (this.prototype = new parent());
  this.method('uber', function uber(name) {
    if (!(name in d)) {
      d[name] = 0;
    }
    var f, r, t = d[name], v = parent.prototype;
    if (t) {
      while (t) {
        v = v.constructor.prototype;
        t -= 1;
      }
      f = v[name];
    } else {
      f = p[name];
      if (f == this[name]) {
        f = v[name];
      }
    }
    d[name] += 1;
    r = f.apply(this, Array.prototype.slice.apply(arguments, [1]));
    d[name] -= 1;
    return r;
  });
  return this;
});

Function.method('swiss', function(parent) {
  for (var i = 1; i < arguments.length; i += 1) {
    var name = arguments[i];
    this.prototype[name] = parent.prototype[name];
  }
  return this;
});

/**
 * A generic way to define a getter/setter for
 * objects in both the old Mozilla way and the new ECMA standard way,
 * which should work in I.E. with DOM Elements, but not js objects.
 *
 * more info on javascript getters and setters:
 * John Resig: http://bit.ly/resig-js-gs-2007
 * Robert Nyman: http://bit.ly/nyman-js-gs-2009
 *
 * @author somethingkindawierd@gmail.com (Jon Beebe)
 * @param {string} label The property name to get/set.
 * @param {function} getter The get function.
 * @param {function} setter The set function.
 */
Object.prototype.addProperty = function(label, getter, setter) {

  if (Object.defineProperty) {
    Object.defineProperty(
        this,
        label,
        {
          get: getter,
          set: setter
        }
    );
  }
  else {
    if (getter) {
      this.__defineGetter__(label, getter);
    }
    if (setter) {
      this.__defineSetter__(label, setter);
    }
  }

};

/**
 * A generic way to define a group of getters/setters for objects
 *
 * @author somethingkindawierd@gmail.com (Jon Beebe)
 * @param {object} p Set of properties and their getter/setter methods.
 */
Object.prototype.addProperties = function(p) {

  for (var label in p) {
    if (p.hasOwnProperty(label)) {
      this.addProperty(label, p[label].get, p[label].set);
    }
  }

};
