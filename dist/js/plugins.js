// Avoid `console` errors in browsers that lack a console.
(function () {
  var method;
  var noop = function () {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());

// Ajax request setop
// (function ($) {
//   $(document).on('click', '.nav_menu a', function(e) {
//       e.preventDefault();
//       var $this = $(e.currentTarget);
//       loadURL($this.attr('href'), $('#main'));

//       // LOAD AJAX PAGES
//       function loadURL(url, container) {
//         $.ajax({
//           type: 'GET',
//           url: url,
//           dataType: 'html',
//           cache: true,
//           beforeSend: function() {
//             console.log('beforeSend');
//             container.html('<h1><i class="fa fa-cog fa-spin"></i> Loading...</h1>');

//             if (container[0] === $("#main")[0]) {
//               $("html").animate({
//                 scrollTop: 0
//               }, "fast");
//             }
//           },
//           complete: function() {
//             console.log('complete');
//           },
//           success: function(data) {
//             console.log('success');
//             container.css({
//               opacity: '0.0'
//             }).delay(500).html(data).animate({
//               opacity: '1.0'
//             }, 300);
//           },
//           error: function(xhr, ajaxOptions, thrownError) {
//             console.log('error');
//             container.html('<h4 style="margin-top:10px; display:block; text-align:left"><i class="fa fa-warning"></i> Error 404! Page not found.</h4>');
//           },
//           async: false
//         });
//       }

//   });
// })(jQuery);