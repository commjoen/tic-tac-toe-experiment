require({
    baseUrl: 'js',
    // three.js should have UMD support soon, but it currently does not
    shim: { 'vendor/three': { exports: 'THREE' } }
}, [
    'vendor/three'
], function(THREE) {

var camera, scene, renderer;
var geometry, material, mesh;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

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
    var directionalLight = new THREE.DirectionalLight( 0xffffff, 2.5 );
    directionalLight.position.set( 1, 1, 1 );
    scene.add( directionalLight );

    renderer =  new THREE.WebGLRenderer()|| new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

}

function animate() {

    // note: three.js includes requestAnimationFrame shim
    requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;
    //mesh.rotation.z += 0.01;
    mesh.rotation.y = 6.02;
    camera.position.z -= Math.sin(mesh.rotation.x)*3;
    camera.position.y = Math.cos(mesh.rotation.y);
    renderer.render(scene, camera);

}

});
