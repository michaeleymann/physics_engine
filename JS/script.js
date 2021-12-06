// ADD BALLS
document.getElementById("content").addEventListener("click", function(event) {
    let myNextBall = new Ball(
        {
        x: (event.clientX-document.getElementById('sidebar').clientWidth)/canvas.res,
        y: event.clientY/canvas.res
        },
        // Changing Size will cause weird bouncing behaviour atm.
        Math.random()*5 + 2, 
        document.getElementById('elasticity_value').value, ballId);
    myBalls.push(myNextBall);
    myNextBall.show();
    ballId += 1;
});

// write initial variables to text.
document.getElementById("gravity_value_text").innerText = document.getElementById('gravity_value').value;
document.getElementById("elasticity_value_text").innerText = document.getElementById('elasticity_value').value;
document.getElementById("wind_value_text").innerText = document.getElementById('wind_value').value;

//  ------- LOOP ----------- //

function loop(time){
    // set Δt
    Δt = (time - lastTime)/5;

    // Update Text
    document.getElementById("gravity_value_text").innerText = document.getElementById('gravity_value').value;
    document.getElementById("elasticity_value_text").innerText = document.getElementById('elasticity_value').value;
    document.getElementById("wind_value_text").innerText = document.getElementById('wind_value').value;

    // Collision Detection

    for ( let i = 0; i < myBalls.length; i++){
        for (let j = 0; j < myBalls.length; j++ ){
            if (i < j){
                let ball1 = myBalls[i];
                let ball2 = myBalls[j];
                let distVec = {x: ball1.pos.x-ball2.pos.x, y: ball1.pos.y-ball2.pos.y}
                let distance = Math.sqrt(distVec.x**2 + distVec.y**2)
                if (distance < (ball1.size/2  + ball2.size/2 )  ){
                    ball1.colliding = true;
                    ball2.colliding = true;
                }  
            } 
        }
    }

    // do the movements 
    for ( let b of myBalls ){
        
        b.collision();
        b.move();
        b.update();
    }

    requestAnimationFrame(loop)
    lastTime = time;

}

loop();