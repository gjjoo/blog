'use strict';

/**
 * 환경설정 & 모듈 호출
 */
var config       = require('./config')(),           // 환경설정
    del          = require('del'),                  // 제거
    runSequence  = require('run-sequence'),         // 실행순서
    preen        = require('preen'),                // Bower 패키지 관리(필요한 파일만)
    gulp         = require('gulp'),                 // Gulp
    // Gulp 유틸리티 모듈
    connect      = require('gulp-connect-multi')(), // 웹 서버
    gulpif       = require('gulp-if'),              // 조건처리
    size         = require('gulp-size'),            // 변경 사이즈 출력
    watch        = require('gulp-watch'),           // 관찰
    plumber      = require('gulp-plumber'),         // 오류 발생시에도 관찰 지속
    concat       = require('gulp-concat'),          // 파일 병합
    rename       = require("gulp-rename"),          // 파일 이름 변경
    // HTML 관련 모듈
    prettify     = require('gulp-html-prettify'),   // HTML 읽기 쉽게 정렬
    // CSS 관련 모듈
    sass         = require('gulp-sass'),            // SASS -> CSS
    compass      = require('gulp-compass'),         // SASS & COMPASS -> CSS
    autoprefixer = require('gulp-autoprefixer'),    // 밴더 프리픽스 적용
    uglifycss    = require('gulp-uglifycss'),       // CSS 압축
    // JS 관련 모듈
    jshint       = require('gulp-jshint'),          // JS 문법 검사
    uglify       = require('gulp-uglify');          // JS 압축

/**
 * Gulp 업무(Tasks): [default, watch]
 */
// 기본
gulp.task('default', ['clean', 'bower'], function(cb){
  // 업무 실행 순서
  runSequence('connect', ['html', 'sass', 'js', 'watch'], cb);
});

// 변경사항 관찰
gulp.task('watch', function() {
  // HTML
  watch([config.html.src], function() {
    gulp.start('html');
  });
  // SASS
  watch(config.sass.src, function() {
    gulp.start('sass');
  });
  // JS
  watch(config.js.src, function() {
    gulp.start('js');
  });
});

/**
 * Gulp 업무(Tasks): [connect, clean, preen, bower, html, sass, js]
 */
// 웹 서버
gulp.task('connect', connect.server( config.SERVER ));

// 제거
gulp.task('clean', del.bind(null, config.del));

// BOWER
gulp.task('bower', function() {
  // 업무 실행 순서
  runSequence('bower:preen', 'bower:copy');
});

// Bower 패키지에서 필요한 파일만 골라내기(Preen)
gulp.task('bower:preen', function(cb) {
  return preen.preen({}, cb);
});

// Bower 패키지 복사
gulp.task('bower:copy', function() {
  var name, ref, setValue;
  ref = config.bower;
  for (name in ref) {
    setValue = ref[name];
    gulp.src(setValue.src)
      .pipe(gulp.dest(setValue.dest));
  }
});

// HTML
gulp.task('html', function() {
  return gulp.src(config.html.src)
    // 오류로 인한 실행멈춤 방지
    .pipe( plumber() )
    // HTML 소스 꾸미기
    .pipe( prettify(config.HTML_PRETTIFY) )
    // 파일 출력
    .pipe( gulp.dest(config.dev) )
    // 파일 크기 확인 후 화면리로드
    .pipe( size({title: 'HTML 파일 크기: '}) )
    .pipe( connect.reload() );
});

// SASS
gulp.task('sass', function() {
  return gulp.src(config.sass.src)
    // 오류로 인한 실행멈춤 방지
    .pipe( plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
      }
    }) )
    // SASS(SCSS) -> CSS
    .pipe( compass(config.SASS_OPTION) )
    .on('error', function(error) {
      console.log(error);
      this.emit('end');
    })
    // 자동으로 CSS에 제조사 접두어 추가
    .pipe( autoprefixer(config.AUTOPREFIXER) )
    // 빌드 후 출력
    .pipe( gulp.dest(config.sass.dest) )
    // 압축
    .pipe( uglifycss() )
    // 이름 변경 후 출력
    .pipe( rename({suffix: '.min'}) )
    .pipe( gulp.dest(config.sass.dest) )
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
    // 파일 병합 후 출력
    .pipe( concat('script.js') )
    .pipe( gulp.dest(config.js.dest) )
    // 압축
    .pipe( uglify({
      mangle: true,
      preserveComments: "some"
    }) )
    // 이름 변경 후 출력
    .pipe( rename({suffix: '.min'}) )
    .pipe( gulp.dest(config.js.dest) )
    // 파일 크기 확인 후 화면리로드
    .pipe( size({title: 'JS 파일 크기: '}) )
    .pipe( connect.reload() );
});