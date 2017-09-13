const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const server = require('gulp-server-livereload');
const browserify = require('gulp-browserify');
const sourcemaps = require('gulp-sourcemaps');


gulp.task('es6', () => 
	gulp.src('src/main.js')
		.pipe(sourcemaps.init())
        // .pipe(babel({
        //     presets: ['es2015']
        // }))
        //.pipe(gulp.dest('dist1'))
        //.pipe(browserify())
        .pipe(browserify({ transform: ['babelify'] }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist1'))
);

gulp.task('watch', () => {
    gulp.watch('src/*', ['es6']);
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(server({
      livereload: true,
      port: '8888',
      open: true,
      path: "/",
      directoryListing : false,
      //defaultFile : 'index.html'
    }));
});

gulp.task('default', ['es6', 'watch', 'webserver']);