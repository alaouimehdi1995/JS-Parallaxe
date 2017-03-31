/**
 * Created by Mehdi ALAOUI on 07/03/17. All rights reserved.
 */

function parallaxe(ELEMENTS){

    document.addEventListener('mousemove',function(e){

        var position={              //position.x and position.y are relative cursor position from window's center
            x:e.clientX-SCREEN.width/2,
            y:e.clientY-SCREEN.height/2
        };
        for(var i=0;i<ELEMENTS.length;i++) {
            if (ELEMENTS[i].INVERT) {
                position.x = -position.x;
                position.y = -position.y;
            }

            ELEMENTS[i].LAYER.style.top = ELEMENTS[i].INITIAL.y + position.y * (ELEMENTS[i].DEGREE) / 200 + "px";
            ELEMENTS[i].LAYER.style.left = ELEMENTS[i].INITIAL.x + position.x * (ELEMENTS[i].DEGREE) / 200 + "px";

        }

    },false);

}

function mobileParallaxe(ELEMENTS){

    window.addEventListener('devicemotion',function(e){ // When the user moves the device

        var CURRENT_POSITION=getActualPosition(e);
        var PIXELS_TO_MOVE={              //PIXELS_TO_MOVE.x and PIXELS_TO_MOVE.y are the difference between the initial position and the actual one
            x:parseInt(truncateNumber(6*Math.PI*CURRENT_POSITION.x-SCREEN.INITIAL.x,3)),
            y:parseInt(truncateNumber(6*Math.PI*CURRENT_POSITION.y-SCREEN.INITIAL.y,3))
        };
        for(var i=0;i<ELEMENTS.length;i++) {

            //the layers don't move until rotationRate reachs the sensitivity
            if ((!SCREEN.isLandscape && (Math.abs(e.rotationRate.beta * 100) > ELEMENTS[i].SENSITIVITY)) || (SCREEN.isLandscape && (Math.abs(e.rotationRate.alpha * 100) > ELEMENTS[i].SENSITIVITY))) {

                ELEMENTS[i].LAYER.style.left = ELEMENTS[i].INITIAL.x + (ELEMENTS[i].INVERT ? -PIXELS_TO_MOVE.x : PIXELS_TO_MOVE.x) * (ELEMENTS[i].DEGREE) / 20 + "px";
            }
            if ((!SCREEN.isLandscape && (Math.abs(e.rotationRate.alpha * 100) > ELEMENTS[i].SENSITIVITY)) || (SCREEN.isLandscape && (Math.abs(e.rotationRate.beta * 100) > ELEMENTS[i].SENSITIVITY))) {

                ELEMENTS[i].LAYER.style.top = ELEMENTS[i].INITIAL.y + (ELEMENTS[i].INVERT ? PIXELS_TO_MOVE.y : -PIXELS_TO_MOVE.y) * (ELEMENTS[i].DEGREE) / 20 + "px";
            }
        }

    },false);

}