
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function doThreeJS(){
 
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  const clock = new THREE.Clock;

  //Color fondo
  scene.background = new THREE.Color(0.25,0.6,0.95);

  //Luz ambiental
  const ambientLight = new THREE.AmbientLight(0xe0e0e0,1);
  scene.add(ambientLight);
  
  //Luz direccional
  const light = new THREE.DirectionalLight(0xffffff,0.6);
  light.position.set(0,4,2);
  scene.add(light);
  
  const renderer = new THREE.WebGLRenderer();
  const controls = new OrbitControls( camera, renderer.domElement );
  renderer.setSize( window.innerWidth, window.innerHeight );

  document.body.appendChild( renderer.domElement );

  const geometry = new THREE.BoxGeometry( 7.5, 1, 7.5 );
  const material = new THREE.MeshPhongMaterial( { color: 0xffffff } );  
  const cube = new THREE.Mesh( geometry, material );
  let ship : THREE.Object3D<THREE.Object3DEventMap>;
  scene.add( cube );

  let shipLoaded = false;
  const gmtfLoader = new GLTFLoader()
  gmtfLoader.load(
    '/models/spaceship.gltf',
    (gltf) => {
      ship = gltf.scene;
      ship.scale.x = .25;
      ship.scale.y = .25;
      ship.scale.z = .25;
      scene.add(ship)
      shipLoaded = true
    })

  camera.position.z = 3;
  camera.position.y = 6;
  camera.rotation.x = -45;
  cube.position.y = -.5

  const positionsArray :Array<THREE.Vector3>= [new THREE.Vector3(3.75, 2, 3.75),
                                          new THREE.Vector3(3.75, 2, -3.75),
                                          new THREE.Vector3(-3.75, 0, 3.75),
                                          new THREE.Vector3(-3.75, 0, -3.75)];
  let currentIndex = 0;

  const moveShip = (time: number) => {

    if (ship.position.distanceTo(positionsArray[currentIndex]) < .5)
    {
      currentIndex += 1;
      currentIndex %= 4
    }
    let lastIndex = currentIndex - 1;

    if (lastIndex < 0) 
      lastIndex = positionsArray.length - 1

    const dir = new THREE.Vector3(positionsArray[currentIndex].x - ship.position.x,
                                  positionsArray[currentIndex].y - ship.position.y,
                                  positionsArray[currentIndex].z - ship.position.z).normalize()  

    ship.position.x += dir.x * time * 2
    ship.position.y += dir.y * time * 2
    ship.position.z += dir.z * time * 2

    ship.lookAt(positionsArray[currentIndex])
  } 

  function animate() {
    requestAnimationFrame( animate );
    const time = clock.getDelta()
    controls.update();

    if(shipLoaded)
      moveShip(time % 1)

    renderer.render( scene, camera );
  }


  window.addEventListener( 'resize', onWindowResize, false );
  
  function onWindowResize(){ //funcion para redimensionar ventana si el usuario le anda moviendo
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
  }
  
  animate(); //Iniciamos el loop
}


const App = () => {

  return (
    <>
      <div id="info">Buenas</div>
      {doThreeJS()}
    </>
  )
}

export default App

