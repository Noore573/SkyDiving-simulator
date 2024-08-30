
import vector from "./physics/vector.js";

export class Skydiver {
  constructor( mass, Cdp, g, rho) {
    if (mass < 40) {
      console.log('The skydiver cannot fly with a mass less than 40!');
      return;
    }if (g < 9) {
      console.log('The skydiver cannot fly with a gravity less than 9!');
      return; 
    }
    this.velocity = vector.create(0, 0, 0); // Use vector for velocity
    this.acceleration = vector.create(0, 0, 0);
    this.amountOfMovement = vector.create(0, 0, 0);
    this.position = vector.create(0, 1000, 0); // Use vector for position
    this.mass = mass;
    //this.daed=false

    this.initialVelocity = this.velocity; // Store initial velocity for shock calculation
    
    this.previousAcceleration = vector.create(0, 0, 0);
    this.reachedTerminalVelocity1 = false;
    this.TerminalVelocity1 = vector.create(0, 0, 0);
    this.reachedTerminalVelocity2 = false;
    this.TerminalVelocity2 = vector.create(0, 0, 0);

    // Define parachute properties
    this.parachuteArea = 16; // Parachute surface area in m^2
    this.parachuteCd = Cdp; // Parachute drag coefficient
    this.parachuteDeployed = false;
    this.daed = false;

    // Define constants
    this.g = g; // Acceleration due to gravity in m/s^2
    this.rho = rho; // Density of air in kg/m^3
    this.cd = 0.75; // Drag coefficient

    // Define wind conditions
    this.windSpeed = 0; // Wind speed in m/s
    this.windAngle = 0; // Wind angle in degrees

    // Define time step
    this.dt = 0.01; // Time step in seconds

    this.time = 0;
    
  }
    startSimulation() {
    // Define simulation loop
    this.interval = setInterval(() => {
      // Calculate forces
      const gravityForce = vector.create(0, -this.mass * this.g, 0);
      const dragForce = this.velocity.multiply(-0.5 * this.rho * this.cd * this.velocity.getLength());
      const windForce = vector.create(this.windSpeed * Math.cos(this.windAngle * Math.PI / 180), 0, this.windSpeed * Math.sin(this.windAngle * Math.PI / 180));
      let netForce = gravityForce.add(dragForce).add(windForce);
      
      // Apply additional drag force when the parachute is deployed
      if (this.parachuteDeployed) {
        const parachuteDrag = this.velocity.multiply(-0.5 * this.rho * this.parachuteCd * this.parachuteArea * this.velocity.getLength());
        netForce = gravityForce.add(dragForce).add(parachuteDrag).add(windForce);
      }


      // Calculate acceleration
      this.acceleration = netForce.multiply(1 / this.mass);
      // Update velocity and position
      this.velocity.addTo(this.acceleration, this.dt);
      this.position.addTo(this.velocity, this.dt);

      this.amountOfMovement = this.velocity.multiply(this.mass);
      this.Ek = this.velocity.getLength() *this.velocity.getLength() * this.mass*1/2;
      this.Ep = this.mass * this.g*this.position._y;

      this.time += this.dt;

      this.printMovement();
        // Check if the skydiver has reached terminal velocity
    
    if (this.acceleration._y > -0.001 && !this.reachedTerminalVelocity1 && !this.parachuteDeployed) {
      this.reachedTerminalVelocity1 = true;
      this.TerminalVelocity1 = vector.create(this.velocity._x,this.velocity._y,this.velocity._z);
      console.log('Skydiver has reached first terminal velocity!');
      console.log(`Velocity at first terminal velocity: ${this.velocity.getY().toFixed(2)} m/s`);
    }

    if (this.acceleration._y - this.previousAcceleration._y == 0 && !this.reachedTerminalVelocity2 && this.parachuteDeployed) {
      this.reachedTerminalVelocity2 = true;
      this.TerminalVelocity2 = vector.create(this.velocity._x,this.velocity._y,this.velocity._z);
      console.log('Skydiver has reached second terminal velocity!');
      console.log(`Velocity at second terminal velocity: ${this.velocity.getY().toFixed(2)} m/s`);
    }

      // Check if the skydiver has landed
      if (this.position.getY() <= 0.055) {
        clearInterval(this.interval);
        if (this.amountOfMovement.getLength()>= 1000){
          console.log('The skydiver is dead!');
          this.daed = true;}
        else {console.log('The skydiver has landed safely!');}
        // Calculate the shock
        const shock = this.velocity.getLength();
        console.log(`Shock upon landing: ${shock.toFixed(2)} m/s`); 
        console.log(`first terminal velocity: ${this.TerminalVelocity1.getY().toFixed(2)} m/s`);
        console.log(`second terminal velocity: ${this.TerminalVelocity2.getY().toFixed(2)} m/s`);
      }

      this.previousAcceleration = this.acceleration;
    }, this.dt * 1000);
  }

  printMovement() {
      // console.log(`
      // Time: ${this.time.toFixed(2)},

      // Position: (${this.position.getX().toFixed(2)},${this.position.getY().toFixed(2)},${this.position.getZ().toFixed(2)}) m

      // Velocity: (${this.velocity.getX().toFixed(2)},${this.velocity.getY().toFixed(2)},${this.velocity.getZ().toFixed(2)}) m/s
      
      // Acceleration:(${this.acceleration.getX().toFixed(2)},${this.acceleration.getY().toFixed(2)},${this.acceleration.getZ().toFixed(2)}) m/s^2
                      
      // amountOfMovement (P):(${this.amountOfMovement.getX().toFixed(0)},${this.amountOfMovement.getY().toFixed(0)},${this.amountOfMovement.getZ().toFixed(0)}) kg.m/s

      // Kinetic Energy (Ek): ${this.Ek.toFixed(0)} J

      // Potential Energy (Ep): ${this.Ep.toFixed(0)} J
      // `);
  }
  
  setHorizontalWindConditions(speed, angle) {
    this.windSpeed = speed;
    this.windAngle = angle;
  }

  setParachuteDeployed() {
    console.log('Opening the parachute!');
    this.parachuteDeployed = true;
  }

  
  circleparachute(raduis) {
    this.parachuteArea = Math.PI * raduis*raduis;
    console.log(1)
  }

  rectangleparachute(Length,width) {
    this.parachuteArea = Length*width;
    console.log(2)
  } 

  setInitialMovementConditions(positionX,height,positionZ ,PlaneVelocity) {
    const PlaneAngle = Math.atan((positionZ-0)/(positionX-0));
    const velocity_X= Math.cos(PlaneAngle)*PlaneVelocity;
    const velocity_Z= Math.sin(PlaneAngle)*PlaneVelocity;
    this.velocity = vector.create(velocity_X, 0, velocity_Z);
    this.position = vector.create(positionX,height,positionZ);
    this.initialVelocity = this.velocity; // Track initial velocity
  }


  printInitialConditions() {
  console.log('this is the start conditions for the Skydiver');
  console.log(`
  mass: ${this.mass} kg , 
  startVelocity: (${this.velocity.getX().toFixed(2)}, ${this.velocity.getY().toFixed(2)}, ${this.velocity.getZ().toFixed(2)} ) m/s ,
  gravity: ${this.g} m/s^2 , rho: ${this.rho} g/m^3 ,
  parachuteArea: ${this.parachuteArea.toFixed(2)} m^2 , parachuteCd: ${this.parachuteCd} , 
  Position: (${this.position.getX().toFixed(2)}, ${this.position.getY().toFixed(2)}, ${this.position.getZ().toFixed(2)} ) m ,
  `);}

  stopSimulation() {
    clearInterval(this.interval);
  }
}




////controls:  / 1 for create sky diver / 2 for start the simulation / 3 for opening the parachute / 4 for passing the simulation
//let skydiver = null;
// window.addEventListener('keydown',(k)=>{
//   if(k.key=='1'){if (skydiver) {
//     // If there is already a skydiver, do nothing
//     console.log('Skydiver already exists!');
//     return;
//   }
//     //mass, Cdp, g, rho
//     skydiver = new Skydiver(100, 1.5, 9.8, 1.2);
//     //positionX,height,positionZ ,PlaneVelocity
//     skydiver.setInitialMovementConditions(100,100,0,50);
//     //speed,angle
//     skydiver.setHorizontalWindConditions(50, 90);
//     //raduis
//     skydiver.circleparachute(2);
//     skydiver.printInitialConditions();
//     window.addEventListener('keydown',(kk)=>{
//       if(kk.key=='2'){skydiver.startSimulation();}
//       window.addEventListener('keydown',(kk)=>{
//         if(kk.key=='3'){skydiver.setParachuteDeployed();}});
//       if(kk.key=='4'){skydiver.stopSimulation();}
//     });
//   }
//   });