import { Jumper } from './../src/jumper.js';

describe ( 'Jumper', function() {
  var jumper;

  beforeEach(function() {
    jumper = new Jumper (6,1);
  });

  it('should return an array of rows', function() {
    expect(jumper.getRows()).toEqual(jasmine.any(Array));
  });

  it('should set a charachter on a string', function() {
    expect(jumper.setCharAt("accdefg", 1,"b")).toEqual("abcdefg");
  });

  it('should move the charachter',function() {
    expect(jumper.move(-1)).toEqual(5);
  });
});
