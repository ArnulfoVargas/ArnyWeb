import * as THREE from 'three';
import * as CANNON from 'cannon';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

function doThree(){
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  const physWorld = new CANNON.World()
  physWorld.gravity = new CANNON.Vec3(0, -9.81, 0)

  camera.position.z = 15;
  camera.position.y = 3;  

  //Color fondo
  scene.background = new THREE.Color( 'lightgray' );

  //Luz direccional
  const light = new THREE.DirectionalLight(0xffffff,0.6);
  light.position.set(-1,4,2);
  scene.add(light);
  light.castShadow=true;
  
  //Luz ambiental
  const ambientLight = new THREE.AmbientLight(0x99aaff,1);
  scene.add(ambientLight);

  const renderer = new THREE.WebGLRenderer();
  renderer.toneMapping = THREE.ACESFilmicToneMapping; //opciones aestethic
  renderer.outputColorSpace = THREE.SRGBColorSpace; //opciones aestethic
  renderer.setPixelRatio(window.devicePixelRatio); //opciones aestethic
  renderer.setSize( window.innerWidth, window.innerHeight );

  renderer.shadowMap.enabled = true;

  const controls = new OrbitControls( camera, renderer.domElement );
  controls.update();

  document.body.appendChild( renderer.domElement );

  const planoGeometry = new THREE.PlaneGeometry(20,20,5,5);
  const planoMaterial = new THREE.MeshPhongMaterial({
    color:0x339944,       
    side:THREE.DoubleSide
  });
  const planoMesh = new THREE.Mesh(planoGeometry,planoMaterial);
  const planePhys : any = new CANNON.Body({
    shape: new CANNON.Box(new CANNON.Vec3(10, 10, .1)),
    type: CANNON.Body.STATIC,

  })
  
  planePhys.quaternion.setFromEuler( -90 * (Math.PI / 180), 0, 0)
  planePhys.position.set(0, -.5, 0);
  physWorld.addBody(planePhys);
  scene.add(planoMesh);  

  planoMesh.position.copy(planePhys.position)
  planoMesh.quaternion.copy(planePhys.quaternion)


  const particlesRender : Array<THREE.Mesh<THREE.SphereGeometry, THREE.MeshPhongMaterial, THREE.Object3DEventMap>>= []
  const particlesPhysics : any= []
  let physIndex = 0;
  
  const creationInterval = setInterval(() => {
    
    const esferaGeo = new THREE.SphereGeometry(.1);
    const esferaMat = new THREE.MeshPhongMaterial({
      color: 0xeebb77,
      wireframe: false
    });
    const sphereMesh = new THREE.Mesh(esferaGeo,esferaMat);
    scene.add(sphereMesh);
    sphereMesh.position.set(0,0,0);

    particlesRender.push(sphereMesh)

    const spherePhys = new CANNON.Body({
      shape: new CANNON.Sphere(.1),
      type: CANNON.Body.DYNAMIC,
      mass: 1
    })
    physWorld.addBody(spherePhys);

    spherePhys.velocity.set((Math.random() * 5) - 2.5, Math.random() * 5 + 2, (Math.random() * 5) - 2.5);

    particlesPhysics.push(spherePhys)

    if (particlesRender.length >= 50){
      clearInterval(creationInterval);

      setInterval(() => {

        particlesPhysics[physIndex].position.set(0,0,0);
        particlesPhysics[physIndex].velocity.set((Math.random() * 5) - 2.5, Math.random() * 5 + 2, (Math.random() * 5) - 2.5);

        physIndex++;
        physIndex %= 50;
      }, 100)
    }
  }, 100
  )
  

  const physStep = 1 / 30; //la documentacion recomienda usar este valor

  function animate() {
    physWorld.step(physStep)

    for(const i in particlesRender){
      particlesRender[i].position.copy(particlesPhysics[i].position)
    }

    controls.update();
    renderer.render( scene, camera );
    requestAnimationFrame( animate );
  }
  window.addEventListener( 'resize', onWindowResize, false );
  
  function onWindowResize(){ //funcion para redimensionar ventana si el usuario le anda moviendo
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    controls.update();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }

  animate();
}

const App = () => {
  return (
    <>      
    {doThree()}
    </>
  )
}

export default App