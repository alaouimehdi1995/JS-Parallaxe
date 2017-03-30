var VERSION;
//If there is a touchscreen, we use the device's gyroscope. Else, we use the mouse move event

if('ontouchstart' in document.documentElement) //This instruction detects if there is a touchscreen
    VERSION="MOBILE";
else
    VERSION="DESKTOP";

function parallaxeElement(ELEMENT) {

    var LAYERS = ELEMENT.getElementsByClassName("layer");

    for (var i = 0; i < LAYERS.length; i++) {

        LAYERS[i].style.position = i ? "absolute" : "relative"; //First Element will be relative, and all others absolute

        LAYERS[i].style.top =parseFloat(window.getComputedStyle(LAYERS[0],null).top) + parseFloat(window.getComputedStyle(ELEMENT,null).paddingTop) + "px";
        LAYERS[i].style.left = parseFloat(window.getComputedStyle(LAYERS[0],null).left) + parseFloat(window.getComputedStyle(ELEMENT,null).paddingLeft) + "px";
        
        var INVERT = LAYERS[i].getAttribute("invert") === null ? false : (LAYERS[i].getAttribute("invert") != "false");
        var DEGREE = LAYERS[i].getAttribute("degree") === null ? 1 : parseFloat(LAYERS[i].getAttribute("degree"));


        if(VERSION=="DESKTOP")
            parallaxe(LAYERS[i], DEGREE, INVERT);
        else{
            var SENSITIVITY = LAYERS[i].getAttribute("sensitivity") === null ? null : parseFloat(LAYERS[i].getAttribute("sensitivity"));
            mobileParallaxe(LAYERS[i], DEGREE, INVERT, SENSITIVITY);
        }
    }
}


