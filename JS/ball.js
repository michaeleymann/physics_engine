class Ball{
    constructor(pos,size,elasticity,id){
      this.pos = pos;
      this.size =size;  
      this.id = id;
      this.speed = {x: 0, y:0};
      this.acceleration = {x: 0, y:gravity};
      this.elasticity = elasticity;
      this.drag = drag;
      this.colliding = false;
    }
    show(){
        // Draw Ball
        svg.makeLine({
            parent: dom.svgLayer,
            id: this.id,
            color: darkGrey,
            stroke: this.size,
            cap: "round",
            d: svg.dot(this.pos)
        })
    }
    update(){
        // Read Values
        let a = document.getElementById("gravity_value").value;
        let e = document.getElementById("elasticity_value").value;
        let w = document.getElementById("wind_value").value;
        

        // Update Values
        this.acceleration.y = parseFloat(a)*gravity;
        this.acceleration.x = parseFloat(w)*gravity;
        // This will cause weird behaviour if max/minsize are changed
        this.elasticity = e * (0.25*(8-this.size)/6 + 0.75);
    }
    move(){
        // Horizontal Movement
        this.speed.x += this.acceleration.x;
        // This will cause weird behaviour if max/minsize are changed
        this.speed.x *= this.drag * (0.02*(this.size-6)/6 + 0.98);
        this.pos.x += this.speed.x*Δt;
        
        // Vertival Movement
        this.speed.y += this.acceleration.y;
        this.speed.y *= this.drag * (0.02*(this.size-6)/6 + 0.98);
        this.pos.y += this.speed.y*Δt;
        dom[this.id].setAttributeNS(null, "d",  svg.dot(this.pos))
    }
    bounce(){
        // Reflect From Boundries
        this.speed.y = -this.speed.y*(this.elasticity);
        this.move();
    }
    
    collision(){
        
        //Change Color when colliding with ball
        if (this.colliding === true){
            dom[this.id].setAttributeNS(null, "stroke",  "#800")
        } else {
            dom[this.id].setAttributeNS(null, "stroke",  darkGrey)
        }
        
        // Border Collisions
        if (this.pos.y > (canvas.height - this.size/2)) {
            this.pos.y = canvas.height - this.size/2;
            this.bounce();
        } else if (  this.pos.y < 0 + this.size/2) {
            this.pos.y = 0 + this.size/2;
            this.bounce();
        }
        if (this.pos.x  > canvas.width - 3*this.size) {
            this.pos.x = 0;
        } else if (this.pos.x  < 0) {
            this.pos.x = canvas.width - 3*this.size;
        }


        //reset collision status
        this.colliding = false;
    }
}