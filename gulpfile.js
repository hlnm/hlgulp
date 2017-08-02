const gulp = require('gulp');
const p = require('gulp-load-plugins')();
const handleError = require('./gulp-config/handleError');
const clean = require('gulp-clean');
const pngquant = require('imagemin-pngquant');

const config = require('./gulp-config/config');


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

        .pipe(p.imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(config.img.dist))
        .pipe(p.plumber({errorHandler: handleError}))
});

gulp.task('js', () => {
    gulp.src(config.js.src)

        .pipe(gulp.dest(config.js.dist))
        .pipe(p.plumber({errorHandler: handleError}))
});

gulp.task('sass', () => {
    gulp.src(config.sass.src)
        .pipe(p.base64({
            extensions: [ 'png','svg', 'jpg'],
            maxImageSize: 1024*20
        }))
        .pipe(p.sass().on('error', p.sass.logError))
        .pipe(gulp.dest('dist/css-scss/'))
        .pipe(p.plumber({errorHandler: handleError}))
});
gulp.task('mincss', ['sass'], () => {
    gulp.src('dist/css-scss/*.css')
        .pipe(p.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(p.base64({

            extensions: ['svg', 'png', 'jpg'],
            maxImageSize: 10240,
            debug: true
        }))
        .pipe(p.minifyCss())
        .pipe(gulp.dest('dist/css'))
        .pipe(p.plumber({errorHandler: handleError}))

});

gulp.task('jade2html', () => {
    gulp.src(config.jade.src)

        .pipe(p.cache(p.jade({
            // client: true,
            pretty: true
        })))
        .pipe(p.base64({
            baseDir: 'images',
            extensions: ['svg', 'png', 'jpg'],
            maxImageSize: 10240,
            debug: true
        }))
        .pipe(gulp.dest(config.jade.dist))
        .pipe(p.plumber({errorHandler: handleError}))
});

gulp.task('default', ['js', 'jade2html', 'imgmin', 'mincss']);
// gulp.task('cleans',['clean'],function(){
//     gulp.start('mincss','imgmin','js','sass')

// })
// gulp.task('default',['clean'],function(){
//     gulp.start('mincss','imgmin','js')

// });


gulp.task('deploy', ['mincss', 'imgmin']);


gulp.watch('src/**', ['default']);

