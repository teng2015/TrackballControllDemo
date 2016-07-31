window.onload = function(){
    var width = document.getElementById('canvas-frame').clientWidth;
    var height = document.getElementById('canvas-frame').clientHeight;
    var container, stats;
    var camera, controls, scene, renderer;
    var cross;
    init();
    animate();
    function init() {
        camera = new THREE.PerspectiveCamera(60, width/height,1,1000);
        camera.position.z = 200;
        controls = new THREE.TrackballControls(camera);
        controls.rotateSpeed = 2;
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 2;
        controls.noZoom = false;
        controls.noPan = false;
        controls.staticMoving = true;
        controls.dynamicDampingFactor = 0.3;
        controls.keys = [ 50, 50, 50 ];
        controls.addEventListener( 'change', render );

        scene = new THREE.Scene();
        var material = new THREE.LineBasicMaterial({
                color: 0xffff00
            });

            var geometry = new THREE.Geometry();
            geometry.vertices.push(
                    new THREE.Vector3( 0, 0, 0 ),
                    new THREE.Vector3( 50, 50, 0 )
            );
            mesh = new THREE.Line( geometry, material);
            scene.add(mesh);
            mesh = new THREE.Mesh(
                    new THREE.SphereGeometry(20,20,20),
                    new THREE.MeshLambertMaterial({color: 0x00ff00})
            );
            scene.add(mesh);
            mesh = new THREE.Mesh(
                    new THREE.SphereGeometry(10,10,10),
                    new THREE.MeshLambertMaterial({color: 0xff0000})
            );
            mesh.position.x = 50;
            mesh.position.y = 50;
            mesh.position.z = 0;
            scene.add(mesh);
            var helper = new THREE.GridHelper( 1000, 50 );
            helper.setColors( 0x0000ff, 0x808080 );
            scene.add( helper );

            light = new THREE.AmbientLight(0xffffff,0.5);
            scene.add(light);
            light = new THREE.PointLight(0xFFFFFF,1,3000);
            light.position.set(0, 0,1000);
            scene.add(light);

            renderer = new THREE.WebGLRenderer({
                antialias : true
            });
            renderer.setSize(width, height);
            document.getElementById('canvas-frame').appendChild(renderer.domElement);
            renderer.setClearColor(0xffffff, 0.8);
            window.addEventListener( 'resize', onWindowResize, false );
            render();
    }

    function onWindowResize() {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize( width, height );
        controls.handleResize();
        render();
    }

    function animate() {
        requestAnimationFrame( animate );
        controls.update();
    }

    function render() {
        renderer.render( scene, camera );
    }
};