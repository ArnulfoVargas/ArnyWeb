import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

function doThreeJS(){
 
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  let currentTimeout: number | undefined;
  //Color fondo
  scene.background = new THREE.Color( 'skyblue' );
  
  //Luz ambiental
  const ambientLight = new THREE.AmbientLight(0x99aaff,1);
  scene.add(ambientLight);

  const renderer = new THREE.WebGLRenderer();

  renderer.outputColorSpace = THREE.SRGBColorSpace; //opciones aestethic
  renderer.toneMapping = THREE.ACESFilmicToneMapping; //opciones aestethic
  renderer.toneMappingExposure = 0.85;
  renderer.setPixelRatio(window.devicePixelRatio); //opciones aestethic
  renderer.setSize( window.innerWidth, window.innerHeight );

  const controls = new OrbitControls( camera, renderer.domElement );

  document.body.appendChild( renderer.domElement );

  //1 ============================================================ Iluminacion con HDRI y reflejos
  const loader = new RGBELoader();
  loader.load('/environments/christmas_photo_studio_07_1k.hdr', (element) => {
    element.mapping = THREE.EquirectangularRefractionMapping
    scene.environment = element
  }, )

  const jpgloader = new THREE.TextureLoader();
  jpgloader.load('/environments/christmas_photo_studio_07.jpg', (element) => {
    element.mapping = THREE.EquirectangularRefractionMapping;
    scene.background = element;
  })

  camera.position.z = 5;
  controls.update();

  //2 ================================== ELEMENTOS HTML
  const etiquetasRenderer = new CSS2DRenderer(); //lo primero es inicializar
  etiquetasRenderer.setSize(window.innerWidth, window.innerHeight); //le damos tamaño
  etiquetasRenderer.domElement.style.position = 'absolute'; //esta propiedad
  etiquetasRenderer.domElement.style.top = '0px';//y esta propiedad son para poner encima de nuestra escena de threeJs
  document.body.appendChild(etiquetasRenderer.domElement); //lo añadimos al DOM, posteriormente vamos a animate y resize y lo añadimos
  etiquetasRenderer.domElement.style.pointerEvents = 'none'; //sino, los orbitControls no van a jalar porque los eventos de mouse
  //son registrados por el etiquetasRenderer
  etiquetasRenderer.domElement.style.color = "#ffffff";

  //parte2
  const div= document.createElement('div');
  div.style.width = '250px';
  div.style.height = 'fit-content';
  div.style.backgroundColor = 'black'
  div.style.padding = "10px"
  div.style.display = 'block'
  etiquetasRenderer.domElement.appendChild(div)

  const title = document.createElement('h2');
  title.textContent = "Missing elements"
  title.style.textAlign = 'center'
  title.style.color = 'white'
  div.appendChild(title)

  const ul = document.createElement('ul');
  div.appendChild(ul);

  const greetings = document.createElement('div');
  greetings.style.width = '100%'
  greetings.style.height = '100px'
  greetings.textContent = "Encontraste Todo"
  greetings.style.color = 'white'
  greetings.style.backgroundColor = 'black'
  greetings.style.textAlign = 'center'
  greetings.style.fontStyle = '2rem'
  greetings.style.display = 'none'
  etiquetasRenderer.domElement.appendChild(greetings)

  const ptool = document.createElement('p');  
  ptool.className = 'tooltip hide';
  ptool.textContent = 'TOOLTIP';
  const pContainer = document.createElement('div');
  pContainer.appendChild(ptool);
  const cPointLabel = new CSS2DObject(pContainer);
  cPointLabel.position.set(0,1,0);
  scene.add(cPointLabel);
  //2 ================================== ELEMENTOS HTML

  //3 ================================== AUDIO
  const listener = new THREE.AudioListener();
  camera.add( listener );

  // create a global audio source
  const sound = new THREE.Audio( listener );

  // load a sound and set it as the Audio object's buffer
  const audioLoader = new THREE.AudioLoader();
  audioLoader.load( 'audio/wineGlassClink.wav', function( buffer ) {
    sound.setBuffer( buffer );
    sound.setLoop( false );
    sound.setVolume( 0.5 );
  });

  // ============ Loader
  let isLoaded = false;
  let modelLoaded;
  let modelChilds : Array<any>= [];
  let modelNames : Array<any>= [];

  const modelsLoader = new GLTFLoader();
  modelsLoader.load('/HouseModel/coolHouse.gltf', (model) => {
    modelLoaded = model.scene;
    scene.add(modelLoaded)
    isLoaded = true;

    modelChilds = modelLoaded.children.filter((e) => e.name !== 'RoundedSquareLamp')
    modelChilds.forEach((e : any) => {modelNames.push(e.name)})
    setList()
  })

  const resetGame = () => {
    greetings.style.display = 'block'
    div.style.display = 'none'
    
    setTimeout(() => {
      modelChilds.forEach((e : any) => {modelNames.push(e.name)})
      greetings.style.display = 'none'
      div.style.display = 'block'
      setList()
    }, 2000)
  }

  function setList() {
    while(ul.firstChild){
      ul.removeChild(ul.firstChild)
    }
    
    for(const e of modelNames){
      const li = document.createElement('li');
      li.textContent = e;
      li.style.color = 'white'

      ul.appendChild(li)
    }
  }

  const mousePosition = new THREE.Vector2();
  const rayCaster = new THREE.Raycaster();


  window.addEventListener('click',(e)=>{
   
      if(!isLoaded) return;

      mousePosition.x =  ( e.clientX / window.innerWidth ) * 2 - 1;
      mousePosition.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
      
      rayCaster.setFromCamera(mousePosition,camera);
      const intersects = rayCaster.intersectObjects(modelChilds);
      if(intersects.length>0){
         
        const objPos = intersects[0].object;
        
        if(modelNames.includes(objPos.name)){
          modelNames = modelNames.filter(e => e !== objPos.name)

          ptool.className = 'tooltip show';
          const objectPos = objPos.position;

          cPointLabel.position.copy(objectPos);
          ptool.textContent = objPos.name;
          setList()

          if(currentTimeout != undefined){
            clearTimeout(currentTimeout)
          }
          currentTimeout = setTimeout(()=>{
            ptool.className = 'tooltip hide';
          }, 2000)

          if(modelNames.length <= 0){
            resetGame()
          }
        }
                
      }else{
        if(sound.isPlaying){
          sound.stop();      
        }
        sound.play();
      }
  })

  function animate() {
    requestAnimationFrame( animate );
    controls.update();


    etiquetasRenderer.render(scene,camera);
    renderer.render( scene, camera );
  }


  window.addEventListener( 'resize', onWindowResize, false );
  
  function onWindowResize(){ //funcion para redimensionar ventana si el usuario le anda moviendo
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    etiquetasRenderer.setSize( window.innerWidth, window.innerHeight );
  }
  
  animate(); //Iniciamos el loop
}


function App() {
  return (
    <>      
      {doThreeJS()}
    </>
  )
}

export default App
