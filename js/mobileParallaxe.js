/**
 * Created by Mehdi ALAOUI on 29/03/17. All rights reserved.
 */

function mobileParallaxe(ELEMENT){

    if(!ELEMENT.SENSITIVITY)        //If the user doesn't specified a sensitivity, it gets the default value of 0.9
        ELEMENT.SENSITIVITY=0.7;
    ELEMENT.SENSITIVITY=10+20/(ELEMENT.SENSITIVITY);

    var INITIAL={
        POSITION:{
            x:parseFloat(ELEMENT.LAYER.style.left),
            y:parseFloat(ELEMENT.LAYER.style.top)
        }
    };


    window.addEventListener('devicemotion',function(e){ // When the user moves the device
        
        var CURRENT_POSITION=getActualPosition(e);
        var PIXELS_TO_MOVE={              //PIXELS_TO_MOVE.x and PIXELS_TO_MOVE.y are the difference between the initial position and the actual one
            x:parseInt(truncateNumber(6*Math.PI*CURRENT_POSITION.x-SCREEN.INITIAL.x,3)),
            y:parseInt(truncateNumber(6*Math.PI*CURRENT_POSITION.y-SCREEN.INITIAL.y,3))
        };
        if(ELEMENT.INVERT) //If we want an inverted effect
            PIXELS_TO_MOVE.x=-PIXELS_TO_MOVE.x;
        else
            PIXELS_TO_MOVE.y=-PIXELS_TO_MOVE.y;

        //the layers don't move until rotationRate reachs the sensitivity
        if((!SCREEN.isLandscape && (Math.abs(e.rotationRate.beta*100) > ELEMENT.SENSITIVITY)) || (SCREEN.isLandscape && (Math.abs(e.rotationRate.alpha*100) > ELEMENT.SENSITIVITY))){

            ELEMENT.LAYER.style.left=INITIAL.POSITION.x+PIXELS_TO_MOVE.x*(ELEMENT.DEGREE)/20+"px";
        }
        if((!SCREEN.isLandscape && (Math.abs(e.rotationRate.alpha*100) > ELEMENT.SENSITIVITY)) || (SCREEN.isLandscape && (Math.abs(e.rotationRate.beta*100) > ELEMENT.SENSITIVITY))){

            ELEMENT.LAYER.style.top=INITIAL.POSITION.y+PIXELS_TO_MOVE.y*(ELEMENT.DEGREE)/20+"px";
        }


    },false);
    
}