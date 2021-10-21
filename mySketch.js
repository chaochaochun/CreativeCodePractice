var engine;
var boxes = []
var colors = "f46036-2e294e-1b998b-e71d36-f3ef1a".split("-").map(a=>"#"+a)
var mouseConstraint 
function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	// let Engine = Matter.Engine
	// let Bodies = Matter.Bodies
	// let World = Matter.World
	let {Engine, Bodies, World, Mouse, Mouseconstraint} = Matter
	
	let boxA = Bodies.rectangle(400, 200, 80, 80)
	let boxB = Bodies.rectangle(450, 50, 80, 80)
  let wallLeft = Bodies.rectangle(0-15, height/2, 30, height, {isStatic: true})
  let wallRight = Bodies.rectangle(width+15, height/2, 30, height, {isStatic: true})

	let ground = Bodies.rectangle(width/2, height+30, width, 60, {isStatic:true})
	
	engine = Engine.create()
	var mouse = Matter.Mouse.create(canvas.element)
	mouseConstraint = Matter.MouseConstraint.create(engine, {mouse: mouse})
	World.add(engine.world, mouseConstraint)
	
	// boxes.push(boxA)
	// boxes.push(boxB)
	boxes.push(wallLeft)
	boxes.push(wallRight)
	boxes.push(ground)
	// console.log(boxA)
	World.add(engine.world, boxes)
	
	Matter.Runner.run(engine)
}

function generateNewBox() {
		let {Engine, Bodies, World} = Matter
		let sz = random([10, 20, 40, 55])
		let boxA = Bodies.circle(random(width), random(height/3), sz)
		boxA.color = random(colors)
		boxA.sz = sz
		boxes.push(boxA)
		World.add(engine.world, boxA)
}

function draw() {
	background(0)
	for (let box of boxes){
		fill(box.color || 'white')
		let mouseIsDragging = mouseConstraint.constraint.bodyB===box
		if (mouseIsDragging){
			fill(255, random(0,255), random(0,255))
		}
		
		let sz = box.sz
		stroke(0)
		strokeWeight(5)
		beginShape()
		for(let vert of box.vertices){
			vertex(vert.x, vert.y)	
		}
		endShape(CLOSE)
		noStroke()
		push()
			translate(box.position.x, box.position.y)
			rotate(box.angle)
			if (sz) {
				fill(255)
				arc(0,0,30, 30,0, mouseIsDragging?2*PI:PI)
				fill(0)
				arc(0,0,15 ,15, 0, mouseIsDragging?2*PI:PI)

			}
		pop()
	}
	if (frameCount%10 ==0){
		generateNewBox()
	}
}
function mousePressed(){
	generateNewBox()
}
