/**
 * Created by Mehdi ALAOUI on 29/03/17. All rights reserved.
 */
function truncateNumber(number,precision){ //it returns the number with 'precision' numbers after comma
    return parseFloat(parseInt(number*Math.pow(100,precision))/Math.pow(100,precision));
}

function getActualPosition(e){
    var ACTUAL_POSITION={x:e.accelerationIncludingGravity.x,y:e.accelerationIncludingGravity.y};
    if(SCREEN.isLandscape){
        if(SCREEN.landscapeModeUp)      //Differenciating betwen the 2 landscape's modes(up and down)
            return {x:-ACTUAL_POSITION.y,y:ACTUAL_POSITION.x};
        else
            return {x:ACTUAL_POSITION.y,y:-ACTUAL_POSITION.x};

    }
    else{
        return ACTUAL_POSITION;
    }
}

function mobileParallaxe(ELEMENT){

    if(!ELEMENT.SENSITIVITY)        //If the user doesn't specified a sensitivity, it gets the default value of 0.9
        ELEMENT.SENSITIVITY=0.9;

    var INITIAL={
        POSITION:{
            x:parseFloat(ELEMENT.LAYER.style.left),
            y:parseFloat(ELEMENT.LAYER.style.top)
        },
        ACCELEROMETER:{
            x:null,
            y:null,
            firstTime:true
        }
    };

    window.addEventListener('devicemotion', function (e) { //gets the initial device's accelerometer position
        if(INITIAL.ACCELEROMETER.firstTime){
            if(SCREEN.isLandscape)
                SCREEN.landscapeModeUp=(e.accelerationIncludingGravity.x>0);
            
            var ACCEL=getActualPosition(e);
            INITIAL.ACCELEROMETER.x=parseInt(truncateNumber(6*Math.PI*ACCEL.x,4));
            INITIAL.ACCELEROMETER.y=parseInt(truncateNumber(6*Math.PI*ACCEL.y,4));
            INITIAL.ACCELEROMETER.firstTime=false;
        }

    }, false);


    

    window.addEventListener('devicemotion',function(e){ // When the user moves the device
        
        var CURRENT_POSITION={              //CURRENT_POSITION.x and CURRENT_POSITION.y are the difference between the initial position and the actual one
            x:parseInt(ELEMENT.SENSITIVITY*parseInt(truncateNumber(6*Math.PI*getActualPosition(e).x-INITIAL.ACCELEROMETER.x,3))),
            y:parseInt(ELEMENT.SENSITIVITY*parseInt(truncateNumber(6*Math.PI*getActualPosition(e).y-INITIAL.ACCELEROMETER.y,3)))
        };
        
        if(ELEMENT.INVERT) //If we want an inverted effect
            CURRENT_POSITION.x=-CURRENT_POSITION.x;
        else
            CURRENT_POSITION.y=-CURRENT_POSITION.y;

        ELEMENT.LAYER.style.top=INITIAL.POSITION.y+CURRENT_POSITION.y*(ELEMENT.DEGREE)/50+"px";
        ELEMENT.LAYER.style.left=INITIAL.POSITION.x+CURRENT_POSITION.x*(ELEMENT.DEGREE)/50+"px";
        
    },false);
    
}

