import { Jumper } from './../src/jumper.js';

describe ( 'Jumper', function() {
  var jumper;

  beforeEach(function() {
    jumper = new Jumper (0,4,1);
  });

  it('should return an array of rows', function() {
    expect(jumper.getMap()).toEqual(jasmine.any(Array));
  });

  it('should set a charachter on a string', function() {
    expect(jumper.setCharAt("accdefg", 1,"b")).toEqual("abcdefg");
  });

  it('should return an array of rows', function() {
    expect(jumper.getRows()).toEqual(jasmine.any(Array));
  });

  it('should return a string', function() {
    expect(jumper.getRow(0)).toEqual(jasmine.any(String));
  });

  it('should move the charachter',function() {
    expect(jumper.move(1)).toEqual([5,1]);
  });

  it('should check if moving the charachter is possible',function() {
    expect(jumper.canMove(2,1)).toEqual(false);
  });

  it('should jump the charachter',function() {
    expect(jumper.jump(1)).toEqual([3,2]);
  });

  it('should eat the cherry', function(){
    jumper.eat(6,1)
    expect(jumper.cherries[1]).toEqual(false);
  });

  it('should change to a super chrachter', function(){
    jumper.eat(6,1)
    expect(jumper.super).toEqual(true);
  });

});
