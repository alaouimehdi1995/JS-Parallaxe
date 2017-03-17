var home2=document.getElementById("home2");
var home1=document.getElementById("home1");
var plane=document.getElementById("plane");
var person=document.getElementById("person");


var text=document.getElementById("txt");
/*
* In parallaxe function, the second argument is degree, it should be positive. Lower degree <=> Larger movement
* The third argument is to invert movement direction
* */

home2.addEventListener('click',parallaxe(home2,3,false),false);
home1.addEventListener('click',parallaxe(home1,4,false),false);
plane.addEventListener('click',parallaxe(plane,6,true),false);
person.addEventListener('click',parallaxe(person,8,true),false);