var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');


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
	gulp.start('serve');
});