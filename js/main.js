var VERSION;
//If there is a touchscreen, we use the device's gyroscope. Else, we use the mouse move event

if('ontouchstart' in document.documentElement) //This instruction detects if there is a touchscreen
    VERSION="MOBILE";
else
    VERSION="DESKTOP";

function parallaxeElement(CONTAINER) {

    var LAYERS = CONTAINER.getElementsByClassName("layer");
    var ELEMENT;

    for (var i = 0; i < LAYERS.length; i++) {

        ELEMENT = {
            LAYER: null,
            OPACITY:null,
            INVERT: null,
            DEGREE: null,
            SCALE_X: 0,
            SCALE_Y: 0,
            SENSITIVITY: null
        };

        ELEMENT.LAYER= LAYERS[i];
        ELEMENT.OPACITY= ELEMENT.LAYER.getAttribute("data-opacity") === null ? (window.getComputedStyle(ELEMENT.LAYER,null).opacity === null ? 1 : window.getComputedStyle(ELEMENT.LAYER,null).opacity) : parseFloat(ELEMENT.LAYER.getAttribute("data-opacity"));
        ELEMENT.INVERT= ELEMENT.LAYER.getAttribute("data-invert") === null ? false : (ELEMENT.LAYER.getAttribute("data-invert") != "false");
        ELEMENT.DEGREE= ELEMENT.LAYER.getAttribute("data-degree") === null ? 1 : parseFloat(ELEMENT.LAYER.getAttribute("data-degree"));
        ELEMENT.SCALE_X= ELEMENT.LAYER.getAttribute("data-scale-x") === null ? 0 : parseFloat(ELEMENT.LAYER.getAttribute("data-scale-x"));
        ELEMENT.SCALE_Y= ELEMENT.LAYER.getAttribute("data-scale-y") === null ? 0 : parseFloat(ELEMENT.LAYER.getAttribute("data-scale-y"));
        ELEMENT.SENSITIVITY= ELEMENT.LAYER.getAttribute("sensitivity") === null ? null : parseFloat(ELEMENT.LAYER.getAttribute("sensitivity"));


        ELEMENT.LAYER.style.position = i ? "absolute" : "relative"; //First Element will be relative, and all others absolute
        ELEMENT.LAYER.style.top =parseFloat(window.getComputedStyle(LAYERS[0],null).top) + parseFloat(window.getComputedStyle(CONTAINER,null).paddingTop) + ELEMENT.SCALE_Y + "px";
        ELEMENT.LAYER.style.left = parseFloat(window.getComputedStyle(LAYERS[0],null).left) + parseFloat(window.getComputedStyle(CONTAINER,null).paddingLeft) + ELEMENT.SCALE_X + "px";
        ELEMENT.LAYER.style.opacity=ELEMENT.OPACITY;

        if(VERSION=="DESKTOP")
            parallaxe(ELEMENT);
        else
            mobileParallaxe(ELEMENT);


    }
}


