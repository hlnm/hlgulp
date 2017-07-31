var src = './src',
    dist = './dist';

module.exports = {
    sass: {
        all: src+'/scss/**/*.scss',
        src:src+'/scss/*.scss',
        dist:dist+'/css',
        settings:{

        }
    },
    css: {
        all: src+'/css/**/*.css',
        src:src+'/css/*.css',
        dist:dist+'/css',
        settings:{

        }
    },
    js:{
        all: src+'/js/**/*js',
        src:src+'/js/*.js',
        dist:dist+'/js',
        settings:{

        }
    },
    img:{
        all: src+'/images/**/*',
        src:src+'/images/**/*',
        dist:dist+'/img'
    },
    clean:{
        src: dist
    }
}