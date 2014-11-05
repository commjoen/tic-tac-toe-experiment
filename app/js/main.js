require({
  baseUrl: 'js',
  // three.js should have UMD support soon, but it currently does not
  shim: { 'vendor/three': { exports: 'THREE' },
          'vendor/trackballcontrols': { deps: ['vendor/three'], exports: 'THREE' },
          'vendor/orbitcontrols': { deps: ['vendor/three'], exports: 'THREE' },
          'vendor/detector': { exports: 'Detector' }
   }},[
  'vendor/trackballcontrols', 'vendor/detector'
], function (THREE, Detector){




  //THREE.TrackballControls.prototype = Object.create(THREE.EventDispatcher.prototype);

  var camera, scene, renderer, controls;
  var geometry, material, mesh, directionalLight, ground, spotlight;

  init();
  animate();

  function init(){

    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;
    //camera.position.z = 500;

    controls = new THREE.TrackballControls( camera );

    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    controls.noZoom = false;
    controls.noPan = false;

    controls.staticMoving = false;
    controls.dynamicDampingFactor = 0.3;

    controls.keys = [ 65, 83, 68 ];

    controls.addEventListener( 'change', render );

    scene = new THREE.Scene();

    geometry = new THREE.CubeGeometry(200, 200, 200);

    // changed MeshBasicMaterial to MeshLambertMaterial to allow direction lighting
    material = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      map: THREE.ImageUtils.loadTexture('broek.jpg') // load a Wehkamp image, as texture of the cube
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set (300, 300, 300);
    mesh.castShadow = true;
    mesh.receiveShadow = false;
    scene.add(mesh);

    var groundgeometry = new THREE.PlaneGeometry( 5000, 2000, 3200 );
    var groundmaterial = new THREE.MeshLambertMaterial( {color: 0x999999, side: THREE.DoubleSide} );
    ground = new THREE.Mesh( groundgeometry, groundmaterial );
    ground.castShadow = false;
    ground.receiveShadow = true;
    scene.add( ground );



    // added directional light
    directionalLight = new THREE.DirectionalLight(0xffffff, 0.05);
    directionalLight.position.set(600,600,600).normalize();
    scene.add(directionalLight);
    var ambientLight = new THREE.AmbientLight(0x444444);
    scene.add(ambientLight);

spotLight = new THREE.SpotLight( 0xFFAA88 );
  spotLight.target.position.set( 100, 200, -500 );
  spotLight.position.set(600,600,600);
  spotLight.shadowCameraNear  = 100.01;
  spotLight.castShadow    = true;
  spotLight.shadowDarkness  = 0.5;
  spotLight.shadowCameraVisible = true;
// console.dir(spotLight)
 spotLight.shadowMapWidth = 1024;
 spotLight.shadowMapHeight  = 1024;
  scene.add( spotLight );



    renderer = Detector.webgl? new THREE.WebGLRenderer(): new THREE.CanvasRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;
    renderer.shadowMapType = THREE.PCFSoftShadowMap;





    document.body.appendChild(renderer.domElement);

    render();
  }

  function animate(){

    // note: three.js includes requestAnimationFrame shim

    requestAnimationFrame(animate);
    controls.update();





  }

  function render(){


    renderer.render(scene, camera);
  }


});
