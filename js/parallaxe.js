/**
 * Created by mehdi on 07/03/17.
 */
var SCREEN={
    width : window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height : window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
};


function parallaxe(element,MVDEGREE,INVERT){

    var INITIALPOSITION={
        x:parseFloat(element.style.left),
        y:parseFloat(element.style.top)
    };

    document.addEventListener('mousemove',function(e){

        var position={              //position.x and position.y are relative cursor position from window's center
            x:e.clientX-SCREEN.width/2,
            y:e.clientY-SCREEN.height/2
        };

        if(INVERT){
            position.x=-position.x;
            position.y=-position.y;
        }

        element.style.top=INITIALPOSITION.y+position.y*(MVDEGREE)/200+"px";
        element.style.left=INITIALPOSITION.x+position.x*(MVDEGREE)/200+"px";



    },false);


}