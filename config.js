'use strict';
module.exports = function() {

  var source = 'src/',
      development = 'dist/',
      bower_path = 'bower_components/',

      // 제거 폴더 설정: gulp clean
      remove = ['.tmp', '.sass-cache', 'css', 'js/script*.js', '*.html'],

      // Bower 설정
      bower = {
        susy: {
          src: bower_path + 'susy/sass/**',
          dest: 'src/sass/susy'
        },
        fontawesome: {
          src: bower_path + 'font-awesome/**',
          dest: development + 'css/font-awesome'
        },
        normalize: {
          src: bower_path + 'normalize-css/**',
          dest: development + 'css/normalize'
        },
        others: {
          src: [
            bower_path + '**',
            '!'+ bower_path +'{susy,susy/**}',
            '!'+ bower_path +'{font-awesome,font-awesome/**}',
            '!'+ bower_path +'{normalize-css,normalize-css/**}'
          ],
          dest: development + 'js/libs'
        }
      },

      // HTML 설정
      html = {
        src : source + '**/*.html'
      },

      // SASS 설정
      sass = {
        src        : source + 'sass/**/*.{scss,sass}',
        compassSrc : source + 'sass',
        dest       : development + 'css/'
      },

      // JS 설정
      js = {
        src  : source + 'js/**/**.js',
        dest : development + 'js/'
      },

      // HTML Prettify 옵션
      HTML_PRETTIFY = {
        'indent_char': ' ',
        'indent_size': 2
      },

      // Sass 옵션
      SASS_OPTION = {
        css: sass.dest,
        sass: sass.compassSrc,
        sourcemap: true,
        comments: false,
        time: true,
        style: 'compact' // nested, expanded, compact, compressed
      },

      // Autoprefixer 브라우저 옵션
      AUTOPREFIXER = [
        'ie >= 9',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4.4',
        'bb >= 10'
      ],

      // 웹 서버 설정
      server = {
        root: [development],
        port: 8080,
        livereload: true,
        open: {
          browser: 'Google Chrome' // chrome(안되면 Google Chrome), iexplore, ...
        }
      };

  return {
    del   : remove,
    src   : source,
    dev   : development,

    bower  : bower,
    html  : html,
    sass  : sass,
    js    : js,

    SERVER        : server,
    HTML_PRETTIFY : HTML_PRETTIFY,
    SASS_OPTION   : SASS_OPTION,
    AUTOPREFIXER  : AUTOPREFIXER
  };
};