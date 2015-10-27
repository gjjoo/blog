'use strict';

/**
 * 환경설정 & 모듈 호출
 */
var config       = require('./config')(),
    runSequence  = require('run-sequence'),
    gulp         = require('gulp'),
    gulpif       = require('gulp-if'),
    size         = require('gulp-size'),
    watch        = require('gulp-watch'),
    plumber      = require('gulp-plumber'),
    jshint       = require('gulp-jshint'),
    connect      = require('gulp-connect-multi')();

/**
 * Gulp 업무(Tasks): [default, watch]
 */
// 기본
gulp.task('default', function(cb){
  // 업무 실행 순서
  runSequence('connect', ['html', 'css', 'js', 'watch'], cb);
});

// 변경사항 관찰
gulp.task('watch', function() {
  // HTML
  watch([config.html.src], function() {
    gulp.start('html');
  });
  // SASS
  watch(config.css.src, function() {
    gulp.start('css');
  });
  // JS
  watch(config.js.src, function() {
    gulp.start('js');
  });
});

/**
 * Gulp 업무(Tasks): [connect, html, css, js]
 */
// 웹 서버
gulp.task('connect', connect.server( config.SERVER ));

// HTML
gulp.task('html', function() {
  return gulp.src(config.html.src)
    // 오류로 인한 실행멈춤 방지
    .pipe( plumber() )

    // 파일 크기 확인 후 화면리로드
    .pipe( size({title: 'HTML 파일 크기: '}) )
    .pipe( connect.reload() );
});

// CSS
gulp.task('css', function() {
  return gulp.src(config.css.src)
    // 오류로 인한 실행멈춤 방지
    .pipe( plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
      }
    }) )

    // 파일 크기 확인 후 화면리로드
    .pipe( size({title: 'SASS 파일 크기: '}) )
    .pipe( connect.reload() );
});

// JS
gulp.task('js', function() {
  return gulp.src(config.js.src)
    // 오류로 인한 실행멈춤 방지
    .pipe( plumber() )
    // 문법검사
    .pipe( jshint() )
    .pipe( jshint.reporter('jshint-stylish') )

    // 파일 크기 확인 후 화면리로드
    .pipe( size({title: 'JS 파일 크기: '}) )
    .pipe( connect.reload() );
});