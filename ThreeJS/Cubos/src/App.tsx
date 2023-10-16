
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


function doThreeJS(){
 
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  const clock = new THREE.Clock();
  
  //Color fondo
  scene.background = new THREE.Color(0.25,0.6,0.95);
  
  //Luz ambiental
  const ambientLight = new THREE.AmbientLight(0xe0e0e0,1);
  scene.add(ambientLight);

  
  const renderer = new THREE.WebGLRenderer();
  const controls = new OrbitControls(camera, renderer.domElement)
  renderer.setSize( window.innerWidth, window.innerHeight );

  document.body.appendChild( renderer.domElement );

  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshPhongMaterial( { color: "yellow" } );  
  const mainCube = new THREE.Mesh( geometry, material );
  scene.add( mainCube );

  const planeG = new THREE.PlaneGeometry(5,5);
  const planeM = new THREE.MeshPhongMaterial( {color: "green"} );
  const plane = new THREE.Mesh( planeG, planeM);
  plane.rotateX(-90 * Math.PI / 180)
  plane.position.set(0, -1, 2.5)
  scene.add( plane )

  camera.position.set(0, 2, 10)
  camera.rotateX(35 * Math.PI / 180)

  function getRandomValues(min : number, max :number){
    return Math.random() * (max - min) + min
  }

  const cubes : Array<THREE.Object3D<THREE.Object3DEventMap>>= []

  for (let i = 0; i < 8; i++){
    const cubeG = new THREE.BoxGeometry();
    const cubeM = new THREE.MeshBasicMaterial( {color: 'darkturquoise'} );
    const cube = new THREE.Mesh(cubeG, cubeM);
    cube.position.set(getRandomValues(-10, 10), getRandomValues(-5, 5), getRandomValues(-5,5))
    cubes.push(cube)
    scene.add(cube)
  }

  const raycaster = new THREE.Raycaster()
  const point = new THREE.Vector2(0,0)

  window.addEventListener("click", (e) => {
    point.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    point.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera(point, camera)

    const intersectedObject = raycaster.intersectObjects(cubes);
    
    if(intersectedObject.length > 0){
      const obj = intersectedObject[0]

      if(obj.object.parent?.id === mainCube.id){
        scene.attach(obj.object)
      }
      else{
        mainCube.attach(obj.object)
      }
    }
  })


  function animate() {
    requestAnimationFrame( animate );
    controls.update()

    mainCube.position.set(Math.sin(clock.getElapsedTime()) * 7, 0, 0)

    // required if controls.enableDamping or controls.autoRotate are set to true
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
      {doThreeJS()}
    </>
  )
}

export default App

