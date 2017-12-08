
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}


var civic = new Car("honda", "civic", 1997);
var focus = new Car("ford", "focus", 2005);
//console.log(civic);


Car.prototype.foo = function(){console.log("foo");}

var sienna = new Car("toyota", "sienna", 2007);
civic.foo();
sienna.foo();
