/**
 * Created by Mehdi ALAOUI on 29/03/17. All rights reserved.
 */

var SCREEN={
    width : window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height : window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
    touchScreenSupport:null,
    isLandscape:null,
    landscapeModeUp:null,
    rotationRateSupport:null,
    firstTime:true,
    INITIAL:{
        x:null,
        y:null
    },
    detectMode:function(){
        this.touchScreenSupport=('ontouchstart' in document.documentElement);      //This instruction detects if there is a touchscreen
        this.isLandscape=(this.touchScreenSupport && (this.width >= this.height));                   //This instruction detects if we are in portrait or landscape mode
        if(this.touchScreenSupport){
            if(SCREEN.firstTime){
                window.addEventListener('devicemotion', getInitialPosition, false);

            }
        }
    }
};


function truncateNumber(number,precision){ //it returns the number with 'precision' numbers after comma
    return parseFloat(parseInt(number*Math.pow(100,precision))/Math.pow(100,precision));
}

function getInitialPosition(e) {            //gets the initial device's accelerometer position
    if(SCREEN.firstTime){                   //if it's the first time, we catch the initial position
        if(SCREEN.isLandscape)
            SCREEN.landscapeModeUp=(e.accelerationIncludingGravity.x>0);
        var ACCEL=getActualPosition(e);
        SCREEN.INITIAL.x=parseInt(truncateNumber(6*Math.PI*ACCEL.x,4));
        SCREEN.INITIAL.y=parseInt(truncateNumber(6*Math.PI*ACCEL.y,4));
        SCREEN.rotationRateSupport=(SCREEN.touchScreenSupport && e.rotationRate.alpha!==null);
        SCREEN.firstTime=false;
        window.removeEventListener('devicemotion', getInitialPosition);
    }

}

function getActualPosition(e){

    var ACTUAL_POSITION={x:e.accelerationIncludingGravity.x,y:e.accelerationIncludingGravity.y};

    if(SCREEN.isLandscape){
        if(SCREEN.landscapeModeUp)//Differenciating between the 2 landscape's modes(up and down)
            return {x:-ACTUAL_POSITION.y,y:ACTUAL_POSITION.x};

        else
            return {x:ACTUAL_POSITION.y,y:-ACTUAL_POSITION.x};

    }
    else
        return ACTUAL_POSITION;

}