import "./style.css";
import * as THREE from 'three'
import gsap from 'gsap'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as  dat from 'dat.gui'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { TextureLoader } from "three";
import { Skydiver } from "./vpp";
// import { Gui } from "./GUI";
var introscreen = document.createElement('div');
introscreen.style.position = 'absolute';
introscreen.style.top = '0';
introscreen.style.left = '0';
introscreen.style.width = '130%';
introscreen.style.height = '120%';
introscreen.style.backgroundColor = 'black';

var introImage = document.createElement('img');
introImage.src = 'public/intro.png';
introImage.style.position = 'absolute';
introImage.style.top = '40%';
introImage.style.left = '40%';
introImage.style.transform = 'translate(-50%, -50%)';
introImage.style.width = '80%';


introscreen.appendChild(introImage);
//introscreen.style.opacity = '0.5';
introscreen.addEventListener('click', function() {
  //location.reload();
});

// Add the intro screen to the body
document.body.appendChild(introscreen); 
//textures
let freefall5;
 //loading Manager
//1:person
//2 :plane
//3:parachute
 //textures
 //loading Manager
 const loadingManager=new THREE.LoadingManager()
const textureLoader=new THREE.TextureLoader( loadingManager)
const normaltextures2 =textureLoader.load('/public/nn.jpg')
// const grass3 =textureLoader.load('public/skybox1/valley_dn.jpg')
const grass3 =textureLoader.load('public/grass2.jpg')
const intro =textureLoader.load('public/intro.jpg')
grass3.wrapS = THREE.RepeatWrapping;
grass3.wrapT = THREE.RepeatWrapping;
grass3.repeat.set(20, 20);
const grass4 =textureLoader.load('public/skybox1/valley_dn.jpg')
grass4.wrapS = THREE.RepeatWrapping;
grass4.wrapT = THREE.RepeatWrapping;

textureLoader.minFilter = THREE.LinearFilter;
textureLoader.magFilter = THREE.LinearFilter;
var cubeTexture = new THREE.CubeTextureLoader()

 const skybox=cubeTexture.load([
    'public/skybox1/valley_ft.jpg',//left
    'public/skybox1/valley_bk.jpg',//right
    'public/skybox1/valley_up.jpg',//up
    'public/skybox1/valley_dn.jpg',//down
    'public/skybox1/valley_rt.jpg',//back
    'public/skybox1/valley_lf.jpg',//front
    
    ]
    )
    
 const cursor={
   x:0,
   y:0
 }
 
window.addEventListener('mousemove',(event)=>{
   cursor.x=-(event.clientX/sizes.width-0.5)
   cursor.y=event.clientY/sizes.height-0.5

})
 const scene= new THREE.Scene()
//world
// Ground1
const geometry1= new THREE.BoxBufferGeometry(1000000,10,1000000,   1,1,1)
const meterial1 = new THREE.MeshStandardMaterial({map:grass3})
const mesh1=new THREE.Mesh(geometry1,meterial1) 
mesh1.position.y=0
scene.add(mesh1)
//intro
const geometry= new THREE.BoxBufferGeometry(2000000,100,1000000,   1,1,1)
const meterial = new THREE.MeshStandardMaterial({map:intro, })
 meterial.normalMap=normaltextures2
 meterial.normalScale.set(0.9,0.9)
const mesh=new THREE.Mesh(geometry,meterial) 
mesh.position.y=-200000
//scene.add(mesh)
//skybox
scene.background=skybox

const group1=new THREE.Group()
group1.rotation.x=Math.PI
const group2=new THREE.Group()
const group3=new THREE.Group()
const group4=new THREE.Group()
const group5=new THREE.Group()
//parametersx
var SF=100
var PosX=0
var camera1=false
var camera2=false
var cameraintro=true
let backgroundm=true
let death=false
var parachutechoice=2
var PPvalueY=1000;
var PPvalueX=100;
var PPvalueZ=100;
let isdead=false
let landed=false
var PVvalue=100;
var Massvalue=90;
var Rad=2;
var lengthvalue=2;
var widthvalue=2;
var cdpvalue=1.1
var cdpminvalue=0
var cdpminvalue1=0
var cdpmaxvalue=10
var cdpmaxvalue1=10
var g=9.8
var rhovalue=1.2
var speedvalue=50
var anglevalue=90
var dirvalue=1
var ffxvelo=0
var ffyvelo=0
var ffzvelo=0
var ffxacc=0
var ffyacc=0
var ffzacc=0
var ffxaom=0
var ffyaom=0
var ffzaom=0
var ffek=0
var ffep=0
let  fftvx=0
let  fftvy=0
let  fftvy2=0
let  fftvz=0
let droping=false;
let dropinganimation=true
let parachuteanimation=true
let droped=false;
let flying=false;
let isflying=false;
let flyingp2=false;
let flyingp4=false;
let flyingp42=false;
let flyingp22=false;
let parachuting=false
let pressed1=false
let pressed2=false
let pressed3=false
let pressed4=false
//GUI
//plane velocity
var slidervelocity = document.createElement('input');
slidervelocity.type = 'range';
slidervelocity.min = 50;
slidervelocity.max = 400;
slidervelocity.value = 100;
slidervelocity.step = 10;
slidervelocity.style.position = 'absolute'; 
slidervelocity.style.top = '20%';
slidervelocity.style.left = '50%';
slidervelocity.style.transform = 'translateX(-50%)';
slidervelocity.style.width = '250px';
var labelveocity = document.createElement('label');
labelveocity.for = 'my-slidervelocity';
labelveocity.style.fontWeight = 'bold';
labelveocity.textContent = 'Plane velocity:';
labelveocity.style.position = 'absolute';
 labelveocity.style.top = '18.5%';
 labelveocity.style.left = '38%';
labelveocity.style.transform = 'translateX(-50%)';
labelveocity.style.fontSize = '30px';
labelveocity.style.fontWeight = 'bold';
slidervelocity.addEventListener('input', function() {
  PVvalue= slidervelocity.value;
  console.log( PVvalue);
});
var labelv = document.createElement('label');
labelv.textContent = PVvalue;

labelv.style.position = 'absolute';
labelv.style.top = '14%';
labelv.style.left = '50%';
labelv.style.fontSize = '25px';
labelv.style.fontWeight = 'bold';
labelv.style.border = '1px solid black';
labelv.style.backgroundColor = 'white';
labelv.style.transform = 'translateX(-50%)';

setInterval(function() {
   labelv.textContent = PVvalue
 }, 1000); 
document.body.appendChild(labelv);
document.body.appendChild(slidervelocity);
document.body.appendChild(labelveocity); 
//plane position
var slider = document.createElement('input');
slider.type = 'range';
slider.min = 50;
slider.max = 2000;
slider.value = 50;
slider.step = 100;
slider.style.position = 'absolute'; 
slider.style.top = '30%';
slider.style.left = '50%';
slider.style.transform = 'translateX(-50%)';
slider.style.width = '250px';
var label1 = document.createElement('label');
label1.for = 'my-slider';
label1.textContent = 'Plane Height:';
label1.style.position = 'absolute';
 label1.style.top = '28.5%';
 label1.style.left = '38%';
 label1.style.fontWeight = 'bold';
label1.style.transform = 'translateX(-50%)';
label1.style.fontSize = '30px';
slider.addEventListener('input', function() {
  PPvalueY= slider.value;
  console.log( PPvalueY);
});
var label = document.createElement('label');
label.textContent = PPvalueY;
label.style.position = 'absolute';
label.style.top = '24%';
label.style.left = '50%';
label.style.fontSize = '25px';
label.style.fontWeight = 'bold';
label.style.border = '1px solid black';
label.style.backgroundColor = 'white';
label.style.transform = 'translateX(-50%)';

setInterval(function() {
   label.textContent = PPvalueY
 }, 1000); 
document.body.appendChild(label);
document.body.appendChild(slider);
document.body.appendChild(label1); 

//mass
var slidermass = document.createElement('input');
slidermass.type = 'range';
slidermass.min = 40;
slidermass.max =300;
slidermass.value = 40;
slidermass.step = 10;
slidermass.style.position = 'absolute'; 
slidermass.style.top = '40%';
slidermass.style.left = '50%';
slidermass.style.transform = 'translateX(-50%)';
slidermass.style.width = '250px';
var labelmass = document.createElement('label');
labelmass.for = 'my-slider';
labelmass.style.fontWeight = 'bold';
labelmass.textContent = 'Mass:';
labelmass.style.position = 'absolute';
 labelmass.style.top = '38.5%';
 labelmass.style.left = '38%';
labelmass.style.transform = 'translateX(-50%)';
labelmass.style.fontSize = '30px';
slidermass.addEventListener('input', function() {
  Massvalue= slidermass.value;
  console.log( Massvalue);
});
var labelmv = document.createElement('label');
labelmv.textContent = Massvalue;
labelmv.style.position = 'absolute';
labelmv.style.top = '33.5%';
labelmv.style.left = '50%';
labelmv.style.fontSize = '25px';
labelmv.style.fontWeight = 'bold';
labelmv.style.border = '1px solid black';
labelmv.style.backgroundColor = 'white';
labelmv.style.transform = 'translateX(-50%)';

setInterval(function() {
   labelmv.textContent = Massvalue
 }, 1000); 
document.body.appendChild(labelmv);
document.body.appendChild(slidermass);
   document.body.appendChild(labelmass);
   var sliderradius = document.createElement('input');
sliderradius.type = 'range';
sliderradius.min = 0.5;
sliderradius.max =8;
sliderradius.value = 2;
sliderradius.step = 0.25;
sliderradius.style.position = 'absolute'; 
sliderradius.style.top = '50%';
sliderradius.style.left = '60%';
sliderradius.style.transform = 'translateX(-50%)';
sliderradius.style.width = '250px';

var labelradius = document.createElement('label');
labelradius.for = 'my-slider';
labelradius.style.fontWeight = 'bold';
labelradius.textContent = 'Radius:';
labelradius.style.position = 'absolute';
 labelradius.style.top = '48.6%';
 labelradius.style.left = '51%';
labelradius.style.transform = 'translateX(-50%)';
labelradius.style.fontSize = '30px';  

sliderradius.addEventListener('input', function() {
  Rad= sliderradius.value;
  console.log( Rad);
});
var labelrv = document.createElement('label');
labelrv.textContent = Massvalue;
labelrv.style.position = 'absolute';
labelrv.style.top = '43.5%';
labelrv.style.left = '60%';
labelrv.style.fontSize = '25px';
labelrv.style.fontWeight = 'bold';
labelrv.style.border = '1px solid black';
labelrv.style.backgroundColor = 'white';
labelrv.style.transform = 'translateX(-50%)';

setInterval(function() {
   labelrv.textContent = Rad
 }, 1000); 
 sliderradius.style.display = 'none';
 labelrv.style.display = 'none';
 labelradius.style.display = 'none';
document.body.appendChild(labelrv);
document.body.appendChild(sliderradius);
   document.body.appendChild(labelradius);
   var circul = document.createElement('button');
   circul.innerHTML = 'Circle parachute!';
   
   circul.style.position = 'absolute';
   circul.style.top = '50%';
   circul.style.left = '40%';
   circul.style.transform = 'translate(-50%, -50%)';
   circul.style.backgroundColor = 'white';
   circul.style.color = 'red';
   circul.style.fontSize = '30px';
   circul.style.padding = '8px 16px';
   circul.style.border = 'none';
   circul.style.borderRadius = '5px';
   circul.style.cursor = 'pointer';
   circul.style.border = '1px solid red';
   
   circul.addEventListener('click', function() {
    rect.style.display = 'none';
    sliderradius.style.display = 'block';
    labelrv.style.display = 'block';
    labelradius.style.display = 'block';

    group5.add(group3)
    
    parachutechoice=1
    cdpmaxvalue=1.8
    cdpminvalue=1
  
    
   });
   document.body.appendChild(circul);
   var sliderlength = document.createElement('input');
sliderlength.type = 'range';
sliderlength.min = 0.5;
sliderlength.max =8;
sliderlength.value = 2;
sliderlength.step = 0.25;
sliderlength.style.position = 'absolute'; 
sliderlength.style.top = '47.5%';
sliderlength.style.left = '45%';
sliderlength.style.transform = 'translateX(-50%)';
sliderlength.style.width = '250px';

var labellength = document.createElement('label');
labellength.for = 'my-slider';
labellength.textContent = 'Length:';
labellength.style.fontWeight = 'bold';
labellength.style.position = 'absolute';
 labellength.style.top = '46%';
 labellength.style.left = '36.5%';
labellength.style.transform = 'translateX(-50%)';
labellength.style.fontSize = '30px';

sliderlength.addEventListener('input', function() {
  lengthvalue= sliderlength.value;
  console.log( lengthvalue);
});
var labellv = document.createElement('label');
labellv.textContent = lengthvalue;
labellv.style.position = 'absolute';
labellv.style.top = '43%';
labellv.style.left = '45%';
labellv.style.fontSize = '25px';
labellv.style.fontWeight = 'bold';
labellv.style.border = '1px solid black';
labellv.style.backgroundColor = 'white';
labellv.style.transform = 'translateX(-50%)';

setInterval(function() {
   labellv.textContent = lengthvalue
 }, 1000); 
 sliderlength.style.display = 'none';
 labellv.style.display = 'none';
 labellength.style.display = 'none';
document.body.appendChild(labellv);
document.body.appendChild(sliderlength);
   document.body.appendChild(labellength);
   
   var sliderwidth = document.createElement('input');
sliderwidth.type = 'range';
sliderwidth.min = 0.5;
sliderwidth.max =8;
sliderwidth.value = 2;
sliderwidth.step = 0.25;
sliderwidth.style.position = 'absolute'; 
sliderwidth.style.top = '53%';
sliderwidth.style.left = '45%';
sliderwidth.style.transform = 'translateX(-50%)';
sliderwidth.style.width = '250px';

var labelwidth = document.createElement('label');
labelwidth.for = 'my-slider';
labelwidth.style.fontWeight = 'bold';
labelwidth.textContent = 'Width:';
labelwidth.style.position = 'absolute';
 labelwidth.style.top = '51.75%';
 labelwidth.style.left = '36.5%';
labelwidth.style.transform = 'translateX(-50%)';
labelwidth.style.fontSize = '27px';
sliderwidth.addEventListener('input', function() {
  widthvalue= sliderwidth.value;
  console.log( widthvalue);
});
var labelwv = document.createElement('label');
labelwv.textContent = widthvalue;
labelwv.style.position = 'absolute';
labelwv.style.top = '49%';
labelwv.style.left = '45%';
labelwv.style.fontSize = '25px';
labelwv.style.fontWeight = 'bold';
labelwv.style.border = '1px solid black';
labelwv.style.backgroundColor = 'white';
labelwv.style.transform = 'translateX(-50%)';

setInterval(function() {
   labelwv.textContent = widthvalue
 }, 1000); 
 sliderwidth.style.display = 'none';
 labelwv.style.display = 'none';
 labelwidth.style.display = 'none';
document.body.appendChild(labelwv);
document.body.appendChild(sliderwidth);
   document.body.appendChild(labelwidth);
   var rect = document.createElement('button');
   rect.innerHTML = 'Rect parachute!';
   
   rect.style.position = 'absolute';
   rect.style.top = '50%';
   rect.style.left = '60%';
   rect.style.transform = 'translate(-50%, -50%)';
   rect.style.backgroundColor = 'white';
   rect.style.color = 'red';
   rect.style.fontSize = '30px';
   rect.style.padding = '8px 16px';
   rect.style.border = 'none';
   rect.style.borderRadius = '5px';
   rect.style.cursor = 'pointer';
   rect.style.border = '1px solid red';
   
   rect.addEventListener('click', function() {
    circul.style.display = 'none';
    group5.add(group4)
    parachutechoice=2
    cdpminvalue=0.75
  cdpmaxvalue=1.5
    sliderwidth.style.display = 'block';
 labelwv.style.display = 'block';
 labelwidth.style.display = 'block';
 sliderlength.style.display = 'block';
 labellv.style.display = 'block';
 labellength.style.display = 'block';
    
   });
   document.body.appendChild(rect);

//cdp
var slidercdp = document.createElement('input');

slidercdp.type = 'range';
setInterval(() => {
  slidercdp.min = cdpminvalue;
slidercdp.max =cdpmaxvalue;
}, 1000);

slidercdp.value = 1.5;
slidercdp.step = 0.1;
slidercdp.style.position = 'absolute'; 
slidercdp.style.top = '60%';
slidercdp.style.left = '50%';
slidercdp.style.transform = 'translateX(-50%)';
slidercdp.style.width = '250px';
var labelcdp = document.createElement('label');
labelcdp.for = 'my-slider';
labelcdp.style.fontWeight = 'bold';
labelcdp.textContent = 'Cdp:';
labelcdp.style.position = 'absolute';
 labelcdp.style.top = '58.5%';
 labelcdp.style.left = '38%';
labelcdp.style.transform = 'translateX(-50%)';
labelcdp.style.fontSize = '30px';

slidercdp.addEventListener('input', function() {
  cdpvalue= slidercdp.value;
  console.log( cdpvalue);
});
var labelcdpv = document.createElement('label');
labelcdpv.textContent = cdpvalue;
labelcdpv.style.position = 'absolute';
labelcdpv.style.top = '55%';
labelcdpv.style.left = '50%';
labelcdpv.style.fontSize = '25px';
labelcdpv.style.fontWeight = 'bold';
labelcdpv.style.border = '1px solid black';
labelcdpv.style.backgroundColor = 'white';
labelcdpv.style.transform = 'translateX(-50%)';

setInterval(function() {
   labelcdpv.textContent = cdpvalue
 }, 1000); 
document.body.appendChild(labelcdpv);
document.body.appendChild(slidercdp);
   document.body.appendChild(labelcdp);

//gravity
var sliderg = document.createElement('input');
sliderg.type = 'range';
sliderg.min = 7;
sliderg.max =14;
sliderg.value = 9.8;
sliderg.step = 0.1;
sliderg.style.position = 'absolute'; 
sliderg.style.top = '70%';
sliderg.style.left = '50%';
sliderg.style.transform = 'translateX(-50%)';
sliderg.style.width = '250px';
var labelg = document.createElement('label');
labelg.for = 'my-slider';
labelg.style.fontWeight = 'bold';
labelg.textContent = 'Gravity:';
labelg.style.position = 'absolute';
 labelg.style.top = '68.5%';
 labelg.style.left = '38%';
labelg.style.transform = 'translateX(-50%)';
labelg.style.fontSize = '30px';

sliderg.addEventListener('input', function() {
  g= sliderg.value;
  console.log( g);
});
var labelgv = document.createElement('label');
labelgv.textContent = g;
labelgv.style.position = 'absolute';
labelgv.style.top = '63.5%';
labelgv.style.left = '50%';
labelgv.style.fontSize = '25px';
labelgv.style.fontWeight = 'bold';
labelgv.style.border = '1px solid black';
labelgv.style.backgroundColor = 'white';
labelgv.style.transform = 'translateX(-50%)';

setInterval(function() {
   labelgv.textContent = g
 }, 1000); 
document.body.appendChild(labelgv);
document.body.appendChild(sliderg);
   document.body.appendChild(labelg);

//rho
var sliderrho = document.createElement('input');
sliderrho.type = 'range';
sliderrho.min = 0.5;
sliderrho.max =4;
sliderrho.value = 1.2;
sliderrho.step = 0.1;
sliderrho.style.position = 'absolute'; 
sliderrho.style.top = '80%';
sliderrho.style.left = '50%';
sliderrho.style.transform = 'translateX(-50%)';
sliderrho.style.width = '250px';
var labelrho = document.createElement('label');
labelrho.for = 'my-slider';
labelrho.style.fontWeight = 'bold';
labelrho.textContent = 'Rho:';
labelrho.style.position = 'absolute';
 labelrho.style.top = '78.5%';
 labelrho.style.left = '38%';
labelrho.style.transform = 'translateX(-50%)';
labelrho.style.fontSize = '30px';

sliderrho.addEventListener('input', function() {
  rhovalue= sliderrho.value;
  console.log(rhovalue);
});
var labelrhov = document.createElement('label');
labelrhov.textContent = rhovalue;
labelrhov.style.position = 'absolute';
labelrhov.style.top = '73.5%';
labelrhov.style.left = '50%';
labelrhov.style.fontSize = '25px';
labelrhov.style.fontWeight = 'bold';
labelrhov.style.border = '1px solid black';
labelrhov.style.backgroundColor = 'white';
labelrhov.style.transform = 'translateX(-50%)';

setInterval(function() {
   labelrhov.textContent = rhovalue
 }, 1000); 
document.body.appendChild(labelrhov);
document.body.appendChild(sliderrho);
   document.body.appendChild(labelrho);
//speed
var sliderspeed = document.createElement('input');
sliderspeed.type = 'range';
sliderspeed.min = 10;
sliderspeed.max =400;
sliderspeed.value = 50;
sliderspeed.step = 5;
sliderspeed.style.position = 'absolute'; 
sliderspeed.style.top = '90%';
sliderspeed.style.left = '50%';
sliderspeed.style.transform = 'translateX(-50%)';
sliderspeed.style.width = '250px';
var labelspeed = document.createElement('label');
labelspeed.for = 'my-slider';
labelspeed.style.fontWeight = 'bold';
labelspeed.textContent = 'Wind speed:';
labelspeed.style.position = 'absolute';
 labelspeed.style.top = '88.5%';
 labelspeed.style.left = '38%';
labelspeed.style.transform = 'translateX(-50%)';
labelspeed.style.fontSize = '30px';

sliderspeed.addEventListener('input', function() {
  speedvalue= sliderspeed.value;
  console.log(speedvalue);
});
var labelspeedv = document.createElement('label');
labelspeedv.textContent = speedvalue;
labelspeedv.style.position = 'absolute';
labelspeedv.style.top = '84%';
labelspeedv.style.left = '50%';
labelspeedv.style.fontSize = '25px';
labelspeedv.style.fontWeight = 'bold';
labelspeedv.style.border = '1px solid black';
labelspeedv.style.backgroundColor = 'white';
labelspeedv.style.transform = 'translateX(-50%)';

setInterval(function() {
   labelspeedv.textContent = speedvalue
 }, 1000); 
document.body.appendChild(labelspeedv);
document.body.appendChild(sliderspeed);
   document.body.appendChild(labelspeed);
//angle
var sliderangle = document.createElement('input');
sliderangle.type = 'range';
sliderangle.min = 50;
sliderangle.max =400;
sliderangle.value = 90;
sliderangle.step = 10;
sliderangle.style.position = 'absolute'; 
sliderangle.style.top = '98%';
sliderangle.style.left = '50%';
sliderangle.style.transform = 'translateX(-50%)';
sliderangle.style.width = '250px';
var labelangle = document.createElement('label');
labelangle.for = 'my-slider';
labelangle.style.fontWeight = 'bold';
labelangle.textContent = 'Wind angle:';
labelangle.style.position = 'absolute';
 labelangle.style.top = '96.5%';
 labelangle.style.left = '38%';
labelangle.style.transform = 'translateX(-50%)';
labelangle.style.fontSize = '30px';

sliderangle.addEventListener('input', function() {
  anglevalue= sliderangle.value;
  console.log(anglevalue);
});
var labelanglev = document.createElement('label');
labelanglev.textContent = anglevalue;
labelanglev.style.position = 'absolute';
labelanglev.style.top = '93.5%';
labelanglev.style.left = '50%';
labelanglev.style.fontSize = '25px';
labelanglev.style.fontWeight = 'bold';
labelanglev.style.border = '1px solid black';
labelanglev.style.backgroundColor = 'white';
labelanglev.style.transform = 'translateX(-50%)';

setInterval(function() {
   labelanglev.textContent = anglevalue
 }, 1000); 
document.body.appendChild(labelanglev);
document.body.appendChild(sliderangle);
   document.body.appendChild(labelangle);
//direction
var sliderdir = document.createElement('input');
sliderdir.type = 'range';
sliderdir.min = 1;
sliderdir.max =5;
sliderdir.value = 1;
sliderdir.step = 1;
sliderdir.style.position = 'absolute'; 
sliderdir.style.top = '11%';
sliderdir.style.left = '50%';
sliderdir.style.transform = 'translateX(-50%)';
sliderdir.style.width = '250px';
var labeldir = document.createElement('label');
labeldir.for = 'my-slider';
labeldir.style.fontWeight = 'bold';
labeldir.textContent = 'Plane direction:';
labeldir.style.position = 'absolute';
 labeldir.style.top = '9.7%';
 labeldir.style.left = '38%';
labeldir.style.transform = 'translateX(-50%)';
labeldir.style.fontSize = '30px';

sliderdir.addEventListener('input', function() {
  dirvalue= sliderdir.value;
  console.log(dirvalue);
});
var labeldirv = document.createElement('label');
labeldirv.textContent = dirvalue;
labeldirv.style.position = 'absolute';
labeldirv.style.top = '7.5%';
labeldirv.style.left = '50%';
labeldirv.style.fontSize = '25px';
labeldirv.style.fontWeight = 'bold';
labeldirv.style.border = '1px solid black';
labeldirv.style.backgroundColor = 'white';
labeldirv.style.transform = 'translateX(-50%)';

setInterval(function() {
   labeldirv.textContent = dirvalue
 }, 1000); 
document.body.appendChild(labeldirv);
document.body.appendChild(sliderdir);
   document.body.appendChild(labeldir);
//end of gui

scene.add(group2)
let xxx=1.5
var colorchange=false
//models
 const loader = new GLTFLoader();
 loader.load( 'public/mountain_range_01.glb', function ( gltf ) {
  const mesh = gltf.scene.children[0];
  mesh.scale.x = 4000000.0*xxx; 
  mesh.scale.y = 4500000.0*xxx; 
  mesh.scale.z = 4000000.0*xxx;
  mesh.position.set(700000,-450000,2000000)
  
   scene.add( gltf.scene );
}, undefined, function ( error ) {
   console.error( error );
} );

loader.load( 'public/mountain_range_01.glb', function ( gltf ) {
  const mesh = gltf.scene.children[0];
  mesh.scale.x = 4000000.0*xxx; 
  mesh.scale.y = 4800000.0*xxx; 
  mesh.scale.z = 4000000.0*xxx;
  mesh.position.set(2800000,-600000,-800000)
  mesh.rotation.z=Math.PI/2
   scene.add( gltf.scene );
}, undefined, function ( error ) {
   console.error( error );
} );
loader.load( 'public/mountain_range_01.glb', function ( gltf ) {
  const mesh = gltf.scene.children[0];
  mesh.scale.x = 5500000.0*xxx; 
  mesh.scale.y = 5700000.0*xxx; 
  mesh.scale.z = 5500000.0*xxx;
  mesh.position.set(-1000000,-650000,-4500000)
  mesh.rotation.z=Math.PI
   scene.add( gltf.scene );
}, undefined, function ( error ) {
   console.error( error );
} );



loader.load( 'public/hero_mountain.glb', function ( gltf ) {
  const mesh = gltf.scene.children[0];
  mesh.scale.x = 1700000.0*xxx; 
  mesh.scale.y = 1900000.0*xxx; 
  mesh.scale.z = 1700000.0*xxx;
  mesh.position.set(0,-280000,3400000)
  // mesh.rotation.z=Math.PI/2
   scene.add( gltf.scene );
}, undefined, function ( error ) {
   console.error( error );
} );

loader.load( 'public/russian_pilot.glb', function ( gltf ) {
  const mesh = gltf.scene.children[0];
  mesh.scale.x = 8.0*xxx; 
  mesh.scale.y = 8.0*xxx; 
  mesh.scale.z = 8.0*xxx;
   group1.add(gltf.scene)
}, undefined, function ( error ) {
   console.error( error );
} );
loader.load( 'public/overlordchaoss_plane.glb', function ( gltf ) {
   const mesh = gltf.scene.children[0];
   mesh.scale.set(1, 1, 1);
   mesh.rotation.z=Math.PI/2
   mesh.scale.x = 400.0;
   mesh.scale.y = 400.0;
   mesh.scale.z = 400.0;
    scene.add( gltf.scene );
    group2.add(gltf.scene)
 }, undefined, function ( error ) {
    console.error( error );
 
 } );


 loader.load( 'public/army_parachute(1).glb', function ( gltf ) {
   const mesh = gltf.scene.children[0];
   mesh.scale.set(1, 1, 1);
 
   mesh.scale.x = 1100.0*xxx;
   mesh.scale.y = 1100.0*xxx;
   mesh.scale.z = 1100.0*xxx;
   mesh.position.y = 1400.0; 
    group3.add(gltf.scene)
 }, undefined, function ( error ) {
    console.error( error );
 } );
 

 loader.load( 'public/pubg_green_parachute.glb', function ( gltf ) {
  const mesh = gltf.scene.children[0];
  mesh.scale.set(1, 1, 1);
  mesh.scale.x = 180.0*xxx;
  mesh.scale.y = 180.0*xxx;
  mesh.scale.z = 180.0*xxx;
   group4.add(gltf.scene)
}, undefined, function ( error ) {
   console.error( error );
} );
 var val=group1.position.y
 window.addEventListener('keydown',(bb)=>{
  
   if(bb.key=='1'&&pressed1==false ){
     pressed1=true    
     console.log(group1.position.x/SF)
     droped=true
     backgroundm=false
     freefall5.startSimulation()
     scene.add(group1)
     group1.position.y =group2.position.y; 
     group3.position.y =100000; 
     group2.position.z +=100; 
     droping=true
     isflying=false
  }
   if(bb.key=='2'&& pressed2==false){
    parachuting=true
    pressed2=true
    freefall5.setParachuteDeployed();
      group3.position.y=group1.position.y
      group3.position.x=group1.position.x
   }
   if(bb.key=='c'){
     camera1=!camera1
   }
    if(bb.key=='4'&&pressed4==false){
     freefall5.stopSimulation()
     pressed4=!pressed4
      dropinganimation=false
    }
   else  if(bb.key=='4'&&pressed4==true){
      pressed4=!pressed4
      freefall5.startSimulation()
      dropinganimation=true
     }
      //walking
     if(bb.key=='w'&&isdead==false&&landed==true){
      group1.position.z+=500
 }
 if(bb.key=='s'&&isdead==false&&landed==true){
  group1.position.z-=500
}
if(bb.key=='a'&&isdead==false&&landed==true){
  group1.position.x+=500
}
if(bb.key=='d'&&isdead==false&&landed==true){
  group1.position.x-=500
}

 }
 );
//*lights
const ambientLight=new THREE.AmbientLight(0xffffff,0.75)
scene.add(ambientLight)
const pointlight=new THREE.PointLight(0xffffff,1.5)
pointlight.position.x=2
pointlight.position.y=100000
pointlight.position.z=4
scene.add(pointlight)   
 //size of canvas
const sizes={
    width:window.innerWidth,
    height:window.innerHeight,
}
//start button
var change=true
var button = document.createElement('button');
button.innerHTML = 'START!';

button.style.position = 'absolute';
button.style.top = '3%';
button.style.left = '50%';
button.style.transform = 'translate(-50%, -50%)';
button.style.backgroundColor = 'white';
button.style.color = 'red';
button.style.fontSize = '30px';
button.style.padding = '10px 20px';
button.style.border = 'none';
button.style.borderRadius = '5px';
button.style.cursor = 'pointer';
button.style.border = '1px solid red';
button.addEventListener('click', function() {
  introscreen.style.display = 'none'
  backgroundmusic.play()
  camera1=!camera1
  camera2=false
  cameraintro=false
  backgroundm=true
  isflying=true
 freefall5 = new Skydiver(Massvalue,  cdpvalue, g, rhovalue);
 if(parachutechoice==1){
 freefall5.circleparachute(Rad)
  }
 else if(parachutechoice==2){
  freefall5.rectangleparachute(lengthvalue,widthvalue)
 }
 if(dirvalue==3){flying=!flying}
else if(dirvalue==1){ flyingp2=!flyingp2}
else if(dirvalue==2) {flyingp4=!flyingp4}
else if(dirvalue==4) {flyingp42=!flyingp42}
else if(dirvalue==5){ flyingp22=!flyingp22}
group2.position.y=group1.position.y*SF
    change=false
label.style.display = 'none';
rect.style.display = 'none';
circul.style.display = 'none';
      label1.style.display = 'none';labelangle.style.display = 'none';labelanglev.style.display = 'none';labelcdp.style.display = 'none';
      labelcdpv.style.display = 'none';labelg.style.display = 'none';labelgv.style.display = 'none';labelmass.style.display = 'none';
      labelmv.style.display = 'none';labelradius.style.display = 'none';labelrho.style.display = 'none';labelrhov.style.display = 'none';
      labelrv.style.display = 'none';labelspeed.style.display = 'none';labelspeedv.style.display = 'none';labelv.style.display = 'none';
      label.style.display = 'none';labelveocity.style.display = 'none';labellength.style.display = 'none';labellv.style.display = 'none';
      labelwidth.style.display = 'none';labelwv.style.display = 'none';
      slider.style.display = 'none';sliderangle.style.display = 'none';
      slidercdp.style.display = 'none';sliderg.style.display = 'none';slidermass.style.display = 'none';sliderradius.style.display = 'none';
      sliderrho.style.display = 'none';sliderspeed.style.display = 'none'; slidervelocity.style.display = 'none';sliderwidth.style.display = 'none';
      sliderlength.style.display = 'none';
      sliderdir.style.display = 'none';labeldir.style.display = 'none';labeldirv.style.display = 'none';
      button.style.display = 'none';
});
document.body.appendChild(button);

//camera
let isCameraChasing = false;
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height,1,300000000000000000000000000)
//  camera.position.z=1500
 if(camera2){
camera.position.set(0,-1000000,0)
}
 //renderer
 const canvas=document.querySelector('.webgl')
 const renderer=new THREE.WebGLRenderer({
    canvas : canvas,
    //maxBufferSize: 100000
 })
renderer.setSize(sizes.width,sizes.height)
//pixel ratio
renderer.setPixelRatio(window.devicePixelRatio)
//fullscreen

//orbitcontrols
const controls=new OrbitControls(camera,canvas)
controls.enableDamping=true
function animate() {
  requestAnimationFrame( animate );
  controls.update();
  renderer.render( scene, camera );
}
scene.add(camera)
//music
const listener = new THREE.AudioListener();
camera.add(listener); // attach the listener to the camera or any other object in the scene
const audioLoader = new THREE.AudioLoader();
const backgroundmusic = new THREE.PositionalAudio(listener);
//backgroundmusic.play(); 
// load a backgroundmusic file
audioLoader.load('public/sp.mp3', function(buffer) {
  if(backgroundm){
  backgroundmusic.setBuffer(buffer);
  backgroundmusic.setRefDistance(200000); // set the reference distance for the backgroundmusic
   //backgroundmusic.play(); // start playing the backgroundmusic
  }
});

scene.add(backgroundmusic);
const listeners = new THREE.AudioListener();
camera.add(listeners); // attach the listener to the camera or any other object in the scene
const audioLoaders = new THREE.AudioLoader();
const successmusic = new THREE.PositionalAudio(listeners);
//backgroundmusic.play(); 
// load a backgroundmusic file
audioLoader.load('public/success.mp3', function(buffer) {
  if(backgroundm){
  successmusic.setBuffer(buffer);
  successmusic.setRefDistance(200000); // set the reference distance for the backgroundmusic
   //backgroundmusic.play(); // start playing the backgroundmusic
  }
});
//clock
const clock=new THREE.Clock()    
//time
let time=Date.now()
//Animation
const planepositionx = 6000;
var framenum=0;
const listener2 = new THREE.AudioListener();
camera.add(listener2); // attach the listener to the camera or any other object in the scene
const audioLoader1 = new THREE.AudioLoader();
const deathsound = new THREE.PositionalAudio(listener2);
// load a deathsound file
audioLoader1.load('public/StarWars.mp3', function(buffer) {
  
  deathsound.setBuffer(buffer);
  deathsound.setRefDistance(2000000); // set the reference distance for the deathsound

});

const listener3 = new THREE.AudioListener();
camera.add(listener3); // attach the listener to the camera or any other object in the scene
const audioLoader2 = new THREE.AudioLoader();
const flyingsond = new THREE.PositionalAudio(listener3);
// load a flyingsond file
audioLoader2.load('public/Skydivingsound.mp3', function(buffer) {
  
  flyingsond.setBuffer(buffer);
  flyingsond.setRefDistance(2000000); // set the reference distance for the deathsound

});


const tick=()=>{ 
  if(landed==true&&isdead==false){
    survivalscreen.style.display = 'block';
    successmusic.play();
  }

  if(camera1){
  controls.target.set(group1.position.x,group1.position.y, group1.position.z);
  camera.position.set(group1.position.x,group1.position.y+10000, group1.position.z-10000);
  }
   if(cameraintro){
    camera.position.set(0,-590000, 0);
    //  controls.target.set(0,-100000, 0);
  }
  document.getElementsByClassName("frame")[0].innerHTML = "Frame: " + Math.round(framenum);
   document.getElementsByClassName("perosnposition")[0].innerHTML = "Person Position Y: " + Math.round(group1.position.y/SF);
   document.getElementsByClassName("perosnpositionx")[0].innerHTML = "Person Position X: " + Math.round(group1.position.x/SF);
   document.getElementsByClassName("perosnpositionz")[0].innerHTML = "Person Position Z: " + Math.round(group1.position.z/SF);
  document.getElementsByClassName("X_velocity")[0].innerHTML = "X Velocity " + ffxvelo.toFixed(2)
  document.getElementsByClassName("Y_velocity")[0].innerHTML = "Y Velocity: " + ffyvelo.toFixed(2)
  document.getElementsByClassName("Z_velocity")[0].innerHTML = "Z Velocity: " + ffzvelo.toFixed(2)
   document.getElementsByClassName("EK")[0].innerHTML = "EK: " + ffek
   document.getElementsByClassName("EP")[0].innerHTML = "EP: " + ffep
  document.getElementsByClassName("AmmountofmovementX")[0].innerHTML = "Ammountofmovement X: " + ffxaom.toFixed(5)
  document.getElementsByClassName("AmmountofmovementY")[0].innerHTML = "Ammountofmovement Y: " + ffyaom.toFixed(5)
  document.getElementsByClassName("AmmountofmovementZ")[0].innerHTML = "Ammountofmovement Z: " + ffzaom.toFixed(5)
  document.getElementsByClassName("X_acceleration")[0].innerHTML = "X_acceleration  " + ffxacc.toFixed(5)
  document.getElementsByClassName("Y_acceleration")[0].innerHTML = "Y_acceleration  " + ffyacc.toFixed(5)
   document.getElementsByClassName("Z_acceleration")[0].innerHTML = "Z_acceleration  " + ffzacc.toFixed(5)
   //document.getElementsByClassName("reachedTerminalVelocityX")[0].innerHTML = "reachedTerminalVelocityX  " + fftvx
   document.getElementsByClassName("reachedTerminalVelocityY")[0].innerHTML = "reachedTerminalVelocityY:  " + fftvy.toFixed(5)
   document.getElementsByClassName("reachedTerminalVelocityY2")[0].innerHTML = "reachedTerminalVelocityY2:  " + fftvy2.toFixed(5)
   //document.getElementsByClassName("reachedTerminalVelocityZ")[0].innerHTML = "reachedTerminalVelocityZ  " + fftvz
   if(change){
   var PP= parseInt(PPvalueY)
   var PV= parseInt(PVvalue)
   var M=parseInt(Massvalue)
   var R=parseInt(Rad)
   var Cd=parseInt(cdpvalue)
   var pd=parseInt(dirvalue)
   
   group1.position.y=PP
   PVvalue=PV 
   dirvalue=pd
group2.position.y=group1.position.y*SF+1000
   }else{framenum++}

      renderer.render(scene, camera);
    if(landed && parachuteanimation ){
      group5.rotation.x-=0.05
      group5.position.y-=30

    }
    if(group5.rotation.x<((-1)*Math.PI/2)){
      parachuteanimation=false
    }
    if(landed){
      flyingsond.stop()
    }
    if(dropinganimation==true){
   group1.rotation.x-=0.0015
    }
    if(group1.rotation.x<Math.PI/2)
    {
      dropinganimation=false
    }
    if(group1.position.y<20.0&&isdead==true ){
      deathscreen.style.display = 'block'
      deathsound.play()
    colorchange=true
     droping=false
     death=true
     group1.rotation.x=Math.PI/2

   }
   if(group1.position.y<5 ){
     droping=false
     landed=true
     console.log(isdead)
     scene.remove(group5)
   }
   if(droped){
    flyingsond.play();
    backgroundmusic.stop(); 
    backgroundm=false
    freefall5.setInitialMovementConditions(group1.position.x/SF,group1.position.y/SF ,group1.position.z/SF,PVvalue);
 //speed,angle
 freefall5.setHorizontalWindConditions(speedvalue, anglevalue);
 freefall5.printInitialConditions();
 droped=false
   }
   if(droping&&pressed4==false){
    PPvalueX=group1.position.x
    PPvalueX=group1.position.z
    isdead=freefall5.daed
    camera.lookAt(group2.position); 
      group3.position.y=group1.position.y+2000
      group3.position.x=group1.position.x
      group3.position.z=group1.position.z
      group4.position.y=group1.position.y+4500
      group4.position.x=group1.position.x
      group4.position.z=group1.position.z
 
      group1.position.y = freefall5.position._y*SF
      group1.position.z=freefall5.position._z*SF
      group1.position.x=freefall5.position._x*SF
      PosX=group1.position.x/SF
      ffxvelo=freefall5.velocity._x
      ffyvelo=freefall5.velocity._y
      ffzvelo=freefall5.velocity._z


      ffxacc=freefall5.acceleration._x
       ffyacc=freefall5.acceleration._y
       ffzacc=freefall5.acceleration._z

      ffxaom=freefall5.amountOfMovement._x
      ffyaom=freefall5.amountOfMovement._y
      ffzaom=freefall5.amountOfMovement._z
   ffek=freefall5.Ek
   ffep=freefall5.Ep
   fftvx=freefall5.TerminalVelocity1._x
   fftvy=freefall5.TerminalVelocity1._y
   fftvy2=freefall5.TerminalVelocity2._y
   fftvz=freefall5.TerminalVelocity1._z
      //group2.position.x +=PVvalue;
      if(dirvalue==3){group2.position.x +=PVvalue; }
      else if(dirvalue==1){  group2.position.z +=PVvalue;}
      else if(dirvalue==2) { group2.position.z +=PVvalue;   group2.position.x +=PVvalue; }
      else if(dirvalue==4) {group2.position.z -=PVvalue; group2.position.x +=PVvalue; }
      else if(dirvalue==5){ group2.position.z -=PVvalue; }

    }
    if(parachuting){
      group1.rotation.x-=0.05
    }
    if(group1.rotation.x<0){
        parachuting=false
       scene.add(group5)
      }
      if(landed){
        //group2.position.x +=PVvalue;
        if(dirvalue==3){group2.position.x +=PVvalue; }
        else if(dirvalue==1){  group2.position.z +=PVvalue;}
        else if(dirvalue==2) { group2.position.z +=PVvalue;   group2.position.x +=PVvalue; }
        else if(dirvalue==4) {group2.position.z -=PVvalue; group2.position.x +=PVvalue; }
        else if(dirvalue==5){ group2.position.z -=PVvalue; }
      }
    if(isflying){
if(flying){
    group1.position.x +=PVvalue; 
    group1.position.y =group2.position.y; 
      group2.position.x +=PVvalue; 
      
}
if(flyingp2){
  group1.position.z +=PVvalue; 
  group1.position.y =group2.position.y; 
    group2.position.z +=PVvalue; 
    group2.rotation.y=-Math.PI/2
    
}
if(flyingp22){
  group1.position.z -=PVvalue; 
  group1.position.y =group2.position.y; 
    group2.position.z -=PVvalue; 
    group2.rotation.y=+Math.PI/2
    
}
if(flyingp4){
  group1.position.z +=PVvalue; 
  group1.position.x +=PVvalue; 
  group1.position.y =group2.position.y; 
    group2.position.z +=PVvalue; 
    group2.position.x +=PVvalue; 
    group2.rotation.y=-Math.PI/4
    
}
if(flyingp42){
  group1.position.z -=PVvalue; 
  group1.position.x +=PVvalue; 
  group1.position.y =group2.position.y; 
    group2.position.z -=PVvalue; 
    group2.position.x +=PVvalue; 
    group2.rotation.y=+Math.PI/4
    
}
    }

// if(backgroundm){
//   backgroundmusic.play()

// }
//clock
const elapsedTime=clock.getElapsedTime()
//time
const currentTime=Date.now()
const deltaTime=currentTime-time
time=currentTime
controls.update()
window.requestAnimationFrame(tick)
}
tick()


//death screen
var deathscreen = document.createElement('button');
deathscreen.innerHTML = 'You Died!';

deathscreen.style.position = 'absolute';
deathscreen.style.top = '50%';
deathscreen.style.left = '50%';
deathscreen.style.transform = 'translate(-50%, -50%)';
deathscreen.style.backgroundColor = 'rgba(200, 0, 0, 0.7)';
deathscreen.style.color = 'white';
deathscreen.style.fontSize = '60px';
deathscreen.style.padding = '8px 16px';
deathscreen.style.border = 'none';
deathscreen.style.borderRadius = '5px';
deathscreen.style.cursor = 'pointer';
deathscreen.style.boxShadow = 'inset 0 0 10px 2px rgba(255, 255, 255, 0.2)';

deathscreen.addEventListener('click', function() {
  location.reload();


});

// Add the button to the body
document.body.appendChild(deathscreen);
deathscreen.style.display = 'none'
var survivalscreen = document.createElement('button');
survivalscreen.innerHTML = 'You Survived!';

survivalscreen.style.position = 'absolute';
survivalscreen.style.top = '50%';
survivalscreen.style.left = '50%';
survivalscreen.style.transform = 'translate(-50%, -50%)';
survivalscreen.style.backgroundColor = 'rgba(0, 128, 0, 0.7)';
survivalscreen.style.color = 'white';
survivalscreen.style.fontSize = '60px';
survivalscreen.style.padding = '8px 16px';
survivalscreen.style.border = 'none';
survivalscreen.style.borderRadius = '5px';
survivalscreen.style.cursor = 'pointer';
survivalscreen.style.boxShadow = 'inset 0 0 10px 2px rgba(255, 255, 255, 0.2)';

survivalscreen.addEventListener('click', function() {
  // Reload the page
  location.reload();
});

// Add the button to the body
document.body.appendChild(survivalscreen);
survivalscreen.style.display = 'none'
