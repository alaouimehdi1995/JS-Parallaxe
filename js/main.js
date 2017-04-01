/**
 * Created by Mehdi ALAOUI on 07/03/17. All rights reserved.
 */

SCREEN.detectMode();

function parallaxeElement(CONTAINER) {

    var LAYERS = CONTAINER.getElementsByClassName("layer");
    var ELEMENTS=[];
    var ELEMENT;

    for (var i = 0; i < LAYERS.length; i++) {

        ELEMENT = {
            LAYER: null,
            OPACITY:null,
            INVERT: null,
            DEGREE: null,
            SCALE_X: 0,
            SCALE_Y: 0,
            SENSITIVITY: null,
            INITIAL:{
                x:null,
                y:null,
            },
            extract_data:function(){
                this.LAYER= LAYERS[i];
                this.OPACITY= this.LAYER.getAttribute("data-opacity") === null ? (window.getComputedStyle(this.LAYER,null).opacity === null ? 1 : window.getComputedStyle(this.LAYER,null).opacity) : parseFloat(this.LAYER.getAttribute("data-opacity"));
                this.INVERT= this.LAYER.getAttribute("data-invert") === null ? false : (this.LAYER.getAttribute("data-invert") != "false");
                this.DEGREE= this.LAYER.getAttribute("data-degree") === null ? 1 : parseFloat(this.LAYER.getAttribute("data-degree"));
                this.SCALE_X= this.LAYER.getAttribute("data-scale-x") === null ? 0 : parseFloat(this.LAYER.getAttribute("data-scale-x"));
                this.SCALE_Y= this.LAYER.getAttribute("data-scale-y") === null ? 0 : parseFloat(this.LAYER.getAttribute("data-scale-y"));
                this.SENSITIVITY= this.LAYER.getAttribute("data-sensitivity") === null ? null : parseFloat(this.LAYER.getAttribute("data-sensitivity"));

                if(SCREEN.touchScreenSupport){
                    if(!this.SENSITIVITY)        //If the user doesn't specified a sensitivity, it gets the default value of 0.9
                        this.SENSITIVITY=0.7;
                    this.SENSITIVITY=10+20/(this.SENSITIVITY);
                }


            }
        };
        ELEMENT.extract_data();
        //to improve:We should calculate top and left (in case the first element was not positionned with the container
        ELEMENT.LAYER.style.position = i ? "absolute" : "relative"; //First Element will be relative, and all others absolute
        ELEMENT.LAYER.style.top =parseFloat(window.getComputedStyle(LAYERS[0],null).top) + parseFloat(window.getComputedStyle(CONTAINER,null).paddingTop) + ELEMENT.SCALE_Y + "px";
        ELEMENT.LAYER.style.left = parseFloat(window.getComputedStyle(LAYERS[0],null).left) + parseFloat(window.getComputedStyle(CONTAINER,null).paddingLeft) + ELEMENT.SCALE_X + "px";
        ELEMENT.LAYER.style.opacity=ELEMENT.OPACITY;
        ELEMENT.INITIAL.x=parseFloat(ELEMENT.LAYER.style.left);
        ELEMENT.INITIAL.y=parseFloat(ELEMENT.LAYER.style.top);
        ELEMENTS.push(ELEMENT);

    }

    if(SCREEN.touchScreenSupport)
        mobileParallaxe(ELEMENTS);
    else
        parallaxe(ELEMENTS);
}