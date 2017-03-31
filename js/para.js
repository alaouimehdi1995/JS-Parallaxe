/**
 * Created by Mehdi ALAOUI on 29/03/17. All rights reserved.
 */

var s={
    w : window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    h : window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
    t:null,
    l:null,
    u:null,
    detectMode:function(){
        this.t=('ontouchstart' in document.documentElement);
        this.l=(this.w >= this.h);
    }
};


function t(f,r){
    return parseFloat(parseInt(f*Math.pow(100,r))/Math.pow(100,r));
}


function i(w) {
    if(i.a.f){
        if(s.l){
            s.u=(w.accelerationIncludingGravity.x>0);
        }

        var k=a(w);
        i.a.x=parseInt(t(6*Math.PI*k.x,4));
        i.a.y=parseInt(t(6*Math.PI*k.y,4));
        i.a.f=false;
    }
    else{
        window.removeEventListener('devicemotion', getInitialPosition);
    }
}

function a(r){
    var h={x:r.accelerationIncludingGravity.x,y:r.accelerationIncludingGravity.y};
    if(s.l){
        if(s.u){
            return {x:-h.y,y:h.x};
        }
        else{
            return {x:h.y,y:-h.x};
        }

    }
    else{
        return h;
    }
}

function p(e){

    var o={
        x:parseFloat(e.l.style.left),
        y:parseFloat(e.l.style.top)
    };

    document.addEventListener('mousemove',function(n){

        var a={            
            x:n.clientX-s.w/2,
            y:n.clientY-s.h/2
        };

        if(e.i){
            a.x=-a.x;
            a.y=-a.y;
        }

        e.l.style.top=o.y+a.y*(e.d)/200+"px";
        e.l.style.left=o.x+a.x*(e.d)/200+"px";



    },false);


}

function mp(e){

    if(!e.s)
        e.s=0.9;

    var i={
        p:{
            x:parseFloat(e.l.style.left),
            y:parseFloat(e.l.style.top)
        },
        a:{
            x:null,
            y:null,
            f:true
        }
    };

    window.addEventListener('devicemotion', getInitialPosition, false);


    window.addEventListener('devicemotion',function(v){

        var c={
            x:parseInt(e.s*parseInt(t(6*Math.PI*a(v).x-i.a.x,3))),
            y:parseInt(e.s*parseInt(t(6*Math.PI*a(v).y-i.a.y,3)))
        };

        if(e.i){
            c.x=-c.x;
        }
        else{
            c.y=-c.y;
        }

        e.l.style.top=i.p.y+c.y*(e.d)/50+"px";
        e.l.style.left=i.p.x+c.x*(e.d)/50+"px";

    },false);

}
s.detectMode();

function parallaxeElement(b) {

    var l = b.getElementsByClassName("layer");
    var e;

    for (var q = 0; q < l.length; q++) {

        e = {
            l: null,
            o:null,
            i: null,
            d: null,
            sx: 0,
            sy: 0,
            s: null,
            e:function(){
                this.l= l[q];
                this.o= this.l.getAttribute("data-opacity") === null ? (window.getComputedStyle(this.l,null).opacity === null ? 1 : window.getComputedStyle(this.l,null).opacity) : parseFloat(this.l.getAttribute("data-opacity"));
                this.i= this.l.getAttribute("data-invert") === null ? false : (this.l.getAttribute("data-invert") != "false");
                this.d= this.l.getAttribute("data-degree") === null ? 1 : parseFloat(this.l.getAttribute("data-degree"));
                this.sx= this.l.getAttribute("data-scale-x") === null ? 0 : parseFloat(this.l.getAttribute("data-scale-x"));
                this.sy= this.l.getAttribute("data-scale-y") === null ? 0 : parseFloat(this.l.getAttribute("data-scale-y"));
                this.s= this.l.getAttribute("sensitivity") === null ? null : parseFloat(this.l.getAttribute("sensitivity"));
            }
        };

        e.e();

        e.l.style.position = q ? "absolute" : "relative";
        e.l.style.top =parseFloat(window.getComputedStyle(l[0],null).top) + parseFloat(window.getComputedStyle(b,null).paddingTop) + e.sy + "px";
        e.l.style.left = parseFloat(window.getComputedStyle(l[0],null).left) + parseFloat(window.getComputedStyle(b,null).paddingLeft) + e.sx + "px";
        e.l.style.opacity=e.o;

        if(s.t){
            mp(e);
        }
        else{
            p(e);
        }



    }
}