/**
 * Created by mehdi on 07/03/17.
 */
var screen={
    width : window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height : window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
};


function parallaxe(element,moveDegree,invert){

    var initial={
        x:parseFloat(element.style.left),
        y:parseFloat(element.style.top)
    };

    document.addEventListener('mousemove',function(e){

        var position={              //position.x and position.y are relative cursor position from window's center
            x:e.clientX-screen.width/2,
            y:e.clientY-screen.height/2
        };

        if(invert){
            position.x=-position.x;
            position.y=-position.y;
        }

        element.style.top=initial.y+position.y*(moveDegree)/200+"px";
        element.style.left=initial.x+position.x*(moveDegree)/200+"px";



    },false);


}