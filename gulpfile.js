'use strict';

const gulp = require('gulp');
const rename = require('gulp-rename');
const del = require('del');
const nodemon = require('gulp-nodemon');
const livereload = require('gulp-livereload');
const runSequence = require('run-sequence');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
// linter
const eslint = require('gulp-eslint');

// ts stuff
const tslint = require('gulp-tslint');

const baseDirs = {
    base: './',
    backend: './backend/',
    frontend: './frontend/',
    dest: './public/'
};


const appFiles = {
    js: [baseDirs.backend + '**/*.js'],
    ts: [baseDirs.frontend + '**/*.ts'],
    styles: [baseDirs.frontend + '**/*.css'],
    html: [baseDirs.frontend + 'components/**/*.html'],
    index: [baseDirs.frontend + 'index.html']
};

const destDirs = {
    js: baseDirs.dest + 'js/',
    libs: baseDirs.dest + 'libs/',
    styles: baseDirs.dest + 'styles/',
    html: baseDirs.dest + 'views/'
};

const libs = [
    'node_modules/es6-shim/es6-shim.min.js',
    'node_modules/zone.js/dist/*.js'
];
const startupScript = 'server.js';


gulp.task('clean-dest', () => {
    return del(baseDirs.dest + '**/*');
});

gulp.task('tslint', () => {
    return gulp.src(appFiles.ts)
        .pipe(tslint())
        .pipe(tslint.report('verbose'));
});

gulp.task('webpack-build', () => {
    return gulp.src(appFiles.ts)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(destDirs.js));
});

gulp.task('copy-libs', () => {
    return gulp.src(libs, {base: 'node_modules'})
        .pipe(gulp.dest(destDirs.libs));
});

gulp.task('copy-styles', () => {
    return gulp.src(appFiles.styles)
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(destDirs.styles));
});

gulp.task('copy-index', () => {
    return gulp.src(appFiles.index)
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(baseDirs.dest))
});

gulp.task('copy-html', () => {
    return gulp.src(appFiles.html)
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(destDirs.html));
});

gulp.task('eslint', () => {
    return gulp.src(appFiles.js)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('nodemon', () => {
    nodemon({
        script: baseDirs.backend + startupScript,
        ext: 'js',
        ignore: [
            baseDirs.dest,
            baseDirs.frontend
        ]
    })
    .on('restart', () => {
        console.log('Magic restarted');
    });
});

gulp.task('copy-static', ['copy-styles', 'copy-html', 'copy-index', 'copy-libs']);
gulp.task('prepare-front', ['copy-static', 'webpack-build']);

gulp.task('livereload', ['prepare-front'], () => {
    return gulp.src(appFiles.index)
    .pipe(livereload());
});

gulp.task('watch', () => {
    livereload.listen();
    gulp.watch([
        appFiles.js
    ], ['livereload'])
    .on('change', (event) => {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('default', () => {
    runSequence(['eslint', 'clean-dest', 'tslint'],
                ['prepare-front'],
                ['nodemon', 'watch']);
});

gulp.task('build-front', () => {
    runSequence(['clean-dest', 'tslint'],
                ['prepare-front']);
});
