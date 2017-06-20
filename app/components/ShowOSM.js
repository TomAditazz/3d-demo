var React = require('react');
var todoStore = require('../stores/todoStore');
var todoActions = require('../actions/todoActions');
var container, stats;
var camera, scene, renderer, controls;

var ShowOSM = React.createClass({
  
    componentWillMount() {
      // const script = document.createElement("script");

      //   script.src = "three.js";
      //   //script.async = true;

      //   document.body.appendChild(script);
      //   console.log(script);

      //   const loaderScript = document.createElement("script");
      //   loaderScript.src = "ColladaLoader.js";
      //   document.body.appendChild(loaderScript);
      //   console.log(loaderScript);
    },
    componentDidMount() {
        this.initalMap();
    },

    initalMap(){ 
        if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
        this.init();
        this.animate();
        // if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
        // var container, stats;
        // var camera, scene, renderer, controls;

        // container = document.getElementById( 'container' );
        // camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
        // camera.position.set( 7, 5, 7 );
        // scene = new THREE.Scene();
        // // collada
        // var loader = new THREE.ColladaLoader();
        // loader.options.convertUpAxis = true;
        // loader.load( './monster.dae', function ( collada ) {
        //   var object = collada.scene;
        //   object.scale.set( 0.0025, 0.0025, 0.0025 );
        //   object.position.set( - 2, 0.2, 0 );
        //   scene.add( object );
        // } );
        // //
        // var gridHelper = new THREE.GridHelper( 10, 20 );
        // scene.add( gridHelper );
        // //
        // var ambientLight = new THREE.AmbientLight( 0xcccccc );
        // scene.add( ambientLight );
        // var directionalLight = new THREE.DirectionalLight( 0xffffff );
        // directionalLight.position.set( 0, 1, -1 ).normalize();
        // scene.add( directionalLight );
        // //
        // renderer = new THREE.WebGLRenderer();
        // renderer.setPixelRatio( window.devicePixelRatio );
        // renderer.setSize( window.innerWidth, window.innerHeight );
        // container.appendChild( renderer.domElement );
        // //
        // controls = new THREE.OrbitControls( camera, renderer.domElement );
        // //
        // stats = new Stats();
        // container.appendChild( stats.dom );
        // //
        // window.addEventListener( 'resize', onWindowResize, false );
        // function onWindowResize() {
        //   camera.aspect = window.innerWidth / window.innerHeight;
        //   camera.updateProjectionMatrix();
        //   renderer.setSize( window.innerWidth, window.innerHeight );
        // }
        // function animate() {
        //   requestAnimationFrame( animate );
        //   render();
        //   stats.update();
        // }
        // function render() {
        //   renderer.render( scene, camera );
        // }
    },
    init() {
        container = document.getElementById( 'container' );
        //
        renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setPixelRatio( window.devicePixelRatio );
        //renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
        renderer.setSize( 800, 400 );
        renderer.setClearColor( 0xDCDCDC, 1 );
        container.appendChild( renderer.domElement );
        //
        camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
        camera.position.set( 0, 5, -7 );

        scene = new THREE.Scene();
        var checkerboard = new THREE.Mesh(
            new THREE.PlaneBufferGeometry( 10, 10, 1, 1 ),
            new THREE.MeshBasicMaterial( {color: 0xDCDCDC, side: THREE.DoubleSide} )
        );
        // checkerboard.position.y = - 1;
        checkerboard.rotation.x =  Math.PI / 2;
        scene.add( checkerboard );
        
        controls = new THREE.OrbitControls( camera, renderer.domElement );
        controls.enableZoom = true;
        controls.enableDamping = false;
        controls.rotateSpeed = 1;
        controls.zoomSpeed = 1.2;
        controls.minPolarAngle = Math.PI / 3;
        controls.maxPolarAngle = Math.PI / 3;
        //
        EventsControls2 = new EventsControls(camera, renderer.domElement);
        EventsControls2.map = checkerboard;
        
        EventsControls2.attachEvent('mouseOver', function() {
            console.log(this.container);
            this.container.style.cursor = 'pointer';

        });

        EventsControls2.attachEvent('mouseOut', function() {
            console.log("Out");
            this.container.style.cursor = 'auto';

        });

        EventsControls2.attachEvent('dragAndDrop', function() {
            controls.enableDamping = true;
            this.container.style.cursor = 'move';
            // console.log(this.focused.position);
            // this.focused.position.y = this.previous.y;

        });
        console.log(EventsControls2);
        var scale = new THREE.Vector3(25, 25, 25);
        EventsControls2.scale.copy(scale);
        EventsControls2.offsetUse = true;
        //scene.background = new THREE.Color( 0xF7F9F9 );
        // collada
        var loader = new THREE.ColladaLoader();
        var loader1 = new THREE.ColladaLoader();
        var loader2 = new THREE.ColladaLoader();
        loader.options.convertUpAxis = true;
        loader1.options.convertUpAxis = true;
        loader2.options.convertUpAxis = true;
        loader.load( 'https://aditazz-rls.s3-us-west-1.amazonaws.com/models/PF2609.dae', function ( collada ) {
          var object = collada.scene;
          //object.scale.set( 0.025, 0.025, 0.025 );
          object.scale.set(1 / scale.x, 1 / scale.y, 1 / scale.z);
          // object.position.set( 2.176, 0, 2.438 );
          object.position.set(0, 0, 0);
          object.updateMatrix();
          console.log(object);
          scene.add( object );
          EventsControls2.attach(object);
        } );
        // loader1.load( 'https://aditazz-rls.s3-us-west-1.amazonaws.com/models/PF2006.dae', function ( collada ) {
        loader1.load( 'https://aditazz-rls.s3-us-west-1.amazonaws.com/models/PF2609.dae', function ( collada ) {
          var object1 = collada.scene;
          object1.scale.set(1 / scale.x, 1 / scale.y, 1 / scale.z);
          // object1.position.set( 0.724, 0.356, 2.438 );
          object1.position.set( 2.176, 0, 2.438 );
          object1.updateMatrix();
          console.log(object1);
          scene.add( object1 );
          EventsControls2.attach(object1);
        } );
        // loader2.load( 'https://aditazz-rls.s3-us-west-1.amazonaws.com/models/DoorLHpush.dae', function ( collada ) {
        //   var object2 = collada.scene;
        //   object2.scale.set( 0.025, 0.025, 0.025 );
        //   object2.position.set( 1, 0, 0 );
        //   object2.updateMatrix();
        //   scene.add( object2 );
        //   EventsControls2.attach(object2);
        // } );
        
        //
        var gridHelper = new THREE.GridHelper( 10, 10 );
        scene.add( gridHelper );
        // //
        var ambientLight = new THREE.AmbientLight( 0xcccccc );
        scene.add( ambientLight );
        var directionalLight = new THREE.DirectionalLight( 0xcccccc );
        directionalLight.position.set( 0, 1, -1 ).normalize();
        scene.add( directionalLight );
        
        //
        window.addEventListener( 'resize', this.onWindowResize, false );
      },
      onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( 800, 400 );
      },
      animate() {
        requestAnimationFrame( this.animate );
        this.render2();

      },
      render2() {
        controls.update();
        renderer.render( scene, camera );
      },
    addBuilding(){
      // osmb.addGeoJSONTiles('https://{s}.data.osmbuildings.org/0.2/anonymous/tile/{z}/{x}/{y}.json');
      // osmb.on('pointermove', function(e) {
      //   osmb.getTarget(e.detail.x, e.detail.y, function(id) {
      //     if (id) {
      //       osmb.highlight(id, '#f08000');
      //     } else {
      //       osmb.highlight(null);
      //     }
      //   });
      // });

    },
    interAction(){

    },
  render: function(){
    return (
          <div id="container" onmouseover={this.interAction}>
            
          </div>
    )
  }
});

module.exports = ShowOSM;