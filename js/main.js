function parallaxeElement(ELEMENT,VERSION) {
    
    var LAYERS = ELEMENT.getElementsByClassName("layer");

    for (var i = 0; i < LAYERS.length; i++) {

        LAYERS[i].style.position = i ? "absolute" : "relative"; //First Element will be relative, and all others absolute

        LAYERS[i].style.top =parseFloat(window.getComputedStyle(LAYERS[0],null).top) + parseFloat(window.getComputedStyle(ELEMENT,null).paddingTop) + "px";
        LAYERS[i].style.left = parseFloat(window.getComputedStyle(LAYERS[0],null).left) + parseFloat(window.getComputedStyle(ELEMENT,null).paddingLeft) + "px";
        
        var INVERT = LAYERS[i].getAttribute("invert") === null ? false : (LAYERS[i].getAttribute("invert") != "false");
        var DEGREE = LAYERS[i].getAttribute("degree") === null ? 1 : parseFloat(LAYERS[i].getAttribute("degree"));
        
        if(VERSION==="MOBILE") {
            var SENSITIVITY = LAYERS[i].getAttribute("sensitivity") === null ? null : parseFloat(LAYERS[i].getAttribute("sensitivity"));
            mobileParallaxe(LAYERS[i], DEGREE, INVERT, SENSITIVITY);
        }
        else
            parallaxe(LAYERS[i], DEGREE, INVERT);
        


    }
}

function executeParallaxeOn(CONTAINER) {

    parallaxeElement(CONTAINER,"DESKTOP");
}
function executeMobileParallaxeOn(CONTAINER) {

    parallaxeElement(CONTAINER,"MOBILE");
}