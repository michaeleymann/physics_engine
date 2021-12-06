// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine
});

var boxID = 0;
var boxes = [];

// run the renderer
//Render.run(render);





// create two boxes and a ground (MAKE CLASS HERE)
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, ground]);


/// ----------------------- MY CODE ---------------- ///


svg.makeLine({
    parent: dom.svgLayer,
    color: "#000",
    id: "testBox",
    d: svg.path([ 
        {x: boxA.position.x/canvas.res, y: boxA.position.y/canvas.res} , 
        {x: boxA.position.x/canvas.res +10, y: boxA.position.y/canvas.res}  ,
        {x: boxA.position.x/canvas.res +10, y: boxA.position.y/canvas.res+10} ,
        {x: boxA.position.x/canvas.res, y: boxA.position.y/canvas.res +10 } 
        ] )
})

svg.makeLine({
    parent: dom.svgLayer,
    color: "#000",
    id: "testBox2",
    d: svg.path([ 
        {x: boxB.position.x/canvas.res, y: boxB.position.y/canvas.res} , 
        {x: boxB.position.x/canvas.res +10, y: boxB.position.y/canvas.res}  ,
        {x: boxB.position.x/canvas.res +10, y: boxB.position.y/canvas.res+10} ,
        {x: boxB.position.x/canvas.res, y: boxB.position.y/canvas.res +10 } 
        ] )
})


function loop(time) {
    dom["testBox"].setAttributeNS(null, "d",  
    svg.path([ 
        {x: boxA.position.x/canvas.res, y: boxA.position.y/canvas.res} , 
        {x: boxA.position.x/canvas.res +10, y: boxA.position.y/canvas.res}  ,
        {x: boxA.position.x/canvas.res +10, y: boxA.position.y/canvas.res+10} ,
        {x: boxA.position.x/canvas.res, y: boxA.position.y/canvas.res +10 } 
        ] ) )

        dom["testBox2"].setAttributeNS(null, "d",  
        svg.path([ 
            {x: boxB.position.x/canvas.res, y: boxB.position.y/canvas.res} , 
            {x: boxB.position.x/canvas.res +10, y: boxB.position.y/canvas.res}  ,
            {x: boxB.position.x/canvas.res +10, y: boxB.position.y/canvas.res+10} ,
            {x: boxB.position.x/canvas.res, y: boxB.position.y/canvas.res +10 } 
            ] ) )
    requestAnimationFrame(loop)
}
loop()

/// ----------------- LAST BIT OF THE MATTER.JS THINGS --------------- ///

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);