const gulp = require('gulp');
const p = require('gulp-load-plugins')();

var handleError = function (err) {
    var colors = gutil.colors;
    console.log('\n')
    gutil.log(colors.red('Error!'))
    gutil.log('fileName: ' + colors.red(err.fileName))
    gutil.log('lineNumber: ' + colors.red(err.lineNumber))
    gutil.log('message: ' + err.message)
    gutil.log('plugin: ' + colors.yellow(err.plugin))
}
gulp.task('mincss',()=>{
    gulp.src('src/css/*.css')
        .pipe(p.plumber({
            errorHandler: function (error){
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(p.minifyCss())
        .pipe(gulp.dest('dist/css'))

});

gulp.task('')

gulp.task('default',['mincss']);

gulp.watch('src/**',['default']);

   