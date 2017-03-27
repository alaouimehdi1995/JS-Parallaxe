function executeParallaxeOn(container) {

    var layers = container.getElementsByClassName("layer");

    for (var i = 0; i < layers.length; i++) {

        layers[i].style.display = "block";
        layers[i].style.position = i ? "absolute" : "relative";

        //getComputedStyle doesn't work with mozilla etc
        if (i) {
            layers[i].style.top =
                parseFloat(getComputedStyle(layers[0], null).top) + parseFloat(getComputedStyle(container, null).padding) + "px";
            layers[i].style.left = parseFloat(getComputedStyle(layers[0], null).left) + parseFloat(getComputedStyle(container, null).padding) + "px";
            // + parseFloat(getComputedStyle(layers[0], null).marginTop)
        }

        var invert = layers[i].getAttribute("invert") === null ? false : (layers[i].getAttribute("invert") != "false");

        layers[i].addEventListener('click', parallaxe(layers[i], parseFloat(layers[i].getAttribute("degree")), invert), false);

    }
}