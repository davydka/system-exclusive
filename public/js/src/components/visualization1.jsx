var React	= require('react');

module.exports = React.createClass({
	renderer: '',
	scene: '',
	camera: '',

	orbit: '',
	ps: '',

	init: function(){
		var height = $('.jumbotron .col-md-8').height();
		var width = $('.jumbotron .col-md-8').width();

		this.scene = new THREE.Scene();

		this.camera = new THREE.PerspectiveCamera(25, width / height, 0.1, 1000);
		//this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setClearColor(0x000000, 1.0);
		this.renderer.setSize(width, height);
		//this.renderer.setSize(window.innerWidth, window.innerHeight);

		// position and point the camera to the center of the scene
		this.camera.position.x = 0;
		this.camera.position.y = 0;
		this.camera.position.z = 10;
		this.camera.lookAt(this.scene.position);

		this.orbit = new THREE.OrbitControls(this.camera);
		//this.orbit.noZoom = true;
		//this.orbit.noPan = true;
		this.orbit.noKeys = true;
		this.orbit.autoRotate = true;
		//this.orbit.autoRotateSpeed = 2.0;

		this.props.sysex.map(function(item, index){
			item.map(function(innerItem, innerIndex){
				var color = new THREE.Color("rgb("+innerItem+",0,0)");

				//console.log(innerItem);
				var material = new THREE.LineBasicMaterial({
					color: color
				});

				var geometry = new THREE.Geometry();
				geometry.vertices.push(
					new THREE.Vector3( innerIndex*.01, -2, 0 ),
					new THREE.Vector3( innerIndex*.01, 2, 0 )
				);

				var line = new THREE.Line( geometry, material );
				this.scene.add( line );
			}.bind(this));
		}.bind(this));


		//var geometry = new THREE.Geometry();
		//geometry.vertices.push(
		//	new THREE.Vector3( .01, -2, 0 ),
		//	new THREE.Vector3( .01, 2, 0 )
		//);
		//
		//var line = new THREE.Line( geometry, material );
		//this.scene.add( line );

		//this.setupParticleSystem(100, 500);

		var container = document.getElementById( 'visualization' );
		container.appendChild( this.renderer.domElement );

		// call the render function
		this.render3();
	},

	setupParticleSystem: function(x, y) {

		console.log(this.props.sysex);
		var geometry = new THREE.Geometry();

		for (var i = 0; i < x; i++) {
			for (var j = 0; j < y; j++) {
				var v = new THREE.Vector3();
				v.x = i / 10;
				v.y = Math.sin(i / 100 * Math.PI * 2) + Math.cos(j / 100 * Math.PI) * 2;
				v.z = j / 10;

				geometry.vertices.push(v);
			}
		}

		// use a material for some styling
		var psMat = new THREE.PointCloudMaterial();
		psMat.map = THREE.ImageUtils.loadTexture("/images/ps_smoke.png");
		psMat.color = new THREE.Color(0x55ff55);
		psMat.transparent = true;
		psMat.size = 0.2;
		psMat.blending = THREE.AdditiveBlending;

		// Create a new particle system based on the provided geometry
		this.ps = new THREE.PointCloud(geometry, psMat);
		this.ps.sizeAttenuation = true;
		this.ps.sortParticles = true;

		this.ps.position.x = -5;
		this.ps.position.z = -5;
		//this.ps.position.x -= x / 20;
		//this.ps.position.z -= x / 20;

		// add the particle system to the scene
		this.scene.add(this.ps);

	},

	//setupParticleSystemX: function(x, y){
	//	var geometry = new THREE.Geometry();
	//	var pSize = [];
	//	var pOpacity = [];
	//
	//	// create the geometry and set custom values
	//	for (var i = 0; i < x; i++) {
	//		for (var j = 0; j < y; j++) {
	//			var v = new THREE.Vector3();
	//			v.x = i / 10;
	//			v.y = (Math.sin(i / 200 * Math.PI * 2) + Math.cos(j / 50 * Math.PI) + Math.sin((j + i) / 40 * Math.PI)) / 2;
	//			v.z = j / 10;
	//
	//			// add the vertex
	//			geometry.vertices.push(v);
	//
	//			// add vertex specific color, size and opacity
	//			geometry.colors.push(new THREE.Color(v.y, 0.5, 0.7));
	//			pSize.push(Math.random());
	//			pOpacity.push(Math.random() / 4 + 0.5);
	//		}
	//	}
	//
	//	// define the attributes that get sent to the shader
	//	// there should be an attribute for each individual vertex
	//	var attributes = {
	//		pSize: {type: 'f', value: pSize},
	//		pOpacity: {type: 'f', value: pOpacity}
	//	};
	//
	//	// we'll get the basic shader stuff, so we don't have to define all the uniforms oursevles
	//	// set all the configuration for the shader here. These apply to all vertices
	//	var basicShader = THREE.ShaderLib['particle_basic'];
	//	var uniforms = THREE.UniformsUtils.merge([basicShader.uniforms]);
	//	uniforms['map'].value = THREE.ImageUtils.loadTexture("/images/ps_smoke.png");
	//	uniforms['size'].value = 100;
	//	uniforms['opacity'].value = 0.5;
	//	uniforms['psColor'].value = new THREE.Color(0xffffff);
	//
	//	// Create a shadermaterial and add our shaders and our attributes and uniforms
	//	var psMat2 = new THREE.ShaderMaterial({
	//		attributes: attributes,
	//		uniforms: uniforms,
	//		transparent: true,
	//		blending: THREE.AdditiveBlending,
	//		vertexShader: document.
	//			getElementById('particleVertexShader').text,
	//		fragmentShader: document.
	//			getElementById('particleFragmentShader').text
	//	});
	//
	//	// Create a new particle system based on the provided geometry
	//	// and provided shader material
	//	this.ps = new THREE.PointCloud(geometry, psMat2);
	//	this.ps.sortParticles = true;
	//
	//	// position it in the middle
	//	this.ps.position.x -= x / 20;
	//	this.ps.position.z -= x / 20;
	//
	//	// add the particle system to the scene
	//	this.scene.add(this.ps);
	//},

	animate: function () {
		//requestAnimationFrame( this.animate );

		this.render3();
	},

	render3: function(){
		this.renderer.render( this.scene, this.camera );

		requestAnimationFrame(this.render3);

		this.orbit.update();
	},

	componentDidMount: function(){
		this.init();
		this.render3();
		//this.animate();
	},

	render: function(){

		return <div className="visualization" id="visualization">


		</div>
	}
})