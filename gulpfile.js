let gulp = require('gulp');
let sass = require('gulp-sass');
let rename = require('gulp-rename');
let header = require('gulp-header');
let cleanCSS = require('gulp-clean-css');
let gulpCopy = require('gulp-copy');

let pkg = require('./package.json');
let banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

gulp.task('minify-css', ['scss'], () => {
 return gulp.src('./public/css/main.css')
   .pipe(cleanCSS({compatibility: 'ie8'}))
   .pipe(rename('main.min.css'))
   .pipe(gulp.dest('./public/css'));
});

gulp.task('scss', function(){
    return gulp.src(`./scss/main.scss`)
        .pipe(sass().on('error', sass.logError))
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('copy-js', function(){
    return gulp.src('./node_modules/uikit/dist/js/*.min.js')
        .pipe(gulp.dest('./public/js'));
});

gulp.task('serve', ['scss', 'copy-js'], function(){
    gulp.watch("./scss/**/*.scss", ['minify-css']);
});

gulp.task('build', ['minify-css', 'copy-js']);
gulp.task('default', ['serve']);