const gulp = require('gulp');
const p = require('gulp-load-plugins')();
const handleError = require('./gulp-config/handleError');
const clean = require('gulp-clean');
const pngquant = require('imagemin-pngquant');

const config = require('./gulp-config/config');


gulp.task('mincss', () => {
    gulp.src('src/css/*.css')
        .pipe(p.minifyCss())
        .pipe(p.base64({
            maxImageSize: 10240, 
            debug: true
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(p.plumber({ errorHandler: handleError }))


});

// gulp.task('clean', () => {
//     gulp.src(config.clean)
//         .pipe(clean())
//         .pipe(p.plumber({errorHandler: handleError}))
// })

// gulp.task('img', () => {
//     gulp.src(config.img.src)
//         .pipe(gulp.dest(config.img.dist))
//         .pipe(p.plumber({ errorHandler: handleError }))
// })

gulp.task('imgmin', () => {
    gulp.src(config.img.src)
        .pipe(p.cache(p.imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest(config.img.dist))
        .pipe(p.plumber({ errorHandler: handleError }))
})

gulp.task('js', () => {
    gulp.src(config.js.src)
        .pipe(p.uglify())
        .pipe(gulp.dest(config.js.dist))
        .pipe(p.plumber({ errorHandler: handleError }))
})

gulp.task('sass', () => {
    gulp.src(config.sass.src)
        .pipe(p.sass({ outputStyle: 'compressed' }).on('error', p.sass.logError))
        .pipe(p.base64({
            maxImageSize: 10240, 
            debug: true
        }))
        .pipe(gulp.dest(config.sass.dist))
        .pipe(p.plumber({ errorHandler: handleError }))
})

gulp.task('jade2html', () => {
    gulp.src(config.jade.src)
        .pipe(p.jade({
            // client: true,
            pretty: true
        }))
        .pipe(p.base64({
            maxImageSize: 10240, 
            debug: true
        }))
        .pipe(gulp.dest(config.jade.dist))
        .pipe(p.plumber({ errorHandler: handleError }))
})

gulp.task('default', ['mincss', 'js', 'sass','jade2html', 'imgmin']);
// gulp.task('cleans',['clean'],function(){
//     gulp.start('mincss','imgmin','js','sass')

// })
// gulp.task('default',['clean'],function(){
//     gulp.start('mincss','imgmin','js')

// });



gulp.task('deploy', ['mincss', 'imgmin']);


gulp.watch('src/**', ['default']);

