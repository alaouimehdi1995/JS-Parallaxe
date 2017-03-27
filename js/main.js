var container=document.getElementById("container");
var layers=container.getElementsByClassName("layer");
for(var i=0;i<layers.length;i++){

    var invert= layers[i].getAttribute("invert")===null ? false : (layers[i].getAttribute("invert")!="false");

    layers[i].addEventListener('click',parallaxe(layers[i],parseFloat(layers[i].getAttribute("degree")),invert),false);

}

var text=document.getElementById("txt");
/*
* In parallaxe function, the second argument is degree, it should be positive. Lower degree <=> Larger movement
* The third argument is to invert movement direction
* */
