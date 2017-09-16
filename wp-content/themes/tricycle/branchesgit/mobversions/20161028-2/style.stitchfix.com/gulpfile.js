var gulp = require('gulp');
var rev = require('gulp-rev');
var changed = require('gulp-changed');
gulp.task('css-version', function () {
    return gulp.src('css/*.css')
            .pipe(changed('dist/css'))
            .pipe(rev())
            .pipe(gulp.dest('dist/css'));
});

gulp.task('js-version', function () {
    return gulp.src('js/*.js')
            .pipe(changed('dist/js'))
            .pipe(rev())
            .pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['css-version', 'js-version'], function () {
    gulp.watch('css/*.css', ['css-version']);
    gulp.watch('js/*.js', ['js-version']);

});