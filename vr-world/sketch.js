let world;
let rain = [];
let magic = [];
let sparkles = [];
let secretFloor;
let secretRoof;
let container;
let buffer;

function setup() {

    // set up world 
    world = new World('VRScene');

	// create graphics buffer
	buffer = createGraphics(1024,1024);

	// register buffer as animated texture
	let texture = world.createDynamicTextureFromCreateGraphics(buffer);
	
	// set background of buffer
	buffer.background(247, 158, 204);

	// set equirectangular sky
	let sky = new Sky({
		asset: 'sky',
		repeatY: 5
	});
	world.add(sky);

    // create a floor for the world
    let floor = new Plane({
        x: 0, y: 0, z: -100,
        width: 500, height: 500,
        rotationX: 90,
        side: 'double',
        red: 252, green: 212, blue: 232,
    });
    world.add(floor);

	// build rain drops in sky
	for (let d = 0; d < 200; d++) {
		let drop = new Dodecahedron({
			x: random(-100, 100), y: random(100, 150), z: random(-100, 100), 
			radius: 0.5,
			red: 159, green: 226, blue: 245
		});
		world.add(drop);
		rain.push(drop);
	}

    // build sky shapes 
    for (let i = 0; i < 200; i++) {
        let temp = new Octahedron({
            x: random(-100, 100), y: random(0, 20), z: random(-100, 100),
            width: 0.5, height: 0.5, depth: 0.5,
            red: random(160,255), green: random(150,220), blue: random(190,255),
						enterFunction: function(theBox) {
							// make slightly bigger
							theBox.setScale(1.5, 1.5, 1.5);
						},
						leaveFunction: function(theBox) {
								// make normal size
								theBox.setScale(1, 1, 1);
							},
        });
		magic.push(temp);
        world.add(temp);
    }

	// build cylinders as trees
	for (let times = 0; times < 2; times++) {
		for (let t = 0; t < 25; t++) {
			let r1 = random(-10, 10);
			let r2 = random(-10, 10);
			let r3 = random(-10, 10);
			let r4 = random(-10, 10);
			let tree1 = new Cylinder({
				x: r1 * t, y: 0, z: r2 * t,
				radius: 1, height: 10,
				asset: 'oak',
				repeatX: 5, repeatY: 5
			});
			
			let leaves1 = new Box({
				x: r1 * t, y: 6, z: r2 * t,
				width: 2, height: 2, depth: 2,
				asset: 'leaves'
			});

			let leaves2 = new Box({
				x: r1 * t, y: 6 + 2, z: r2 * t,
				width: 2, height: 2, depth: 2,
				asset: 'leaves'
			});

			let leaves3 = new Box({
				x: r1 * t - 2, y: 6, z: r2 * t,
				width: 2, height: 2, depth: 2,
				asset: 'leaves'
			});

			let leaves4 = new Box({
				x: r1 * t + 2, y: 6, z: r2 * t,
				width: 2, height: 2, depth: 2,
				asset: 'leaves'
			});

			let leaves5 = new Box({
				x: r1 * t, y: 6, z: r2 * t + 2,
				width: 2, height: 2, depth: 2,
				asset: 'leaves'
			});

			let leaves6 = new Box({
				x: r1 * t, y: 6, z: r2 * t - 2,
				width: 2, height: 2, depth: 2,
				asset: 'leaves'
			});

			let leaves7 = new Box({
				x: r1 * t + 1, y: 5, z: r2 * t,
				width: 1, height: 1, depth: 1,
				asset: 'leaves'
			});

			let leaves8 = new Box({
				x: r1 * t - 1, y: 5, z: r2 * t,
				width: 1, height: 1, depth: 1,
				asset: 'leaves'
			});

			let leaves9 = new Box({
				x: r1 * t, y: 5, z: r2 * t + 2,
				width: 1, height: 1, depth: 1,
				asset: 'leaves'
			});

			let leaves10 = new Box({
				x: r1 * t, y: 5, z: r2 * t - 2,
				width: 1, height: 1, depth: 1,
				asset: 'leaves'
			});

			let tree2 = new Cylinder({
				x: r3 * -t, y: 0, z: r4 * -t,
				radius: 0.75, height: 10,
				asset: 'oak',
				repeatX: 5, repeatY: 5
			});

			let leaves11 = new Box({
				x: r3 * -t, y: 6, z: r4 * -t,
				width: 2, height: 2, depth: 2,
				asset: 'leaves'
			});

			let leaves12 = new Box({
				x: r3 * -t, y: 6 + 2, z: r4 * -t,
				width: 2, height: 2, depth: 2,
				asset: 'leaves'
			});

			let leaves13 = new Box({
				x: r3 * -t - 2, y: 6, z: r4 * -t,
				width: 2, height: 2, depth: 2,
				asset: 'leaves'
			});

			let leaves14 = new Box({
				x: r3 * -t + 2, y: 6, z: r4 * -t,
				width: 2, height: 2, depth: 2,
				asset: 'leaves'
			});

			let leaves15 = new Box({
				x: r3 * -t, y: 6, z: r4 * -t + 2,
				width: 2, height: 2, depth: 2,
				asset: 'leaves'
			});

			let leaves16 = new Box({
				x: r3 * -t, y: 6, z: r4 * -t - 2,
				width: 2, height: 2, depth: 2,
				asset: 'leaves'
			});

			let leaves17 = new Box({
				x: r3 * -t + 1, y: 5, z: r4 * -t,
				width: 1, height: 1, depth: 1,
				asset: 'leaves'
			});

			let leaves18 = new Box({
				x: r3 * -t - 1, y: 5, z: r4 * -t,
				width: 1, height: 1, depth: 1,
				asset: 'leaves'
			});

			let leaves19 = new Box({
				x: r3 * -t, y: 5, z: r4 * -t + 2,
				width: 1, height: 1, depth: 1,
				asset: 'leaves'
			});

			let leaves20 = new Box({
				x: r3 * -t, y: 5, z: r4 * -t - 2,
				width: 1, height: 1, depth: 1,
				asset: 'leaves'
			});
			world.add(tree1);
			world.add(tree2);
			world.add(leaves1);
			world.add(leaves2);
			world.add(leaves3);
			world.add(leaves4);
			world.add(leaves5);
			world.add(leaves6);
			world.add(leaves7);
			world.add(leaves8);
			world.add(leaves9);
			world.add(leaves10);
			world.add(leaves11);
			world.add(leaves12);
			world.add(leaves13);
			world.add(leaves14);
			world.add(leaves15);
			world.add(leaves16);
			world.add(leaves17);
			world.add(leaves18);
			world.add(leaves19);
			world.add(leaves20);
		}
	}

	// add 3D pokemon graphic
	for (let p = 0; p < 10; p++) {
		let pokemon = new GLTF({
			asset: 'pok',
			x: random(-50, 50),
			y: 0,
			z: random(-50, 50),
		});
		world.add(pokemon);
	}

	// create floor below floor
	secretFloor = new Plane({
		x: 0, y: -200, z: 0,
		width: 500, height: 500,
		rotationX: 90,
		//red: 247, green: 158, blue: 204,
		asset: texture,
		dynamicTexture: true,
		dynamicTextureWidth: 1024,
		dynamicTextureHeight: 1024,
		side: 'double'
	});
	world.add(secretFloor);

	// create "roof" above secret floor
	// use canvas as roof asset
	secretRoof = new Plane({
		x: 0, y: -50, z: 0,
		width: 500, height: 500,
		rotationX: 90,
		red: 247, green: 158, blue: 204,
		side: 'double'
	});
	world.add(secretRoof);

	// add 3D pichu
	let pokemon1 = new GLTF({
		asset: 'pok1',
		x: 0,
		y: -199,
		z: -50
	});
	world.add(pokemon1);

	// add text prompting user to click somewhere 
	var text1 = new Text({
		text: 'Click HERE to go back :3',
		red: 247, green: 158, blue: 204,
		side: 'double',
		x: 0, y: -198, z: -20,
		scaleX: 10, scaleY: 10, scaleZ: 10,
	});
	world.add(text1);
	
	// box that user actually clicks on
	let textBox1 = new Box({
		x: 0, y: -198, z: -20.5,
		red: 0, green: 0, blue: 0,
		width: 8, height: 2, depth: 0.5,
		clickFunction: function(x) {
			world.teleportToObject(floor);
			world.setUserPosition(0, 1, 0);
		}
	});
	world.add(textBox1);

	// add text prompting user to click somewhere 
	var text = new Text({
		text: 'Click HERE for a surprise ^-^',
		red: 247, green: 158, blue: 204,
		side: 'double',
		x: 0, y: 1, z: -10,
		scaleX: 10, scaleY: 10, scaleZ: 10,
	 });
	world.add(text);

	// box that user actually clicks on
	let textBox = new Box({
		x: 0, y: 1, z: -10.5,
		red: 0, green: 0, blue: 0,
		width: 8, height: 2, depth: 0.5,
		clickFunction: function(x) {
			world.teleportToObject(secretFloor);
			world.setUserPosition(0, -195, 0);
		}
	})
	world.add(textBox);

	// create composite object container
	container = new Container3D({x: 0, y: -180, z: -20});
	world.add(container);

	// add ring
	let ring = new Torus({
		x: 0, y: 0, z: 0, 
		radius: 1,
		red: 255, green: 234, blue: 158
	});

	// add ring to container
	container.addChild(ring);

	// add heart
	let mimikyu = new GLTF({
		asset: 'mimikyu',
		x: 0,
		y: 0,
		z: 0,
	});
	
	// add heart to container
	container.addChild(mimikyu);
}

function draw() {
	// drop rain drops
	for (let i = 0; i < rain.length; i++) {
		rain[i].nudge(0, random(-1 ,-0.5), 0);
		// if rain drop goes past the floor, reset the y 
		if (rain[i].getY() < 0) {
			rain[i].setY(random(100, 150));
		}
	}

	// make sparkles go up 
	for (let m = 0; m < magic.length; m++) {
		magic[m].nudge(0, random(0.05, 0.1), 0);
		// if sparkles go too high, reset y to 0
		if (magic[m].getY() > 45) {
			magic[m].setY(random(-2,0));
		}
	}
	
	// spin our container
	container.spinY(1);
	container.spinZ(1);

	// draw ellipse wherever user's mouse is
	buffer.noStroke();
	buffer.fill(random(160,255), random(150,220), random(190,255));
	buffer.ellipse(random(0,1024), random(0,1024), 50, 50);

	// add sparkles
	let tempSparkle = new Sparkle(random(-100, 100), random(-210, -200), random(-100, 100));

	// add sparkle to array
	sparkles.push(tempSparkle);

	// move all particles 
	for (let s = 0; s < sparkles.length; s++) {
		let result = sparkles[s].move();
	}
}

// OOP object
class Sparkle {
	constructor(x,y,z) {
		// construct a sparkle
		this.sparkle = new Octahedron({
            x: x, y: y, z: z,
            width: 1, height: 1, depth: 1,
            red: random(160,255), green: random(150,220), blue: random(190,255)
		});

		// add sparkle to world
		world.add(this.sparkle);
	}
	
	// move function for sparkle
	move() {
		this.sparkle.nudge(0, random(0.05, 0.1), 0);
		// if sparkles go too high, reset y 
		if (this.sparkle.getY() > -100) {
			this.sparkle.setY(random(-210, -200));
		}
	}
}