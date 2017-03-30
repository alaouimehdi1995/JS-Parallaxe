
function truncate(number,precision){
    return parseFloat(parseInt(number*Math.pow(10,precision))/Math.pow(10,precision));
}


function mobileParallaxe(element,moveDegree,invert){
    var sensibility=0.4;
    var initMotion={
        x:null,
        y:null,
        isFirst:true
    };
    window.addEventListener('devicemotion', function (e) {
        if(initMotion.isFirst){
            initMotion.x=parseInt(truncate(6*Math.PI*e.accelerationIncludingGravity.x,4));
            initMotion.y=parseInt(truncate(6*Math.PI*e.accelerationIncludingGravity.y,4));
            initMotion.isFirst=false;
        }

    }, false);


    var initial={
        x:parseFloat(element.style.left),
        y:parseFloat(element.style.top)
    };

    window.addEventListener('devicemotion',function(e){

        var position={              //position.x and position.y are relative cursor position from window's center
            x:truncate(6*Math.PI*e.accelerationIncludingGravity.x,4)-initMotion.x,
            y:truncate(6*Math.PI*e.accelerationIncludingGravity.y,4)-initMotion.y
        };

        var txt=document.getElementById("coord");
        txt.innerHTML="DeviceMotionEvent:(first(x:"+initMotion.x+",y:"+initMotion.y+"))<br/>"
        txt.innerHTML+="\tAccelerometre:<br/>x:" +position.x +"<br/>\ty:" +position.y;//+"<br/>\tz:";


        if(invert){
            position.x=-position.x;
            position.y=-position.y;
        }

        element.style.top=initial.y+position.y*(moveDegree)/40+"px";
        element.style.left=initial.x+position.x*(moveDegree)/40+"px";



    },false);


}

