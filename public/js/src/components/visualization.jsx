var React	= require('react');

module.exports = React.createClass({
	renderer: '',
	scene: '',
	camera: '',
	stats: '',

	particleSystem: '',
	uniforms: '',
	geometry: '',

	particles: 100000,

	WIDTH: window.innerWidth,
	HEIGHT: window.innerHeight,

	init: function(){
		this.camera = new THREE.PerspectiveCamera( 40, this.WIDTH / this.HEIGHT, 1, 10000 );
		this.camera.position.z = 300;

		this.scene = new THREE.Scene();

		var attributes = {
			size:        { type: 'f', value: null },
			customColor: { type: 'c', value: null }
		};

		this.uniforms = {
			color:     { type: "c", value: new THREE.Color( 0xffffff ) },
			texture:   { type: "t", value: THREE.ImageUtils.loadTexture( "/images/spark1.png" ) }
		};

		var shaderMaterial = new THREE.ShaderMaterial( {
			uniforms:       this.uniforms,
			attributes:     attributes,
			vertexShader:   document.getElementById( 'vertexshader' ).textContent,
			fragmentShader: document.getElementById( 'fragmentshader' ).textContent,

			blending:       THREE.AdditiveBlending,
			depthTest:      false,
			transparent:    true
		});

		var radius = 200;

		this.geometry = new THREE.BufferGeometry();

		var positions = new Float32Array( this.particles * 3 );
		var values_color = new Float32Array( this.particles * 3 );
		var values_size = new Float32Array( this.particles );

		var color = new THREE.Color();

		for( var v = 0; v < this.particles; v++ ) {
			values_size[ v ] = 20;

			positions[ v * 3 + 0 ] = ( Math.random() * 2 - 1 ) * radius;
			positions[ v * 3 + 1 ] = ( Math.random() * 2 - 1 ) * radius;
			positions[ v * 3 + 2 ] = ( Math.random() * 2 - 1 ) * radius;

			color.setHSL( v / this.particles, 1.0, 0.5 );

			values_color[ v * 3 + 0 ] = color.r;
			values_color[ v * 3 + 1 ] = color.g;
			values_color[ v * 3 + 2 ] = color.b;
		}

		this.geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
		this.geometry.addAttribute( 'customColor', new THREE.BufferAttribute( values_color, 3 ) );
		this.geometry.addAttribute( 'size', new THREE.BufferAttribute( values_size, 1 ) );

		this.particleSystem = new THREE.PointCloud( this.geometry, shaderMaterial );

		this.scene.add( this.particleSystem );

		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( this.WIDTH, this.HEIGHT );

		var container = document.getElementById( 'visualization' );
		container.appendChild( this.renderer.domElement );

		//stats = new Stats();
		//stats.domElement.style.position = 'absolute';
		//stats.domElement.style.top = '0px';
		//container.appendChild( stats.domElement );
	},

	animate: function () {
		requestAnimationFrame( this.animate );

		this.render();
		//stats.update();
	},

	render: function(){
		var time = Date.now() * 0.005;
		this.particleSystem.rotation.z = 0.01 * time;

		var size = this.geometry.attributes.size.array;

		for( var i = 0; i < this.particles; i++ ) {

			size[ i ] = 10 * ( 1 + Math.sin( 0.1 * i + time ) );

		}

		this.geometry.attributes.size.needsUpdate = true;

		this.renderer.render( this.scene, this.camera );
	},

	componentDidMount: function(){
		this.init();
		this.animate();
	},

	render: function(){

		return <div className="visualization" id="visualization">


		</div>
	}
})