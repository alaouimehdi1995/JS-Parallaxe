
function truncate(number,precision){
    return parseFloat(parseInt(number*Math.pow(100,precision))/Math.pow(100,precision));
}


function mobileParallaxe(element,moveDegree,invert,sensibility){
    if(!sensibility){
        sensibility=0.9;
    }
    var initialAccelerometer={
        x:null,
        y:null,
        isFirst:true
    };
    window.addEventListener('devicemotion', function (e) { //We save the initial device's position
        if(initialAccelerometer.isFirst){
            initialAccelerometer.x=parseInt(truncate(6*Math.PI*e.accelerationIncludingGravity.x,4));
            initialAccelerometer.y=parseInt(truncate(6*Math.PI*e.accelerationIncludingGravity.y,4));
            initialAccelerometer.isFirst=false;
        }

    }, false);


    var initial={                                       //We save the initial css position of the element
        x:parseFloat(element.style.left),
        y:parseFloat(element.style.top)
    };

    window.addEventListener('devicemotion',function(e){


        var position={              //position.x and position.y are relative cursor position from window's center
            x:parseInt(sensibility*parseInt(truncate(6*Math.PI*e.accelerationIncludingGravity.x-initialAccelerometer.x,3))),
            y:parseInt(sensibility*parseInt(truncate(6*Math.PI*e.accelerationIncludingGravity.y-initialAccelerometer.y,3)))
        };

        var txt=document.getElementById("coord");
        txt.innerHTML="DeviceMotionEvent:(first(x:"+initialAccelerometer.x+",y:"+initialAccelerometer.y+"))<br/>"
        txt.innerHTML+="\tAccelerometre:<br/>x:" +position.x +"<br/>\ty:" +position.y;//+"<br/>\tz:";

        position.y=-position.y;
        if(invert){
            position.x=-position.x;
            position.y=-position.y;
        }

        element.style.top=initial.y+position.y*(moveDegree)/50+"px";
        element.style.left=initial.x+position.x*(moveDegree)/50+"px";



    },false);


}

