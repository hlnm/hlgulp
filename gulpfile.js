const gulp = require('gulp');
const p = require('gulp-load-plugins')();
const handleError = require('./gulp-config/handleError');
const clean = require('gulp-clean');
const pngquant = require('imagemin-pngquant');

const config = require('./gulp-config/config');


gulp.task('mincss',()=>{
    gulp.src('src/css/*.css')
        .pipe(p.minifyCss())
        
        .pipe(gulp.dest('dist/css'))
        .pipe(p.plumber({errorHandler: handleError}))
        

});

gulp.task('clean',()=>{
    gulp.src(config.clean.src)
        .pipe(clean());
})

gulp.task('img',()=>{
    gulp.src(config.img.src)
        .pipe(gulp.dest(config.img.dist))
})

gulp.task('imgmin',()=>{
    gulp.src(config.img.src)
        .pipe(p.cache(p.imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use:[pngquant()]
        })))
        .pipe(gulp.dest(config.img.dist))
})


gulp.task('default',['mincss','imgmin']);

gulp.task('deploy',['mincss','imgmin']);


gulp.watch('src/**',['default']);

   