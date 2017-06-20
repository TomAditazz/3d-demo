var React = require('react');

var Demo = React.createClass({
    componentDidMount(){
        this.inital();
    },

    inital(){
        var canvas = document.getElementById('renderCanvas');
        var engine = new BABYLON.Engine(canvas, true);
        var createScene = function() {
            var scene = new BABYLON.Scene(engine);
            scene.clearColor = new BABYLON.Color4(0.9,0.9, 0.9,1); 
            engine.enableOfflineSupport = false;

            var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 3, 1.1, 60, BABYLON.Vector3.Zero(), scene);
            camera.attachControl(canvas, true);

            var light = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 60, 0), scene);
                light.diffuse = new BABYLON.Color3(1, 1, 1);
                light.specular = new BABYLON.Color3(1, 1, 1);
                light.groundColor = new BABYLON.Color3(0, 0, 0);

            var ground = BABYLON.Mesh.CreateGround('ground1', 50, 25, 0, scene);

            var points = [
                { y: -25, z: 0 },
                { y: 25, z: 0 },                
            ];
            var shape = [];
            for (var i = 0; i < points.length; i++) {
                var point = points[i];
                shape.push(new BABYLON.Vector3(12, point.y, point.z));
            } 

            shape.push(new BABYLON.Vector3(12, points[0].y, points[0].z));
            var path = [new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 16, 0)]

            var wall = BABYLON.MeshBuilder.ExtrudeShape('extruded',
            { shape: shape, path: path, sideOrientation: BABYLON.DOUBLESIDE, cap: BABYLON.Mesh.CAP_ALL },
            scene);

            var points2 = [
                { x: 25, y: -16, z: 12 },
                { x: 25, y: 0, z: 12},
            ];
            var shape2 = [];
            for (var i = 0; i < points2.length; i++) {
                var point2 = points2[i];
                shape2.push(new BABYLON.Vector3(point2.x, point2.y, point2.z));
            } 

            shape2.push(new BABYLON.Vector3(25, 0, 12));
            var path2 = [new BABYLON.Vector3(0, 16, 24), new BABYLON.Vector3(0, 16, 0)]

            var wall2 = BABYLON.MeshBuilder.ExtrudeShape('extruded2',
            { shape: shape2, path: path2, sideOrientation: BABYLON.DOUBLESIDE, cap: BABYLON.Mesh.CAP_ALL },
            scene);

            var materialGround = new BABYLON.StandardMaterial("textureGround", scene);
            materialGround.diffuseTexture = new BABYLON.Texture("imgs/floor.jpg", scene);
            materialGround.diffuseTexture.uScale = 8.0;//Repeat 5 times on the Vertical Axes
            materialGround.diffuseTexture.vScale = 8.0;//Repeat 5 times on the Horizontal Axes
            materialGround.backFaceCulling = false;//Always show the front and the back of an element

            var materialWall = new BABYLON.StandardMaterial("textureWall", scene);
            materialWall.ambientTexture = new BABYLON.Texture("imgs/wall-texture2.jpg", scene);
            materialWall.ambientTexture.uScale = 5.0;//Repeat 5 times on the Vertical Axes
            materialWall.ambientTexture.vScale = 5.0;//Repeat 5 times on the Horizontal Axes
            materialWall.backFaceCulling = false;//Always show the front and the back of an element
            materialWall.diffuseColor = new BABYLON.Color3(1, 1, 1); 

            var materialWall2 = new BABYLON.StandardMaterial("textureWall", scene);
            materialWall2.ambientTexture = new BABYLON.Texture("imgs/wall-texture2.jpg", scene);
            materialWall2.ambientTexture.uScale = 3.0;//Repeat 5 times on the Vertical Axes
            materialWall2.ambientTexture.vScale = 3.0;//Repeat 5 times on the Horizontal Axes
            materialWall2.backFaceCulling = false;//Always show the front and the back of an element

            ground.material = materialGround;
            wall.material = materialWall;
            wall2.material = materialWall2;



            return scene;
        }
        var scene = createScene();
        engine.runRenderLoop(function() {
            scene.render();
        });
    },

    render() {
        return (
        <div className="App">
            <div className="App-header">
            </div>
            <div className="App-body">
                <div className="canvas-wrapper">
                    <canvas id="renderCanvas">

                    </canvas>
                </div>
                <div className="App-body-right"> 
                </div>
            </div>
        </div>
        );
    }
});

module.exports = Demo;