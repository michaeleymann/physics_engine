//CODE

let canvas = {};


//COORDINATES

canvas.scale = function ({ width, height }) {
    if (width) {
        canvas.width = width;
        canvas.res = window.innerWidth / canvas.width;
        canvas.height = window.innerHeight / canvas.res;
    } else if (height) {
        canvas.height = height;
        canvas.res = window.innerHeight / canvas.height;
        canvas.width = window.innerWidth / canvas.res;
    }
    canvas.center = { x: 0, y: 0}//{ x: canvas.width / 2, y: canvas.height / 2 };
}
canvas.scale({ width: 100 });


//SVG FUNCTIONS

let svg = {};

svg.nameSpace = "http://www.w3.org/2000/svg";

svg.path = function (ia) {

    let output = "M ";
    for (var i = 0; i < ia.length; i++) {
        output += ia[i].x * canvas.res + " " + ia[i].y * canvas.res + " ";
    }
    output += "z";

    return output;
};

svg.dot = function (io) {
    return "M " + io.x * canvas.res + " " + io.y * canvas.res + " z";
};

svg.paths = function (ia) {
    let output = "";
    for (var i = 0; i < ia.length; i++) {
        output += svg.path(ia[i]);
    }
    return output;
};

svg.makeLayer = function ({ parent, id, x = 0, y = 0 }) {
    dom[id] = document.createElementNS(svg.nameSpace, "svg");
    dom[id].id = id;
    dom[id].style.transform = "translateX(" + (x * canvas.res) + "px) translateY(" + (y * canvas.res) + "px)";
    parent.appendChild(dom[id]);
};

svg.makeLine = function ({ parent, id, d = "", color = "", stroke = 1, cap = "butt", join = "round" }) {
    dom[id] = document.createElementNS(svg.nameSpace, "path");
    dom[id].setAttributeNS(null, "fill", "none");
    dom[id].setAttributeNS(null, "d", d);
    dom[id].setAttributeNS(null, "stroke-width", stroke * canvas.res);
    dom[id].setAttributeNS(null, "stroke", color);
    dom[id].setAttributeNS(null, "stroke-linecap", cap);
    dom[id].setAttributeNS(null, "stroke-join", join);
    dom[id].id = id;
    parent.appendChild(dom[id]);
};

svg.makeShape = function ({ parent, id, d = "", color = "#ff00ff" }) {
    dom[id] = document.createElementNS(svg.nameSpace, "path");
    dom[id].setAttributeNS(null, "fill", color);
    dom[id].setAttributeNS(null, "d", d);
    dom[id].id = id;
    parent.appendChild(dom[id]);
};

svg.lineRotation = function ({ point, long, rotation }) {
    return [
        { x: point.x, y: point.y },
        { x: point.x + Math.sin(rotation) * long, y: point.y + Math.cos(rotation) * long }
    ];
};


//DOM
let dom = {};


//STAGE
dom.stage = document.createElement("stage");
dom.stage.style.transform = "translateX(" + (canvas.center.x * canvas.res) + "px) translateY(" + (canvas.center.y * canvas.res) + "px)";
dom.stage.id = "stage";
document.getElementById("content").appendChild(dom.stage);

//svg layer
svg.makeLayer({ parent: dom.stage, id: "svgLayer", x: 0, y: 0 });