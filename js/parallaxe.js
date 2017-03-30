/**
 * Created by mehdi on 07/03/17.
 */
var SCREEN={
    width : window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height : window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
};


function parallaxe(ELEMENT){

    var INITIALPOSITION={
        x:parseFloat(ELEMENT.LAYER.style.left),
        y:parseFloat(ELEMENT.LAYER.style.top)
    };

    document.addEventListener('mousemove',function(e){

        var position={              //position.x and position.y are relative cursor position from window's center
            x:e.clientX-SCREEN.width/2,
            y:e.clientY-SCREEN.height/2
        };

        if(ELEMENT.INVERT){
            position.x=-position.x;
            position.y=-position.y;
        }

        ELEMENT.LAYER.style.top=INITIALPOSITION.y+position.y*(ELEMENT.DEGREE)/200+"px";
        ELEMENT.LAYER.style.left=INITIALPOSITION.x+position.x*(ELEMENT.DEGREE)/200+"px";



    },false);


}