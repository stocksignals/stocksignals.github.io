const gulp = require('gulp');
const sass = require('gulp-sass');
const child = require('child_process');
const gutil = require('gulp-util');
const browserSync = require('browser-sync').create();

const siteRoot = '_site';

const scssEntry = '_styles/bundle.scss';
const scssFiles = '_styles/**/*.scss';
const scssDest = './css/';

// Launch Jekyll as a child perocess
gulp.task('jekyll', function (){
    child.spawn('jekyll.bat', ['build', '--watch', '--incremental'],
    {stdio: 'inherit'});
});

// Process SASS
gulp.task('scss', () => {
  gulp.src(scssEntry)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest(scssDest));
});

// Serve
gulp.task('serve',['watch'], () => {
    browserSync.init({
        files: [siteRoot + '/**'],
        port: 4000,
        server: {
        baseDir: siteRoot
        }
    });
});

// Watch
gulp.task('watch', () => {
  gulp.watch(scssFiles, ['scss']);
});

gulp.task('default', ['scss', 'jekyll', 'serve' ]);