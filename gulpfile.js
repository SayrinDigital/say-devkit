var { series, src, dest, watch } = require('gulp');
var pug = require('gulp-pug')
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var concat = require('gulp-concat');

function compileSass(){
    return src("scss/main.scss")
        .pipe(sass())
        .pipe(concat('saykit.css'))
        .pipe(dest('build/styles'))
        .pipe(browserSync.stream())
}

function compilePug(){
    return src("views/**/*.pug")
        .pipe(pug())
        .pipe(dest('views/'))
        .pipe(browserSync.stream())
}

function serve(){
    browserSync.init({
        server: "./",
        startPath: "/views/index.html"
    });

    watch("scss/**/*.scss", compileSass);
    watch("views/**/*.pug", compilePug);
    watch("views/*.html").on('change', browserSync.reload);
}

exports.default = series(serve);