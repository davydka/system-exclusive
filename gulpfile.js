var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');

var gutil = require('gulp-util'); // offers more useful console logging build processes
var source = require('vinyl-source-stream'); // allows moving text files from one part of build process to another
var browserify = require('browserify'); // allows use of require() in JS
var watchify = require('watchify'); // why use this instead of gulp.watch?
var reactify = require('reactify'); // works with browserify to convert jsx into JS


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
		watch: ['server.js'],

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
	gulp.src('public/*.html')
		.pipe(wiredep())
		.pipe(gulp.dest('public'));
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
			.pipe(gulp.dest('public/js/'))
			;
	}
	build();
	bundler.on('update', build);

	gulp.start('serve');
});