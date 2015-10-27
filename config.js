'use strict';
module.exports = function() {

  var dev = 'dist/',

      // HTML 설정
      html = {
        src : dev + '**/*.html'
      },

      // CSS 설정
      css = {
        src : dev + '**/*.css'
      },

      // JS 설정
      js = {
        src  : dev + '**/**.js'
      },

      // 웹 서버 설정
      server = {
        root: [dev],
        port: 8080,
        livereload: true,
        open: {
          browser: 'chrome' // chrome(안되면 Google Chrome), iexplore, ...
        }
      };

  return {
    src   : dev,

    html  : html,
    css  : css,
    js    : js,

    SERVER        : server
  };
};