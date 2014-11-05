require({
  baseUrl: 'js',
  // three.js should have UMD support soon, but it currently does not
  shim: { 'vendor/three': { exports: 'THREE' },
          'vendor/trackballcontrols': { deps: ['vendor/three'], exports: 'THREE' },
          'vendor/detector': { exports: 'Detector' }
   }},[
  'vendor/trackballcontrols', 'vendor/detector'
], function (THREE, Detector){




  THREE.TrackballControls.prototype = Object.create(THREE.EventDispatcher.prototype);

  var camera, scene, renderer, controls;
  var geometry, material, mesh, directionalLight;

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
    scene.add(mesh);

    // added directional light
    directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
    directionalLight.position.set(1, 3, 24).normalize();
    scene.add(directionalLight);
    var ambientLight = new THREE.AmbientLight(0x444444);
    scene.add(ambientLight);

    renderer = Detector.webgl? new THREE.WebGLRenderer(): new THREE.CanvasRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);

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
