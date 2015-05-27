var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');

var gutil = require('gulp-util'); // offers more useful console logging build processes
var source = require('vinyl-source-stream'); // allows moving text files from one part of build process to another
var buffer = require('vinyl-buffer');
var browserify = require('browserify'); // allows use of require() in JS
var watchify = require('watchify'); // why use this instead of gulp.watch?
var reactify = require('reactify'); // works with browserify to convert jsx into JS
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');

gulp.task('modifyNexus', function(){
	gulp.src(['public/bower_components/nexusUI/index.js'])
		.pipe(uglify())
		.pipe(gulp.dest('public/bower_components/nexusUI'));
});


gulp.task('sass', function () {
	gulp.src('public/css/src/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('public/css'));
});


gulp.task('nodemon', function (cb) {
	var called = false;
	return nodemon({

		// nodemon our expressjs server
		script: 'server.js',

		// watch core server file(s) that require server restart on change
		watch: ['server.js', 'api/v1/api-sysex.js'],

		stdout: true,

		env: { 'NODE_ENV': 'development' }
	})
		.on('start', function onStart() {
			// ensure start only got called once
			if (!called) { cb(); }
			called = true;
		})
		.on('restart', function onRestart() {

		});
});


// inject bower components
gulp.task('wiredep', function () {
	var wiredep = require('wiredep').stream;
	//addRootSlash: false
	gulp.src('public/*.html')
		.pipe(wiredep())
		.pipe(replace(/"bower_components/g, '"/bower_components'))
		.pipe(replace(/dist\/jquery\.js/g, 'dist/jquery.min.js'))
		.pipe(replace(/dist\/js\/bootstrap\.js/g, 'dist/js/bootstrap.min.js'))
		.pipe(replace(/uncompressed\/TweenMax\.js/g, 'minified/TweenMax.min.js'))
		.pipe(replace(/dist\/css\/bootstrap\.css/g, 'dist/css/bootstrap.min.css'))
		.pipe(gulp.dest('public'));

	gulp.src(['public/bower_components/nexusUI/index.js'])
		.pipe(uglify())
		.pipe(gulp.dest('public/bower_components/nexusUI'));
});


gulp.task('serve', ['nodemon', 'sass', 'wiredep'], function () {
	gulp.watch('public/css/src/*.scss', ['sass']);
	gulp.watch('bower.json', ['wiredep']);
});


gulp.task('default', function () {

	var bundler = watchify(browserify({
		entries: ['./public/js/src/app.jsx'],
		transform: [reactify],
		extensions: ['.jsx'],
		debug: true,
		cache: {},
		packageCache: {},
		fullPaths: true
	}));

	function build(file){
		if(file) gutil.log('Recompiling' + file);
		return bundler
			.bundle()
			.on('error', gutil.log.bind('gutil', 'Browserify Error'))
			.pipe(source('application.js'))
			.pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
			.pipe(uglify())
			.pipe(gulp.dest('public/js/'))
			;
	}
	build();
	bundler.on('update', build);

	gulp.start('serve');
});