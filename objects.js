			import './index.html'
      
      // Creating a class (box constructor)
			class Box extends THREE.Mesh {
				constructor({ 
					width, 
					height, 
					depth, 
					color = '#00ff00', 
					velocity = {
						x: 0, 
						y: 0, 
						z: 0
					},
				  position = {
						x: 0, 
						y: 0, 
						z: 0
					},
					maxDistance,
					distanceTraveled,
					standby
				}) {
					super(
						new THREE.BoxGeometry(width, height, depth), 
						new THREE.MeshStandardMaterial({ color })
					)

					this.width = width
					this.height = height
					this.depth = depth

					this.position.set(position.x, position.y, position.z)

					this.right = this.position.x + this.width / 2
					this.left = this.position.x - this.width / 2

					this.bottom = this.position.y - this.height / 2
					this.top = this.position.y + this.height / 2

					this.front = this.position.z + this.depth / 2
					this.back = this.position.z - this.depth / 2

					this.velocity = velocity
					
					this.maxDistance = maxDistance
					this.distanceTraveled = distanceTraveled
					this.standby = standby
				}

				// Updating the created box object
				updateSides() {
					this.right = this.position.x + this.width / 2
					this.left = this.position.x - this.width / 2

					this.bottom = this.position.y - this.height / 2
					this.top = this.position.y + this.height / 2

					this.front = this.position.z + this.depth / 2
					this.back = this.position.z - this.depth / 2
				}

				update(ground) {
					this.updateSides()

					this.position.x += this.velocity.x
					this.position.z += this.velocity.z
				}
			} 
			
			// Creating the Ground
			const ground = new Box({
				width: 10,
				height: 0.1,
				depth: 10,
				color: "#808080",
				position: {
					x: 0,
					y: -2,
					z: 0
				}
			})
			ground.receiveShadow = true
			scene.add(ground)

			// Creating the Ground as a physics body
			const groundBody = new CANNON.Body({
      	type: CANNON.Body.STATIC,
      	// infinite geometric plane
      	shape: new CANNON.Box(new CANNON.Vec3(5, 0.05, 5)),
				
    	})
			groundBody.position.set(0, -2, 0)
    	physicsWorld.addBody(groundBody);

			// Creating Cube 1
			const cube1 = new Box({
				width: 1,
				height: 1,
				depth: 1,
				velocity: new CANNON.Vec3(0, 0, 0)
			})
			cube1.castShadow = true
			scene.add(cube1)

			// Cube 1 bounding box
			let cube1BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3(),)
			cube1BB.setFromObject(cube1)

			// setting Cube 1 as a physics body
			const cube1Body = new CANNON.Body({
				mass: 20,
				shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)),
			})
			cube1Body.position.set(-3, 2, 3)
			physicsWorld.addBody(cube1Body)

			// Creating Cube 1 projectile
			let projectile1 = new Box({
				width: 0.1,
				height: 0.1,
				depth: 0.1,
				color: "#ff0000",
				velocity:  new THREE.Vector3(0, 0, 0),
				maxDistance: 10,
				distanceTraveled: 0,
				standby: true
			})
			projectile1.receiveShadow = true
			scene.add(projectile1)

			// Cube 1 projectile bounding box
			let projectile1BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
			projectile1BB.setFromObject(projectile1)

			// setting Projectile 1 as a physics body
			const projectile1Body = new CANNON.Body({
				mass: 20,
				shape: new CANNON.Box(new CANNON.Vec3(0.05, 0.05, 0.05)),
			})
			projectile1Body.position.set(cube1Body.position.x + 0.5, cube1Body.position.y, cube1Body.position.z)
			physicsWorld.addBody(projectile1Body)

			// Creating Cube 2
			const cube2 = new Box({
				width: 1,
				height: 1,
				depth: 1,
				velocity: {
					x: 0,
					y: 0,
					z: 0
				},
				color: '#0000ff', 
				  position: {
						x: 0, 
						y: 0, 
						z: -2
					}
			})
			cube2.castShadow = true
			scene.add(cube2)

			// Cube 2 bounding box
			let cube2BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
			cube2BB.setFromObject(cube2)

			// Setting Cube 2 as a physics body
			const cube2Body = new CANNON.Body({
				mass: 5,
				shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5))
			})
			cube2Body.position.set(3, 2, -3)
			cube2Body.angularDamping = 0.2
			physicsWorld.addBody(cube2Body)
