
function truncate(number,precision){ //it returns the number with 'precision' numbers after comma
    return parseFloat(parseInt(number*Math.pow(100,precision))/Math.pow(100,precision));
}


function mobileParallaxe(element,MVDEGREE,INVERT,SENSITIVITY){
    if(!SENSITIVITY){
        SENSITIVITY=0.9;
    }
    var INITIALPOSITION={                                       //We save the initial css POSITION of the element
        x:parseFloat(element.style.left),
        y:parseFloat(element.style.top)
    };
    var INITIALACCELEROMETER={
        x:null,
        y:null,
        firstTime:true
    };
    window.addEventListener('devicemotion', function (e) { //We save the initial device's POSITION
        if(INITIALACCELEROMETER.firstTime){
            INITIALACCELEROMETER.x=parseInt(truncate(6*Math.PI*e.accelerationIncludingGravity.x,4));
            INITIALACCELEROMETER.y=parseInt(truncate(6*Math.PI*e.accelerationIncludingGravity.y,4));
            INITIALACCELEROMETER.firstTime=false;
        }

    }, false);


    

    window.addEventListener('devicemotion',function(e){
        
        var POSITION={              //POSITION.x and POSITION.y are relative cursor POSITION from window's center
            x:parseInt(SENSITIVITY*parseInt(truncate(6*Math.PI*e.accelerationIncludingGravity.x-INITIALACCELEROMETER.x,3))),
            y:parseInt(SENSITIVITY*parseInt(truncate(6*Math.PI*e.accelerationIncludingGravity.y-INITIALACCELEROMETER.y,3)))
        };

        /*
        var txt=document.getElementById("coord");
        txt.innerHTML="DeviceMotionEvent:(first(x:"+INITIALACCELEROMETER.x+",y:"+INITIALACCELEROMETER.y+"))<br/>"
        txt.innerHTML+="\tAccelerometre:<br/>x:" +POSITION.x +"<br/>\ty:" +POSITION.y;
        */

        POSITION.y=-POSITION.y;
        if(INVERT){
            POSITION.x=-POSITION.x;
            POSITION.y=-POSITION.y;
        }

        element.style.top=INITIALPOSITION.y+POSITION.y*(MVDEGREE)/50+"px";
        element.style.left=INITIALPOSITION.x+POSITION.x*(MVDEGREE)/50+"px";
        
    },false);
    
}

