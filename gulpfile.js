const gulp = require('gulp');
const sass = require('gulp-sass');
const child = require('child_process');
const gutil = require('gulp-util');
const browserSync = require('browser-sync').create();
const ghPages = require('gulp-gh-pages');

const siteRoot = '_site';

const scssEntry = 'bundle.scss';
const scssFiles = '_sass/**/*.scss';
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
gulp.task('serve', () => {
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
  gulp.watch(scssFiles);
});

gulp.task('default', ['jekyll', 'watch', 'serve']);